import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateTransactionPayload,
  Transaction,
  createTransaction,
} from "@/shared/api/transactions.api";
import { transactionsKeys } from "./useTransactions";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, CreateTransactionPayload>({
    mutationFn: (payload) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all,
      });
    },
  });
};

