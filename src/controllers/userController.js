import pool from "../db";

export const showAllUser = async(req,res) =>{
    const conn = await pool.getConnection(async conn => conn);
    const sql = `select name, username from user`

    const [result] = await conn.query(sql);

    res.send(JSON.stringify(result));
}
