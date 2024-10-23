import React, { useRef, useState } from "react";
import "./Signup.css";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();  
  // adminRadioRef.current.focus(); 
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [adminRadioRef, setAdminRadioRef] = useState(null);
  const handleChange = (e) => {
    console.log("value in handleChange",e.target.value)
    setAdminRadioRef(e.target.value);
  }

async function handleSubmit(e) {
    e.preventDefault();
  
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
  
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, adminRadioRef);
      if (adminRadioRef === 'admin') {
        navigate("/Teachers/Home");
      } else {
      navigate("/Students/Home");}
    } catch (error) {
      console.error("Signup failed:", error); // Log the error for debugging
      setError("Failed to create an account. Error: " + error.message);
    }
  
    setLoading(false);
  }
  return (
    <>
      <Card className="Signup-card">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
              <div style={{marginBottom: '20px' }}></div>
            </Form.Group>
            <Form.Group id="userType">
            <Form.Label>User Type</Form.Label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
              <Form.Check
                  type="radio"
                  label="Admin"
                  name="userType"
                  value="admin"  
                  onChange={handleChange}
                  checked={adminRadioRef === 'admin'}                
                />
                <Form.Check
                  type="radio"
                  label="User"
                  name="userType"
                  value="user"
                  onChange={handleChange}
                  checked={adminRadioRef === 'user'}
                />
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100 Signup-button" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
