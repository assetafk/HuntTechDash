import { useState } from "react";
import { useCreateTransaction } from "@/features/transactions/hooks/useCreateTransaction";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { Button } from "@/shared/api/ui/Button";

export const TransactionsPage = () => {
  const [limit] = useState(20);
  const [offset] = useState(0);
  const { data, isLoading } = useTransactions({ limit, offset });
  const { mutate, isPending } = useCreateTransaction();

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const amount = Number(formData.get("amount"));
    const type = formData.get("type") as "income" | "expense";
    const currency = (formData.get("currency") as string) || "USD";
    const category = (formData.get("category") as string) || undefined;
    const description = (formData.get("description") as string) || undefined;

    if (!amount || !type) {
      return;
    }

    mutate({
      amount,
      type,
      currency,
      category,
      description,
    });
  };

  return (
    <div className="app-shell">
      <main className="app-main">
        <header className="app-header">
          <div>
            <div className="app-header-title">Transactions</div>
            <div className="app-header-subtitle">
              Список денежных операций по вашему аккаунту.
            </div>
          </div>
        </header>

        <section className="panel">
          <div className="panel-title">Create transaction</div>
          <form className="form-grid" onSubmit={handleCreate}>
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Amount"
            />
            <select name="type" defaultValue="">
              <option value="" disabled>
                Тип
              </option>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
            <input name="currency" placeholder="USD" maxLength={3} />
            <input name="category" placeholder="Категория (например, SaaS)" />
            <input name="description" placeholder="Описание" />
            <Button
              label={isPending ? "Saving..." : "Save"}
              size="sm"
              color="bg-sky-500"
              type="submit"
            />
          </form>
        </section>

        <section className="panel">
          <div className="panel-title">Transactions list</div>
          {isLoading ? (
            <div>Loading...</div>
          ) : !data || data.items.length === 0 ? (
            <div>Пока нет транзакций.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Тип</th>
                  <th>Категория</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.created_at).toLocaleString()}</td>
                    <td>{tx.type}</td>
                    <td>{tx.category ?? "—"}</td>
                    <td>
                      {tx.type === "expense" ? "-" : "+"}
                      {tx.amount} {tx.currency}
                    </td>
                    <td>{tx.status}</td>
                    <td>{tx.description ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

