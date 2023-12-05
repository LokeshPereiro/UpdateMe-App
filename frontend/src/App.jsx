import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProfilePage } from "./views";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const { mode, token } = useSelector((state) => state.appState);
  const currTheme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={currTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={token ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={token ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
