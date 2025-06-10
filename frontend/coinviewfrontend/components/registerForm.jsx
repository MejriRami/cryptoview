import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", formData);
      setMessage(response.data.message || "User registered successfully.");
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.detail || "Registration failed."));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        value={formData.username}
        onChange={handleChange}
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <br />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
