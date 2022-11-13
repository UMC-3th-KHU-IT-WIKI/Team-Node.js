import express from "express";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import userRouter from "../src/app/User/userRoute";
import boardRouter from "../src/app/board/boardRoute";

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cors());

app.use("/app/users", userRouter);
app.use("/app/boards", boardRouter);

export default app;
