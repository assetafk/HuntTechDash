import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';


export const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: authApi.me,
        retry: false,
    });
};