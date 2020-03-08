import React, { useEffect, useState } from "react";
import axios from "axios";
import { BOOKBYID_URL,BOOKTASKS_URL } from "../../constants";
import { withRouter } from "react-router-dom";

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
  useEffect(() => {
    fetchData();
  }, [bookId]);

  return (
    <div className="container">
      BookdetailsID
      <h3>ID </h3>
      <div>{(book && book.name) || "NA"}</div>
      <div>
        { tasks.map(t => {
            <div> {t.id} </div>
          })
        }
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