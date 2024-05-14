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
import { useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Chatbot from "../pages/Chatbot";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link as LINK } from "react-router-dom";
import axios from "axios";
import "../pages/ProjectDetails.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

function ProjectDetails() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `projects/${projectId}`
        );
        console.log(response);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  console.log(project);

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
                Project Details
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

              <div className="project-details-container">
                {project && (
                  <>
                    <div className="details-line">
                      <p1>Name of the Product:</p1> <p2>{project.name}</p2>
                    </div>
                    <div className="details-line">
                      <p1>Product Type :</p1> <p2>{project.Product_type}</p2>
                    </div>
                    <div className="details-line">
                      <p1>Description :</p1> <p2>{project.description}</p2>
                    </div>
                    <div className="details-line">
                      <p1>Types of HTTP methods used in the product :</p1>{" "}
                      <p2>{project.HTTP_used}</p2>
                    </div>
                    <div className="details-line">
                      <p1>File related features available in the product :</p1>{" "}
                      <p2>{project.files}</p2>
                    </div>
                    <div className="details-line">
                      <p1>System and Server outage tolerance :</p1>{" "}
                      <p2>{project.system}</p2>
                    </div>
                    <div className="details-line">
                      <p1>Data used :</p1> <p2>{project.data_used}</p2>
                    </div>
                    <div className="details-line">
                      <p1>Mechanism used for handling user input :</p1>{" "}
                      <p2>{project.mech_used}</p2>
                    </div>
                    {/* Display other project details */}
                  </>
                )}
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default function Controls() {
  return <ProjectDetails />;
}
