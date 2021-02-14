import axios from "axios"
import { API_URL } from "../../Constants"

class UserService{

    registerUser(user)
    {
        console.log("User to register: ", user)
        return axios.post(`${API_URL}/register`, user)
        //console.log("In the Hello World Service")
    }

    getTodoById(name, id)
    {
        return axios.get(`${API_URL}/users/${name}/todos/${id}`)
        //console.log("In the Hello World Service")
    }

    deleteTodoById(name, id)
    {
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`)
        //console.log("In the Hello World Service")
    }

    updateExistingTodo(name, id, todo)
    {
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo)
        //console.log("In the Hello World Service")
    }

    checkIfUsernameExists(username)
    {
        return axios.get(`${API_URL}/register/validateUsername/${username}`)
    }

    checkIfEmailExists(email)
    {
        return axios.get(`${API_URL}/register/validateEmail/${email}`)
    }

    createTodo(name, todo)
    {
        console.log(todo)
        return axios.post(`${API_URL}/users/${name}/todos`, todo)
        //console.log("In the Hello World Service")
    }


}

export default new UserService()