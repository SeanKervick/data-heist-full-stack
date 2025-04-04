import { Box, Typography, Container, Paper } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DialogBox from "../../components/DialogBox";
import Timer from "../../components/Timer";

const CodeExposed = () => {
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
  const totalScore = Number(localStorage.getItem("totalScore"));

  const handleFlagClick = (id: number) => {
    // if foundFlags does not include the id of the clicked flag
    if (!foundFlags.includes(id)) {
      // add the id to the array (https://react.dev/learn/updating-arrays-in-state)
      setFoundFlags([...foundFlags, id]);
    }
    if (foundFlags.length + 1 === 1) {
      setSuccess(true);
      setTimerStart(false); // stop the timer

      const challengeTotal = (time + 50)
      setChallengeScore(challengeTotal); // set challenge score for end of challenge dialog UI
      const updatedTotal = totalScore + challengeTotal; // calculate total score
      localStorage.setItem("totalScore", updatedTotal.toString()); // store updated total score

      setShowDialog(true); // show dialog before next challenge
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimerStart(true); // start timer
    if (success) {
      navigate("/challenge/port-watcher"); // direct to next challenge
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
        title={
          success
            ? `Challenge 4 Complete! You scored ${challengeScore} points!`
            : "Challenge 4: CodeExposed!"
        }
        // challenge explanation (shown at start) & educational message (shown at end)
        message={
          success ? (
            <>
              <Typography>
                Well done! You identified the security flaw in the code. Secret
                keys should be stored in environment variables, not hardcoded in
                the source code.
                <br />
                <br />
              </Typography>
              <Typography>
                Hardcoding secrets makes them vulnerable to leaks, especially if
                the code is pushed to a public repository. Use `.env` files or a
                secrets manager to keep them secure.<br></br><br></br>
                Score calculation: Time remaining ({time+1}) + 50 (correct answer) = {challengeScore}
              </Typography>
            </>
          ) : (
            "Inspect this JavaScript file and identify (by clicking on) the security flaw that could make this application vulnerable."
          )
        }
        buttonText={success ? "next challenge" : "OK"}
        onClose={handleDialogClose}
      />
      {/* timer not shown at end of challenge */}
      {!success && (
        <Timer
          initialTime={30}
          onTimeUp={handleTimeUp}
          start={timerStart}
          onTimeUpdate={setTime}
        />
      )}

      {/* Challenge UI */}
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          width: { xs: "95%", sm: "90%", md: "1100px" },
          maxWidth: "1100px",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {/* sidebar - directory */}
        <Paper
          sx={{
            p: 2,
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
            width: { xs: "70%", md: "20%" },
            minHeight: "100%",
          }}
        >
          <Typography variant="body2" gutterBottom>
            Project Files
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FolderIcon sx={{ color: "blue" }} />
            <Typography variant="body2">src</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 3 }}>
            <img src="/images/js.png" alt="JS File" width="24" height="24" />
            <Typography variant="body2">create-jwt.js</Typography>
          </Box>
        </Paper>

        {/* right side - content */}
        <Box
          sx={{
            p: 3,
            backgroundColor: "#252526",
            color: "#ffffff",
            textAlign: "left",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2">create-jwt.js</Typography>
          <Paper
            sx={{
              p: 2,
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {/* code content */}
            <Box
              component="pre"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", p: 1 }}
            >
              <span style={{ color: "#569CD6" }}>import</span> jwt from{" "}
              <span style={{ color: "#CE9178" }}>'jsonwebtoken'</span>;
              <br />
              <span
                onClick={() => handleFlagClick(1)}
                style={{
                  color: foundFlags.includes(1) ? "red" : "inherit",
                  cursor: "pointer",
                }}
              >
                const passKey = 'passKey123';
              </span>
              <br />
              <br />
              <span style={{ color: "green" }}>// Define the payload</span>
              <br />
              const payload = {"{"}
              <br />
              &nbsp;&nbsp;sub:{" "}
              <span style={{ color: "#CE9178" }}>'1234567890'</span>,
              <br />
              &nbsp;&nbsp;name:{" "}
              <span style={{ color: "#CE9178" }}>'Rory Gallagher'</span>,
              <br />
              &nbsp;&nbsp;roles: [
              <span style={{ color: "#CE9178" }}>'admin'</span>,{" "}
              <span style={{ color: "#CE9178" }}>'user'</span>],
              <br />
              &nbsp;&nbsp;iat: Math.floor(Date.now() / 1000),{" "}
              <span style={{ color: "green" }}>
                // Issued at (current timestamp)
              </span>
              <br />
              &nbsp;&nbsp;exp: Math.floor(Date.now() / 1000) + (60 * 60),{" "}
              <span style={{ color: "green" }}>
                // Expiration time (1 hour from now)
              </span>
              <br />
              {"};"}
              <br />
              <br />
              <span style={{ color: "green" }}>// Generate the token</span>
              <br />
              const token = jwt.sign(payload, passKey, {"{"} algorithm:{" "}
              <span style={{ color: "#CE9178" }}>'HS256'</span> {"}"});
              <br />
              <br />
              console.log(token);
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CodeExposed;
