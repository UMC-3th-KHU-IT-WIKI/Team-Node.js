const { insertBoardInfo, updateBoardInfo, deleteBoardInfo} = require('../dao/boardDao');
const baseResponse = require('../config/baseResponseStatus');
const { errResponse, response } = require("../config/response");
const pool = require('../config/database');
const boardDao = require('../dao/boardDao')

exports.createBoard = async (title, username, content) => {

        const insertBoardInfoParams = [title, username, content];
        const connection = await pool.getConnection(async (conn) => conn);
        const boardResult = await boardDao.insertBoardInfo(connection,insertBoardInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
}

exports.editBoard =  async (username, title)=>{
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await boardDao.updateBoardInfo(connection, username, title)
        connection.release();

        return response(baseResponse.SUCCESS);

};


exports.deletemyBoard =  async (username)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteBoardResult = await boardDao.deleteBoardInfo(connection, username)
    connection.release();

    return response(baseResponse.SUCCESS);

};