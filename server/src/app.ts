/** @format */

import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as path from "path";
import routes from "./route";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(routes.api, apiRouter);

if (process.env.PRODUCTION) {
  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use(
    "/auth/github/callback",
    express.static(path.join(__dirname, "../../client/build"))
  );
}

export default app;
