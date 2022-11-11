export const  selectArticles = async (connection) =>{
    const selectArticlesQuery = `SELECT id, title, description, owner from Article;`;
    const [result] = await connection.query(selectArticlesQuery);
    return result;
}

export const insertArticle = async(connection, sqlParams) =>{
    const insertArticleQuery = `INSERT INTO Article VALUES(?, ?, ?, ?);`;
    const result = await connection.query(insertArticleQuery, sqlParams);
    return result;
}