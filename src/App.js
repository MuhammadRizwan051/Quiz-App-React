import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import {Box, Button, Chip, Grid, Typography} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Timer from "./Timer.js";

function App() {
  let [questions, setQuestions] = useState([
    {
      question: "Which tag is used for starting the body of HTML?",
      options: ["<body>", "<b>", "<bd>", "<br>"],
      correctAns: "<body>",
    },
    {
      question: "Choose the correct HTML element for largest heading.",
      options: ["<heading>", "<h.1>", "<h-1>", "<h1>"],
      correctAns: "<h1>",
    },
    {
      question: "Choose the correct HTML element for starting the paragraph.",
      options: ["<p>", "<para>", "<pg>", "<p1>"],
      correctAns: "<p>",
    },
    {
      question: "Choose the correct HTML element for breaking the line.",
      options: ["<b.r >", "<break />", "<br />", "<br >"],
      correctAns: "<br />",
    },
    {
      question: "HTML Stands For _______________________",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },
    {
      question: "CSS Stands For _______________________",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "JS Stands For _______________________",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "DOM Stands For _______________________",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "RAM Stands For _______________________",
      options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correctAns: "Random Acccess Memory",
    },
    {
      question: "ROM Stands For _______________________",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ]);

  let [indexNumber, setIndexNumber] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  // let [timerMinutes, setTimerMinutes] = useState(3);
  // let [timerSeconds, setTimerSeconds] = useState(10);

  // let interval;

  // const startTimer = () => {
  //   interval = setInterval(() => {
  //     setTimerSeconds(timerSeconds - 1);
  //     if (timerSeconds < 0) {
  //       setTimerMinutes(timerMinutes - 1);
  //       setTimerSeconds(10);
  //     }
  //     else if(timerMinutes==0){
  //       clearInterval(interval)
  //     }
  //   }, 10);
  // };

  // useEffect(() => {
  //   startTimer();
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  let [seconds, setSeconds] = useState(59);
  let [minutes, setMinutes] = useState(4);

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      else if(minutes === 0 && seconds === 0){
        clearInterval(timer)
      }
    }, 10);

    return () => clearInterval(timer);
  });

  // let [second, setSecond]= useState();
  // let interval;

  // const startTimer = ()=>{
  //   interval = setInterval(()=>{
  //     const seconds = 20;

  //   })
  // }

  let checkQuestion = (a, b) => {
    if (a === b) {
      setScore(score + 1);
    }
  };
  let next = () => {
    if (indexNumber + 1 === questions.length) {
      setShowResult(true);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  };

  return (
    <div style={{ backgroundColor: "lightBlue", height: "100vh" }}>
      {showResult ? (
        <>
          <h1>Total Question : {questions.length}</h1>
          <h1>No. of questions attempt : {questions.length}</h1>
          <h1>
            Correct Answer : {score} / {questions.length}
          </h1>
          <h1>Percentage : {Math.round((score * 100) / questions.length)}%</h1>
        </>
      ) : (
        <Box
          id="main"
          sx={{
            bgcolor: "white",
            boxShadow: "0 10px 15px rgba(0,0,0,0.25), 0 0 6px rgba(0,0,0,0.22)",
          }}
        >
          <button>Start</button>
          {/* Time remaining */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip label={`${minutes} : ${seconds}`}></Chip>
          </Box>
          <hr />

          {/* Question */}
          <Box mt={5}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {questions[indexNumber].question}
            </Typography>
          </Box>

          {/* Answer */}
          <Box mt={4}>
            <Grid container>
              {questions[indexNumber].options.map((x, i) => (
                <Grid item xs={12} key={i}>
                  <Typography
                    mb={2}
                    id="options"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      checkQuestion(x, questions[indexNumber].correctAns)
                    }
                  >
                    {`${i + 1}. ${x}`}{" "}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          <hr />

          <Box>
            <Grid container>
              {/* No of questions display */}
              <Grid item xs={7} sm={8} md={6}>
                <Typography variant="h6" color="primary">
                  {indexNumber + 1} of {questions.length} Questions
                </Typography>
              </Grid>
              {/* Next button */}
              <Grid item xs={5} sm={4} md={6} align="right">
                <Button
                  id="next"
                  my={5}
                  color="primary"
                  variant="contained"
                  onClick={next}
                >
                  Next Quiz
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Score Display on each question */}
          <Box mt={4}>
            <Typography align="center" variant="h5">
              Score: {score}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default App;

{
  /* {questions.map((e, i) => (
          <Box>
            <Typography variant="body1" key={i}>
              {e.question}
            </Typography>
            <Typography variant="body2">{e.options}</Typography>
          </Box>
        ))} */
}
