import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Firebase";

const Login = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setLoggedInUser(user); // Pass the user data to the parent component

        navigate("/", { replace: true });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <TextField
            className="w-96"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            type="email"
            variant="outlined"
          />
          <TextField
            className="w-96"
            style={{ marginTop: "1rem" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            type="password"
            variant="outlined"
          />
          <button className="p-4 bg-blue-900 text-white m-4" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
