import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
import TableUsers from "../component/TableUsers";
import Home from "../component/Home";
import NotFound from "./NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<TableUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
