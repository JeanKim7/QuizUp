import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  InputGroup  from 'react-bootstrap/InputGroup';
import { UserFormDataType } from '../types';
import { deleteUser, editUser } from '../lib/apiWrapper';

type MyAccountProps ={
    logUserOut: ()=>void
}

export default function MyAccount({logUserOut}:MyAccountProps) {
    
    const navigate=useNavigate()
    const [userEditData, setUserEditData] = useState<Partial<UserFormDataType>>({
        first_name: "",
        last_name: "",
        email: "",
        password:"",
        confirmPassword: ""
    })

    const [seePassword, setSeePassword] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const openModal=() => setShowModal(true)
    const closeModal=()=> setShowModal(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEditData({...userEditData, [e.target.name]: e.target.value})}

    const handleFormSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        console.log(token)
        console.log(userEditData)

        let response = await editUser(token, userEditData)
        if (response.error) {
            console.log(response.error)
        } else {
            let editedUser= response.data!
            console.log(editedUser)
            navigate('/')
        }
    }

    const handleDeleteClick = async()=> {
        const token=localStorage.getItem('token') || '';
        const response=await deleteUser(token)
        if (response.error){
            console.log(response.error)
        } else {
            console.log(response.data)
            logUserOut()
            navigate('/')
            
        }
    }

    const disableSubmit = userEditData.password ? userEditData.password !== userEditData.confirmPassword : false

    return (
        <>
            <h1 className = "text-center my-3">My Account</h1>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Edit My Account</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor="first_name">First Name</Form.Label>
                            <Form.Control id='first_name' name= 'first_name' placeholder='Enter first name' value = {userEditData.first_name} onChange = {handleInputChange}/>

                            <Form.Label htmlFor="last_name">Last Name</Form.Label>
                            <Form.Control id='last_name' name= 'last_name' placeholder='Enter last name' value = {userEditData.last_name} onChange = {handleInputChange}/>

                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control id='email' name= 'email' placeholder='Enter email' value = {userEditData.email} onChange = {handleInputChange}/>

                            <Form.Label htmlFor="password">Password</Form.Label>
                            <InputGroup>
                                <Form.Control id='password' name= 'password' placeholder='Enter password' type={!seePassword? 'password': 'text'} value = {userEditData.password} onChange = {handleInputChange}/>
                                <InputGroup.Text onClick = {() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                            </InputGroup>
                            
                            <Form.Label htmlFor="confirmPassword">Cofnirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control id='confirmPassword' name= 'confirmPassword' placeholder='Confirm pasword' type={!seePassword? 'password': 'text'} value = {userEditData.confirmPassword} onChange = {handleInputChange}/>
                                <InputGroup.Text onClick = {() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                            </InputGroup>
                            

                            <Button type ="submit" variant='success' disabled={disableSubmit} >Edit My Account</Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Delete My Account</Accordion.Header>
                    <Accordion.Body>
                        <Button variant='danger' onClick={openModal}>Delete Account</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Account</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}
