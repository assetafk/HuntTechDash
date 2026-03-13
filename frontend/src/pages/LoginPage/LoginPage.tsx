import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";

export const LoginPage = () => {
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <h1 className="auth-title">HuntTechDash</h1>
        <p className="auth-subtitle">
          Войдите в панель, чтобы посмотреть аналитику и управление.
        </p>

        <div className="auth-field">
          <label className="auth-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="auth-button"
          onClick={handleSubmit}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Входим..." : "Войти"}
        </button>

        <div className="auth-footer">
          <span>Demo</span> · HuntTechDash
        </div>
      </div>
    </div>
  );
};
