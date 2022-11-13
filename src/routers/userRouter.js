import express from "express"
import {getUsers, getUserID, editUser, getDelete, deleteUSer} from "../controllers/userControllers"

const userRouter = express.Router();

userRouter.get('/info', getUsers);
userRouter.route('/edit').get(getUserID).post(editUser);
userRouter.route('/secession').get(getDelete).post(deleteUSer);

export default userRouter;