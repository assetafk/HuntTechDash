// Update the import path below if your apiClient is located elsewhere
import { apiClient } from '../../../shared/api/client';
// If the correct path is different, adjust accordingly.

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
}

export const authApi = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => 
        {
        const response = await apiClient.post('/auth/login', payload);

        return response.data;
        },
    me: async (): Promise<User> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};


