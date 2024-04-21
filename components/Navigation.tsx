import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'

type NavigationProps={
    isLoggedIn:boolean,
    logUserOut: () => void,
}

export default function Navigation({isLoggedIn, logUserOut}: NavigationProps){
    return (
        <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">QuizUp</Navbar.Brand>
                <Nav>
                    {isLoggedIn ? (
                    <>
                        <Nav.Link as={Link} to="/myquestions">My Questions</Nav.Link>
                        <Nav.Link as={Link} to='/myaccount'>My Account</Nav.Link>
                        <Nav.Link as={Link} to='/' onClick={()=> logUserOut()}>Log Out</Nav.Link>
                    </>
                    ): (
                    <>    
                        <Nav.Link as={Link} to ='/signup'>Sign Up</Nav.Link>
                        <Nav.Link as={Link} to ='/login'>Log In</Nav.Link>
                        
                    </>
                    
                    )}
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}