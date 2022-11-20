import express from "express";
import { getSelect, postSelect } from "./orderController";

const orderRouter = express.Router();

//orderRouter.route("/:id([0-9a-f]{24})").get().post();
//orderRouter.route("/:id([0-9a-f]{24})/select").get(getSelect).post(postSelect);

export default orderRouter;