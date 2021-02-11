import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import UserService from '../../API/user/UserService'
import './RegistrationComponent.css'

class RegistrationComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            firstName : "",
            lastName : "",
            username : "",
            password : "",
            confirmPassword : ""
        }
    }

    onSubmit = (values) => {
  
        let user = {
            firstName : values.firstName,
            lastName : values.lastName,
            username : values.username,
            password : values.password
        }
        console.log("Here")
            UserService.registerUser(user)
            .then(() => this.props.history.push("/login"))
    }

    validate = (values) => {
        let errors = {}
        if(values.password !== values.confirmPassword )
        {
            errors.password = "Passwords do not match"
        }

        console.log(values)
        console.log(errors)
        return errors
    }

    
    render(){
        return (
            <div className="container">
                {/*<div>Todo Component for id {this.props.match.params.id}</div>*/}
                <div className="container">
                    <h1>Register</h1>
                    <Formik 
                        initialValues={this.state}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            () => (
                                <Form>
                                    <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="password" component="div" className="alert alert-warning"/>
                                    <fieldset className="nameDetails">
                                        <Field className="form-control" type="text" name="firstName" placeholder="First Name"/>
                                        <Field className="form-control" type="text" name="lastName" placeholder="Last Name"/>
                                    </fieldset>
                                    <fieldset className="usernameDetails">
                                        <Field className="form-control" type="text" name="username" placeholder="Username"/>
                                    </fieldset>
                                    <fieldset className="passwordDetails">
                                        <Field className="form-control" type="password" name="password" placeholder="Password"/>
                                        <Field className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password"/>
                                    </fieldset>
                                    <button className="registerPageBtn" type="submit">Register</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>               
            </div> 
        )
    }
}
export default RegistrationComponent