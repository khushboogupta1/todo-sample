import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        inputText: '',
        list : [],
        doneTasks : [],
        notDoneTasks : []
      };
    }

    handleInputChange = (event) => {
      const { value } = event.target;
      this.setState({inputText : value});

    }

    submitTodo = () => {
      const {inputText, list} = this.state;
      const cloneList = JSON.parse(JSON.stringify(list));
      console.log(cloneList);
      const todoObj = {
        id: cloneList.length + 1,
        name: inputText,
        isActive: true
      };
      cloneList.push(todoObj);
      this.setState({list: cloneList, inputText: ''});
      console.log(this.state.list);
    }

    deleteTask = (taskId) => {
      console.log('task id', taskId);
      const { list} = this.state;
      const cloneList = JSON.parse(JSON.stringify(list));
      //const taskToBeInactive = cloneList.find(task => task.id === taskId);
      cloneList.map(task=> {
        if(task.id === taskId){
          task.isActive = false;
        }
      });
      console.log(cloneList);

      //const filteredList  = cloneList.filter(task=> task.id !== taskId);
      //console.log(filteredList);
      this.setState({list: cloneList});

      const filtered_doneTasks = cloneList.filter(task => task.isActive === true);
      this.setState({ doneTasks: filtered_doneTasks});

      const filtered_notDoneTasks = cloneList.filter(task => task.isActive === false);
      this.setState({ notDoneTasks: filtered_notDoneTasks});

    }

    fetchDoneTasks = () => {
      const { list } = this.state;
      const cloneList  = JSON.parse(JSON.stringify(list));
      //console.log('DONE :', cloneList);
      const filtered_doneTasks = cloneList.filter(task => task.isActive === true);

      //$('#allTasks').css('display','none');
      this.setState({ doneTasks: filtered_doneTasks});
    }

    fetchNotDoneTasks = () => {
      const { list } = this.state;
      const  cloneList  = JSON.parse(JSON.stringify(list));
      const filtered_notDoneTasks = cloneList.filter(task => task.isActive === false);

      //$('#allTasks').css('display','none');
      this.setState({ notDoneTasks: filtered_notDoneTasks});
    }


    undoTask = (taskId) => {
      const { list, doneTasks, notDoneTasks } = this.state;
      const cloneList = JSON.parse(JSON.stringify(list));
      
      cloneList.map(task=> {
        if(task.id === taskId){
          task.isActive = true;
        }
      });

      const filtered_doneTasks = cloneList.filter(task => task.isActive === true);
      const filtered_notDoneTasks = cloneList.filter(task => task.isActive === false);

      this.setState({
          list : cloneList,
          doneTasks : filtered_doneTasks,
          notDoneTasks : filtered_notDoneTasks
      });

    }


    render(){
      const todoDiv = {
        background : '#f5f5f5',
        color : '#4d4d4d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      };
      const heading = {
        textAlign: 'center'
      };
      const inputStyle= {
        margin: 10,
        padding : 10,
      };
      const listDisplay = {
        margin: 10,
        border: '1px solid #fff'
      };

      return <div style={todoDiv}>
        <div> 
          <header style={heading}> TODO </header> 

          <input 
            type="text" 
            value={this.state.inputText} 
            onChange={(event) => this.handleInputChange(event)}
            style={inputStyle}
          ></input>

          <button 
            onClick = { this.submitTodo }
          >
            Submit
          </button>

          <div> 
            <button onClick={ this.fetchDoneTasks } > DONE </button>
            <button onClick={ this.fetchNotDoneTasks } > NOT DONE </button>
          </div>

          <div style={listDisplay}> { this.state.list.map(task => { 
              return( <div key={task.id}> {task.id} - {task.name} 
                { task.isActive ? 
                  <button onClick={() => this.deleteTask(task.id)}> Delete </button>
                :null}
                
               </div> )
              }) 
            } 
          </div>

          <div style={listDisplay}> 
            { this.state.doneTasks && this.state.doneTasks.length > 0 ? 
                this.state.doneTasks.map(doneTask => {
                return (
                  <div key={ doneTask.id }> { doneTask.id } - { doneTask.name }
                    
                  </div>
                )
              }) : null 
            } 
          </div>

          <div style={listDisplay}> 
            { this.state.notDoneTasks && this.state.notDoneTasks.length > 0 ? 
                this.state.notDoneTasks.map(notDoneTask => {
                return (
                  <div key={ notDoneTask.id }> { notDoneTask.id } - { notDoneTask.name }
                  <button onClick={() => this.undoTask(notDoneTask.id)}> UNDO </button>
                  </div>
                )
              }) : null 
            } 
          </div>

        </div>
      </div>
    }
}

export default App;

