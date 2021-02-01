import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import UserService from '../../API/user/UserService'

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
                    <h1>Todo Item</h1>
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
                                    <fieldset className="form-group">
                                        <label>First Name: </label>
                                        <Field className="form-control" type="text" name="firstName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                    <label>Last Name: </label>
                                        <Field className="form-control" type="text" name="lastName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Username: </label>
                                        <Field className="form-control" type="text" name="username"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="password" name="password"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Confirm Password</label>
                                        <Field className="form-control" type="password" name="confirmPassword"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save </button>
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