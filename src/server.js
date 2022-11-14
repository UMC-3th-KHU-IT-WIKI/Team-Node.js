require("dotenv").config()
import express from "express"
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import ejs from "ejs";
import articleRouter from "./routers/articleRouter";


const app = express();

const PORT = process.env.PORT;

app.engine('html',ejs.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/src/views');
app.use(express.urlencoded({extended:true}));
app.use('/assets',express.static('assets'));
app.use(express.json());


app.use('/',rootRouter);
app.use('/users',userRouter);
app.use('/articles',articleRouter);

app.listen(PORT, () => console.log(`server is on http://127.0.0.1:${PORT}🚀`));