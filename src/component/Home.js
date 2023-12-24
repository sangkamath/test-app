import ResponsiveAppBar from "./ResponsiveAppBar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import img from "./../assets/images/earth.jpg"

const Home = (props) => {
    let navigate = useNavigate();

    return (
        <div>
            <ResponsiveAppBar />

            <Typography variant="h6" component="h1" sx={{
                mt: 5,
                pt: 5,
                fontWeight: 600,
                fontSize: 32,
                textAlign: "center"
            }}>
                EARTH
            </Typography>
            <Grid container justifyContent="center">
                <Avatar variant={"rounded"} alt="The Earth" src={img}
                    sx={{ width: 200, height: 200, marginTop: 5, marginBottom: 5 }}
                />
                <br />
                <Typography variant="h6" component="div"
                    align="center">Earth apart from being our home, has a lot of cool fun facts you are
                    probably not aware of. Not to worry, we are gonna get to know some of
                    these facts today. Click the Learn button to start or the Quiz button
                    to check how much you already know.</Typography>
                <div component="span">
                    <Button variant="contained" color="error"
                        onClick={() => navigate("/Quiz")}>
                        Quiz
                    </Button>
                </div>
            </Grid>
            <div sx={{
                display: "flex", justifyContent: "center",
                alignItems: "center"
            }}>
                <Button variant="contained" color="error" onClick={() => navigate("/Learn")}>Learn</Button>
            </div>
        </div>
    )
}

export default Home;