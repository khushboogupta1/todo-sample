import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CREATBOOK_URL } from '../../constants';
import { useHistory } from 'react-router-dom';

const CreatNewBook = () => {
    const [bookName , setBookName] = useState("");
    const history = useHistory();
    // useEffect(() => {
    //     async function createBook() {  
    //         const data =  { 'bookName' : bookName }
    //         await axios.post({ CREATBOOK_URL}, qs.stringify(data));
    //     }
    //     createBook();
    // },[bookName]);

    const submitBookName = async() => {
        //console.log('bookName: ',CREATBOOK_URL);
        

        const response = await axios.post(  CREATBOOK_URL , { bookName : bookName } );
        if (response && response.status === 200) {
           history.push('/');
        } else {
            console.log('error');
        }
    }
    return(
        <div className="container"> 
          <h3> Create New Book </h3>   
            <input 
                type="text" 
                value={ bookName } 
                onChange = { event => setBookName(event.target.value) }
            ></input>

            <button onClick = { submitBookName }>
                Submit
            </button>
        </div>
    ); 
};

export default CreatNewBook;