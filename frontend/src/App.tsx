import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { LoginPage } from "@pages/LoginPage/LoginPage";
import { DashboardPage } from "@pages/DashboardPage/DashboardPage";
import { TransactionsPage } from "@pages/TransactionsPage/TransactionsPage";

export default function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      <Route
        path="/dashboard"
        element={
          token ? <DashboardPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/transactions"
        element={
          token ? <TransactionsPage /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}
