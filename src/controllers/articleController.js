
import pool from "../db";

export const getNewArticle = (req,res)=>{
    res.render("article.html");
}

export const postNewArticle = async (req,res) =>{
    const {title, username, description} = req.body;
    const conn = await pool.getConnection(async conn => conn);
    const sequence = Math.floor(Math.random() * (1000 - 1) + 1);

    const getOwnerSql = `select id from user where username = '${username}';`;

    const [[{id}]] = await conn.query(getOwnerSql);
    console.log(id);
    const [[{id:ownerId}]] = await conn.query(getOwnerSql);

    const createArticleSql = `insert into article values(${sequence}, ${ownerId}, '${title}', '${description}');`;
    const [result] = await conn.query(createArticleSql);

    if (result){
        const resultSql = `select owner, title, description from article where owner=${ownerId};`;

        const [[message]] = await conn.query(resultSql);
        conn.release();
        res.send(JSON.stringify(message));
    }
    else{
        const failMessage = {
            status: 'fail',
            error : 'something is wrong'
        }
        conn.release();
        res.send(JSON.stringify(failMessage));
    }
}

export const updateArticle = async (req,res) =>{
    const {id, title, description} = req.body;

    const conn = await pool.getConnection(async conn => conn);

    const sql = `update article set title='${title}', description='${description}' where owner=${id}`;

    const result = await conn.query(sql);
    
    if (result)
    {
        conn.release();

        const message = {
            changed : {
                title,
                description
            }
        };

        res.send(JSON.stringify(message));
    }

}


export const getArticles = async (req,res) =>{
    const conn =  await pool.getConnection(async conn => conn);
    const sql = `
    select user.username, title, description
        from article
        inner join user
        on article.owner = user.id;`;
    const [result] = await conn.query(sql);
    if (result){
        conn.release();
        res.send(JSON.stringify(result));
    }else{
        const failMessage = {
            status : 'fail',
            error: 'something is wrong'
        }

        conn.release();
        res.send(JSON.stringify(failMessage));
    }
}