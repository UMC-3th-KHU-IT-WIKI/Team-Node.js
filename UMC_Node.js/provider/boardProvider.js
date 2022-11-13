const pool = require("../config/database");
const { selectBoard, selectBoardContent } = require("../dao/boardDao");

exports.retrieveBoardList = async(content) =>{
    if(!content){
        const connection = await pool.getConnection(async conn => conn);
        const boardListResult = await selectBoard(connection);
        connection.release();

        return boardListResult;
    }
    else{
        const connection = await pool.getConnection(async conn => conn);
        const boardListResult = await selectBoardContent(connection, email);
        connection.release();

        return boardListResult;
    }
}

exports.retrieveBoard = async(userId) =>{
    const connection = await pool.getConnection(async conn => conn);
    const boardResult = await selectBoard(connection,userId);

    connection.release();

    return boardResult[0];
}