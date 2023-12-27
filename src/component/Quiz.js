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
    const [ questionsAnswered, setQuestionsAnswered] = useState(Array(Quest.length).fill(0))
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
            let array = questionsAnswered;
            array[currentQuestion] = 1;
            setQuestionsAnswered(array);
        } else {
            let array = questionsAnswered;
            array[currentQuestion] = 0;
            setQuestionsAnswered(array);
        }
    }

    const finished = () => {
        checkCorrectAnswer();
        const sum =  questionsAnswered.reduce((partialSum, a) => partialSum + a, 0);
        setScore(sum);
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

    const previous = () => {
        setCurrentQuestion(currentQuestion - 1);
        checkCorrectAnswer();
    }

    const next = () => {
        setCurrentQuestion(currentQuestion + 1);
        checkCorrectAnswer();
        reset();
    }

    let navigate = useNavigate();


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
                        <Button variant="contained" color="error" sx={{m:2 }} onClick={() => startOver()}>
                            Start Over
                        </Button>
                        <Button variant="contained" color="error" sx={{m:2 }}  onClick={() => navigate("/")}>
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
                                        {`${currentQuestion + 1}/${Quest.length}`}
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
                                    <Grid justify="space-between"> 
                                    <div>
                                        {currentQuestion >= Quest.length - 9 && (
                                            <Button variant="contained" color="error" sx={{float: "left", m:2}}
                                                onClick={
                                                    () => previous()
                                                }>
                                                Previous
                                            </Button>
                                        )}
                                        {currentQuestion < Quest.length -1 && (
                                            <Button variant="contained" color="error"  sx={{float: "right",  m:2}} display=
                                            "block" onClick={
                                                () => next()
                                            }>
                                                Next
                                            </Button>
                                        )}
                                        {currentQuestion === Quest.length - 1 && (
                                            <Button variant="contained" colo="error" sx={{float: "right",  m:2}}  display="block" 
                                            onClick={ () => finished()}>
                                                FINISH
                                            </Button>
                                        )}

                                    </div>
                                    </Grid>
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