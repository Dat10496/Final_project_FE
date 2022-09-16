import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AdminPage from "../pages/AdminPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PaymentPage from "../pages/PaymentPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/collections/:brand" element={<HomePage />} />
        <Route path="/items/:id" element={<DetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
      </Route>
      <Route
        element={
          <AuthRequire>
            <BlankLayout />
          </AuthRequire>
        }
      >
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
