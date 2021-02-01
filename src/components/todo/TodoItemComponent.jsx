import React, {Component} from 'react'
import Moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoService from '../../API/todo/TodoService'
import AuthenticationService from './AuthenticationService'

class TodoItemComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : "",
            date : "",
            completed : false
 
        }
    }

    componentDidMount(){

    if(this.state.id === "-1")
    {
        return
    }
        let user = AuthenticationService.getUsername()//could set state variable 
        TodoService.getTodoById(user, this.state.id)
            .then(response => {
                console.log("Results from API call below")
                console.log(response)
                this.setState( {
                    description : response.data.description,
                    date : Moment(response.data.date).format('YYYY-MM-DD'),
                    completed : response.data.completed
                })
                console.log(this.state)
            })
    }

    onSubmit = (values) => {
    
        console.log("values below")
        console.log(values)
        console.log("values above")

        console.log("ID below")
        console.log(this.state.id)
        console.log("ID above")
        let user = AuthenticationService.getUsername()
        let todo = {
            id : values.id,
            description : values.description,
            date : values.date,
            completed : false,
            username : user
        }
        if(this.state.id === "-1")
        {
            console.log("In create")
            todo.id=null
            TodoService.createTodo(user, todo )
            .then(() => this.props.history.push("/todos"))
        }
        else
        {
            console.log("In Update")
            TodoService.updateExistingTodo(user, values.id, todo)
            .then(() => this.props.history.push("/todos"))
        }
    }

    validate = (values) => {
        let errors = {}
        if(!values.description || values.description.trim() === "")
        {
            errors.description = "Description cannot be blank or spaces only"
        }
        else if(values.description.length < 6)
        {
            errors.description="Description must be greater than 5 charcaters"
        }

        if(!Moment(values.date).isValid())
        {
            errors.date = "Please enter a valid date"
        }
        else if(Moment(values.date).isBefore(Moment(new Date()).format('YYYY-MM-DD')))
        {
            errors.date = "Target date cannot be in the past"
        }

        console.log(values)
        console.log(errors)
        return errors
    }

    render() {
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
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="date" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field className="form-control" type="date" name="date"/>
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

export default TodoItemComponent