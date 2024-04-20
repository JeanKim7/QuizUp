import React from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

export default function SignUp(){

    const [userFormData, setUserFormData] = useState(
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

    return (
        <>
        <h1 className="text-center">Register Here</h1>
        <Card>
            <Card.Body>
                <Form>
                    <Form.Label htmlFor="first_name">First Name</Form.Label>
                    <Form.Control id='first_name' name= 'first_name' placeholder='Enter first name' value = {userFormData.first_name} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="last_name">Last Name</Form.Label>
                    <Form.Control id='last_name' name= 'last_name' placeholder='Enter last name' value = {userFormData.last_name} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control id='email' name= 'email' placeholder='Enter email' value = {userFormData.email} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control id='password' name= 'password' placeholder='Enter password' value = {userFormData.password} onChange = {handleInputChange}/>

                    <Form.Label htmlFor="confirmPassword">Cofirm Password</Form.Label>
                    <Form.Control id='confirmPassword' name= 'confirmPassword' placeholder='Confirm pasword' value = {userFormData.confirmPassword} onChange = {handleInputChange}/>
                </Form>
            </Card.Body>
        </Card>
        </>
    
    )
}