import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import BookDetailsById from './containers/BookDetailsById';

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/book-details">
          <BookDetailsById />
        </Route>
      </Switch>
    </Router>
  );
};

export default Main;
