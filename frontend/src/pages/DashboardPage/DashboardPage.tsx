import { useMe } from "@/features/auth/hooks/useMe";
import { Button } from "@/shared/api/ui/Button";

export const DashboardPage = () => {
  const { data, isLoading } = useMe();

  const name = data?.name ?? "Guest";
  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "H";

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-logo">HuntTechDash</div>

        <nav className="app-nav">
          <div className="app-nav-item app-nav-item--active">
            <span>Overview</span>
            <span>●</span>
          </div>
          <div className="app-nav-item">
            <span>Analytics</span>
          </div>
          <div className="app-nav-item">
            <span>Users</span>
          </div>
          <div className="app-nav-item">
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div>
            <div className="app-header-title">Hi, {name}</div>
            <div className="app-header-subtitle">
              Сводка по продукту и активностям за сегодня.
            </div>
          </div>

          <div className="app-user">
            <div className="app-user-avatar">{initials}</div>
            <div className="app-user-name">{name}</div>
            <Button
              label="Export"
              size="sm"
              color="bg-sky-500"
              onClick={() => alert("Export clicked")}
            />
          </div>
        </header>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <section className="metric-grid">
              <div className="metric-card">
                <div className="metric-label">Active users</div>
                <div className="metric-value">1 248</div>
                <div className="metric-trend">+12.4% vs прошлой неделей</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Conversions</div>
                <div className="metric-value">3.7%</div>
                <div className="metric-trend">+0.8% vs вчера</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Revenue</div>
                <div className="metric-value">$ 23.4k</div>
                <div className="metric-trend">+5.2% за 7 дней</div>
              </div>
            </section>

            <section className="layout-row">
              <div className="panel">
                <div className="panel-title">Traffic overview</div>
                <div className="chart-placeholder">
                  Здесь может быть график (ECharts, Recharts и т.д.)
                </div>
              </div>

              <div className="panel">
                <div className="panel-title">Latest activity</div>
                <div className="activity-list">
                  <div className="activity-item">
                    <span>Новый пользователь зарегистрировался</span>
                    <span className="activity-meta">2 мин назад</span>
                  </div>
                  <div className="activity-item">
                    <span>Покупка Pro-подписки</span>
                    <span className="activity-meta">18 мин назад</span>
                  </div>
                  <div className="activity-item">
                    <span>Экспорт отчёта в CSV</span>
                    <span className="activity-meta">1 час назад</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
