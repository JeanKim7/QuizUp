import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/apiWrapper';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button'
import { UserFormDataType } from '../types';



export default function Login () {
    const navigate =useNavigate()   
    const [seePassword, setSeePassword] = useState(false)
    
    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>(
        {
            email: '',
            password: '',
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async(e:React.FormEvent) => {
        e.preventDefault();

        let response = await login(userFormData.email!, userFormData.password!)
        if (response.error) {
            console.log(response.error)
        } else {
            const token=response.data!.token;
            localStorage.setItem('token', token);
            console.log("Logged In")
            navigate('/')
        }
    }


    return (
        <>
        <h1 className='text-center'>Login</h1>
        <Card>
        <Card.Body>
            <Form onSubmit={handleFormSubmit}>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control id='email' name= 'email' placeholder='Enter email' value = {userFormData.email} onChange = {handleInputChange}/>

                <Form.Label htmlFor="password">Password</Form.Label>
                    <InputGroup>
                        <Form.Control id='password' name= 'password' placeholder='Enter password' type={!seePassword? 'password': 'text'} value = {userFormData.password} onChange = {handleInputChange}/>
                        <InputGroup.Text onClick = {() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                    </InputGroup>
                
                <Button type ="submit" variant='success'>Log In</Button>
                </Form>
        </Card.Body>
        </Card>

        </>
  )
}