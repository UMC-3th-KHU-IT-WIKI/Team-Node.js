import express from "express";
require("dotenv").config()
const PORT = process.env.PORT;
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
const homeRoutes = require('./routes/home')
const boardRoutes = require('./routes/board');
const userRoutes = require('./routes/users');
app.use('/', homeRoutes);
app.use('/boards', boardRoutes);
app.use('/users', userRoutes);


app.get('/', (req,res)=> {
    res.render('home')
})


app.listen(PORT, () => {
    console.log(`SERVING ON THE ${PORT}`);
})

