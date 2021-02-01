import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../API/todo/HelloWorldService.js'
import UpcomingTodosComponent from './UpcomingTodosComponent.jsx'

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
                    <UpcomingTodosComponent/>
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

        console.log(error.response)
        let errorMessage = '';
                if(error.message)
                {
                    errorMessage =+ error.message
                }

                if(error.response && error.response.data)
                {
                    errorMessage =+ error.response.data.message
                }
        this.setState({welcomeMessage : errorMessage})
    }

}

export default WelcomeComponent