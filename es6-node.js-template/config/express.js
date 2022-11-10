import express from "express"
import compression from "compression"
import methodOverride from "method-override"
import cors from "cors"
import userRouter from "../src/User/userRoute";
import rootRouter from "../src/Root/rootRoute";
import pug from "pug"

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());
app.set("view engine","pug")
app.set("views",process.cwd() + '/src/views');

app.use('/', rootRouter);
app.use('/users', userRouter);

export default app;