import React from 'react'
import Card from 'react-bootstrap/Card'
import { QuestionType } from '../types'

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({question}: QuestionCardProps){
    
    
    return (
        <Card className='mt-3 p-3'>
            <Card.Title>{question.question}</Card.Title>
            <Card.Subtitle>Author: {question.author}</Card.Subtitle>
            <Card.Body>Answer: {question.answer}</Card.Body>
        </Card>
    )
}