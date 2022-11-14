import express from "express"
import {showAllUser, usersData} from "../controllers/userController"
const userRouter = express.Router();

userRouter.get('/',showAllUser);

export default userRouter;