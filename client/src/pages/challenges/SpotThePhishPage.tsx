import { useState } from "react";
import { Container, Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import Timer from "../../components/Timer";

const SpotThePhish = () => {
  const navigate = useNavigate();
  // state variables
  const [foundFlags, setFoundFlags] = useState<number[]>([]); // initialize state variable as an [empty] array of numbers for finding red flags
  const [success, setSuccess] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(true); // dialog box shown at start
  // timer control
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  // score keeping
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const totalScore = (Number(localStorage.getItem("totalScore")));
  

  const handleFlagClick = (id: number) => {
    // if foundFlags does not include the id of the clicked flag
    if (!foundFlags.includes(id)) {
        // add the id to the array (https://react.dev/learn/updating-arrays-in-state)
        setFoundFlags([...foundFlags, id]);
      
      if (foundFlags.length + 1 === 3) {
        setSuccess(true);
        setTimerStart(false); // Stop the timer

        const challengeTotal = (time + ((foundFlags.length + 1) * 10))
        setChallengeScore(challengeTotal); // set challenge score for end of challenge dialog UI
        const updatedTotal = totalScore + challengeTotal; // calculate total score
        localStorage.setItem("totalScore", (updatedTotal).toString()); // store updated total score

        setShowDialog(true); // Show dialog before next challenge
      }
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimerStart(true); // start timer
    if (success) {
      navigate("/challenge/cert-inspector"); // direct to next challenge
    }
  };

  const handleTimeUp = () => {
    console.log("time's up");
    // handle action when time runs out here
  };

  return (
    <Container>
      {/* ------------------ dialog box --------------------------*/}
      <DialogBox
        open={showDialog}
        title={success ? `Challenge 2 Complete! You scored ${challengeScore} points!` : "Challenge 2: Spot The Phish!"}
        // challenge explanation (shown at start) & educational message (shown at end)
        message={
          success ? (
            <>
              <Typography>
                Well done, you found ({foundFlags.length}) red flags common in Phishing emails:
                <br />
                <br />
              </Typography>
              <Box sx={{ textAlign: "left" }}>
                <Typography>
                  1. "Urgent" in subject line. A tactic used to cause panic and get people to act quickly.
                </Typography>
                <Typography>
                  2. Dodgy email address misspelt by one letter often goes unnoticed.
                </Typography>
                <Typography>
                  3. Fake login link - Don't be a link clicker!
                </Typography>
                <Typography>
                <br></br>
                  Score calculation: Time remaining ({time + 1}) + red flags found ({foundFlags.length} * 10) = {challengeScore}
                </Typography>
              </Box>
            </>
          ) : (
            "Scan this email and identify (by clicking on) 3 red flags that indicate it's phishyness."
          )
        }
        buttonText={success ? "next challenge" : "OK"}
        onClose={handleDialogClose}
      />
      {/* timer not shown at end of challenge */}
      {!success && <Timer initialTime={60} onTimeUp={handleTimeUp} start={timerStart} onTimeUpdate={setTime} />}

      {/* ------------------ challenge card --------------------------*/}
      <Card sx={{ maxWidth: 1200, color: "white", textAlign: "left", pt: 5, margin: "20", }} >
        <CardContent>
          {/* ------------------ email subject --------------------------*/}
          <Box sx={{ borderBottom: "1px solid", pt: 2, pb: 2 }}>
            <Typography sx={{ fontFamily: "sans-serif" }} variant="h3">
              RE:{" "}
              <Typography
                sx={{ fontFamily: "sans-serif" }}
                component="span"
                variant="h3"
                style={{
                  cursor: "pointer",
                  color: foundFlags.includes(1) ? "red" : "inherit",
                }}
                onClick={() => handleFlagClick(1)} // passing id of 1 to handleFlagClick function when clicked
              >
                Urgent!
              </Typography>{" "}
              Action Required
            </Typography>
          </Box>

          {/* ------------------ email sender --------------------------*/}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid ", pt: 2, pb: 2, }} >
            <Avatar src={"/images/ao.png"} sx={{ width: 75, height: 75, mr: 5 }} />
            <Typography sx={{ fontFamily: "sans-serif" }} variant="body1">
              From: AIB Online
              <Typography
                sx={{ fontFamily: "sans-serif" }}
                component="span"
                variant="body1"
                onClick={() => handleFlagClick(2)}
                style={{
                  cursor: "pointer",
                  color: foundFlags.includes(2) ? "red" : "inherit",
                }}
              >
                {"<"}noreply@abi.com{">"}
                <br></br>
              </Typography>
              To: You
            </Typography>
          </Box>

          {/* ------------------ email content --------------------------*/}
          <Box sx={{ display: "flex", pt: 3, pb: 3 }}>
            <Typography sx={{ fontFamily: "sans-serif" }} variant="body1">
              Dear Customer,
              <br />
              <br />
              We have detected unauthorized login attempts on your bank account. For your security, please verify your account
              immediately by clicking the link below:
              <br />
              <br />
              <strong>Verify Your Account Now:</strong>{" "}
              <Typography
                component="span"
                sx={{
                  textDecoration: "underline",
                  color: foundFlags.includes(3) ? "red" : "blue",
                  cursor: "pointer",
                }}
                onClick={() => handleFlagClick(3)}
              >
                http://abionline.com/login
              </Typography>
              <br />
              <br />
              Failure to do so may result in account suspension.
              <br />
              <br />
              Regards,
              <br />
              AIB Security Department.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpotThePhish;
