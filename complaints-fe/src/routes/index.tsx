import { Route, Routes } from "react-router-dom";
import Home from "@/pages/common/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
