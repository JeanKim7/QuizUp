import React from 'react'
import Card from 'react-bootstrap/Card'
import { QuestionType } from '../types'

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({question}: QuestionCardProps){
    
    
    return (
        <Card>
            <Card.Title>{question.question}</Card.Title>
            <Card.Subtitle>Author: {question.author}</Card.Subtitle>
            <Card.Body>{question.answer}</Card.Body>
        </Card>
    )
}