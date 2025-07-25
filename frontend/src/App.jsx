import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import { StarterPage } from "./pages/StarterPage";
import LoginForm from "./pages/Authentication/LoginForm";
import HomePage from "./pages/HomePage";
import SignupForm from "./pages/Authentication/SignupForm";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import OTPVerification from "./pages/Authentication/OTPVerification";
import OneClassPage from "./pages/OneClassPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import PrivateRoute from "./private-route/PrivateRoute";
import CheckIsAuthenticated from "./private-route/CheckisAuthenticated";
import NewPassword from "./pages/Authentication/NewPasssword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import InviteStudent from "./pages/InviteStudent";
import InviteTeacherPage from "./pages/inviteTeacher";

function App() {
  const GoogleAuthWraper = () => {
    return (
      <GoogleOAuthProvider clientId="72348332556-qnnvsjcj5jcsrfoa2n7632onuj09275o.apps.googleusercontent.com">
        <LoginForm />
      </GoogleOAuthProvider>
    );
  };
  return (
    <Routes>
      <Route path="/" element={<StarterPage />}></Route>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <CheckIsAuthenticated>
            <GoogleAuthWraper />
          </CheckIsAuthenticated>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <CheckIsAuthenticated>
            <SignupForm />
          </CheckIsAuthenticated>
        }
      ></Route>
      <Route
        path="/forgot-password"
        element={
          <CheckIsAuthenticated>
            <ForgotPassword />
          </CheckIsAuthenticated>
        }
      ></Route>
      <Route
        path="/otp-verification"
        element={
          <CheckIsAuthenticated>
            <OTPVerification />
          </CheckIsAuthenticated>
        }
      ></Route>
      <Route
        path="/new-password"
        element={
          <CheckIsAuthenticated>
            <NewPassword />
          </CheckIsAuthenticated>
        }
      ></Route>
      <Route
        path="/one-class"
        element={
          <PrivateRoute>
            <OneClassPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <SettingPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/invite-student/:code"
        element={
          <PrivateRoute>
            <InviteStudent />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/invite-teacher/:code"
        element={<InviteTeacherPage />}
      ></Route>
    </Routes>
  );
}

export default App;
