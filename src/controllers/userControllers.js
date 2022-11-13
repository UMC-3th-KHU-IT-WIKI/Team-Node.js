import pool from "../db";
import bcrypt from "bcrypt"

export const getUsers = async(req, res)=>{

    const conn = await pool.getConnection(async conn => conn);
    const sql = 'select id, name, username from User';

    const [result] = await conn.query(sql);
    
    res.send(JSON.stringify(result));
}

export const getUserID = (req,res)=>{
    res.render('editForm.html');
}

export const editUser = async(req,res)=>{
    const {id, name, username, password:oldpassword} = req.body;
    const conn = await pool.getConnection(async conn => conn);

    const hasedpass = await bcrypt.hash(oldpassword, 8);
    const sql = `UPDATE User SET name = '${name}', username = '${username}', password = '${hasedpass}' WHERE id = ${id};`

    const result = await conn.query(sql);

    if (result){
        const message = {
            ok: 'ok',
            id,
            name,
            username,
        }
        res.send(JSON.stringify(message));
    }
}

export const getDelete = (req,res)=>{
    res.render('deleteForm.html');
}

export const deleteUSer = async(req,res)=>{
    const {id} = req.body;
    const conn = await pool.getConnection(async conn => conn);

    const sql = `delete from User where id =${id}`

    const result = await conn.query(sql);

    if (result){
        const message = {
            ok: 'ok',
        }
        res.send(JSON.stringify(message));
    }
}