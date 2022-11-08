const express = require('express');
const mysql = require('mysql2/promise');
import pool from "../db";

module.exports.renderUser = async (req,res) => {
    const conn = await pool.getConnection(async conn => conn);
    const userInfo = `select id,username from user;`;
    const [result] = await conn.query(userInfo);
    res.send(JSON.stringify(result));
};