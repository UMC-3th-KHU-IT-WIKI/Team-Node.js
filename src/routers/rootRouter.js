import express from "express"
import {getJoin, home, postJoin} from "../controllers/rootControllers"

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);

export default rootRouter;