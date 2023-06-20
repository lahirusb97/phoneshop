import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AllNavigations from "./Pages/AllNavigations";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  //handle login or not
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      <Routes>
        <Route element={<AllNavigations loggedInUser={loggedInUser} />}>
          <Route path="*" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
