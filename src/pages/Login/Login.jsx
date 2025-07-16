import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";

// import utility function to validate email
import { validateEmail } from "../../utils/helper";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  // track form inputs + error state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // runs when user submits the login form
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    // check if email is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // check if password is entered
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // clear previous errors
    setError("");

    // TODO: call login API here
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* Centered Login Card */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-200 rounded bg-mint-500 px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            {/* email input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* password input */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* error message */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {/* login button */}
            <button type="submit" className="btn-primary">
              Login
            </button>

            {/* link to signup page */}
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
