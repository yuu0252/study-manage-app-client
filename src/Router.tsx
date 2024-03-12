import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppLayout } from "./components/layouts/AppLayout";
import { Login } from "./components/auth/Login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chatgpt" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
