import React, { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import Quest from "../sources/quiz.json";
import { CardContent, Typography } from "@mui/material";
import { Box, Card, CartContent, Button, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel }
    from "@mui/material";

const Quiz = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [chosenAnswer, setChosenAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(false);
    const [clickedAnswer, setClickedAnswer] = useState(false);

    const checkAnswer = (answer) => {
        setChosenAnswer(answer);
        setClickedAnswer(true);
    }

    const checkCorrectAnswer = () => {
        if (chosenAnswer === Quest[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    }

    const finished = () => {
        if (currentQuestion === Quest.length - 1) {
            setEnd(true);
        }
    }

    const reset = () => {
        setClickedAnswer(false)
    }

    const startOver = () => {
        setCurrentQuestion(0);
        setEnd(false);
        setChosenAnswer("");
        setScore(0);
    }

    let navigate = useNavigate();
    console.log(Quest);
    console.log(Quest[currentQuestion].question);


    let content = "";

    if (end) {
        content = (
            <Card
                sx={{ height: 335 }}
            >
                <CardContent>
                    <Typography>
                        {`Good Work! Your Final Score is ${score}/${Quest.length}`}
                    </Typography>
                    <div sx={{ p: 20 }}>
                        <Button variant="contained" color="error" onClick={() => startOver()}>
                            Start Over
                        </Button>
                        <Button variant="contained" color="error" onClick={() => navigate("/")}>
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    } else
        content = (
            <>
                <ResponsiveAppBar />
                <Grid container justifyContent="center" sx={{ mt: 5 }}>
                    <div>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" gutterBottom component="div" textAlign="center">
                                    <span>
                                        {`${currentQuestion}/${Quest.length}`}
                                    </span>
                                    <br></br>
                                    {Quest[currentQuestion].question}
                                </Typography>
                            </CardContent>
                            <Box>
                                {Quest[currentQuestion].answers.map((answer, i) => (
                                    <FormControl sx={{ m: 3 }} variant="standard" key={i}>
                                        <FormLabel id="demo-radio-buttons-group-label">
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-error-radios"
                                            name="quiz"
                                            value={chosenAnswer}
                                            onClick={() => checkAnswer(answer)}
                                        >
                                            <FormControlLabel
                                                value={answer}
                                                name="answer"
                                                control={<Radio />}
                                                label={answer}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                ))}
                                {clickedAnswer && (
                                    <div>
                                        {currentQuestion >= Quest.length - 9 && (
                                            <Button variant="contained" color="error"
                                                onClick={
                                                    () => {
                                                        setCurrentQuestion(currentQuestion - 1);
                                                        checkCorrectAnswer();
                                                    }
                                                }>
                                                Previous
                                            </Button>
                                        )}
                                        {currentQuestion < Quest.length -1 && (
                                            <Button variant="contained" color="error" display=
                                            "block" onClick={
                                                () => {
                                                    setCurrentQuestion(currentQuestion + 1);
                                                    checkCorrectAnswer();
                                                    reset();
                                                }
                                            }>
                                                Next
                                            </Button>
                                        )}
                                        {currentQuestion === Quest.length - 1 && (
                                            <Button variant="contained" colo="error" display="block" 
                                            onClick={ () => finished()}>
                                                FINISH
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </Box>
                        </Card>
                    </div>
                </Grid>
            </>
        )

    return (
        <>
            {content}
        </>
    )
}

export default Quiz;