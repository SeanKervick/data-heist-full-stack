import { Card, Box, Typography, Input, Button, CardContent, Container } from "@mui/material";
import { useState } from "react";
import storedCommands from "../../components/NmapCommands.tsx";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";

const PortWatcher = () => {
  const navigate = useNavigate();
  // state variables
  const [inputCommand, setInputCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [guideResponse, setGuideResponse] = useState<string>("IDENTIFY THE NETWORK to scan for vulnerablities."); // step guidance
  const [hint, setHint] = useState<string>("");
  const [showHintButton, setShowHintButton] = useState<boolean>(true);

  const [success, setSuccess] = useState<boolean>(false); // for navigation control
  const [showDialog, setShowDialog] = useState<boolean>(true); // dialog box shown at start
  // points control
  const [points, setPoints] = useState<number>(250);
  // score keeping
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const totalScore = (Number(localStorage.getItem("totalScore")));
  console.log(`C1 total score is: ${totalScore}`);



  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let nextGuide = guideResponse; // guide response control
      let terminalOutput = "Invalid command. Try again.";

      // always allow all commands
      if (inputCommand in storedCommands) {
        terminalOutput = storedCommands[inputCommand];
      } 
        // step-based guidance through scan
        if (step === 1 && inputCommand === "ipconfig") {
          terminalOutput = storedCommands[inputCommand];
          nextGuide = `Well done! The IPv4 address and Subnet Mask found below, determines that the network range is 192.168.10.0/24. 
          Use this range to PING ALL DEVICES on the network and discover active hosts.`;
          setHint("");
          setStep(2);
        } else if (step === 2 && inputCommand === "nmap -sn 192.168.10.0/24") {
          terminalOutput = storedCommands[inputCommand];
          nextGuide = `Great! You've found 7 active hosts (see below). Now scan for common open ports like HTTP (80) and 
          HTTPS (443) using -p 80,443 to find potentially vulnerable services.`;
          setHint("");
          setStep(3);
        } else if (step === 3 && inputCommand === "nmap -p 80,443 192.168.10.0/24") {
          terminalOutput = storedCommands[inputCommand];
          nextGuide = `Nice work! Ports 80 & 443 on gateway.local (192.168.10.1) are open. 
          Run a SERVICE DETECTION SCAN on this device to identify the software — it may reveal exploitable vulnerabilities!`;
          setHint("");
          setStep(4);
        } else if (step === 4 && inputCommand === "nmap -sV -p 80,443 192.168.10.1" ) {
          terminalOutput = storedCommands[inputCommand];
          nextGuide = `Congratulations! You've identified that the router is running Apache httpd 2.4.49. 
          This version is outdated and has known vulnerabilities, making it a potential security risk.`;
          setStep(5);
          setHint("");
          setShowHintButton(false);


          // challenge complete
          setSuccess(true);
    
          setChallengeScore(points); // update state for end of challenge dialog box UI
          const updatedTotal = totalScore + points; // calculate total score
          localStorage.setItem("totalScore", (updatedTotal).toString()); // store updated total score
    
          setTimeout(() => {
            setShowDialog(true);  // show dialog at end of this challenge
          }, 15000); 

        }

      setTerminalOutput(terminalOutput);
      setGuideResponse(nextGuide);
      setInputCommand(""); // clear the input field
      setShowHintButton(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (success) {
      navigate("/feedback"); // direct to next challenge
    }
  };

  const handleHintClick = () => {
    setShowHintButton(false);
    setPoints(points - 50)
    if (step === 1) {
      setHint("Command: ipconfig")
    } else if (step === 2) {
      setHint("Command: nmap -sn 192.168.10.0/24")
    } else if (step === 3) {
      setHint("nmap -p 80,443 192.168.10.0/24")
    } else if (step === 4) {
      setHint("nmap -sV -p 80,443 192.168.10.1")
    }
  };

  return ( 
    <Container>
      {/* ---------------- dialog box ----------------------- */}
      <DialogBox
        open={showDialog}
        title={
          success
            ? `Challenge 5 Complete! You scored ${challengeScore} points!`
            : "Challenge 5: The Port Watcher!"
        }
        // challenge explanation (shown at start) & educational message (shown at end)
        message={
          success ? (
            <>
              <Typography>
                Great job! You've successfully scanned the network,
                identified active hosts, checked for open ports, and discovered
                outdated services running. This process is a key part of ethical
                hacking and penetration testing!
                <br />
              </Typography>
            </>
          ) : (
            <Typography textAlign="left">
              Become an <strong>ethical hacker</strong> and carry out a
              vulnerability scan on a public network using 'nmap', a network scanning tool.<br/><br />

              For this challenge, there is no time limit - but each hint you use will deduct <strong>50 points</strong> from your score.<br/>
              Use the command '<code>nmap -h</code>' for help and clues to find the right command to enter into the terminal. Good luck!
            </Typography>
          )
        }
        buttonText={success ? "end game" : "ok"}
        onClose={handleDialogClose}
      />

        {/*--------- challenge card ------------*/}
        <Card sx={{ color: "primary", pt: 3}}>
          {/*--------- step guidance ------------*/}

          <Box sx={{ maxWidth: "1000px", p: 2, pb: 0 }}>
            <Box sx={{ alignItems: "center", textAlign: "left" }}>
              {step < 5 && (
                <Typography sx={{ display: "inline" }}>
                  Step {step}/4:&nbsp;
                </Typography>
              )}
              <Typography sx={{ display: "inline" }}>
                {guideResponse}
              </Typography>
            </Box>
          </Box>
          {/*--------- tip, points, hint button ------------*/}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 2, pr: 2 }}>
          {/*--------- tip ------------*/}
          {step < 5 && (
            <Box>
              <Typography color="red">'nmap -h' for help on each step</Typography>
            </Box>
          )}
          {/*--------- points ------------*/}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography>
              Points: {points}
            </Typography>
            </Box>
            {/*--------- hint button ------------*/}
            {step < 5 && (
              <Box sx={{ flex: 1, textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                {showHintButton && (
                  <Button
                    variant="contained"
                    sx={{ height: "1rem", fontSize: "0.75rem" }}
                    onClick={handleHintClick}
                  >
                    hint
                  </Button>
                )}
                <Typography sx={{  display: "inline", ml: 2 }}>{hint}</Typography>
              </Box>
            )}
          </Box>
        {/*--------- terminal ------------*/}
        <CardContent>
          <Box sx={{
            color: "white", 
            width: "90vw", 
            height: "32vw", 
            maxWidth: "1000px",
            border: "1px solid grey",
            fontFamily: "monospace",
            textAlign: "left",
            whiteSpace: "pre-line",
            p: 2 }}
          >
            Command Prompt
            <br></br>
            Microsoft Windows [Version 10.0.26100.3476]<br></br>
            (c) Microsoft Corporation. All rights reserved.<br></br>
            <br></br>
            C:\Users\Player&gt;
            <Input
              autoFocus 
              value={inputCommand} // for clearing the input field
              onChange={(e) => setInputCommand(e.target.value)} // so the input is visible
              onKeyDown={handleKeyPress} // https://react.dev/reference/react-dom/components/common#handling-keyboard-events
              disableUnderline
              sx = {{ width:"50%", bgcolor: "#000000", color: "white", fontFamily: "monospace" }}
            />
            <Box sx={{
              height: "75%", 
              maxWidth: "1000px",
              Maxheight: "32vw",
              overflow: "auto",
              }}
            >
              <Typography sx={{ fontFamily: "monospace", mt: 2 }}>{terminalOutput}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PortWatcher;