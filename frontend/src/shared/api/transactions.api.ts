import { apiClient } from "./client";

export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  category?: string | null;
  description?: string | null;
  created_at: string;
}

export interface TransactionListResponse {
  total: number;
  items: Transaction[];
}

export interface GetTransactionsParams {
  limit?: number;
  offset?: number;
}

export interface CreateTransactionPayload {
  amount: number;
  currency?: string;
  type: "income" | "expense";
  status?: string;
  category?: string;
  description?: string;
}

export const getTransactions = async (
  params: GetTransactionsParams = {},
): Promise<TransactionListResponse> => {
  const { data } = await apiClient.get<TransactionListResponse>(
    "/transactions",
    { params },
  );
  return data;
};

export const getTransaction = async (
  id: number,
): Promise<Transaction> => {
  const { data } = await apiClient.get<Transaction>(`/transactions/${id}`);
  return data;
};

export const createTransaction = async (
  payload: CreateTransactionPayload,
): Promise<Transaction> => {
  const { data } = await apiClient.post<Transaction>("/transactions", payload);
  return data;
};
