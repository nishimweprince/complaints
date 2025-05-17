import { Route, Routes } from "react-router-dom";
import Home from "@/pages/common/Home";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard";

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
    </Routes>
  );
};

export default Router;
