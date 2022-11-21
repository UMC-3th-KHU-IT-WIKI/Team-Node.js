import express from "express"
import { getJoin, home } from "./rootController";

const rootRoute = express.Router();

rootRoute.get('/', home);
rootRoute.get('/sign-up',getJoin);


export default rootRoute;