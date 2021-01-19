import React, { Component } from 'react'

class LogOutComponent extends Component{
    render() {
        //AuthenticationService.registerSuccessfulLogout();
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
export default LogOutComponent