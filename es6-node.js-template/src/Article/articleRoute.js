import express from "express"
import { getArticle, getArticleList, getNewArticle, postNewArticle } from "./articleController";

const articleRouter = express.Router();

articleRouter.route('/new-article').get(getNewArticle).post(postNewArticle);
articleRouter.get('/',getArticleList);
articleRouter.get('/:id', getArticle);

export default articleRouter;