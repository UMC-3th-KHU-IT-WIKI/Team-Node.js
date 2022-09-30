import express from "express"

const app = express();
app.set('view engine','html');
app.set('views','./static');
app.use(express.static('static'));

app.get('/',(req,res) => res.render('index.html'));


app.listen(3000,() => console.log("server is on 3000"));