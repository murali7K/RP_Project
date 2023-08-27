// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setloading] = useState(false);

  // <------------------------------------------------------------>

  useEffect(() => {
    const storedEmail = localStorage.getItem("username");
    const storedRememberMe = localStorage.getItem("checkbox");

    if (storedRememberMe === "true") {
      setRememberMe(true);
      setEmail(storedEmail || "");
    }
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/signUp`,
        {
          name,
          email,
          password,
        }
      );
      console.log("Sign up successful", response.data);

      if (rememberMe) {
        localStorage.setItem("username", email);
        localStorage.setItem("checkbox", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("checkbox");
      }
      setloading(false);
      navigate("/SignIn");
    } catch (error) {
      setloading(false);
      console.error("Sign up failed", error);
    }
  };

  // <------------------------------------------------------------>

  return (
    <div className="SignUp-wrapper">
      <div className="signup-container">
        <h3>Create Account</h3>
        <form onSubmit={handleSignUp}>
          <div className="div1">
            <label htmlFor="text">Name</label>
            <input
              type="text"
              id="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="div1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="div2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <input
            disabled={loading}
            style={{ backgroundColor: loading ? "#6c6c6c" : "#015294" }}
            type="submit"
            value={`${loading ? "Signing Up.." : "Sign Up"}`}
            id="signUpButton"
          />
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/SignIn")}>Login</span>
        </p>
      </div>
    </div>
  );
};
