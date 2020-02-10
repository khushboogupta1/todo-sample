import React from "react";
import { useParams } from 'react-router-dom';


class BookDetails extends React.Component{

    render() {
      return (
        <>
          <div className="tasksContainer">
            {this.props.activeBookTasks.map(task => {
            return <div className="task" key={task.id}>{task.name}  </div>;
            })}
          </div>
  
          <input
            type="text"
            value={this.props.inputText}
            onChange={event => this.props.handleInputChange(event)}
            className="inputStyle"></input>
  
          <button onClick={this.props.submitBookTask}>Submit</button>
        </>
      );
    
    }
    
}

export default BookDetails;
