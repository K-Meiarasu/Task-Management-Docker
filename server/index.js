const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize');
const port = process.env.PORT || 3001;

const connection = new Sequelize("mydb","sgroot","4U$uY9DjE79n1rQH", {
    dialect: "mysql",
    host: "SG-mydb-5759-mysql-master.servers.mongodirector.com",
});

const Table = connection.define('task', {
    taskId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    taskHolderName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    taskDate: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    taskName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    taskStatus: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

connection.sync({force:true}).then((result) => {
    console.log("Table Created..")
}).then(table => {
    console.log(table)
}).catch((err) => {
    console.log(err);
});

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(port,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    return Table.findAll().then(result => {
        res.json(result)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
}

app.post('/savetask',(req,res)=>{
    return Table.create({
        taskId:req.body.taskId,
        taskHolderName:req.body.taskHolderName,
        taskDate:req.body.taskDate,
        taskName:req.body.taskName,
        taskStatus:req.body.taskStatus
    }).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.post('/changestatus',(req,res)=>{
    return Table.update({
        taskStatus:req.body.taskStatus
    },{where:{taskId:"12211"}}).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/deletetask',(req,res)=>{
    return Table.destroy({where:{taskId:"12211"}}).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/gettask',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        return Table.findOne("12211").then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    else
    {
        return Table.findAll().then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    
})