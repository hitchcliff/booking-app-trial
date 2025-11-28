// setup
import { getStorage } from "@firebase/storage";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Application } from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./utils/constants";
import { AppDataSource } from "./utils/data-source";
import FirebaseAdminSdk from "./utils/firebase";
import getMyIp from "./helpers/get_my_ip";
import { resolvers } from "./resolvers/resolvers";
import { MyContext } from "./utils/type";

(async function main() {
  // Database
  await AppDataSource.initialize();

  // express
  const app: Application = express();

  // firebase init
  const config = FirebaseAdminSdk();
  const storage = getStorage(config);

  // session
  app.use(cookieParser(process.env.SESSION_SECRET));

  const cache = session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false, // only store data when i need  it
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 1, //1 year
      httpOnly: !__prod__,
      sameSite: "lax", // csrf
      secure: true, //https
    },
  });

  // securing cookie
  if (__prod__) {
    app.set("trust proxy", 1);
  }

  app.use(cache);

  // Apollo
  const apolloServer = new ApolloServer({
    csrfPrevention: __prod__ ? true : false, // uploading files
    cache: "bounded",
    persistedQueries: false,
    introspection: true,
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({
      req,
      res,
      storage,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app as any,
    cors: {
      origin: [
        "*",
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    },
  });

  const myIp = getMyIp();

  app.listen(process.env.PORT, () => {
    console.log(
      `Browser: http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `API Calls: http://${myIp}:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
})().catch((err) => console.error(err));
