import axios from "axios"
import { API_URL } from "../../Constants"

class HelloWorldService{

    executeHelloWorldService()
    {
        return axios.get(`${API_URL}/hello-world`)
        //console.log("In the Hello World Service")
    }

    executeHelloWorldBeanService()
    {
        return axios.get(`${API_URL}/hello-world-bean`)
        //console.log("In the Hello World Service")
    }

    executeHelloWorldPathService(name)
    {
        // let username = 'user'
        // let password = 'password'

        // //creates basic authentication header BASE64 encoding
        // let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)

        return axios.get(`${API_URL}/hello-world/path-variable/${name}`
        // ,
        //     {
        //         headers: {
        //             authorization: basicAuthHeader
        //         }
        //     }
        )
        //console.log("In the Hello World Service")
    }

    
}

export default new HelloWorldService()