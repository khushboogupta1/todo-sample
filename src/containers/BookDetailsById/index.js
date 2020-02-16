import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { withRouter } from "react-router-dom";

const BookDetailsById = ({ match }) => {
  console.log(match);
  const bookId = match.params.id;
  const [book, setBook] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const url = `${BASE_URL}/books/${bookId}`;
      const rspBook = await axios.get(url);
      console.log("Book", rspBook);
      setBook(rspBook.data);
    }
    fetchData();
  }, [bookId]);

  return (
    <div>
      BookdetailsID
      <h3>ID </h3>
      <div>{(book && book.name) || "NA"}</div>
    </div>
  );
};

export default withRouter(BookDetailsById);

// componentDidMount
// =>
// useEffect
// this.setState({ book: ... })