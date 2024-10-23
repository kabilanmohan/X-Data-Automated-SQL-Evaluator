import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth,db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import {doc, setDoc, getDoc} from 'firebase/firestore';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

function signup(email, password, role) {
  // Use createUserWithEmailAndPassword with the auth instance
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return setUserRole(userCredential.user.uid, role);
    })
    .catch((error) => {
      console.error("Signup error:", error);
      throw error;
    });
}

function setUserRole(userId, role) {
  const userRef = doc(db, 'users', userId);
  return setDoc(userRef, { role: role }, { merge: true });
}

function getUserRole(userId) {
  const userRef = doc(db, 'users', userId);
  return getDoc(userRef)
    .then(docSnapshot => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data(); // Extract the document data
        return userData.role; // Return the role
      }
      else {
        throw new Error("User not found");
      }
    });
}
const navigate = useNavigate();

async function login(email, password, providedRole) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const dbRole = await getUserRole(userCredential.user.uid); // Ensure getUserRole returns a promise
    if (dbRole === providedRole) {
      if (dbRole === 'admin') {
        navigate("/Teachers/Home")
      } else if (dbRole === 'user') {
        navigate("/Students/Home")
        // Redirect to student's website
      }
    } else {
      throw new Error("Role does not match with the database.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login failure or role mismatch
  }
}

function logout() {
  return signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Logout error:", error);
      throw error;
    });
}

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email);
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email);
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password);
//   }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    //   setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
    // resetPassword,
    // updateEmail,
    // updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
