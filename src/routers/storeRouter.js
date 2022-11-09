import express from "express";
import { showStore } from "../controllers/storeController";

const storeRouter = express.Router();

//storeRouter.get("/:id", showStore);

export default storeRouter;