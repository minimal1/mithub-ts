/** @format */

import { Router } from "express";
import routes from "../route";
import { postAccessToken } from "../controllers/userController";

const apiRouter = Router();

apiRouter.post(routes.accessToken, postAccessToken);

export default apiRouter;
