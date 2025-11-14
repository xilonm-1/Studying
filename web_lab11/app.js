const express = require('express');
const path = require('path')
const mysql = require('mysql2')
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

app.get('/', (req, res) => {
    console.log("Request at " + req.url);
    res.sendFile(path.join(`${__dirname}/searchProf.html`))
})

app.post('/form-submit', (req, res) => {
    const empnum = req.body.empnum;
    console.log("Request at " + req.url);
    console.log("Form submitted with Emp Num:", empnum);

    const sql = `SELECT * FROM Professor WHERE emp_num = ?`;

    connection.query(sql, [empnum], (error, results) => {
        if (results.length === 0) {
            console.log(`${results.length} rows returned`);
            console.log('Not found')
            return res.sendFile(path.join(__dirname,'notfound.html'));
            
        }
        
        console.log(`${results.length} rows returned`);
        res.sendFile(path.join(__dirname,'found.html'));
        console.log('Found',empnum)
    });
})


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})