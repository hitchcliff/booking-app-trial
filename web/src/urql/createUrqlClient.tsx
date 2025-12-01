import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { debugExchange, fetchExchange } from "urql";

import {
  CreateBookingDocument,
  CreateBookingMutation,
  DeleteBookingByIdMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  ReadAllBookingsDocument,
  ReadAllBookingsQuery,
  RegisterMutation,
} from "../gen/graphql";

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
            deleteBookingById: (
              result: DeleteBookingByIdMutation,
              _args,
              cache: Cache,
              _info
            ) => {
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
                      console.log(booking);

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
                  console.log(result.login.user);
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
