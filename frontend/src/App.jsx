import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./Signup.jsx";
import "./App.css";
const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  </Router>
);
const App = () => {
  return <>{routes}</>;
};
export default App;
