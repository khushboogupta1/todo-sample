import React from 'react';
import './App.css';

const BOOKS = [
    { id: 0, name: 'Book1' },
    { id:1, name: 'Book2'},
    { id:2, name: 'Book3'},
    { id:3, name: 'Book4'},
];

const TASKS = [
    {id: 0,  name: 'Task 1', belongsToBook: 0},
    {id: 1,  name: 'Task 2', belongsToBook: 1},
    {id: 2,  name: 'Task 3', belongsToBook: 1},
    {id: 3,  name: 'Task 4', belongsToBook: 0},
    {id: 4,  name: 'Task 5', belongsToBook: 2},
];

class Books extends React.Component {
    constructor() {
        super();
        this.state = {
            books: BOOKS,
            tasks: TASKS,
            activeBookId: 0,
        }
    }

    setActiveBook = (bookId) => {
        this.setState({ activeBookId : bookId });
    }

    get activeBookTasks() {
        const { tasks, activeBookId } = this.state;
        return tasks.filter(task => task.belongsToBook === activeBookId);
    }

    render() {
        const { books, activeBookId } = this.state;
        return (
            <div className="container">
                <div>Books</div>
                <div className="booksContainer">
                    {books.map(book => <div key={book.id} className={`book ${activeBookId === book.id ? 'active' : ''}`}>
                        <div>{book.name}</div>
                        <button onClick = {() => this.setActiveBook(book.id)}>Click</button>
                    </div>)}
                </div>
                <div className="tasksContainer">
                    {this.activeBookTasks.map(task => {
                        return (
                            <div className="task">
                                {task.name}
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default Books;
