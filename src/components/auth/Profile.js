import React, { useState } from "react"
import { Container, Row, Col, Button, Image } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import UploadForm from "../UploadForm"
import ProfileImageGrid from "../ProfileImageGrid"


export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={8}><h2 className="text-white mb-4">Your Profile</h2></Col>
        <Col sm={4} > 
          {/* <div className='float-right'> */}
          <Link to="/" className="bi bi-house-fill btn btn-primary">
             
            </Link>
          <Link to="/update-profile" className="btn btn-primary m-3 ">
              Update Profile
            </Link>
            <Button   onClick={handleLogout}>
                Log Out
              </Button>
            {/* </div> */}
          </Col>
      </Row>
        <UploadForm/>
      <ProfileImageGrid/>
    </Container>

    
  )
}