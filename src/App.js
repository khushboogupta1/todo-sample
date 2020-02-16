import React from "react";
import axios from "axios";
import { withRouter, Link } from 'react-router-dom';
import BookDetails from "./components/BookDetails";
import { BOOKS_URL, TASKS_URL } from "./constants";
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
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };      
      const rspBooks = await axios.get(BOOKS_URL, {crossdomain: true} );
      //rspBooks.default.headers.
      const books = rspBooks.data;
      const rspTasks = await axios.get(TASKS_URL, {crossdomain: true});
      const tasks = rspTasks.data;
      this.setState({ books, tasks });
    } catch (err) {
      console.log(err);
    }
  };

  setActiveBook = bookId => {
    this.setState({ activeBookId: bookId });
    this.props.history.push(`book-details/${bookId}`);
  };

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
    return (
      <div className="container">
        <div>Books</div>
        <div className="booksContainer">
          {books.map(book => (
            <div key={book.id} className={`book ${activeBookId === book.id ? "active" : ""}`}>
              <div>{book.name}</div>
              <button onClick={() => this.setActiveBook(book.id)}>Click</button>

              {/* <Link to = {{
                  pathname : "/BookDetails",
                  state : {bookId : book.id} 
              }} > Goto Book </Link>  */}
              <Link to = { `/book-details/${book.id}` } > Goto Book </Link> 
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
