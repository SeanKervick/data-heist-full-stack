import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000", // black background
      paper: "#000000",
    },
    text: {
      primary: "#00FF00", // matrix green
      secondary: "#66FF66", // light green
    },
    primary: {
      main: "#00FF00", // matrix green buttons, links, etc.
    },
    secondary: {
      main: "#66FF66",
    },
  },
  typography: {
    fontFamily: "Courier New", // hacker-style/matrix font
    fontSize: 14, // default text size
    h1: {
      fontSize: "5rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "monospace",
      fontSize: "1rem",
    },

  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          textAlign: "center",
        },
      },
    },
  },
});

export default darkTheme;
