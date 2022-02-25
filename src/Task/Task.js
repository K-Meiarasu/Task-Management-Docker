import React from 'react';
import axios from 'axios';

const Task = () => {

    const [db, setdb]=React.useState('')
    const task=JSON.stringify({
        "taskId":"12211",
        "taskHolderName":"Gowthaman M",
        "taskDate":"4/15/2021",
        "taskName":"Spring Projects",
        "taskStatus":"In Progress"
    }, null, 2)

    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/home',
          }).then((response)=>{
             setdb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])

    function saveTask(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/savetask',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                "taskId":"12211",
                "taskHolderName":"Gowthaman M",
                "taskDate":"4/15/2021",
                "taskName":"Spring Projects",
                "taskStatus":"In Progress"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function changeStatus(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/changestatus',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                "taskId":"12211",
                "taskHolderName":"Gowthaman M",
                "taskDate":"4/15/2021",
                "taskName":"Spring Projects",
                "taskStatus":"Pending"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function deleteTask(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/deletetask?id=12211',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getTask(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/gettask?id=12211',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getTaskByHolderName(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/getTask?taskHolderName=Gowthaman',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    return (
        <div>
            <div className="body"><br/>
                <pre>{db}</pre><br/>
                <div id='box'>
                    <h2>Save a New Task</h2>
                    <p>POST - /savetask</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{task}</pre>
                    <button onClick={()=>{saveTask()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Change a task status</h2>
                    <p>POST - /changestatus</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <button onClick={()=>{changeStatus()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Delete a Task</h2>
                    <p>GET - /deletetask?id=12211</p>
                    <button onClick={()=>{deleteTask()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get All Tasks</h2>
                    <p>GET - /gettask</p>
                    <button onClick={()=>{getTask()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get Task By HolderName</h2>
                    <p>GET - /getTask?taskHolderName=Gowthaman</p>
                    <button onClick={()=>{getTaskByHolderName()}}>Send</button>
                </div><br/>
            </div>
        </div>
    )
}

export default Task;