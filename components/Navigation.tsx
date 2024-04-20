import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import React from 'react'


export default function Navigation(){
    return (
        <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#home">Brand link</Navbar.Brand>
            </Container>
        </Navbar>
        </>
    )
}