// https://clouddevs.com/react/forms/
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate(); // React Router useNavigate hook stored in a variable
  const [error, setError] = useState<string | null>(null); // Stores error message
  const [delayMessage, setDelayMessage] = useState<string | null>(null);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // type of event object specified
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => { // type of event object specified
    e.preventDefault(); // stops browser from reloading the page

    // backend api call
    try {
      setError(null);
      setDelayMessage("Sign-up may take a minute (or two) while the backend server wakes up due to the free tier delay. Thanks for waiting!");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, formData);
      
      console.log("account created successfully:", response.data);
      localStorage.setItem("token", response.data.token); // store JWT token locally in the browswer
      localStorage.setItem("username", response.data.username); // save username in local storage for displaying in UI
      navigate("/dashboard"); // redirect to dashboard

    } catch (error) {
      console.error("signup error frontend:", error);
      setDelayMessage(null);
      setError("username already exists");
    }
  };

  return (
    <Container>
      <Box sx={{ mx:"auto", textAlign:"center", width: "30vw" }}>
        <Typography variant="h4" gutterBottom>
          create account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mb:"10"}}>
          <TextField
              label="username"
              type="username"
              name="username"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="email"
              type="email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="password"
              type="password"
              name="password"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" >
              create account & login
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

export default SignUpPage;
