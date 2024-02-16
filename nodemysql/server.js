const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const mysql = require('mysql');
const app = express();

// establish the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbsmschool'
});

db.connect(function (error) {
    if (error) {
        console.log('error connecting to db');
    } else {
        console.log('successfully connected to db');
    }
});

// Create an HTTP server using Express
const server = app.listen(8080, function (error) {
    if (error) {
        console.log('error ....');
    } else {
        console.log('Server started on port 8080.');
    }
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors());

// create the records (Fixed syntax error in this route)
app.post("/api/student/add", (req, res) => {
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Student creation failed" });
        } else {
            res.send({ status: true, message: "Student created successfully" });
        }
    });
});

// Update a record (Fixed syntax error in this route)
app.put("/api/student/update/:id", (req, res) => {
    let sql =
        "UPDATE student SET stname = ?, course = ?, fee = ? WHERE id = ?";
    
    let query = db.query(sql, [req.body.stname, req.body.course, req.body.fee, req.params.id], (error, result) => {
        if (error) {
            res.send({ status: false, message: "Student update failed" });
        } else {
            if (result.affectedRows > 0) {
                res.send({ status: true, message: "Student updated successfully" });
            } else {
                res.send({ status: false, message: "Student not found" });
            }
        }
    });
});

// delete the records (Fixed syntax error in this route)
app.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [req.params.id], (error) => {
        if (error) {
            res.send({ status: false, message: "Student deletion failed" });
        } else {
            res.send({ status: true, message: "Student successfully deleted" });
        }
    });
});

// view the records 
app.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error connecting to db");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// search the records 
app.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id = " + studentid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error connecting to db");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
