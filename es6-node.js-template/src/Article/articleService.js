import pool from "../../config/database"
import {selectUserByNickname } from "../User/userDao"
import { insertArticle, selectArticles } from "./articleDao";


export const createArticle = async(title, description, author)=>{
    let connection = await pool.getConnection(async conn => conn);
    const authorId = await selectUserByNickname(connection, author);

    connection.release();
    const articleId = Math.floor(Math.random() * 10000 - 1) + 1;
    const createArticleParams = [articleId,title,description,authorId];

    connection = await pool.getConnection(async conn => conn);
    const createArticleResult = await insertArticle(connection,createArticleParams);
    return createArticleResult;
}

export const retrieveArticleList = async() =>{

    const connection = await pool.getConnection(async conn => conn);
    const result = await selectArticles(connection);
    return result;
}