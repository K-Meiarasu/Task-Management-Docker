const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const connection = mysql.createConnection({
    host: "SG-mydb-5759-mysql-master.servers.mongodirector.com",
    user: "sgroot",
    password: "4U$uY9DjE79n1rQH",
    database: "mydb",
    port: 3306
})
try
{
    var sql = "SHOW TABLES LIKE 'task'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE task (taskId VARCHAR(255), taskHolderName VARCHAR(255),  taskDate VARCHAR(255), taskName VARCHAR(255), taskStatus VARCHAR(255), PRIMARY KEY (taskId))";
            connection.query(sql, function (err, result) {
                console.log("Table created successfully");
            });
        }
        else{
            console.log("Table already exist !")
        }
    });
}
catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    var sql = "SELECT * from task"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue Raised"})
        }
        else
        {
           res.json(result)
        }
    });
}

app.get('/home',(req,res)=>{
    display(req,res)
})

app.post('/savetask',(req,res)=>{
    var sql = "INSERT INTO task (taskId, taskHolderName, taskDate, taskName, taskStatus) VALUES ("+"'"+ req.body.taskId+"'" +","+"'"+req.body.taskHolderName+"'"+", "+"'"+req.body.taskDate+"'"+", "+"'"+req.body.taskName+"'"+",  "+"'"+req.body.taskStatus+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log(err)
            res.json({response: "Database Issue Raised"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.post('/changestatus',(req,res)=>{
    var sql = "INSERT INTO task (taskId, taskHolderName, taskDate, taskName, taskStatus) VALUES ("+"'"+ req.body.taskId+"'" +","+"'"+req.body.taskHolderName+"'"+", "+"'"+req.body.taskDate+"'"+", "+"'"+req.body.taskName+"'"+",  "+"'"+req.body.taskStatus+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log(err)
            res.json({response: "Database Issue Raised"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/gettask',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from task WHERE taskHolderName='Gowthaman M'"
    }
    else
    {
        var sql = "SELECT * from task"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue Raised"})
        }
        else
        {
            res.json(result)
        }
        console.log(result)
    });
})

app.get('/deletetask',(req,res)=>{
    var sql = "DELETE FROM task"+" WHERE taskId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue Raised"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/gettask',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from task WHERE taskId=12211"
    }
    else
    {
        var sql = "SELECT * from task"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue Raised"})
        }
        else
        {
            res.json(result)
        }
        console.log(result)
    });
})
