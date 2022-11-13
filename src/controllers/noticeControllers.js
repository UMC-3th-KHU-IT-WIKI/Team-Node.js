import pool from "../db";

export const getNotice = (req, res)=>{
    res.render('notice.html');
}

export const writeNotice = (req, res)=>{
    res.render('writeForm.html');
}


export const postNotice = async(req,res)=>{
    const {title, description, username} = req.body;
    const conn = await pool.getConnection(async conn => conn);
    const seq = Math.floor(Math.random() * (1000-1)+1);

    const sql = `INSERT INTO Notice VALUES (${seq}, '${title}','${description}', '${username}')`

    const result = await conn.query(sql);
    
    if (result){
        const message = {
            ok: 'ok',
            title,
            description,
            username,
        }
        res.send(JSON.stringify(message));
    }
}