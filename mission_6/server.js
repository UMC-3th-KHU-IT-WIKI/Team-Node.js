import express from "express"
import mysql from "mysql2/promise"
const app = express();

const PORT = 3000; 

app.engine('html', require('ejs').renderFile); //이렇게 해줘야 html을 랜더링 할 수 있다. 참고로 이거 쓰려면 mpm i ejs해줘야함
app.set("view engine", "html"); 
app.set("views",process.cwd() + "/views");

app.use(express.urlencoded({extended:true}));

const configuration = {
    host: 'localhost',
    user: 'root',
    password: '58859476',
    database: 'mission6'
};

let pool = mysql.createPool(configuration);

app.get('/',(req,res) => res.render("home.html") );

app.get('/form', (req,res)=> res.render("form.html"));
app.post('/form',)



app.route('/form').get((req,res)=>res.render("form.html")).post(async(req,res)=>{
const {name,password,description} =req.body;
const query = `insert into mytable values(${4},'${name}','${password}','${description}');`;

const conn = await pool.getConnection(async(conn)=>conn);

const result = await conn.query(query);

conn.release();
if(result){
    const query = `select * from mytable where id = ${4}`;
    const conn = await pool.getConnection(async(conn) => conn);

    const [result] = await conn.query(query);

    res.send(JSON.stringify(result));
    conn.release();
}

});

app.route('/update').get((req,res)=>res.render("form.html")).post(async(req,res)=>{
    const {name,password,description} =req.body;
    const query = `UPDATE mytable set password='${password}', name='${name}',description='${description}' WHERE id=${4};`;
    
    const conn = await pool.getConnection(async(conn)=>conn);
    
    const result = await conn.query(query);
    
    conn.release();
    if(result){
        const query = `select * from mytable where id = ${4}`;
        const conn = await pool.getConnection(async(conn) => conn);
    
        const [result] = await conn.query(query);
    
        res.send(JSON.stringify(result));
        conn.release();
    }
    
    });

    app.route('/delete').get((req,res)=>res.render("form.html")).post(async(req,res)=>{
        const {name,password,description} =req.body;
        const query = `DELETE FROM mytable WHERE name='${name}'and password='${password}'and description='${description}';`;
        
        const conn = await pool.getConnection(async(conn)=>conn);
        
        const result = await conn.query(query);
        
        conn.release();
        if(result){
            const query = `select * from mytable where id = name='${name}'and password='${password}'and description='${description}';`;
            const conn = await pool.getConnection(async(conn) => conn);
        
            const [result] = await conn.query(query);
        
            res.send(JSON.stringify(result));
            conn.release();
        }
        
        });

app.listen(PORT, () => console.log(`server is on http://localhost:${PORT}`));

