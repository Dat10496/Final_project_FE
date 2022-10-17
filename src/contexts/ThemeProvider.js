import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#9e9e9e",
  light: "#757575",
  main: "#616161",
  dark: "#424242",
  darker: "#212121",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#FFD07F",
  light: "#FDA65D",
  main: "#FF8243",
  dark: "#E26A2C",
  darker: "#cc571f",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "Poppins",
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      subtitle2: {
        fontWeight: 600,
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
