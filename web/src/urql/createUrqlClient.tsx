import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { fetchExchange, gql } from "urql";

import {
  BookingFragment,
  CreateAppointmentMutation,
  CreateBookingMutation,
  DeleteAppointmentByIdMutation,
  DeleteBookingByIdMutation,
  DislikeBookingMutation,
  LikeBookingMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  ReadAllBookingsDocument,
  ReadAllBookingsQuery,
  ReadAllMyAppointmentsDocument,
  ReadAllMyAppointmentsQuery,
  ReadBookingByIdDocument,
  ReadBookingByIdQuery,
  RegisterMutation,
} from "../gen/graphql";
import Invalidate from "./cache/invalidate";

const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";

  if (typeof window === "undefined" && ctx) {
    cookie = ctx.req.headers.cookie;
  }

  return {
    url:
      process.env.NODE_ENV === "production"
        ? (process.env.NEXT_PUBLIC_API_URL as string)
        : "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            dislikeBooking: (
              result: DislikeBookingMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              const like = result.dislikeBooking;

              if (!like) return;

              // inspect fields  doesn't work when updating a single value
              const data = cache.readFragment(
                gql`
                  fragment _ on Booking {
                    id
                    likes
                  }
                `,
                { id: like.like?.booking?.id }
              ) as BookingFragment;

              const likes = data?.likes! - 1;

              cache.writeFragment(
                gql`
                  fragment _ on Booking {
                    id
                    likes
                  }
                `,
                {
                  id: like.like?.booking?.id,
                  likes: likes,
                }
              );
            },
            likeBooking: (
              result: LikeBookingMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              const like = result.likeBooking;

              if (!like) return;

              // inspect fields  doesn't work when updating a single value
              const data = cache.readFragment(
                gql`
                  fragment _ on Booking {
                    id
                    likes
                  }
                `,
                { id: like.like?.booking?.id }
              ) as BookingFragment;

              const likes = data?.likes! + 1;

              cache.writeFragment(
                gql`
                  fragment _ on Booking {
                    id
                    likes
                  }
                `,
                {
                  id: like.like?.booking?.id,
                  likes: likes,
                }
              );
            },
            deleteAppointmentById: (
              result: DeleteAppointmentByIdMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              const appointment = result.deleteAppointmentById;

              if (!appointment) return;
              // invalidate the bookings
              new Invalidate().readAllBookings(cache);

              const fields = cache.inspectFields("Query");
              const fieldInfos = fields.filter(
                (filter) => filter.fieldName === "readAllMyAppointments"
              );

              fieldInfos.forEach((fi) => {
                cache.updateQuery(
                  {
                    query: ReadAllMyAppointmentsDocument,
                    variables: fi.arguments,
                  },
                  (
                    data: ReadAllMyAppointmentsQuery | null
                  ): ReadAllMyAppointmentsQuery | null => {
                    if (data) {
                      const foundIndex = data.readAllMyAppointments?.findIndex(
                        (appointment) => {
                          return appointment.id === _args.id;
                        }
                      );

                      if (foundIndex === -1) return data;

                      data.readAllMyAppointments?.splice(foundIndex!, 1);
                    }

                    return data;
                  }
                );
              });
            },
            createAppointment: (
              result: CreateAppointmentMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              const appointment = result.createAppointment.appointment;

              if (!appointment) return;

              // invalidate the appointments
              new Invalidate().readAllMyAppointments(cache);

              const fields = cache.inspectFields("Query");
              const fieldInfos = fields.filter(
                (filter) => filter.fieldName === "readBookingById"
              );

              fieldInfos.forEach((fi) => {
                cache.updateQuery(
                  {
                    query: ReadBookingByIdDocument,
                    variables: fi.arguments,
                  },
                  (
                    data: ReadBookingByIdQuery | null
                  ): ReadBookingByIdQuery | null => {
                    if (data) {
                      data.readBookingById?.appointments?.unshift(appointment);
                    }

                    return data;
                  }
                );
              });
            },
            deleteBookingById: (
              result: DeleteBookingByIdMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              console.log(result.deleteBookingById);
              console.log(result);

              // check if deleted
              if (!result.deleteBookingById) return;

              const id = _args.id;

              const fields = cache.inspectFields("Query");
              const fieldInfos = fields.filter(
                (field) => field.fieldName === "readAllBookings"
              );

              fieldInfos.forEach((fieldInfo) => {
                cache.updateQuery(
                  {
                    query: ReadAllBookingsDocument,
                    variables: fieldInfo.arguments,
                  },
                  (
                    data: ReadAllBookingsQuery | null
                  ): ReadAllBookingsQuery | null => {
                    // check if we have data in the cache
                    if (data) {
                      // put it in the first array
                      const foundBookingIndex = data.readAllBookings.findIndex(
                        (booking) => {
                          return booking.id === id;
                        }
                      );
                      data.readAllBookings.splice(foundBookingIndex, 1);

                      return data;
                    }

                    return data;
                  }
                );
              });
            },
            createBooking: (
              result: CreateBookingMutation,
              _args,
              cache: Cache,
              _info
            ) => {
              const fields = cache.inspectFields("Query");
              const fieldInfos = fields.filter(
                (field) => field.fieldName === "readAllBookings"
              );

              fieldInfos.forEach((fieldInfo) => {
                cache.updateQuery(
                  {
                    query: ReadAllBookingsDocument,
                    variables: fieldInfo.arguments,
                  },
                  (
                    data: ReadAllBookingsQuery | null
                  ): ReadAllBookingsQuery | null => {
                    if (data && result.createBooking?.booking) {
                      // console.log(data.readAllBookings);

                      const booking = result.createBooking.booking;

                      // put it in the first array
                      data.readAllBookings?.unshift(booking);
                      return data;
                    }

                    return data;
                  }
                );
              });
            },
            register: (result: RegisterMutation, args, cache: Cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (): MeQuery => {
                if (result.register.errors) {
                  return null as any;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              });
            },
            login: (result: LoginMutation, args, cache: Cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (): MeQuery => {
                if (result.login.errors) {
                  return null as any;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              });
            },
            logout: (result: LogoutMutation, args, cache, _info) => {
              cache.updateQuery({ query: MeDocument }, () => ({
                me: null,
              }));
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

export default createUrqlClient;
