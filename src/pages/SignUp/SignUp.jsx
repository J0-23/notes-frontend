import React, { useState } from "react";

// import components
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";

// import utility function to validate email
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  // track input field values + error state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // runs when user submits the signup form
  const handleSignUp = async (e) => {
    e.preventDefault(); // prevent page reload

    // validate form inputs
    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    // clear previous errors
    setError("");

    // TODO: implement actual signup API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
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
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            {/* name input */}
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

            {/* Submit button */}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            {/* link to login page */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-500 underline">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
