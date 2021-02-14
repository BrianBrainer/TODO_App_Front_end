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
            email : "",
            password : "",
            confirmPassword : ""
        }
    }

    onSubmit = (values) => {
  
        
        let user = {
            firstName : values.firstName,
            lastName : values.lastName,
            username : values.username,
            password : values.password,
            email : values.email
        }
        console.log("Here", user)
           UserService.registerUser(user)
            .then(() => this.props.history.push("/login"))
    }

    validate = async(values) => {

        var keys = Object.keys(values)
        console.log(keys)
        var isUsernameInUse
        var isEmailInUse

        if(values.username.trim() !== "")
        {
            isUsernameInUse = await this.validateEmailAndUsername(values.username.trim(), "username")
        }
        if(values.email.trim() !== "")
        {
            isEmailInUse = await this.validateEmailAndUsername(values.email.trim(), "email")
        }
       // console.log("Response: ",isUsernameInUse)

        let errors = {}


        for (var i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "firstName":
                    if(values.firstName.trim().length == 0)
                        {
                           errors.firstName = "\u2022 First Name cannot be blank"
                        }
                    else if (!this.validateRegistrationField(values.firstName.trim(), "name"))
                        {
                            errors.firstName = "\u2022 First Name cannot contain numbers or special characters"
                        }
                    break;
                case "lastName":
                    if(values.lastName.trim().length == 0)
                        {
                           errors.lastName = "\u2022 Last Name cannot be blank"
                        }
                    else if (!this.validateRegistrationField(values.lastName.trim(), "name"))
                        {
                            errors.lastName = "\u2022 Last Name cannot contain numbers or special characters"
                        }
                    break;
                case "username":
                    if(values.username.trim().length == 0)
                        {
                           errors.username = "\u2022 Username cannot be blank"
                        }
                    else if (values.username.length < 6)
                        {
                            errors.username = "\u2022 Username should be 6 charcaters or more"
                        }
                    // else if (isUsernameInUse)
                    // {
                    //     console.log("WE ARE HERE!!!!!!!!!!!!!!!!!!!!!!")
                    //     errors.username = "\u2022 Username not available "
                    // }
                    console.log("validation Below")
                    console.log(this.validateEmailAndUsername(values.username.trim()))
                        
                    break;
                case "password":
                    if(values.password.trim().length == 0)
                        {
                           errors.password = "\u2022 Password cannot be blank"
                        }
                    else if (values.password.length < 6)
                        {
                        errors.password = "\u2022 Password should be 6 charcaters or more"
                        }
                    else if (values.password !== values.confirmPassword)
                        {
                            errors.password = "\u2022 Passwords do not match"
                        }
                    else if (isUsernameInUse)
                    {
                        errors.username = "\u2022 Username is already in use"
                    }
                    break;
                case "email":
                    if(values.email.trim().length == 0)
                        {
                           errors.email = "\u2022 Email cannot be blank"
                        }
                    else if (!this.validateRegistrationField(values.email.trim(), "email"))
                        {
                           errors.email = "\u2022  Please enter a valid email address"
                        }
                    else if (values.email !== values.confirmEmail)
                        {
                            errors.email = "\u2022 Emails do not match"
                        }
                    else if (isEmailInUse)
                    {
                        errors.email = "\u2022 Email is already registered"
                    }
                        break;
                default:
                    console.log("Gosh darn")
                    break;
            }
        }
       
        /*console.log("Submit values: ")
        console.log(values.key)

       
        
        switch (values) {
            case "password":
                errors.username = "test error"
                break;
        
            default:
                console.log("Gosh darn")
                break;
        }

        if(values.password !== values.confirmPassword )
        {
            errors.password = "Passwords do not match"
        }
*/
        console.log("values below:")
        console.log(values)
        console.log(errors)
        return errors

        
    }

    validateRegistrationField(stringToCheck, fieldType)
    {
        var regexExpression = ""
        switch (fieldType){
            case "name": 
                regexExpression = /^[A-Za-z]+$/;
                console.log("Using name regex")
                break;
            case "email":
                regexExpression = /\S+@\S+\.\S+/;
                console.log("Using Email regex")
                break;
            default:
                break;
        }
        
        if(regexExpression.test(stringToCheck))
            return true
        else
            return false
    } 

    async validateEmailAndUsername(stringToCheck, fieldType)
    {
        var promise = ""
        var promiseData = ""
        switch(fieldType) {
            case "username":
                console.log("validating username")
                promise = await UserService.checkIfUsernameExists(stringToCheck)
                promiseData = await promise.data
                return promiseData
            case "email":
                console.log("validating email")
                promise = await UserService.checkIfEmailExists(stringToCheck)
                promiseData = await promise.data
                return promiseData
        }
        // const promise = await UserService.checkIfUsernameExists(stringToCheck)
        // const promiseData = await promise.data
        // console.log(typeof promiseData)
        // if(true === promiseData)
        // {
        //     console.log("returning true")
        //     return true
            
        // }

        // else if(false === promiseData)
        // {
        //     console.log("returning false")
        //     return false
            
        // }
         
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
                                    <fieldset className="registrationDetails">
                                        <ErrorMessage name="firstName" component="div" className="registerError"/>
                                        <Field className="form-control" type="text" name="firstName" placeholder="First Name"/>
                                        <ErrorMessage name="lastName" component="div" className="registerError"/>
                                        <Field className="form-control" type="text" name="lastName" placeholder="Last Name"/>
                                        <ErrorMessage name="username" component="div" className="registerError"/>
                                        <Field className="form-control" type="text" name="username" placeholder="Username"/>
                                        <ErrorMessage name="email" component="div" className="registerError"/>
                                        <Field className="form-control" type="text" name="email" placeholder="Email"/>
                                        <Field className="form-control" type="text" name="confirmEmail" placeholder="Confirm Email"/>
                                        <ErrorMessage name="password" component="div" className="registerError"/>
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