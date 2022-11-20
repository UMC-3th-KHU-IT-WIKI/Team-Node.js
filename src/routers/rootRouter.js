import express from "express";
import {home} from "../Store/storeController"

const rootRouter = express.Router();

rootRouter.get("/", home);


export default rootRouter;