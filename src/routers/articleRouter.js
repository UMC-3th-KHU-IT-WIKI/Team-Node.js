import express from "express"
import { getArticles, getNewArticle, postNewArticle, showUpdateForm, updateArticle } from "../controllers/articleController";

const articleRouter = express.Router();

articleRouter.route('/newarticle').get(getNewArticle).post(postNewArticle);
articleRouter.route('/').get(getArticles).patch(updateArticle);

export default articleRouter;