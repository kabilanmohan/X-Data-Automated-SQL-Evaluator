// import React, {} from "react";
import Signup from "./signUp";
import { AuthProvider } from "../contexts/AuthContext";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Container } from "react-bootstrap";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import TeachersHome from "./Teachers/Home";
import StudentsHome from "./Students/Home";
import StudentIDE from "./Students/EditorPage";
import StudentContests from "./Students/Contests";
import StudentProfile from "./Students/Profile";
import StudentProblems from "./Students/Problems";
import TeacherIDE from "./Teachers/Ide";
import TeacherContests from "./Teachers/Contests";
import TeacherProfile from "./Teachers/Profile";
import TeacherProblems from "./Teachers/Problems";


function App() {
  
  return (
    <Router>
      <AuthProvider>
        {/* <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Teachers/Home" element={<TeachersHome />} />
              <Route path="/Students/Home" element={<StudentsHome />} /> 
              <Route path="/Students/Problems" element={<StudentProblems />} />
              <Route path="/Students/Profile" element={<StudentProfile />} />
              <Route path="/Students/Ide" element={<StudentIDE />} />
              <Route path="/Students/Contests" element={<StudentContests />} />
              <Route path="/Teachers/Problems" element={<TeacherProblems />} />
              <Route path="/Teachers/Profile" element={<TeacherProfile />} />
              <Route path="/Teachers/Ide" element={<TeacherIDE />} />
              <Route path="/Teachers/Contests" element={<TeacherContests />} />
            </Routes>
          {/* </div>
        </Container> */}  
      </AuthProvider>
    </Router>
  );
}

export default App;
