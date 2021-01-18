import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class TodoApp extends Component{
    render()  {
        return (
            <div className="TodoApp">
                
                <Router>
                    <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>   
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListToDoComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    <FooterComponent />
                </Router>
               {/* <LoginComponent />
                <WelcomeComponent />*/}
            </div>
        )
    }
}

class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            loginSuccess : false,
            loginError : false
        }
    }
    render() {
        return(
            <div>
                {/*<ShowInvalidCredentials loginError={this.state.loginError}/>
                <ShowSuccesfulLoginMessage loginSuccess={this.state.loginSuccess}/>
                <ShowLoginMessage loginSuccess={this.state.loginSuccess} loginError={this.state.loginError}/>*/}
                {this.state.loginError && <div>Login error</div>} {/*If true then show the second part*/} 
                {this.state.loginSuccess && <div>Login Successful</div>}
            <label>Username:</label> 
            <input type="text" name="username" value={this.state.username} onChange={this.handleLoginChange} />
            <label>Password: </label> 
            <input type="password" name="password" value={this.state.password} onChange={this.handleLoginChange}/>
            <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }



    handleLoginChange = (event) => {
        this.setState(
            () => {
                return { [event.target.name] : event.target.value}
            }
        )
    }

    loginClicked = () =>{
        console.log("Login Button Clicked")
        if(this.state.username==="Ryan" && this.state.password==="password")
        {
            console.log("DING DING DING")
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState(
            //     () => {
            //         return {
            //                 loginSuccess : true, 
            //                 loginError : false
            //             }
            //     }
            // )
        }
        else
        {
            console.log("Better luck next time")
            this.setState(
                () => {
                        return {
                                loginSuccess : false, 
                                loginError : true
                            }
                    }
                )
        }
    }
    

    // handleUsernameChange = (event) => {
    //     this.setState(
    //         () => {
    //             return { username: event.target.value}
    //         }
    //     )
    // }

    // handlePasswordChange = (event) => {
    //     this.setState(
    //         () => {
    //             return {password: event.target.value}
    //         }
    //     )
    // }
}

class ListToDoComponent extends Component{

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
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Completed?</th>
                                    <th>Target Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(todoItem => 
                                        <tr>
                                            <td>
                                                {todoItem.id}
                                            </td>
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
                                {/*<tr>
                                    <td>
                                        {this.state.todo.id}
                                    </td>
                                    <td>
                                        {this.state.todo.description}
                                    </td>
                                </tr>*/}
                            </tbody>
                            </table>
                    
                </div>
    }

}

class HeaderComponent extends Component{
    render() {
        return( 
                <header>
                    <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a>Hi</a></div>
                        <ul class="navbar-nav">
                            <li><Link className="nav-link" to="/welcome/Ryan">Home</Link></li>
                            <li><Link className="nav-link" to="/todos">To-Dos</Link></li>
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li><Link className="nav-link" to="/login">Login</Link></li>
                            <li><Link className="nav-link" to="/logout">Logout</Link></li>
                        </ul>
                    </nav>
                    </div>
                </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2018 @in28minutes</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render() {
        return (
                <div>
                    <h1>You are logged out</h1>
                    <div className="container">
                        Thanks for using our web application!
                    </div>
                </div>
        )
    }
}

class WelcomeComponent extends Component{
    render() {
        return(
            <div>
                Welcome {this.props.match.params.name} 
                Manage your todos  <Link to="/todos">here</Link>
               {/* Manage your todos  <a href="/todos">here</a>*/}
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error has occured.</div>
    
}

/* when wanting to use functions as opposed to straight jsx code
function ShowLoginMessage(props)
{

    if(props.loginError)
    {
        return <div>Login error</div>
    }
    else if(props.loginSuccess)
    {
        return <div>Login Successful</div>
    }
    else 
    {
        return null
    }
}*/

/*code for seperate handling 
function ShowInvalidCredentials(props)
{
    if(props.loginError)
    {
        return <div>Login error</div>
    }
    else 
    {
        return null
    }
}

function ShowSuccesfulLoginMessage(props)
{
    if(props.loginSuccess)
    {
        return <div>Login Successful</div>
    }
    else 
    {
        return null
    }
}*/

export default TodoApp