import { ThemeProvider } from "@emotion/react";
import { Router } from "./Router";
import { CssBaseline, createTheme } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { store } from "./features/store";
import { Provider } from "react-redux";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

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
