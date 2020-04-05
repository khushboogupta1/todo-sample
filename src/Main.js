import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import BookDetailsById from './containers/BookDetailsById';
import CreatNewBook from './containers/CreateNewBook';
import CreateNewTask from './containers/CreateNewTask';

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/book-details/:id" children={ <BookDetailsById /> } />
        <Route path="/create-book/" children={ <CreatNewBook /> }  />  
        <Route path="/create-task/:bookId" children={ <CreateNewTask/> } />     
        {/* </Route> */}
      </Switch>
    </Router>
  );
};

export default Main;
