import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PaymentPage from "../pages/PaymentPage";
import HistoryPage from "../pages/HistoryPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/page/:page" element={<HomePage />} />
        <Route path="/items/:id" element={<DetailPage />} />
        <Route path="/filter/:value" element={<HomePage />} />
        <Route path="/filter/:value/page/:page" element={<HomePage />} />
        <Route path="/search/:search" element={<HomePage />} />
        <Route path="/search/:search/page/:page" element={<HomePage />} />
        <Route path="/sort/:sort" element={<HomePage />} />
        <Route path="/sort/:sort/page/:page" element={<HomePage />} />
      </Route>

      <Route
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/history/:id" element={<HistoryPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
