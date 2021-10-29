import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

function NavbarPics() {
    
  const { currentUser } = useAuth()

  console.log(currentUser);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
               
                {/* <Nav.Link href="signup">Signup</Nav.Link> */}
                {currentUser ? <Nav.Link href="profile">Profile</Nav.Link> :  <Nav.Link href="login">Login</Nav.Link>}
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarPics
