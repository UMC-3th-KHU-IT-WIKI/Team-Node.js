export const  selectArticles = async (connection) =>{
    const selectArticlesQuery = `SELECT id, title, description, owner from Article;`;
    const [result] = await connection.query(selectArticlesQuery);
    return result;
}

export const insertArticle = async(connection, sqlParams) =>{
    console.log("hihi");
    const insertArticleQuery = `INSERT INTO Article VALUES(?, ?, ?, ?);`;
    const result = await connection.query(insertArticleQuery, sqlParams);
    return result;
}

export const selectArticle = async (connection,id)=>{
    const selectArticleQuery = `SELECT title, description from Article where id= ${id}`;
    const [[result]] = await connection.query(selectArticleQuery);
    return result;
}