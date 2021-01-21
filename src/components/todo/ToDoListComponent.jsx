import React, { Component } from 'react'
import TodoService from '../../API/todo/TodoService'
import AuthenticationService from './AuthenticationService'
import Moment from 'moment'

class ToDoListComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            username : "",
            DeleteMessage : null,
            todos : [
                        // {id : 1, description: "Learn React", done: false, targetDate: new Date() },
                        // {id : 2, description: "Create backend code", done: false, targetDate: new Date() },
                        // {id : 3, description: "Link the two", done: false, targetDate: new Date() },
                        // {id : 4, description: "Deploy", done: false, targetDate: new Date() }
            ]
        }
    }

    componentDidMount()
    {
        this.refreshTodos()
    }


    handleTodoResponseSuccess = (response, user) =>{

        console.log(response)
        this.setState( 
            () => {
                return {
                    username: user,
                    todos : response.data}
            })
    }

    deleteButtonClick = (id) => {
        // console.log("Delete button clicked. Id is: "+id)
        // console.log("Id is: "+id)
        // console.log("Username is : "+ this.state.username)

        TodoService.deleteTodoById(this.state.username, id)
        .then( response => {
                this.setState({DeleteMessage : `Deleted todo with id of ${id}`})
                this.refreshTodos();
            }
        )
}

    UpdateButtonClick = (id) => {
    // console.log("Delete button clicked. Id is: "+id)
    // console.log("Id is: "+id)
    // console.log("Username is : "+ this.state.username)

    this.props.history.push(`/todos/${id}`)
}
    refreshTodos = () =>{

        let username = AuthenticationService.getUsername()
        if(username!==null)
        {
            TodoService.getAllTodos(username)
            .then(response => this.handleTodoResponseSuccess(response, username))
        }

    }

    addButtonClick = () =>{
        this.props.history.push("/todos/-1")
    }


    render(){
        return <div>
                    <h1>Tasks to Do</h1>
                    {this.state.DeleteMessage && <div className="alert alert-success">{this.state.DeleteMessage}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Completed?</th>
                                    <th>Target Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(todoItem => 
                                        <tr key={todoItem.id}>
                                            <td>
                                                {todoItem.description}
                                            </td>
                                            <td>
                                                {todoItem.completed.toString()}
                                            </td>
                                            <td>
                                                {Moment(todoItem.date).format('YYYY-MM-DD')}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => this.deleteButtonClick(todoItem.id)}>Delete</button>
                                                &nbsp;
                                                <button className="btn btn-warning" onClick={() => this.UpdateButtonClick(todoItem.id)}>Update</button>
                                            </td>
                                        </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn btn-success" onClick={this.addButtonClick}>Add</button>
                        </div>
                    </div>
                </div>
    }
}

export default ToDoListComponent