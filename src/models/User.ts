export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    clearAuth: () => void;
}