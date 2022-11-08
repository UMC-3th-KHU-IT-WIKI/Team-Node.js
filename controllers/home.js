//컨트롤러는 미들웨어 집합소

const express = require('express');
const mysql = require('mysql2/promise');
//비밀번호 해쉬화.
const bcrypt = require('bcrypt');
//mysql과 연결하기 위한 변수 선언 . pool 변수 활용해서 쿼리 전송
import pool from '../db';

module.exports.renderHome = (req,res)=> {
    res.render('home')
};

module.exports.newUser = (req,res) => {
    res.render('form')
};

module.exports.newUserPost = async (req,res) => {

    const { username , password } = req.body;
    //pool 컨넥션 해주기
    let conn = await pool.getConnection(async conn => conn);
    //랜덤 아이디 생성 코드
    const id = Math.floor(Math.random() * (10000 - 1) + 1);
    const hashedPassword = await bcrypt.hash(password, 8);
    //sql 실제 쿼리 작성시 마지막에 콜론 붙이는것처럼 꼭 붙여주기 
    //table 생성시 비밀번호 타입은 해쉬 암호로 들어가니 VARCHAR로 설정!
    const sql = `INSERT INTO user values(${id}, '${username}', '${hashedPassword}');`;
    const result = await conn.query(sql);
    conn.release();

    if (res)
    {
        conn = await pool.getConnection(async conn => conn);
        //항상 sql 쿼리문 세미콜론 잊지말기
        const userInfo = `select id, username from user where id = ${id};`;
        // userInfo에 대한 쿼리 가져와야 하므로 await 적용 필수.
        const [data] = await conn.query(userInfo);
        res.send(JSON.stringify(data))
        conn.release();
    } else {
        conn.release();
        const data = {
            status: "Fail"
        }
        res.send(JSON.stringify(data));
    }


    
}