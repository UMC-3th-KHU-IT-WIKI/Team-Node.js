import { retrieveBoardList } from "./boardProvider";
import baseResponse from "../../../config/baseResponseStatus";
import { createDocu, editBoard } from "./boardService";
import { response } from "../../../config/response";

/*
Board API No. 0
테스트 API
[GET] /app/boardtest
*/
export const getBoardTest = async (req, res) => {
  console.log("Success board test");
  return res.send(response(baseResponse.SUCCESS));
};

/*
Board API No. 1
모든 게시물 & user가 쓴 게시물만 조회(nickname 정보 입력 여부로 결정)
[GET] /app/boards
*/
export const getBoards = async (req, res) => {
  const { query: nickname } = req;
  if (!nickname) {
    const boardListResult = await retrieveBoardList();
    return res.send(response(baseResponse.SUCCESS, boardListResult));
  } else {
    const boardListbyNickname = await retrieveUserList(nickname);
    return res.send(response(baseResponse.SUCCESS, boardListbyNickname));
  }
};

/*
Board API No. 2
특정 게시물만 조회 (board의 id로 조회)
[GET] /app/boards
*/
export const getBoardById = async (req, res) => {
  /**
   * Path Variable: userId
   */

  const {
    params: { boardid },
  } = req;

  if (!boardid) return res.send(errResponse(baseResponse.BOARD_BOARDID_EMPTY));

  const boardByBoardId = await retrieveBoard(boardid);
  return res.send(response(baseResponse.SUCCESS, boardByBoardId));
};

/*
Board API No. 3
게시물 생성
[post] /app/boards
*/
export const postBoards = async (req, res) => {
  const { boardid, nickname, content } = req.body;

  if (!boardid) return res.sned(response(baseResponse.BOARD_BOARDID_EMPTY));

  if (!nickname) return res.send(response(baseResponse.BOARD_NICKNAME_EMPTY));

  if (!content) return res.send(response(baseResponse.BOARD_CONTENT_EMPTY));

  const boardPostResponese = await createDocu(boardid, nickname, content);

  return res.send(boardPostResponese);
};

/*
Board API No. 4
게시물 수정
[PATCH] /app/boards/:boardid
*/
export const patchBoards = async (req, res) => {
  const {
    params: { boardid },
    body: { content },
  } = req;

  if (!boardId) res.send(errResponse(baseResponse.BOARD_BOARDID_EMPTY));
  else {
    const editBoardInfo = await editBoard(boardid, content);
    return res.send(editBoardInfo);
  }
};
