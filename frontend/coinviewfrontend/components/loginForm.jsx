import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signin", credentials);
      setToken(response.data.token);
      setMessage("Logged in successfully.");
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data?.detail || "Unknown error."));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={credentials.email}
        onChange={handleChange}
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={credentials.password}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Login</button>

      {message && <p>{message}</p>}
      {token && <p>Token: {token}</p>}
    </form>
  );
};

export default LoginForm;
