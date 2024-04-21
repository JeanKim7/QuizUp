import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from '../views/Home'
import SignUp from '../views/SignUp'
import Login from '../views/Login'
import MyAccount from '../views/MyAccount'
import MyQuestions from '../views/MyQuestions'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true: false)
  
  const logUserIn=()=>{
    setIsLoggedIn(true)
  }

  const logUserOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    console.log("You have been logged out")
  }

  return (
  <>
    <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
      <Container>
        <Routes>
          <Route path='/' element ={<Home isLoggedIn={isLoggedIn}/>}/>
          <Route path='/myaccount' element={<MyAccount logUserOut={logUserOut}/>}/>
          <Route path='/signup' element = {<SignUp/>} />
          <Route path ='/login' element = {<Login logUserIn={logUserIn}/>} />
          <Route path = '/myquestions' element={<MyQuestions/>}/>
        </Routes>
      </Container>
  </>
)
}
