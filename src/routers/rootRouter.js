import express from "express";
import {home, getSearch, postSearch} from "../controllers/storeController"
import { getJoin, postJoin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
//rootRouter.route("/search").get(getSearch).post(postSearch);
//rootRouter.route("/join").get(getJoin).post(postJoin);

export default rootRouter;