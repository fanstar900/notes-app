import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

// Utility function to validate email format
const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};
const navigate = useNavigate();
const navLogin = ()=>{
  navigate('/login')
}

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    //signup logic (e.g., axios call)
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // doubt hai thoda clarity chahiye
      console.error("Signup error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while Signing Up. Please try again.");
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
          <h3 className="text-center mb-3">Sign Up</h3>
          <form onSubmit={handleSignUp}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </div>
            </div>

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
                style={{ border: "1px solid #ddd", borderRadius: "6px" }}
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
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0 0.75rem",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {<p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Already have an account? <button onClick={navLogin}>Login</button>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
