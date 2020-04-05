import React, { useEffect, useState } from "react";
import axios from "axios";
import { BOOKBYID_URL,BOOKTASKS_URL,DELETETASK_URL } from "../../constants";
import { withRouter,Link } from "react-router-dom";
import { Card, Col, Row } from 'antd';


const BookDetailsById = ({ match }) => {
  console.log(match);
  const bookId = match.params.id;
  
  const [book, setBook] = useState(null);
  const [tasks, setTasks] = useState([]);
  
    async function fetchData() {
      const url = `${BOOKBYID_URL}/${bookId}`;
      const rspBook = await axios.get(url);
      setBook(rspBook.data[0]);

      const taskUrl = `${BOOKTASKS_URL}/${bookId}`;
      const bookTasks = await axios.get(taskUrl);
      console.log("API tasks",bookTasks);
      const apiTasks =  bookTasks.data;
      console.log("var api tasks",apiTasks);
      setTasks(apiTasks);
    }
    //fetchData();
  useEffect(() => {
    fetchData();
  }, [bookId]);


  const deleteTask = async(taskId) => {
      const taskUrl = `${DELETETASK_URL}/${taskId}/${bookId}`;
      //console.log('delete task url:',taskUrl);
      const taskRes = await axios.put(taskUrl);
      console.log('Task response: ',taskRes);
      if(taskRes && taskRes.status === 200){
          setTasks(taskRes.data);
      }
  }


  return (
     
    <div className="container">
      Book detail 
      <div> 
        <h3>
          {(book && book.name) || "NA"}   
        </h3>
        <Link to = { `/create-task/${bookId}` } > Create New task </Link>
      </div>
      
      <div style={{ background: '#ececec', padding: '30px' }}>
        <Row gutter={32}>
          { tasks.map(task => {
              return (
                <Col span={8} key={task.id}>
                  <Card title={task.taskName} bordered={true}>
                    <button onClick = {() => deleteTask(task.id)}> Delete </button>
                  </Card>
                </Col>
                
              )
            })
          }
        </Row>
      </div>
    </div>
  );
};

export default withRouter(BookDetailsById);

// componentDidMount
// =>
// useEffect
// this.setState({ book: ... })


{/* <div> { tasks.map(tasks => { 
    <div key={tasks.id}> {tasks.id} - {tasks.taskName} 
      
      </div> 
    }) 
  } 
</div> */}