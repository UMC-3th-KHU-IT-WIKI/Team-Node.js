import pool from "../db";
import bcrypt from "bcrypt"

export const home = (req,res)=>{
    res.render('home.html');
}

export const getJoin = (req,res)=>{
    res.render('joinForm.html');
}

export const postJoin = async(req,res)=>{
    const {name, username, password:oldpassword} = req.body;
    const conn = await pool.getConnection(async conn => conn);
    const seq = Math.floor(Math.random() * (1000-1)+1);

    const hasedpass = await bcrypt.hash(oldpassword, 8);
    const sql = `INSERT INTO User VALUES (${seq}, '${name}','${username}', '${hasedpass}')`

    const result = await conn.query(sql);
    
    if (result){
        const message = {
            ok: 'ok',
            name,
            username,
        }
        res.send(JSON.stringify(message));
    }
}