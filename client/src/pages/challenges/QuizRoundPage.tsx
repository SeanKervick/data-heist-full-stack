import { useState } from "react";
import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { quizQuestions } from "../../components/QuizQuestions.tsx";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import Timer from "../../components/Timer";


const QuizRound = () => {
  const navigate = useNavigate();
  // state variables
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); 
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // to store number of correct answers
  const [success, setSuccess] = useState<boolean>(false); // for navigation control
  const [showDialog, setShowDialog] = useState<boolean>(true); // dialog box shown at start
  // timer control
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  // score keeping
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const totalScore = (Number(localStorage.getItem("totalScore")));
  // debugging
  console.log(`C1 - Quiz total score is: ${totalScore}`);


  const handleAnswerClick = (index: number) => {
  let newCorrectAnswers = correctAnswers; // start with current correctAnswers value

  // check if the selected answer (index)  is correct
  if (index === quizQuestions[currentQuestion].correctAnswer) {
    newCorrectAnswers += 1; // increment correctAnswers
    setCorrectAnswers(newCorrectAnswers); // update state
  }

    // if currentQuestion <number> is less than the array of questions, add 1 (move to next question)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // end of quiz
      setSuccess(true);
      setTimerStart(false); // stop the timer

      const challengeTotal = time + (newCorrectAnswers * 10); // calculate challenge total
      setChallengeScore(challengeTotal);  // update state for end of challenge dialog box UI
      
      const updatedTotal =  totalScore + challengeTotal; // calculate overall total
      localStorage.setItem("totalScore", updatedTotal.toString()); // store updated total score

      setShowDialog(true); // show dialog at end of this challenge
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimerStart(true); // start timer
    if (success) {
      navigate("/challenge/spot-the-phish"); // direct to feedback page
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
            title={success ? `Challenge 1 Complete! You scored ${challengeScore} points!` : "Challenge 1: Quiz Round!"}
            // challenge explanation (shown at start) & educational message (shown at end)
            message={
              success ? (
                <>
                  <Typography>
                    You got {correctAnswers}/{quizQuestions.length} questions correct
                    <br />
                    <br />
                    Score calculation: Time remaining ({time+1}) + ({correctAnswers}x10) = {challengeScore}
                  </Typography>
                </>
              ) : (
                <Typography>
                Answer the questions as quickly as possible to secure the most points!
                <br />
                <br />
                (10 bonus points for each correct answer)
                </Typography>
              )
            }
            buttonText={success ? "next challenge" : "OK"}
            onClose={handleDialogClose}
          />

      {/* timer not shown at end of challenge */}
      {!success && <Timer initialTime={30} onTimeUp={handleTimeUp} start={timerStart} onTimeUpdate={setTime} />}

      {/* ------------------ questions --------------------------*/}
      <Card sx={{ maxWidth: 800, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5">
            {/* display the question found in the array of quizQuestions at index of currentQuestion */}
            {quizQuestions[currentQuestion].question}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            {/* display the list of answers in the array of quizQuestions at index of currentQuestion (https://javascript.info/array-methods#map) */}
            {quizQuestions[currentQuestion].answers.map((answer, index) => (
              <Button
                key={index} // https://legacy.reactjs.org/docs/lists-and-keys.html
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleAnswerClick(index)}
              >
                {answer}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuizRound;
