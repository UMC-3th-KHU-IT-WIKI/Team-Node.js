require("dotenv").config();
import express from "express"
import rootRouter from "./routers/rootRouter";
import ejs from "ejs"
import noticeRouter from "./routers/noticeRouter";
import userRouter from "./routers/userRouter";

const app = express();

const PORT = process.env.PORT;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/src/views');
app.use(express.urlencoded({extended: true}));



app.use('/', rootRouter);
app.use('/notice', noticeRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is on http://127.0.0.1:${PORT}`)
});