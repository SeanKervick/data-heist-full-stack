import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Avatar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import Timer from "../../components/Timer";


const CertInspectorChallenge = () => {
  const navigate = useNavigate();
  // state variables
  const [certificate, setCert] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false); // for navigation control
  const [showDialog, setShowDialog] = useState<boolean>(true); // dialog box shown at start
  // timer control
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  // score keeping
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const totalScore = (Number(localStorage.getItem("totalScore")));
  // hint button
  const [hint, setHint] = useState<string>("");
  const [showHintButton, setShowHintButton] = useState<boolean>(true);
  const [hintUsed, setHintUsed] = useState<number>(0);
  console.log(totalScore)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops browser from reloading the page
    setError("");
    setSuccess(false);

    if (
      certificate === "Sunday, May 18, 2025 at 6:02:06 PM" || 
      certificate === "Sunday, May 18, 2025" ||
      certificate === "18/05/2025" ||
      certificate === "Sun, 18 May 2025 17:02:06 UTC" || // SSL Labs
      certificate === "Sun, 18 May 2025" // SSL Labs
    ) {
      setSuccess(true); // end of challenge
      setTimerStart(false); // stop the timer

      const challengeScore = time - hintUsed;
      setChallengeScore(challengeScore); // update state for end of challenge dialog box UI
      const updatedTotal = totalScore + (challengeScore); // calculate total score
      localStorage.setItem("totalScore", (updatedTotal).toString()); // store updated total score

      setShowDialog(true); // show dialog at end of this challenge
      
    } else {
      setError("Incorrect. Try again! Date format: DD/MM/YYYY"); // show error
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimerStart(true); // start timer
    if (success) {
      navigate("/challenge/code-exposed"); // direct to next challenge
    }
  };

  const handleTimeUp = () => {
    console.log("time's up");
    // handle action when time runs out here
  };

  const handleHintClick = () => {
    setShowHintButton(false);
    setHintUsed(100)
    setHint(`Click the symbol to the left of the data-heist URL in your browser's search bar. You'll find the digital certificate here. 
      Then locate the expiry date in the 'Validity Period' section.`)
  }

  return (
    <Container sx={{ width: "95%", textAlign: "center", mt: 5 }}>
      {/* dialog box */}
      <DialogBox
        open={showDialog}
        title={
          success ? `Challenge 3 Complete! You scored ${challengeScore} points!` : "Challenge 3: Cert Inspector!"
        }
        // challenge explanation (shown at start) & educational message (shown at end)
        message={
          success ? (
            <>
              <Typography>
               Well done! You've successfully retrieved the certificate's expiry date. 
               This digital certificate is used to verify a website's authenticity and prevent 'man-in-the-middle' attacks.
                <br />
                <br />
                Score calculation: Time remaining ({time + 1}) - hint if used ({hintUsed}) = {challengeScore}
              </Typography>
            </>
          ) : (
            <Typography>
              Inspect the digital certificate of the Data-Heist website and find its expiry date. Enter the date into the form box to complete this challenge.
           </Typography>
          )
        }
        buttonText={success ? "next challenge" : "OK"}
        onClose={handleDialogClose}
      />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {/* content: left side */}
        <Box sx={{ maxWidth: "500px", flex: 1 }}>
          {/* timer (not shown at end of challenge) */}
          {!success && ( <Timer initialTime={360} onTimeUp={handleTimeUp} start={timerStart} onTimeUpdate={setTime} /> )}

          {/* inspector image */}
          <Avatar
            src={"/images/cert-inspector.png"}
            sx={{ width: 200, height: 200, margin: "auto" }}
          />

          {/* challenge form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
          >
            <Typography variant="body1" color="red">
              Tool for mobile users:{" "}
              <a
                href="https://www.ssllabs.com/ssltest/"
                target="_blank"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                SSL Server Test
              </a>
            </Typography>
            <Typography variant="body1">
              Enter the expiry date of data-heist's Digital Certificate to complete this challenge:
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              value={certificate}
              onChange={(e) => setCert(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              submit
            </Button>
          </Box>
          {/* conditional rendering - if error (true) then render the alert (https://react.dev/learn/conditional-rendering) */}
          {error && ( <Alert severity="error" sx={{ mt: 2 }}> {error} </Alert> )}
        </Box>
        {/* right side - hint */}
        {showHintButton && (
              <Button
                variant="contained"
                sx={{ height: "1.5rem", fontSize: "0.75rem" }}
                onClick={handleHintClick}
              >
                hint
              </Button>
            )}
        {hint && (
          <Box
            sx={{
              maxWidth: "350px",
              p: 1,
              borderRadius: 1,
              border: "1px solid #ccc",
              fontSize: "0.9rem",
            }}
          >
            <Typography variant="h3" gutterBottom>
              HINT:
            </Typography>
            <Typography textAlign="left">{hint}</Typography>
          </Box>
        )}
    </Box>
    </Container>
  );
};

export default CertInspectorChallenge;