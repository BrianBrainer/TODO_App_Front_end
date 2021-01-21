import axios from "axios"

class TodoService{

    getAllTodos(name)
    {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
        //console.log("In the Hello World Service")
    }

    getTodoById(name, id)
    {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
        //console.log("In the Hello World Service")
    }

    deleteTodoById(name, id)
    {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
        //console.log("In the Hello World Service")
    }

    updateExistingTodo(name, id, todo)
    {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
        //console.log("In the Hello World Service")
    }

    createTodo(name, todo)
    {
        console.log(todo)
        return axios.post(`http://localhost:8080/users/${name}/todos`, todo)
        //console.log("In the Hello World Service")
    }


}

export default new TodoService()