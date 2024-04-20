import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'


export default function Navigation(){
    return (
        <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">QuizUp</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to ='/signup'>Sign Up</Nav.Link>
                    <Nav.Link as={Link} to ='/login'>Log In</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}