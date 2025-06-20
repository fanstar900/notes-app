import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const navSignup = ()=>{
  navigate('/signup')
}

  // Utility function to validate email format
  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("password is required.");
      return;
    }

    // Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // doubt hai thoda clarity chahiye
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center align-items-center min-vh-100"
        style={{ marginTop: "-60px" }}
      >
        <div
          className="card p-4 shadow"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div
                className="input-group"
                style={{ border: "1px solid #ddd", borderRadius: "6px" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ border: "none" }}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {<p style={{ color: "red" }}>{error}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Not yet registered? <button onClick={navSignup} style={{border:"none" ,fontStyle:"italic", backgroundColor:"transparent"}}>Sign Up</button>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
