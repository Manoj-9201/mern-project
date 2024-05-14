import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "../dashboard/sidenav";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { Chart } from "primereact/chart";
import { useParams } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import Chatbot from "../pages/Chatbot";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link as LINK } from "react-router-dom";
import CodeIcon from '@mui/icons-material/Code';
import JoinInnerIcon from '@mui/icons-material/JoinInner';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

const handleLogout = () => {
    window.location.href = "/";
};


function ControlsContent(props) {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };



    return (
        <div>
            <ThemeProvider theme={mdTheme} id="pagetodownload">
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: "24px", // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: "36px",
                                    ...(open && { display: "none" }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Home
                            </Typography>
                            <Tooltip title="Profile" placement="top">
                                <IconButton color="inherit" style={{ marginRight: "16px" }}>
                                    <AccountCircleIcon style={{ fontSize: "30px" }} />
                                </IconButton>
                            </Tooltip>
                            {/* <Tooltip title="Logout" placement="top">
                                <IconButton color="inherit" onClick={handleLogout}>
                                    <LogoutIcon style={{ fontSize: "30px" }} />
                                </IconButton>
                            </Tooltip> */}
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <MainListItems />
                            <Divider sx={{ margin: "1rem" }} />
                            {/* <SecondaryListItems /> */}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            // backgroundColor: (theme) =>
                            //   theme.palette.mode === "light"
                            //     ? theme.palette.grey[100]
                            //     : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Toolbar />
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>


                            <Typography
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    textAlign: "center",
                                    fontSize: "75px",
                                    fontWeight: "bold",
                                    color: "#333",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                                    letterSpacing: "2px",
                                    lineHeight: "1.2",
                                }}
                            >
                                Secure Your Product !
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    marginTop: '8rem', // Adjust the margin-top value to move the boxes down
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 280,
                                        marginLeft: '-4rem',
                                        marginBottom: '6rem',
                                        // Add margin-bottom to create space between boxes
                                        height: '13vw',
                                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        borderRadius: '10px !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "column",
                                        fontFamily: 'Montserrat, sans-serif',

                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            marginTop: '2px',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem', // Adjust the font size as desired
                                            color: '#333',

                                        }}
                                    >
                                        Start assessing
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'transform 0.2s ease', // Add transition property for smooth effect
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Adjust the scale value to control the pop-up effect
                                            },
                                        }}
                                    >
                                        <LINK to="/dashboard">
                                            <PlayArrowIcon
                                                sx={{
                                                    fontSize: '180px',
                                                    color: "#1976d2",
                                                }}
                                            />
                                        </LINK>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: 280,
                                        marginLeft: '9rem',
                                        marginBottom: '2rem',
                                        height: '13vw',
                                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        borderRadius: '10px !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            marginTop: '2px',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem', // Adjust the font size as desired
                                            color: '#333',

                                        }}
                                    >
                                        Create new project
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'transform 0.2s ease', // Add transition property for smooth effect
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Adjust the scale value to control the pop-up effect
                                            },
                                        }}
                                    >
                                        <LINK to="/productinfo">
                                            <AddIcon
                                                sx={{
                                                    fontSize: '180px',
                                                    color: "#1976d2",
                                                }}
                                            />
                                        </LINK>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: 280,
                                        marginLeft: '9rem',
                                        marginBottom: '2rem',
                                        height: '13vw',
                                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        borderRadius: '10px !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            marginTop: '8px', // Add margin to create space between text and icon
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{

                                                fontWeight: 'bold',
                                                fontSize: '1.5rem', // Adjust the font size as desired
                                                color: '#333',

                                            }}
                                        >
                                            Your previous projects
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: "1rem",
                                            alignItems: 'center',
                                            transition: 'transform 0.2s ease', // Add transition property for smooth effect
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Adjust the scale value to control the pop-up effect
                                            },
                                        }}
                                    ><LINK to="/projects">
                                            <FolderSpecialIcon
                                                sx={{
                                                    fontSize: '160px',
                                                    color: "#1976d2",
                                                }}
                                            />
                                        </LINK>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    marginTop: '1rem', // Adjust the margin-top value to move the boxes down
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 280,
                                        marginLeft: '-5rem',
                                        marginBottom: '6rem',
                                        height: '13vw',
                                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        borderRadius: '10px !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            marginTop: '1rem',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                            color: '#333',
                                        }}
                                    >
                                        Code Samples
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'transform 0.2s ease', // Add transition property for smooth effect
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Adjust the scale value to control the pop-up effect
                                            },
                                        }}
                                    ><LINK to="/CodeSample">
                                            <CodeIcon
                                                sx={{
                                                    fontSize: '180px',
                                                    color: '#1976d2',
                                                }}
                                            />
                                        </LINK>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: 280,
                                        marginLeft: '10rem',
                                        marginBottom: '10rem',
                                        height: '13vw',
                                        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        borderRadius: '10px !important',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            marginTop: '1rem',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                            color: '#333',
                                        }}
                                    >
                                        Mapped Controls
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'transform 0.2s ease', // Add transition property for smooth effect
                                            '&:hover': {
                                                transform: 'scale(1.2)', // Adjust the scale value to control the pop-up effect
                                            },
                                        }}
                                    ><LINK to="/Mapping">
                                            <JoinInnerIcon
                                                sx={{
                                                    fontSize: '180px',
                                                    color: '#1976d2',
                                                }}
                                            />
                                        </LINK>
                                    </Box>
                                </Box>
                            </Box>

                        </div>
                    </Box>
                </Box>
            </ThemeProvider>
        </div >
    );
}

export default function Controls() {
    return <ControlsContent />;
}


