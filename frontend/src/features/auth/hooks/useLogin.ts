import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from "@/App/store/auth.store";

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setToken(data.access_token);
        },
    });
};