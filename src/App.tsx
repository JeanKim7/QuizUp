import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from '../views/Home'
import SignUp from '../views/SignUp'
import Login from '../views/Login'
import MyAccount from '../views/MyAccount'
import MyQuestions from '../views/MyQuestions'
import { QuestionFormDataType } from '../types';
import { createNewQuestion, editQuestion, deleteQuestion } from '../lib/apiWrapper';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true: false)
  const [fetchQuestionData, setFetchQuestionData] = useState(true)

  const logUserIn=()=>{
    setIsLoggedIn(true)
  }

  const logUserOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    console.log("You have been logged out")
  }

  const addNewQuestion = async (newQuestionData: QuestionFormDataType) =>{
    const token =localStorage.getItem('token') || '';
    const response = await createNewQuestion(token, newQuestionData)
    if (response.error){
      console.log(response.error)
    } else if (response.data){
      setFetchQuestionData(!fetchQuestionData)
      console.log(response.data, "Your question has been created!")
    }
  }

  const editQuestion1 = async (editQuestionID: string, editQuestionData: QuestionFormDataType) =>{
    const token = localStorage.getItem('token') || ''
    const response = await editQuestion(token, editQuestionID, editQuestionData)
    if (response.error){
        console.log(response.error)
    } else if (response.data) {
        console.log(response.data, "Your question has been edited!")
        setFetchQuestionData(!fetchQuestionData)
    }}


  const deleteQuestion1 = async (deleteQuestionID: string) =>{
    const token = localStorage.getItem('token') || ''
    const response = await deleteQuestion(token, deleteQuestionID)
    if (response.error){
        console.log(response.error)
    } else if (response.data) {
        console.log(response.data, "Your question has been deleted!")
        setFetchQuestionData(!fetchQuestionData)
    }}

  return (
  <>
    <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
      <Container>
        <Routes>
          <Route path='/' element ={<Home fetchQuestionData={fetchQuestionData} isLoggedIn={isLoggedIn}/>}/>
          <Route path='/myaccount' element={<MyAccount logUserOut={logUserOut}/>}/>
          <Route path='/signup' element = {<SignUp/>} />
          <Route path ='/login' element = {<Login logUserIn={logUserIn}/>} />
          <Route path = '/myquestions' element={<MyQuestions addNewQuestion={addNewQuestion} editQuestion1 = {editQuestion1} deleteQuestion1={deleteQuestion1}/>}/>
        </Routes>
      </Container>
  </>
)
}
