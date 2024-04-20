import axios from "axios";
import { UserFormDataType, UserType, TokenType, QuestionType } from "../types";

const baseURL: string = ' https://cae-bookstore.herokuapp.com'
const userEndpoint:string = '/user'
const loginEndpoint: string = '/login'
const questionEndpoint: string = '/question'

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (email:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorizatoin: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?:T,
    error?:string
}

async function register(newUserData: UserFormDataType): Promise <APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function login(email: string, password:string): Promise <APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email,password).get(loginEndpoint);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}

async function getPosts(token:string): Promise <APIResponse<QuestionType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(questionEndpoint);
        data=response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error =err.response?.data.error
        } else {
            error= "Something went wrong"
        }
    }
    return { data, error }
}


export {
    register,
    login,
    getPosts
}