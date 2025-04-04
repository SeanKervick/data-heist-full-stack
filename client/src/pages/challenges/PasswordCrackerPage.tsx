import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Card, CardContent, Avatar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import { profile } from "../../components/Profiles";
import Timer from "../../components/Timer";


const PasswordCrackerChallenge = () => {
  const navigate = useNavigate();
  // state variables
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false); // for navigation control
  const [showDialog, setShowDialog] = useState<boolean>(true); // dialog box shown at start
  // timer control
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  // score keeping
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const totalScore = (Number(localStorage.getItem("totalScore")));
  console.log(`C1 total score is: ${totalScore}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops browser from reloading the page
    setError("");
    setSuccess(false);

    if (password === profile.correctPassword) {
      setSuccess(true);
      setTimerStart(false); // stop the timer

      setChallengeScore(time); // update state for end of challenge dialog box UI
      const updatedTotal = totalScore + time; // calculate total score
      localStorage.setItem("totalScore", (updatedTotal).toString()); // store updated total score

      setShowDialog(true); // show dialog at end of this challenge
      
    } else {
      setError("Incorrect password. Try again!"); // show error
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimerStart(true); // start timer
    if (success) {
      navigate("/challenge/spot-the-phish"); // direct to next challenge
    }
  };

  const handleTimeUp = () => {
    console.log("time's up");
    // handle action when time runs out here
  };


  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      {/* dialog box */}
      <DialogBox
        open={showDialog}
        title={
          success ? `Challenge 1 Complete! You scored ${challengeScore} points!` : "Challenge 1: Password Cracker!"
        }
        // challenge explanation (shown at start) & educational message (shown at end)
        message={
          success
            ? "Well done, you cracked the password! Although this task was easy, it highlights the importance of password strength and & keeping hints off social media."
            : "Read this person's social media bio and guess their password."
        }
        buttonText={success ? "next challenge" : "OK"}
        onClose={handleDialogClose}
      />
      {/* timer not shown at end of challenge */}
      {!success && <Timer initialTime={30} onTimeUp={handleTimeUp} start={timerStart} onTimeUpdate={setTime} />}

      {/* profile card */}
      <Card sx={{ p: 1, textAlign: "center" }}>
        <CardContent>
          <Avatar
            src={profile.profilePic}
            sx={{ width: 150, height: 150, margin: "auto" }}
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {profile.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {profile.username}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontStyle: "italic" }}>
            "{profile.bio}"
          </Typography>
        </CardContent>
      </Card>

      {/* password form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
      >
        <Typography variant="body1">enter the password:</Typography>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          submit
        </Button>
      </Box>
      {/* conditional rendering - if error (true) then render the alert (https://react.dev/learn/conditional-rendering) */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default PasswordCrackerChallenge;
