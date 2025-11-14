const express = require('express');
const path = require('path')
const mysql = require('mysql2')
const dotenv = require("dotenv");
const app = express();

const router = express.Router();
app.use(router)

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

dotenv.config();

var dbConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

router.post('/student', function (req, res) {
    let student = req.body.student;
    console.log(student);
    if (!student) {
        return res.status(400).send({
            error: true, message: 'Please provide student information'
        });
    }
    dbConn.query("INSERT INTO personal_info SET ? ", student, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results.affectedRows, message: 'New student has been created successfully.'
        });
    });
});

router.put('/student', function (req, res) {
    let student_id = req.body.student.studentid;
    let student = req.body.student;
    if (!student_id || !student) {
        return res.status(400).send({
            error: student, message: 'Please provide student information' });
    }
    dbConn.query("UPDATE personal_info SET ? WHERE StudentID = ?", [student, student_id], function (error,results) {
        if (error) throw error;
        return res.send({
            error: false, data: results.affectedRows, message: 'Student has been updated successfully.'
        })
    });
});

router.delete('/student', function (req, res) {
    let student_id = req.body.student_id;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student_id' });
    }
    dbConn.query('DELETE FROM personal_info WHERE studentid = ?', [student_id], function (error, results) {
        if (error) throw error;
        return res.send({
            error: false, data: results.affectedRows, message: 'Student has been deleted successfully.' 
        });
    });
}); 

router.get('/student/:id', function (req, res) {
    let student_id = req.params.id;
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student id.' });
    }
    dbConn.query('SELECT * FROM personal_info where studentid =?', student_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Student retrieved' });
    });
});

router.get('/students', function (req, res) {
    dbConn.query('SELECT * FROM personal_info', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Student list.' });
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})