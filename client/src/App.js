import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Spinner from "components/spinner/spinner.component";

const HomePage = lazy(() => import("scenes/homePage"));
const LoginPage = lazy(() => import("scenes/loginPage"));
const ProfilePage = lazy(() => import("scenes/profilePage"));
const MessengerPage = lazy(() => import("scenes/messengerPage"));

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/messenger/:userId"
              element={isAuth ? <MessengerPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
