import { createTheme } from "@mui/material/styles";

const calypso = "#327089";
const duckyBlue = "#83B2C6";
const chestnutRose = "#c8655d";
const pinkyDuck = "#e68984";

const theme = createTheme({
  palette: {
    primary: {
      main: calypso,
      lighter: duckyBlue,
    },
    secondary: {
      main: chestnutRose,
      lighter: pinkyDuck,
    },
    black: {
      main: "#000000",
    },
    white: {
      main: "#ffffff",
    },
    offWhite: {
      main: "#f2f5fb",
    },
    menuItem: {
    main: '#6a717f'
    }
  },
  typography: {
    fontFamily: "Roboto",
    subtitle1: { fontSize: 14, fontWeight: "300" },
    subtitle2: { fontSize: 14, fontWeight: "300" },
    body1: { fontSize: 14, fontWeight: "300" },
    body2: { fontSize: 14, fontWeight: "300" },
  },
});

export default theme;