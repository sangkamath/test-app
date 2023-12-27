import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Typography, styled, Box, Paper, Grid } from "@mui/material";
import Facts from "../sources/facts.json";
import Data from "../sources/credit.json";

const Learn = (props) => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }));

    return (
        <div>
            <ResponsiveAppBar />
            {
                Facts.map((fact, i) => (
                    <Box key={i} sx={{ flexGrow: 1, mt: 5 }}>
                        <Grid container spacing={2} elevation={9} justifyContent="center"
                            sx={{ m: "auto" }}>
                            <Grid item xs={8}>
                                <Item>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        component="div"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {fact.id}. {fact.title}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {fact.content}
                                    </Typography>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                ))
            }
            {
                Data && Data.map((credit, i) => {
                    return (
                        <div key={i}>
                            <Grid container justifyContent="center" sx={{pt:5}}>
                                <Item>
                                    <Typography variant="h5" gutterBottom component="div">
                                        The information above was gotten from the following sources
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {credit.First}
                                        <br />
                                        {credit.Second}
                                        <br />
                                        {credit.Last}
                                    </Typography>
                                </Item>
                            </Grid>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Learn;