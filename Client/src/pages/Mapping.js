import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import Chatbot from "./Chatbot";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link as LINK } from "react-router-dom";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";

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

function Mapping() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const columns = [
    { id: "ID", label: "id", minWidth: 170 },
    { id: "ASVS ID", label: "id", minWidth: 100 },
    {
      id: "Category",
      label: "Category",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Sub Category",
      label: "Sub Category",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Requirement Description",
      label: "Requirement",
      minWidth: 170,
      align: "right",
    },
    {
      id: "ASVS level",
      label: "level",
      minWidth: 170,
      align: "right",
    },
    {
      id: "NIST ID",
      label: "id",
      minWidth: 170,
      align: "right",
    },
    {
      id: "NIST Controls",
      label: "nist",
      minWidth: 170,
      align: "right",
    },
  ];
  function createData(
    ID,
    ASVS_ID,
    Category,
    Sub_Category,
    Requirement_description,
    ASVS_level,
    NIST_ID,
    NIST_Controls
  ) {
    return {
      ID,
      ASVS_ID,
      Category,
      Sub_Category,
      Requirement_description,
      ASVS_level,
      NIST_ID,
      NIST_Controls,
    };
  }

  const [FilteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "mappedControls",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.log("Error Fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(FilteredData);
  // console.log(FilteredData[0].Requirement_Description);
  const rows = [];

  for (let i = 0; i < FilteredData.length; i++) {
    if (FilteredData[i].NIST_ID.trim().length !== 0) {
      const data = createData(
        FilteredData[i].ID,
        FilteredData[i].ASVS_ID,
        FilteredData[i].Category,
        FilteredData[i].Sub_Category,
        FilteredData[i].Requirement_Description,
        FilteredData[i].ASVS_level,
        FilteredData[i].NIST_ID,
        FilteredData[i].NIST_Controls
      );
      rows.push(data);
    }
  }
  console.log(rows);
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
                MAPPED CONTROLS
              </Typography>
              <Tooltip title="Profile" placement="top">
                <IconButton color="inherit" style={{ marginRight: "16px" }}>
                  <AccountCircleIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
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
                  fontSize: "55px",
                  fontWeight: "bold",
                  color: "#333",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  letterSpacing: "2px",
                  lineHeight: "1.2",
                }}
              >
                ASVS - NIST Mapped Controls
              </Typography>

              <div>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    marginBottom: "-4rem",
                    marginTop: "8rem",
                    marginLeft: "5rem",
                  }}
                >
                  {" "}
                  From the total 286 ASVS controls, these are the controls that
                  are mapped to NIST standards
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: "none",
                    marginTop: "6rem",
                    maxHeight: "600px",
                  }}
                >
                  <Table
                    sx={{
                      maxWidth: 1500,
                      marginLeft: "5rem",
                      marginTop: "1rem",
                      marginRight: "8rem",
                    }}
                    aria-label="customized table"
                  >
                    <TableHead stickyHeader>
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          ID
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          ASVS ID
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          Category{" "}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          Sub Category{" "}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          Requirement Description
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          ASVS level
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          NIST ID
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ whiteSpace: "nowrap", fontSize: "1.2rem" }}
                        >
                          NIST Controls
                        </StyledTableCell>

                        {/* <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            {row.ID}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.ASVS_ID}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.Category}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Sub_Category}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.Requirement_description}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.ASVS_level}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.NIST_ID}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.NIST_Controls}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">{row.Implemented}</StyledTableCell> */}
                          {/* <StyledTableCell align="left"> */}
                          {/* </StyledTableCell> */}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default function Map() {
  return <Mapping />;
}
