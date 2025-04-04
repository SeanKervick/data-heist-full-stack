import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateHighScore } from "../api/scoreAPI";
import { useState } from "react";



const FeedbackPage = () => {
  const navigate = useNavigate();
  const finalScore = Number(localStorage.getItem("totalScore")) ;
  const [username] = useState(localStorage.getItem("username"));
  

  const handleEndGame = () => {
    // check if user is logged in before saving score
    const isLoggedIn = !!localStorage.getItem("token");
    if (isLoggedIn) {
      // pass finalScore to api endpoint
      updateHighScore(finalScore);
      localStorage.removeItem("totalScore"); // reset score after game ends
    }

    localStorage.removeItem("totalScore"); // reset score after game ends
    // redirect to dashboard (only logged in user's, guests will be directed to login)
    navigate("/dashboard");
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Well done {username}! <br></br><br></br> Your total score is:<br></br> {finalScore}
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleEndGame} 
        sx={{ mt: 3 }}
      >
        dashboard
      </Button>
    </Container>
  );
};

export default FeedbackPage;
