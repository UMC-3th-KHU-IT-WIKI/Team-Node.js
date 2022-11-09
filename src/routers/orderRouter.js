import express from "express";
import { getSelect, postSelect } from "../controllers/orderController";

const orderRouter = express.Router();

//orderRouter.route("/:id").get().post();
//orderRouter.route("/:id/select").get(getSelect).post(postSelect);

export default orderRouter;