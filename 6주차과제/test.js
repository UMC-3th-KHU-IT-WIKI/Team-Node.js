const express    = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dbconfig = require('./config/databse.js')
const conn = mysql.createConnection(dbconfig);

const app = express();

// parse application/x-www-form-urlencoded
// { extended: true } : nested object를 지원한다.
// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users',(req,res) => {
	conn.query('SELECT * from employees', (error, rows) => {
		if (error) throw error;
		console.log('User info is: ', rows);
		res.send(rows);
	  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));