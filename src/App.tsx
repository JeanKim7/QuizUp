import {Routes, Route} from 'react-router-dom'
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Questions from '../views/Questions'
import SignUp from '../views/SignUp'
import Login from '../views/Login'

export default function App() {
  return (
  <>
    <Navigation />
      <Container>
        <Routes>
          <Route path='/' element ={<Questions/>}/>
          <Route path='/signup' element = {<SignUp/>} />
          <Route path ='/login' element = {<Login/>} />
        </Routes>
      </Container>
  </>
)
}
