import { useState, useEffect } from "react";
import { Button, Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { User } from "../types/interfaces"
import { useNavigate } from "react-router-dom";



const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]); // state variable of type User (array)
  const navigate = useNavigate();
  const [username] = useState(localStorage.getItem("username"));
  const role = localStorage.getItem("role");

  // redirect non admins to dashboard
  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/login"); // redirect to login
  };


  const handleListAll = async () => {
    // backend api call to list all users
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setUsers(response.data); // setUsers to response of API call
      console.log("users listed successfully:", response.data);
    } catch (error) {
      console.error("error listing users:", error);
    }
  };

  const handleDeleteAll = async () => {
    // backend api call to delete all users
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setUsers(response.data);
      console.log("users deleted successfully:");
    } catch (error) {
      console.error("error deleting users:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");

      // delete user by ID
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      // list updated users after delete
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setUsers(response.data);
      console.log(`user deleted successfully: ${userId}`);
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };
  
  

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        welcome {username}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
        log out
      </Button>
      <br></br>
      <Button variant="contained" color="secondary" onClick={handleListAll} sx={{ mt: 3 }}>
        list all users
      </Button>
      <br></br>
      <Button variant="contained" color="secondary" onClick={handleDeleteAll} sx={{ mt: 3 }}>
        delete all users
      </Button>
      {/* display users */}
      {users.length > 0 && (
        <List sx={{ mt: 3 }}>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${user.username} (${user.email})`} />
              <Button
                  color="error"
                  size="small"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AdminPage;
