import pool from "../db";
import bcrypt from "bcrypt"

export const home = (req,res)=>{
    res.render("home.html");
}

export const getJoin = (req,res) =>{
    res.render("join.html");
}

export const postJoin = async (req,res) =>{
    const{name, password:plainPass, username} = req.body;
    const sequence = Math.floor(Math.random() * (10000 - 1) + 1);
    let conn = await pool.getConnection(async conn => conn);

    const hashedPass = await bcrypt.hash(plainPass,8);
    const sql = `insert into user values(${sequence} ,'${name}','${username}','${hashedPass}');`;
    const result = await conn.query(sql);
    conn.release();

    if(result){
        conn = await pool.getConnection(async conn => conn);
        const sql2 = `select name, username from user where id=${sequence};`;
        const [data] = await conn.query(sql2);
        res.send(JSON.stringify(data));
        conn.release();
    }
    else{
        const data = {
            status:"fail"
        }
        res.send(JSON.stringify(data));
    }
}