import express from "express";
import { getUpdate, postUpdate } from "../controllers/userController";

const userRouter = express.Router();

//userRouter.Router("/:id").get().post();
//userRouter.route("/:id/update").get(getUpdate).post(postUpdate);

export default userRouter;