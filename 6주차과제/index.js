const express = require('express')
//const router = express.Router;
const bodyParser = require('body-parser');
const { json } = require('express'); //path
const mysql = require('mysql2');
const dbConn = require('./config/databse.js');
const conn = mysql.createConnection(dbConn);
//ejs를 이용하여 테이블에서 가져온 사용자 정보를 나열한다.
const ejs = require('ejs')


const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/board',(req,res) => {
    const sql = "select * from umc";
    conn.query(sql,(err,result,fields) => {
        if (err) throw err;
// user.ejs 에 render 해줄건데 , users 에 쿼리문 날리고난 results 를 담을거다 
        res.render('user',{users : result});
    })
})

app.post('/board', (req, res) => {
    const sql = "INSERT INTO umc SET ?"
    conn.query(sql,req.body,(err, result, fields) => {
    
      console.log(req.body);  
      if (err) throw err;
      console.log(result);
      //res.send();
      res.redirect('/board');
    })
  });
//수정
app.get('/edit/:id',(req,res)=>{
    const sql = "select * from umc where name = ?";
    conn.query(sql,[req.params.id],(err,result,fields) => {
        if (err) throw err;
        res.render('edit',{users : result});
    })
})

app.post('/update/:id',(req,res) => {
    const {name,content} = req.body;
    console.log(name);
    console.log(content);
    const sql = "update umc set ? where name =" + `'${req.params.id}'`;
    conn.query(sql,req.body,(err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/board');
        //res.send(req.body);
        
    });
});

//삭제
app.get('/delete/:id',(req,res) => {
    console.log(req.params.id);
    const sql = "DELETE FROM umc WHERE name =?";
    
    conn.query(sql,[req.params.id],(err,result,fields) => {
        if(err) throw err;
        res.redirect('/board');
    });
});


app.listen(3000, () => {
    console.log('실행중!');
});