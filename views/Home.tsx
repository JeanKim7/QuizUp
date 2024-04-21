
import {useState, useEffect} from 'react'
import QuestionCard from '../components/QuestionCard';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import { QuestionType } from '../types';
import {getAllQuestions, getMyQuestions} from '../lib/apiWrapper'

type HomeProps = {
    isLoggedIn:boolean
}

export default function Home({isLoggedIn}:HomeProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [myQuestionsOnly, setMyQuestionsOnly] = useState(false)


    useEffect(() =>{
        async function fetchData(){
            if (myQuestionsOnly){
            const token = localStorage.getItem('token') || ''
            const response = await getMyQuestions(token);
            if (response.data){
                setQuestions(response.data.questions)
            }

            } else {
            const response = await getAllQuestions();
            if (response.data){
                setQuestions(response.data.questions)
            }
        }}
        fetchData()  
    },[myQuestionsOnly]
    )

    const handleFilterClick = () => setMyQuestionsOnly(!myQuestionsOnly)


    return (
        <>
        <h1 className ='mt-3 text-center'>Quiz Questions</h1>
        <Container fluid>
        { isLoggedIn ? (
        <Row>
            <Col className='col-3'></Col>
            <Button className = "w-50 p-3 mt-3 text-center" onClick={handleFilterClick} variant='info'>{myQuestionsOnly ? "View All Questions": "View My Questions Only"}</Button>
        </Row>):(<></>)
        }
        </Container>
        {questions.map(q => <QuestionCard key={q.id} question = {q}/>)}
        </>
    )
}