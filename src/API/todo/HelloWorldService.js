import axios from "axios"

class HelloWorldService{

    executeHelloWorldService()
    {
        return axios.get('http://localhost:8080/hello-world')
        //console.log("In the Hello World Service")
    }

    executeHelloWorldBeanService()
    {
        return axios.get('http://localhost:8080/hello-world-bean')
        //console.log("In the Hello World Service")
    }

    executeHelloWorldPathService(name)
    {
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)
        //console.log("In the Hello World Service")
    }
}

export default new HelloWorldService()