import axios from "axios";
import { UserFormDataType, UserType, TokenType, QuestionType, QuestionFormDataType } from "../types";

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
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?:T,
    error?:string
}

async function register(newUserData: UserFormDataType): Promise <APIResponse<string>> {
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

async function editUser(token:string, editedUserData:Partial<UserType>): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, editedUserData);
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

async function deleteUser(token:string): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
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





type responseObject = {
    questions: QuestionType[]
}

async function getAllQuestions(): Promise <APIResponse<responseObject>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(questionEndpoint+'/all');
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

async function getMyQuestions(token:string): Promise <APIResponse<responseObject>> {
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

async function createNewQuestion(token:string, newQuestionData:QuestionFormDataType): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionEndpoint, newQuestionData);
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

async function deleteQuestion(token:string, deleteQuestionID:string): Promise <APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(questionEndpoint + `/${deleteQuestionID}`);
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
    editUser,
    deleteUser,
    getMyQuestions,
    getAllQuestions,
    createNewQuestion,
    deleteQuestion
}