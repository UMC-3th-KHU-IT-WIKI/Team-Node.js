const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 3000;
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//아래는 mysql database에 연결
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mwqt1998l!1",
  database: "umcassign",
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected");
    //처음에 database를 생성할 때 필요한 코드
    // connection.query("CREATE DATABASE simpletable", function (err, result) {
    //   if (err) {
    //     throw err;
    //   } else {
    //     console.log("Table created");
    //   }
    // });
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/board", (req, res) => {
  const sql = "select * from simpletable";
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.render("userinfo", { users: result });
  });
});

app.post("/board", (req, res) => {
  const sql = "INSERT INTO simpletable SET ?";
  connection.query(sql, req.body, (err, result, fields) => {
    console.log(req.body);
    if (err) throw err;
    console.log(result);
    res.redirect("/board");
  });
});

app.get("/edit/:id", (req, res) => {
  const sql = "select * from simpletable where name = ?";
  connection.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    res.render("update", { users: result });
  });
});

app.post("/update/:id", (req, res) => {
  const { name, content } = req.body;
  console.log(name);
  console.log(content);
  const sql = "update simpletable set ? where name =" + `'${req.params.id}'`;
  connection.query(sql, req.body, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/board");
  });
});

app.get("/delete/:id", (req, res) => {
  console.log(req.params.id);
  const sql = "DELETE FROM simpletable WHERE name =?";

  connection.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    res.redirect("/board");
  });
});

//아래는 서버에 연결되었는지 확인
const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port} !!`);
});
