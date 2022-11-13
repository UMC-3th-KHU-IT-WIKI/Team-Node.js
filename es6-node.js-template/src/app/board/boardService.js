require("dotenv").config();
import baseResponse from "../../../config/baseResponseStatus";
import pool from "../../../config/database";
import { errResponse, response } from "../../../config/response";
import { insertBoardInfo, updateBoardInfo } from "./boardDao";
import { boardIdCheck } from "./boardProvider";

export const createDocu = async (boardid, nickname, content) => {
  try {
    const boardIdRows = await boardIdCheck(boardid);
    if (boardIdRows.length > 0)
      return errResponse(baseResponse.BOARD_REDUNDANT_BOARDID);

    const insertBoardInfoParams = [boardid, nickname, content];

    const connection = await pool.getConnection(async (conn) => conn);

    const boardPostResult = await insertBoardInfo(
      connection,
      insertBoardInfoParams
    );
    console.log(`추가된 게시물 : ${boardPostResult[0].insertId}`);
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const editBoard = async (boardid, content) => {
  try {
    console.log(boardid);
    const connection = await pool.getConnection(async (conn) => conn);
    const editBoardResult = await updateBoardInfo(connection, boardid, content);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
