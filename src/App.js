import React from 'react';
import './App.css';

const BOOKS = [
    { id: 0, name: 'Book1' },
    { id:1, name: 'Book2'},
    { id:2, name: 'Book3'},
    { id:3, name: 'Book4'},
];

class Books extends React.Component {
    constructor() {
        super();
        this.state = {
            books: BOOKS,
            activeBookId: 0,
        }
    }

    render() {
        const { books, activeBookId } = this.state;
        return (
            <div className="container">
                <div>Books</div>
                <div className="bookContainer">
                    {books.map(book => <div key={book.id} className={`book ${activeBookId === book.id ? 'active' : ''}`}>
                        <div>{book.name}</div>
                        <button>Click</button>
                    </div>)}
                </div>

            </div>
        );
    }
}

export default Books;
