import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { debugExchange, fetchExchange } from "urql";

import {
  CreateBookingDocument,
  CreateBookingMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  ReadAllBookingsDocument,
  ReadAllBookingsQuery,
  RegisterMutation,
} from "../gen/graphql";

// export const ssrExchange = () => ({
//   url: "http://localhost:4000/graphql",
//   exchanges: [cacheExchange, ssrExchange, fetchExchange],
// });

const createUrqlClient = (ssrExchange: any, ctx: any) => {
  const isServer = typeof window === "undefined";

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

              console.log(fieldInfos);

              fieldInfos.forEach((fieldInfo) => {
                console.log("info: ", fieldInfo);
                cache.updateQuery(
                  {
                    query: ReadAllBookingsDocument,
                    // variables: fieldInfo.arguments,
                  },
                  (
                    data: ReadAllBookingsQuery | null
                  ): ReadAllBookingsQuery | null => {
                    if (data && result.createBooking.booking) {
                      data.readAllBookings.unshift(
                        result.createBooking.booking
                      );
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
