import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import SignUp from "../pages/SignUp/signUp";
import "./App.css";
const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  </Router>
);
const App = () => {
  return <>{routes}</>;
};
export default App;
