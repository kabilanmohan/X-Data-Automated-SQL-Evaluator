import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link} from 'react-router-dom';


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminRadioRef, setAdminRadioRef] = useState(null);
  
  const handleChange = (e) => {
      console.log("value in handleChange",e.target.value)
      setAdminRadioRef(e.target.value);
    }
    async function handleSubmit(e) {
      e.preventDefault();
    
      try {
        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value,adminRadioRef);
        // navigate("/");
      } catch (error) {
        console.error("Signin failed:", error); // Log the error for debugging
        setError("Failed to Sign In. Error: " + error.message);
      }
    
      setLoading(false);
    }
  
  return (
    <>
      <Card className="Signup-card" >
        <Card.Body >
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
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
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
