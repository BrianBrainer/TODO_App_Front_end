import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import LogOutComponent from './LogOutComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import ToDoListComponent from './ToDoListComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import TodoItemComponent from './TodoItemComponent.jsx'
import RegistrationComponent from './RegistrationComponent.jsx'


class TodoApp extends Component{
    render()  {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>   
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/logout" component={LogOutComponent}/>
                            <Route path="/register" component={RegistrationComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos" exact component={ToDoListComponent}/>
                            <AuthenticatedRoute path="/todos/:id" exact component={TodoItemComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}
export default TodoApp