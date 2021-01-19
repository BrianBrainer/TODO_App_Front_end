import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

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
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
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

    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials loginError={this.state.loginError}/>
                    <ShowSuccesfulLoginMessage loginSuccess={this.state.loginSuccess}/>
                    <ShowLoginMessage loginSuccess={this.state.loginSuccess} loginError={this.state.loginError}/>
                    {this.state.loginError && <div>Login error</div>} If true then show the second part*/}
                    {this.state.loginSuccess && <div>Login Successful</div>}
                    {this.state.loginError && <div className="alert alert-warning">Login error</div>}
                <label>Username:</label> 
                <input type="text" name="username" value={this.state.username} onChange={this.handleLoginChange} />
                <label>Password: </label> 
                <input type="password" name="password" value={this.state.password} onChange={this.handleLoginChange}/>
                <button className="btn btn-success"onClick={this.loginClicked}>Login</button>
            </div>
            </div>
        )
    }

}

export default LoginComponent;