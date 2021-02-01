import React, {Component} from 'react'
import TodoService from '../../API/todo/TodoService'
import AuthenticationService from './AuthenticationService'
import './UpcomingTodoComponent.css'
import Moment from 'moment'

class UpcomingTodosComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: null,
            upcomingtodos : []
        }
    }

    componentDidMount(){
        this.getTodos()
      }

      getTodos = () =>{

        let username = AuthenticationService.getUsername()
        if(username!==null)
        {
            TodoService.getUpcomingTodos(username)
            .then(response => this.handleTodoResponseSuccess(response, username))
        }

    }

    handleTodoResponseSuccess = (response, user) =>{

        console.log(response)
        this.setState( 
            () => {
                return {
                    username: user,
                    upcomingtodos : response.data}
            })
    }

    render() {
        return (

            
            <div className="container">
                   <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col" colspan="3">Upcoming Todos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.upcomingtodos.map(upcomingTodo =>
                                <tr>
                                    <td>{upcomingTodo.description}</td>
                                    <td>{Moment(upcomingTodo.date).format('YYYY-MM-DD')}</td>
                                    <td>Due in {Moment(upcomingTodo.date).diff(Moment(new Date()), 'days')} days</td>
                                </tr> )
                            }
                        </tbody>
                    </table>     
            </div> 
        )
    }
}

export default UpcomingTodosComponent