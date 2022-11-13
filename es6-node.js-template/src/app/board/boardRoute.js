import express from "express";
import {
  getBoardTest,
  getBoards,
  patchBoards,
  postBoards,
  getBoardById,
} from "./boardController";

const boardRouter = express.Router();

boardRouter.get("/test", getBoardTest);
boardRouter.route("/document").get(getBoards).post(postBoards);
boardRouter.route("/:boardid").get(getBoardById).patch(patchBoards);

export default boardRouter;
