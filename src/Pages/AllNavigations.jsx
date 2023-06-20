import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AllNavigations({ loggedInUser }) {
  //handleing login and protecting routes
  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
}
