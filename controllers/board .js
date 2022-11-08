const express = require('express');
const mysql = require('mysql2/promise');
import pool from '../db';

module.exports.renderBoard = (req,res) => {
    res.render('board');
}

module.exports.getNewComment = async(req,res) => {
    const { username , comment } = req.body;
    const conn = await pool.getConnection(async conn => conn);
    const randomId = Math.floor(Math.random() * (1000 - 1) + 1);
    // 게시판 데이터베이스에 새롭게 게시된 글 관련 유저아이디, 유저 네임 , 해당 게시글 내용 받는 변수 설정.
    const newBoardInfo = `insert into board values('${randomId}', '${username}', '${comment}');`;
    // Json 으로 변환. 
    const [result] = await conn.query(newBoardInfo);

    //해당 게시글 관련 유저와 게시글 정보에 대해서 json 형태로 send 해서 화면에 띄우기.
    if(result)
    {
        const userInfo = `select id, username, comment from board where id = ${randomId};`;
        const [[content]] = await conn.query(userInfo);
        conn.release();
        res.send(JSON.stringify(content)); 
    } else {
        const errorMessage = {
            status: "FAIL",
            error: "Something is went Wrong ! "
        }
        conn.release();
        res.send(JSON.stringify(errorMessage)); 
    }

}

//게시글 조회. 
module.exports.findComment = async(req,res) => {
    const conn = await pool.getConnection(async conn => conn);
    const commentInfo = `select * from board`;
    const [result] = await conn.query(commentInfo);
    if(result)
    {
        conn.release();
        res.send(JSON.stringify(result))
    } else {
        const message = {
            status : 'fail',
            error: 'Something is went Wrong !'
        };
        conn.release();
        res.send(JSON.stringify(message));
    }
}




module.exports.updateComment = async (req,res) => {
    const { id, username, comment } = req.body;
    const foundCommnet = comment.find(c => id === id);
    const newComment = req.body.comment;
    foundCommnet.comment = newComment;
    const conn = await pool.getConnection(async conn => conn);
    const userInfo = `update board set 'username ='${username}', comment = '${comment}'`;
    const result = await conn.query(userInfo);

    if(result)
    {   conn.release();
        res.send(JSON.stringify(result));

    } else {

        conn.release();

        const message = {
            updatedInfo : {
                username,
                comment
            }
        };
        res.send(JSON.stringify(message));
    }

}


