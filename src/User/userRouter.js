import express from "express";
import {jwtMiddleware} from "../../config/jwtMiddleware";
import { getJoin, postJoin, getLogin, postLogin, getUpdate, patchUpdate } from "./userController";

const userRouter = express.Router();

//userRouter.Router("/:id([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})").get().post();
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.route("/:id([0-9]{15})/update").all(jwtMiddleware).get(getUpdate).patch(patchUpdate);

export default userRouter;