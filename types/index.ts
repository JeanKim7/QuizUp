export type UserFormDataType = {
    first_name: string,
    last_name:string,
    email:string,
    password: string,
    confirmPassword: string
}

export type UserType = {
    email: string
    first_name:string,
    last_name: string, 
    password: string,

}

export type QuestionType ={
    question: string,
    answer:string,
    id: number,
    createdOn: string,
    author:string
}

export type QuestionFormDataType = {
    question:string,
    answer:string
}

export type TokenType = {
    token:string,
    tokenExpiration:string
}