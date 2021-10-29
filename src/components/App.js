import React from "react"
import Signup from "./auth/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from "./HomePage"
import Login from "./auth/Login"
import PrivateRoute from "./auth/PrivateRoute"
import ForgotPassword from "./auth/ForgotPassword"
import UpdateProfile from "./auth/UpdateProfile"
import Profile from "./auth/Profile"

function App() {
  return (
   
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <PrivateRoute  path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App