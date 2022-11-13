const { errResponse, response } = require("../config/response");
const  baseResponse = require( "../config/baseResponseStatus");
const  { createBoard, editBoard, deletemyBoard} = require( "../service/boardService");
const  { retrieveBoard, retrieveBoardList }  = require("../provider/boardProvider");
const pool = require('../config/database');


module.exports.getBoards = async (req,res) =>{

    const content = req.params.content;

    if(!content){
        // 유저 전체 조회
        const boardListResult = await retrieveBoardList();
        return res.send(response(baseResponse.SUCCESS, boardListResult));
    }else{
        const boardListbyContent = await retrieveboardList(content);
        return res.send(response(baseResponse.SUCCESS,boardListbyContent));
    }
}

module.exports.postBoard = async(req,res) => {
    const { title, username, content } = req.body;
    if(!title)
        return res.send(response(baseResponse.CREATE_BOARD_TITLE_EMPTY));
    
    if(!username)
        return res.send(response(baseResponse.CREATE_BOARD_USERNAME_EMPTY));

    if(!content)
        return res.send(response(baseResponse.CREATE_BOARD_CONTENT_EMPTY));

    const madeBoardResponse = await createBoard(title, username, content);

    return res.send(madeBoardResponse);
}



module.exports.getBoardById = async(req,res) =>{
    const boardId = req.params.boardId;
    if (!boardId)
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
    const boardByUserId = await retrieveBoard(boardId);
    return res.send(response(baseResponse.SUCCESS,boardByUserId));

}

module.exports.patchBoards = async (req,res) => {
    const boardId = req.params;
    const title = req.body;
    const editBoardInfo = await editBoard(boardId,title);
    return res.send(editBoardInfo);

};


module.exports.deleteBoard = async(req,res) => {
    const username = req.body;
    const deleteBoardInfo = await deletemyBoard(username);
    return res.send(deleteBoardInfo);

}
