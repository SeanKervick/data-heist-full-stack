import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import SiteHeader from "./components/SiteHeader";
// import PasswordCracker from "./pages/challenges/PasswordCrackerPage.tsx";
import SpotThePhish from "./pages/challenges/SpotThePhishPage.tsx";
import QuizRound from "./pages/challenges/QuizRoundPage.tsx";
import FeedbackPage from "./pages/FeedbackPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import GameIntroPage from "./pages/GameIntroPage.tsx";
import CodeExposed from "./pages/challenges/CodeExposedPage.tsx";
import CertInspector from "./pages/challenges/CertInspectorPage.tsx";
import PortWatcher from "./pages/challenges/ThePortWatcherPage.tsx";




const App = () => {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/game-intro" element={<GameIntroPage />} />
        <Route path="/challenge/quiz" element={<QuizRound />} />
        {/*<Route path="/challenge/password-cracker" element={<PasswordCracker />} />*/}
        <Route path="/challenge/spot-the-phish" element={<SpotThePhish />} />
        <Route path="/challenge/code-exposed" element={<CodeExposed />} />
        <Route path="/challenge/cert-inspector" element={<CertInspector />} />
        <Route path="/challenge/port-watcher" element={<PortWatcher />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
