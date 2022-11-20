require("dotenv").config();
import express from "express";
import session from "express-session";
import ejs from "ejs";
import cors from "cors";
import rootRouter from "./routers/rootRouter";
import userRouter from "./User/userRouter";
import storeRouter from "./Store/storeRouter";
import orderRouter from "./Order/orderRouter";


const PORT = process.env.PORT || 4000;

const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/src/views');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

/*
app.use(session({		//router 이전에 작성
    secret : process.env.COOKIE_SECRET,
    resave : false,
    saveUnitialized : false, //login한 user만 db에 저장하도록 false로 설정
    cookie : { maxAge : 20000 }, //ms 단위로 cookie가 만료되는 기간 설정
}));

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next(); 
}

app.use(localsMiddleware);
*/
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/stores", storeRouter);
app.use("/orders", orderRouter);

const handleListening = 
()=> console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);