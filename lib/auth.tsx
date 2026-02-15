'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (username: string, email: string, role?: Role) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('healthbridge_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (username: string, email: string, role: Role = 'GUEST') => {
        // Enforce Admin Email Check
        let finalRole = role;
        if (role === 'OWNER' && email !== 'projecthealthbridge0701@gmail.com') {
            alert('Access Denied: You are not authorized to be an Owner. Reverting to Guest role.');
            finalRole = 'GUEST';
        }

        const newUser: User = {
            username,
            email,
            role: finalRole,
            exp: 0,
            habits: []
        };
        setUser(newUser);
        localStorage.setItem('healthbridge_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('healthbridge_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
