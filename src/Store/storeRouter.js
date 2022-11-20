import express from "express";
import { showStore, getSearch, postSearch, getByName, getByType } from "./storeController";

const storeRouter = express.Router();

//storeRouter.get("/:id([0-9a-f]{24})", showStore);
storeRouter.route("/search").get(getSearch).post(postSearch);
storeRouter.get("/name", getByName);
storeRouter.get("/type",getByType);

export default storeRouter;