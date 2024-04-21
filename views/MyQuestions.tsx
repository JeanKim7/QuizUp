import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Accordion  from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import { QuestionFormDataType } from '../types';


type MyQuestionsProps = {
    addNewQuestion: (data:QuestionFormDataType) => void,
    editQuestion1: (questionID:string, editData:QuestionFormDataType ) => void,
    deleteQuestion1: (questionID: string) =>void
}

export default function MyQuestions({addNewQuestion, editQuestion1, deleteQuestion1}: MyQuestionsProps) {
    const navigate = useNavigate()
    
    const [newQuestionData, setNewQuestionData] = useState<QuestionFormDataType>({question:"", answer:""})
    const [editQuestionData, setEditQuestionData] = useState<QuestionFormDataType>({question:"", answer:""})
    const [editQuestionID, setEditQuestionID] = useState<string>('')
    const [deleteQuestionID, setDeleteQuestionID] = useState<string>('')



    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestionData({...newQuestionData, [event.target.name]:event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewQuestion(newQuestionData)
        navigate('/')
    }

    const handleEditInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEditQuestionData({...editQuestionData, [event.target.name]:event.target.value})
    }

    const handleEditIDInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEditQuestionID(event.target.value)
    }

    const handleEditFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        editQuestion1(editQuestionID, editQuestionData)
        navigate('/')
    }

    const handleDeleteInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setDeleteQuestionID(event.target.value)
    }

    const handleDeleteFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        deleteQuestion1(deleteQuestionID)
        navigate('/')
    }


    
    return (
            <>
                <h1 className = "text-center my-3">My Account</h1>
                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Create a Question</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit = {handleFormSubmit}>
                                <Form.Label htmlFor='question'>Question</Form.Label>
                                <Form.Control name="question" placeholder="Enter your question" value = {newQuestionData.question} onChange = {handleInputChange}></Form.Control>
                                <Form.Label htmlFor='Answer'>Answer</Form.Label>
                                <Form.Control name="answer" placeholder="Enter the answer" value = {newQuestionData.answer} onChange = {handleInputChange}></Form.Control>
                                <Button variant="success" type="submit">Create New Question</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>Edit a Question</Accordion.Header>
                        <Accordion.Body>
                        <Form onSubmit = {handleEditFormSubmit}>
                                <Form.Label htmlFor='questionID'>Question ID</Form.Label>
                                <Form.Control name = "questionID" placeholder="Enter the ID of the question you want to edit" value= {editQuestionID} onChange = {handleEditIDInputChange}></Form.Control>
                                <Form.Label htmlFor='question'>Question</Form.Label>
                                <Form.Control name="question" placeholder="Enter your edited question" value = {editQuestionData.question} onChange = {handleEditInputChange}></Form.Control>
                                <Form.Label htmlFor='Answer'>Answer</Form.Label>
                                <Form.Control name="answer" placeholder="Enter your edited answer" value = {editQuestionData.answer} onChange = {handleEditInputChange}></Form.Control>
                                <Button variant="success" type="submit">Create New Question</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='2'>
                        <Accordion.Header>Delete a Question</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit = {handleDeleteFormSubmit}>
                                <Form.Label htmlFor="deleteQuestionID">What is the ID of the question you want to delete?</Form.Label>
                                <Form.Control name="deleteQuestionID" placeholder="Enter the question ID" value = {deleteQuestionID} onChange = {handleDeleteInputChange}></Form.Control> 
                                <Button variant="danger" type="submit">Delete Question</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
    )
}