import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

function App() {
  const [current_user, setCurrent_user] = useState();
  const [SignupToggle, setSignupToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");

  function submitRegistration(e) {
    e.preventDefault();
    // Validate password and confirm_password match here or through API
    if(password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    
    client
      .post("/api/register", {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        address: address,
        // Add other fields as necessary according to your API
      })
      .then(function (res) {
        // Assuming successful registration automatically logs the user in
        setCurrent_user(true);
      }).catch(function(error) {
        // Handle registration errors (e.g., user already exists, validation errors)
        console.error("Registration failed:", error);
        alert("Registration failed, please try again.");
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrent_user(true);
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout", { withCredentials: true }).then(function (res) {
      setCurrent_user(false);
    });
  }

  // The toggle for showing the registration or login form
  const toggleForm = () => setSignupToggle(!SignupToggle);

  // UI Components
  if (current_user) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={(e) => submitLogout(e)}>
                  <Button type="submit" variant="light">
                    Log out
                  </Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Authentication App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" variant="light" onClick={toggleForm}>
                {SignupToggle ? "Login" : "Register"}
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {SignupToggle ? (
        <div className="center">
          <Form onSubmit={(e) => submitRegistration(e)}>
            {/* Email and Password Fields (same as before) */}

            {/* New Fields */}
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Form.Group>
            {/* Confirmation Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setconfirm_password(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      ) : (
        <h5>Looged In</h5>
      )}
    </div>
  );
}

export default App;
