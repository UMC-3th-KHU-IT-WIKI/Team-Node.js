require("dotenv").config();
import express from "express";
import ejs from "ejs";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import storeRouter from "./routers/storeRouter";
import orderRouter from "./routers/orderRouter";


const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd(), '/src/views');

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/stores", storeRouter);
app.use("/orders", orderRouter);

const handleListening = 
()=> console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);