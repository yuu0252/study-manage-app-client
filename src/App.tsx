import { ThemeProvider } from "@emotion/react";
import { Router } from "./Router";
import { CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

function App() {
  const preferDarkMode = useMediaQuery("(prefers-colors-schema: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferDarkMode ? "dark" : "dark",
        },
      }),
    [preferDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
