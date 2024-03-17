import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Memo } from "./pages/memo/Memo";
import { AppLayout } from "./components/layouts/AppLayout";
import { Login } from "./components/auth/Login";
import { Home } from "./pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/categories/:categoryId/memos/:memoId"
            element={<Memo />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
