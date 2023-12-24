import {
    AppBar, Toolbar, Typography, Button, IconButton,
    Drawer, Link, MenuItem, Box
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

const linkDetails = [
    {
        displayName: "Quiz",
        href: "/Quiz"
    },
    {
        displayName: "Learn",
        href: "/Learn"
    }
]

export default function ResponsiveAppBar() {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })

    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }))
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, [])

    const desktopView = () => {
        return (
            <Toolbar>
                {EarthWonders}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        )
    }

    const drawerWidth = 240;

    const viewMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }))

        return (
            <Toolbar>
                <IconButton onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>

                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                    {getDrawerChoices()}
                </Drawer>

                <div>{EarthWonders}</div>
            </Toolbar>
        )
    }

    const EarthWonders = (
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Earth Wonders
        </Typography>
    )

    const getDrawerChoices = () => {
        return linkDetails.map(({ displayName, href }) => {
            return (
                <Link component={RouterLink} to={href} sx={{ color: "black" }}>
                    <MenuItem>{displayName}</MenuItem>
                </Link>
            )
        })
    }

    const getMenuButtons = () => {
        return linkDetails.map(({ displayName, href }) => {
            console.log(displayName);
            return (
                <Button component={RouterLink} to={href} sx={{ color: "white" }} key={href}>
                    {displayName}
                </Button>

            )
        })
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            < AppBar position="static">
                {mobileView ? viewMobile() : desktopView()}
            </AppBar >
        </Box>
    )
}