import axios from "axios";
import { API_URL } from "../../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
            {headers: {Authorization: this.createBasicAuthToken(username,password)}})
    }

    executeJWTAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`,
        {
            username,
            password
        })
    }
    
    createJWTToken(token){
        return 'Bearer ' +  token
    }

    createBasicAuthToken(username, password){
        return 'Basic ' +  window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username,password){
        //creates basic authentication header BASE64 encoding
        
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJWT(username,token){
        //creates basic authentication header BASE64 encoding
        
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptor(this.createJWTToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return false
        return true
    }

    getUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        console.log(user)
        if(user===null) 
        {
            return null
        }
        return user
    }

    setupAxiosInterceptor(basicAuthHeader){

        // let username = 'user'
        // let password = 'password'

        // //creates basic authentication header BASE64 encoding
        // let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)

        axios.interceptors.request.use(
            (config) => {
                
                if(this.isUserLoggedIn())
                {
                    config.headers.authorization = basicAuthHeader
                }

                return config
                
            }
        )
    }
}

export default new AuthenticationService()