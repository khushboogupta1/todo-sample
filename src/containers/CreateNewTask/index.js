import axios from 'axios';
import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { CREATETASK_URL } from '../../constants';
import { Input } from 'antd';

const CreateNewTask = ({ match }) => { 
    const bookId = match.params.bookId; 
    const [taskName,setTaskName] = useState("");
    const history = useHistory();

    const submitTaskName = async() => {   
        const params = { taskName:taskName, bookId:bookId };
        const taskResp = await axios.post( CREATETASK_URL, params );
        //console.log("TAsk Resp",taskResp);
        if(taskResp && taskResp.status === 200){
            history.push(`/book-details/${bookId}`);
        }else{
            console.log('error');
        }
    }

    return(
        <div className="container"> 
            <h3> Create New Task </h3>
            <Input
                type="text"
                value={taskName}
                onChange = { event => setTaskName(event.target.value) }
            > 
            </Input>
            <button onClick = { submitTaskName }> Create Task</button>
        </div>
    );
};

export default withRouter(CreateNewTask);

