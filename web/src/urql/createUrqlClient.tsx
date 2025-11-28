import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { debugExchange, fetchExchange } from "urql";

import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
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
            // createPost: (
            //   result: CreatePostMutation,
            //   _args,
            //   cache: Cache,
            //   _info
            // ) => {
            //   const fields = cache.inspectFields("Query");
            //   const fieldInfos = fields.filter(
            //     (field) => field.fieldName === "posts"
            //   );

            //   fieldInfos.forEach((fieldInfo) => {
            //     cache.updateQuery(
            //       {
            //         query: PostsDocument,
            //         variables: fieldInfo.arguments,
            //       },
            //       (data: PostsQuery | null): PostsQuery | null => {
            //         if (data && result.createPost) {
            //           data.posts.unshift(result.createPost);
            //           return data;
            //         }

            //         return data;
            //       }
            //     );
            //   });
            // },
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
