import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../API/todo/HelloWorldService.js'

class WelcomeComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            welcomeMessage:""
        }
    }
    render() {
        return(
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name} Manage your todos  <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get a custom message 
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome </button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
               {/* Manage your todos  <a href="/todos">here</a>*/}
            </div>
        )
    }
    retrieveWelcomeMessage=()=>{
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.setState( 
        //     () => {
        //         return {welcomeMessage : response.data}
        //     }))

        //     HelloWorldService.executeHelloWorldBeanService()
        //     .then(response => this.handleSuccessfulResponse(response))
        // //.catch()

        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleErrorResponse(error))
    }

    handleSuccessfulResponse = (response) => {

        console.log(response)
        this.setState( {
                welcomeMessage : response.data.message
            })
    }

    handleErrorResponse = (error) => {

        console.log(error.response.data.message)
        this.setState( 
            () => {
                return {welcomeMessage : error.response.data.message}
            })
    }

}

export default WelcomeComponent