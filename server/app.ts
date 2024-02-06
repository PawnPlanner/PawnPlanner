import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

import { default as connectMongoDBSession } from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);

import sampleRouter from "./routes/router";
import loginRouter from "./routes/login";

import logger from "./middlewares/logger";

import { IUser } from "./db/user";

declare module "express-session" {
    interface SessionData {
      user: IUser;
    }
}

const createApp = (dbname: string) => {
    const app = express();
  
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(cookieParser());
  
    const username = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_CLUSTER;

    app.use(
      session({
        name: "ssid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
        store: new MongoDBStore({
          uri: `mongodb+srv://${username}:${password}@${cluster}.v5o6onf.mongodb.net/${dbname}?retryWrites=true&w=majority`,
          collection: "sessions",
        }),
      })
    );

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(logger);
  
    // set routers
    app.use(sampleRouter);
    app.use(loginRouter);
  
    return app;
  };
  
  export default createApp;
