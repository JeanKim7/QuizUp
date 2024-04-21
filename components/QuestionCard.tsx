import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { QuestionType } from '../types'
import { useState } from 'react'

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({question}: QuestionCardProps){
    
    const [answer, setAnswer] = useState<string>('')
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [incorrectAnswer, setIncorrectAnswer] = useState<number>(0)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (answer === question.answer){
            setIncorrectAnswer(1)
            setShowAnswer(true)
        } else {
            console.log("That answer is incorrect")
            setIncorrectAnswer(2)
        }
    }

    function cardBorder(incorrectAnswer: number):string {
        if (incorrectAnswer === 0){
            return ''
        } else if (incorrectAnswer ===1) {
            return 'success'
        } else if (incorrectAnswer === 2) {
            return 'danger'
        } else {
            return ''
        }
    }


    return (
        <Card border = {cardBorder(incorrectAnswer)} className='mt-3 p-3'>
            <Card.Title>Question: {question.question}</Card.Title>
            <Form onSubmit={handleFormSubmit}>
                <Form.Label className='my-3'htmlFor='answer'>Enter your answer below</Form.Label>
                <Form.Control className='mb-3' name="answer" placeholder="Your answer here" value = {answer} onChange={handleInputChange}/>
                    <Row className = 'mb-3'>
                    <Col className='col-2'></Col>
                    <Button  className = "w-25"variant = 'success' type='submit'>Submit your answer</Button>
                    <Col className='col-2'></Col>
                    <Button className='w-25' variant = 'warning' onClick={()=>setShowAnswer(!showAnswer)}>
                    <Col className='col-2'></Col>{showAnswer ? "Hide Answer": "Show Answer"}</Button>
                </Row>
            </Form>
            <Card.Text className={showAnswer ? "" : "d-none"}>Answer: {question.answer}</Card.Text>
            <Card.Subtitle className='mb-1'>Author: {question.author}</Card.Subtitle>
            <Card.Subtitle>ID: {question.id}</Card.Subtitle>
        </Card>
    )
}