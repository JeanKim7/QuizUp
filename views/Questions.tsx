import QuestionCard from '../components/QuestionCard';
import {useState, useEffect} from 'react'
import { QuestionType } from '../types';
import {getAllQuestions} from '../lib/apiWrapper'


export default function Questions() {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() =>{
        async function fetchData(){
            const response = await getAllQuestions();
            if (response.data){
                let qs= response.data!
                let qsArray = qs['questions']
                setQuestions(qsArray)
            }
        }
        fetchData()  
    },[]
    )


    return (
        <>
        {questions.map(q => <QuestionCard key={q.id} question = {q}/>)}
        </>
    )
}