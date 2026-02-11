import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@pages/DashboardPage/DashboardPage";
import { LoginPage } from "@pages/LoginPage/LoginPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Страница логина */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};
