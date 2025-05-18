import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/common/LandingPage";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard";
import InstitutionsPage from "@/pages/institutions/InstitutionsPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/**
       * AUTH ROUTES
       */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
      </Route>

      {/**
       * DASHBOARD ROUTES
       */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/**
       * INSTITUTIONS ROUTES
       */}
      <Route path="/institutions">
        <Route path="" element={<InstitutionsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
