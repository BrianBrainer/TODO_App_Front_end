import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponent extends Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }


    render() {

        console.log("props: ", this.props)
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log("Is user logged in: " + isUserLoggedIn)
        return( 
                <header>
                    <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="navbar-brand">2DO</div>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
                        <ul className="navbar-nav">
                            {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/Ryan">Home</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">To-Dos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {isUserLoggedIn && <li>
                                <div className="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {AuthenticationService.getUsername()}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">My Account</a>
                                    <div class="dropdown-divider"></div>
                                    <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>
                                    <a class="dropdown-item" href="#">Logout</a>
                                    </Link>
                                </div>
                                </div></li>}
                        </ul>
                        </div>
                    </nav>
                    </div>
                </header>
        )
    }
}

export default withRouter(HeaderComponent);