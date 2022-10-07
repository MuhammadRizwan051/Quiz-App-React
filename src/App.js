import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  TextField,
  CardMedia,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

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

  let [fName, setFName] = useState("");
  let [lName, setLName] = useState("");
  let [indexNumber, setIndexNumber] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [showQuestions, setShowQuestions] = useState(false);
  let [disabled, setDisabled] = useState(true);
  let [name, setName] = useState("");

  let givenMinutes = 0;
  let givenSeconds = 10;
  let givenMiliSeconds = 10;

  let [miliSec, setMiliSec] = useState(0);
  let [sec, setSec] = useState(givenSeconds);
  let [min, setMin] = useState(givenMinutes);

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setMiliSec(miliSec - 1);

      if (miliSec === 0) {
        setSec(sec - 1);
        setMiliSec(59);
      }
    }, 5);

    return () => clearInterval(timer);
  });

  let getName = (val) => {
    setName(val);
    name == "" ? setDisabled(true) : setDisabled(false);
  };

  let start = () => {
    setMiliSec(59);
    setSec(9);
    setShowQuestions(true);
  };
  let stop = () => {
    clearInterval(timer);
    setShowResult(true);
  };
  useEffect(() => {
    if (sec === 0 && miliSec === 0) {
      stop();
    }
  });

  let checkQuestion = (a, b) => {
    if (a === b) {
      setScore(score + 1);
    }
    if (indexNumber + 1 === questions.length) {
      setShowResult(true);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  };
  // let next = () => {
  //   if (indexNumber + 1 === questions.length) {
  //     setShowResult(true);
  //   } else {
  //     setIndexNumber(indexNumber + 1);
  //   }
  // };

  return (
    <div
      style={{
        backgroundColor: "lightBlue",
        backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/123/958/393/hd-1080p-nature-download-1920x1200-wallpaper-preview.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: "100vh",
      }}
    >
      {showQuestions ? (
        showResult ? (
          <div id="end">
            <Box
              id="result"
              sx={{
                bgcolor: "white",
                boxShadow:
                  "0 10px 15px rgba(0,0,0,0.25), 0 0 6px rgba(0,0,0,0.22)",
              }}
            >
              <Typography variant="h4" align="center" color="error">
                <b>{name}</b>
              </Typography>
              <Typography variant="h6" align="center" mb={4}>
                <b>Quiz attempted successfully.</b>
              </Typography>
              <Typography variant="h6">
                Total Question : {questions.length}
              </Typography>
              {/* <Typography>No. of questions attempt : {questions.length}</Typography> */}
              <Typography variant="h6">
                Correct Answer : {score} / {questions.length}
              </Typography>
              <Typography variant="h6">
                Percentage : {Math.round((score * 100) / questions.length)}%
              </Typography>
              <Typography mt={5} variant="h4" align="center" color="error">
                <b>{Math.round((score * 100) / questions.length)}% Score</b>
              </Typography>
            </Box>
          </div>
        ) : (
          // Main
          <div id="question">
            <Box
              id="main"
              sx={{
                bgcolor: "white",
                boxShadow:
                  "0 10px 15px rgba(0,0,0,0.25), 0 0 6px rgba(0,0,0,0.22)",
              }}
            >
              {/* Time remaining */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <AccessAlarmsIcon />{" "}
                <span style={{ marginLeft: "10px" }}> {`${min} : ${sec}`}</span>
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

              {/* <Box>
                <Grid container> */}
              {/* No of questions display */}
              {/* <Grid item xs={7} sm={8} md={6}>
                    <Typography variant="h6" color="primary">
                      {indexNumber + 1} of {questions.length} Questions
                    </Typography>
                  </Grid> */}
              {/* Next button */}
              {/* <Grid item xs={5} sm={4} md={6} align="right">
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
              </Box> */}

              {/* Score Display on each question */}
              <Box mt={4}>
                <Typography align="center" variant="h5">
                  Score: {score}
                </Typography>
              </Box>
            </Box>
          </div>
        )
      ) : (
        <div id="start">
          <Box
            id="detail"
            sx={{
              bgcolor: "white",
              boxShadow:
                "0 10px 15px rgba(0,0,0,0.25), 0 0 6px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="data:image/jpeg;base64,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"
                style={{ width: "80%", textAlign: "center" }}
              />
            </div>
            <Typography
              variant="h5"
              align="center"
              mb={4}
              sx={{ fontFamily: "cursive" }}
            >
              You have {givenSeconds} seconds to solve the quiz, each question
              carry equal marks. Please provide us your name and then click
              below button to start the quiz
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              id="standard-basic"
              label="First Name"
              variant="outlined"
              onChange={(e) => getName(e.target.value)}
            />
            <Box my={5} sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={start} disabled={disabled} variant="contained">
                Click to start Quiz
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
export default App;
