import { Route, Routes } from "react-router-dom";
import Home from "@/pages/common/Home";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard";
import InstitutionsPage from "@/pages/institutions/InstitutionsPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
