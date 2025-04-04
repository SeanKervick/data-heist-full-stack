import { QuizQuestion } from "../types/interfaces"

// export array of question objests
export const quizQuestions: QuizQuestion[] = [
    {
      question: "Q1: Which of the following is a strong password?",
      answers: ["9876passwrd49846", "Max1990", "Tr#8!vP29xD"],
      correctAnswer: 2, // index of correct answer
    },
    {
      question: "Q2: What is the primary purpose of a Virtual Private Network (VPN)?",
      answers: [
        "Boost internet speed",
        "To log in to websites from different regions",
        "To secure & encrypt your internet connection",
      ],
      correctAnswer: 2, // index of correct answer
    },
    {
      question: "Q3: Which of the following best defines malware",
      answers: [
        "Software designed to improve system performance",
        "Malicious software intended to damage",
        "A tool used for encryption",
      ],
      correctAnswer: 1, // index of correct answer
    },
  ];