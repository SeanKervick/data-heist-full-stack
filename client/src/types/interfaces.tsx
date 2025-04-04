export interface DialogBoxProps {
    open: boolean;
    title: string;
    message: React.ReactNode; // to accept JSX and strings for formatting 
    buttonText: string;
    onClose: () => void;
  }

  export interface QuizQuestion {
    question: string;
    answers: string[]; // array of strings 
    correctAnswer: number; // index of the correct answer
  }
  
  export interface TimerProps {
    initialTime: number;
    start: boolean; // timer stop/start control
    onTimeUp: () => void; // function calls when time runs out
    onTimeUpdate: (time: number) => void; // for tracking time to use for points
  }

  export interface User {
    _id: string;
    username: string;
    email: string;
  }

  export interface LeaderboardUser {
    _id: string;
    username: string;
    score: number;
  }