import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsById = () => {
    let { id } = useParams();
    return (
        <div>BookdetailsID
         <h3>ID: { id } </h3>  </div>
    );
}

export default BookDetailsById;