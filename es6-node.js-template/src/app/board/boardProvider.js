import pool from "../../../config/database";
import {
  selectBoard,
  selectBoardNickname,
  selectContentBoardId,
  selectBoardId,
} from "./boardDao";

export const retrieveBoardList = async (nickname) => {
  if (!nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const BoardListResult = await selectBoard(connection);
    connection.release();

    return BoardListResult;
  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const BoardListResult = await selectBoardNickname(connection, nickname);
    connection.release();

    return BoardListResult;
  }
};

export const retrieveBoard = async (boardid) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const boardResult = await selectContentBoardId(connection, boardid);

  connection.release();

  return boardResult[0];
};

export const boardIdCheck = async (boardid) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const boardidCheckResult = selectBoardId(connection, boardid);

  connection.release();

  return boardidCheckResult;
};
