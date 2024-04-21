import React from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import  InputGroup from "react-bootstrap/InputGroup";
import Button  from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css"
import { register } from "../lib/apiWrapper";
import {useNavigate } from 'react-router-dom'
import { UserFormDataType } from "../types";



export default function SignUp(){
    const navigate=useNavigate()

    const [seePassword, setSeePassword] = useState(false)
    const [userFormData, setUserFormData] = useState<UserFormDataType>(
        {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async(e:React.FormEvent) => {
        e.preventDefault();

        let response = await register(userFormData)
        if (response.error) {
            console.log(response.error)
        } else {
            let newUser= response.data!
            console.log(newUser)
            navigate('/')
        }
    }

    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirmPassword

    return (
        <>
        <h1 className="text-center">Register Here</h1>
        <Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor="first_name">First Name</Form.Label>
                    <Form.Control id='first_name' name= 'first_name' placeholder='Enter first name' value = {userFormData.first_name} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="last_name">Last Name</Form.Label>
                    <Form.Control id='last_name' name= 'last_name' placeholder='Enter last name' value = {userFormData.last_name} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control id='email' name= 'email' placeholder='Enter email' value = {userFormData.email} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='password' name= 'password' placeholder='Enter password' type={!seePassword? 'password': 'text'} value = {userFormData.password} onChange = {handleInputChange}/>
                        <InputGroup.Text onClick = {() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                    </InputGroup>
                    
                    <Form.Label htmlFor="confirmPassword">Cofnirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='confirmPassword' name= 'confirmPassword' placeholder='Confirm pasword' type={!seePassword? 'password': 'text'} value = {userFormData.confirmPassword} onChange = {handleInputChange}/>
                        <InputGroup.Text onClick = {() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                    </InputGroup>
                    <Button type ="submit" variant='success' disabled={disableSubmit}>Create User</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    
    )
}