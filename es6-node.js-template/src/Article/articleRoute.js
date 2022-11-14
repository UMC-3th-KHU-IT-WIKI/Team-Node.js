import express from "express"
import { getArticle, getArticleList, getNewArticle, getUpdateArticle, postNewArticle, updateArticle } from "./articleController";

const articleRouter = express.Router();

articleRouter.route('/new-article').get(getNewArticle).post(postNewArticle);
articleRouter.get('/',getArticleList);
articleRouter.get('/:id([0-9]{1,6}$)', getArticle);
articleRouter.patch('/renewal',updateArticle);


export default articleRouter;