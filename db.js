require('dotenv').config
import mysql from 'mysql2/promise';

const config = 
{
    host:`${process.env.DB_HOST}`,
    user:`${process.env.DB_USER}`,
    password:`${process.env.DB_PASS}`,
    database:`${process.env.DB_NAME}`,
}

const pool = mysql.createPool(config);

export default pool;