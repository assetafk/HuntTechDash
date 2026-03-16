import { useMe } from "@/features/auth/hooks/useMe";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { Button } from "@/shared/api/ui/Button";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const { data, isLoading } = useMe();
  const { data: transactionsData } = useTransactions({ limit: 5, offset: 0 });

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
          <Link to="/transactions" className="app-nav-item">
            <span>Transactions</span>
          </Link>
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
                <div className="metric-label">Revenue (last 7 days)</div>
                <div className="metric-value">
                  {transactionsData
                    ? `${transactionsData.items
                        .filter((tx) => tx.type === "income")
                        .reduce((sum, tx) => sum + Number(tx.amount), 0)
                        .toFixed(2)} ${
                        transactionsData.items[0]?.currency ?? "USD"
                      }`
                    : "—"}
                </div>
                <div className="metric-trend">
                  На основе последних транзакций
                </div>
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
                <div className="panel-title">
                  Latest transactions
                  <Link
                    to="/transactions"
                    className="panel-link"
                    style={{ marginLeft: "auto" }}
                  >
                    Показать все
                  </Link>
                </div>
                <div className="activity-list">
                  {!transactionsData || transactionsData.items.length === 0 ? (
                    <div className="activity-item">
                      <span>Пока нет транзакций</span>
                    </div>
                  ) : (
                    transactionsData.items.map((tx) => (
                      <div key={tx.id} className="activity-item">
                        <span>
                          {tx.type === "income" ? "Доход" : "Расход"} ·{" "}
                          {tx.category ?? "Без категории"}
                        </span>
                        <span className="activity-meta">
                          {new Date(tx.created_at).toLocaleString()} ·{" "}
                          {tx.type === "expense" ? "-" : "+"}
                          {tx.amount} {tx.currency}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
