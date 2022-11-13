import express from "express"
import { getNotice, postNotice, writeNotice } from "../controllers/noticeControllers"

const noticeRouter = express.Router();

noticeRouter.get('/', getNotice);
noticeRouter.route('/write').get(writeNotice).post(postNotice);


export default noticeRouter;