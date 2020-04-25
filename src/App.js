import React from "react";
import axios from "axios";
import { withRouter, Link } from 'react-router-dom';
import BookDetails from "./components/BookDetails";
import { BOOKS_URL, TASKS_URL, DELETEBOOK_URL } from "./constants";
//import { Card, Col, Row, Button } from 'antd';
import {
  Box,
  Button,
  Heading,
  Text
} from '@primer/components'
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      books: [],
      tasks: [],
      activeBookId: "1"
    };
  }

  componentDidMount = async () => {
    try {
      const rspBooks = await axios.get(BOOKS_URL );
      const books = rspBooks.data;
      const rspTasks = await axios.get(TASKS_URL);
      const tasks = rspTasks.data;
      this.setState({ books, tasks });
    } catch (err) {
      console.log(err);
    }
  };

  setActiveBook = bookId => {
    this.setState({ activeBookId: bookId });
    //this.props.history.push(`book-details/${bookId}`);
  };


  deleteBook = async (bookId) => {       
    const url = `${DELETEBOOK_URL}/${bookId}`;
    const response = await axios.put(url);
    console.log('after delete books',response);
    if(response && response.status === 200){
      this.setState({ books:response.data });
    }
  }


  get activeBookTasks() {
    const { tasks, activeBookId } = this.state;
    return tasks.filter(task => task.belongsTo === activeBookId);
  }

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ inputText: value });
  };

  submitBookTask = () => {
    const { inputText, tasks, activeBookId } = this.state;
    const tasksClone = JSON.parse(JSON.stringify(tasks));
    const taskObj = {
      id: tasksClone.length + 1,
      name: inputText,
      belongsTo: activeBookId
    };
    tasksClone.push(taskObj);
    this.setState({ tasks: tasksClone, inputText: "" });
    console.log("tasks:", this.state.tasks);
  };

  render() {
    console.log(this.props);
    const { books, activeBookId } = this.state;
    //const site_card_wrapper = { background: '#ececec', padding: '30px' };
    return (
      <div className="container">
        <div>Books</div>
        <div> 
          <Button type="link"> 
            <Link to = { '/create-book/' } > Create New Book </Link> 
          </Button>
        </div> 
        
        {/* <Row style={{ minHeight: "100%",lineHeight:"100%",columnCount:"4" }}> className="gutter-row" */}
            <div>
                <div> 
                  { books.map(book => {
                    return(
                      <div key={book.id} className={`book ${activeBookId === book.id ? "active" : "" }`}>
                          <div > 
                    <Heading>{book.name}</Heading>
                            <Button type="primary" onClick={() => this.setActiveBook(book.id)}> 
                              Active 
                            </Button>
                            <Button type ="primary" onClick={() => this.deleteBook(book.id)}>
                                Delete 
                            </Button>
                            <Button type="link">
                              <Link to = { `/book-details/${book.id}` } > Goto Book </Link> 
                            </Button>
                            
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            
      </div>
    );
  }
}

export default withRouter(App);
