import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // React Router useNavigate hook stored in a variable
  const [error, setError] = useState<string | null>(null); // stores error message
  const [delayMessage, setDelayMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // type of event object specified
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => { // type of event object specified
    e.preventDefault(); // stops browser from reloading the page

    // backend api call
    try {
      setError(null);
      setDelayMessage("Login may take a minute (or two) while the backend server wakes up due to the free tier delay. Thanks for waiting!");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
  
      console.log("Login successful:", response.data);
  
      // store user details locally
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username); // save username for UI
      localStorage.setItem("role", response.data.role); // save role for access control
      // redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
  
    } catch (error) {
      setDelayMessage(null);
      setError("Incorrect email or password. Please try again.");
      console.error("login error frontend:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ mx:"auto", textAlign:"center", width: "30vw" }}>
        <Typography variant="h4" gutterBottom>
          login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="password"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            sign in
          </Button>
        </Box>
      </Box>
      <Box>
        {delayMessage && (<Alert sx={{ fontSize: "0.8rem" }} severity="success">{delayMessage}</Alert>)}
        {error && (<Alert sx={{ fontSize: "0.8rem" }} severity="error">{error}</Alert>)}
      </Box>
    </Container>
  );
};

export default LoginPage;
