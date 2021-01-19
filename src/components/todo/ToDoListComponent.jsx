import React, { Component } from 'react'

class ToDoListComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            todos : [
                        {id : 1, description: "Learn React", done: false, targetDate: new Date() },
                        {id : 2, description: "Create backend code", done: false, targetDate: new Date() },
                        {id : 3, description: "Link the two", done: false, targetDate: new Date() },
                        {id : 4, description: "Deploy", done: false, targetDate: new Date() }
            ]
        }
    }
    render(){
        return <div>
                    <h1>Tasks to Do</h1>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Completed?</th>
                                    <th>Target Date</th>
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
                                                {todoItem.done.toString()}
                                            </td>
                                            <td>
                                                {todoItem.targetDate.toString()}
                                            </td>
                                        </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
    }
}

export default ToDoListComponent