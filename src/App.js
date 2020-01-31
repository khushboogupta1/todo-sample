import React from "react";
import axios from "axios";
import { withRouter, Route, Redirect, Link } from "react-router-dom";
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
      const rspBooks = await axios.get(BOOKS_URL);
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
              {/* this is wrong, Route is not used inside components, 
              inside component we just use methods for routing - like push, pop, goBack etc 
              or we can use Link to go to some route.
              */}
              <Link
                to={{
                  pathname: "/book-details",
                  state: { bookId: book.id }
                }}
              >Goto Book</Link>
              {/* <Route path="/book-details/:id" exact render= { ({match}) => (
                  <BookDetails
                    activeBookTasks={this.activeBookTasks}
                    inputText={this.state.inputText}
                    handleInputChange={this.handleInputChange}
                    submitBookTask={this.submitBookTask}
                    id = {match.params.id}
                  />
              )}/> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
