import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Firebase";
import logo from "../assets/logo.jpg";
import abstract from "../assets/abstract.jpg";
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
    <div className="flex items-center justify-center h-screen relative z-30">
      <div>
        <img
          className="absolute w-full h-screen top-0 left-0 "
          src={abstract}
        />
      </div>
      <div className="bg-white relative z-30 p-8 backdrop-blur-md rounded-3xl">
        <h1 className="p-4 text-center font-mono font-semibold text-4xl text-blue-800">
          Sing In
        </h1>
        <img className="" src={logo} />
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
            <button
              className="py-4 w-full bg-blue-900 text-white m-4 font-bold"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
