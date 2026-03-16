import { useQuery } from "@tanstack/react-query";
import {
  GetTransactionsParams,
  TransactionListResponse,
  getTransactions,
} from "@/shared/api/transactions.api";

export const transactionsKeys = {
  all: ["transactions"] as const,
  list: (params: GetTransactionsParams = {}) =>
    [...transactionsKeys.all, "list", params] as const,
};

export const useTransactions = (params: GetTransactionsParams = {}) => {
  return useQuery<TransactionListResponse>({
    queryKey: transactionsKeys.list(params),
    queryFn: () => getTransactions(params),
  });
};

