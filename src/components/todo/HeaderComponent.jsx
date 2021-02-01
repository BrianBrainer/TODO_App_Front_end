import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponent extends Component{
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log("Is user logged in: " + isUserLoggedIn)
        return( 
                <header>
                    <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="navbar-brand">RYAN T</div>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
                        <ul className="navbar-nav">
                            {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/Ryan">Home</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">To-Dos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                        </div>
                    </nav>
                    </div>
                </header>
        )
    }
}

export default withRouter(HeaderComponent);