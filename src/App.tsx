import { ThemeProvider } from "@emotion/react";
import { Router } from "./Router";
import { CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { CookiesProvider } from "react-cookie";
import { store } from "./features/store";
import { Provider } from "react-redux";

function App() {
  const preferDarkMode = useMediaQuery("(prefers-colors-schema: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferDarkMode ? "dark" : "light",
        },
      }),
    [preferDarkMode]
  );

  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
