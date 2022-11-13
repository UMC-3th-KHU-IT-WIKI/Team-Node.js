require("dotenv").config();
const PORT = process.env.PORT;

const express = require('express');
const compression = require("compression");
const methodOverride = require("method-override");
const  cors  = require("cors");
const userRouter = require("./routes/userRoute");
const boardRouter = require("./routes/boardRoute");
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());



app.get('/', (req,res)=>{
    res.render('home')
})


app.use('/', userRouter);
app.use('/', boardRouter);




module.exports = app;


app.listen(PORT, () => {
    console.log(`SERVING ON THE ${PORT}`);
})