import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getUsersFromStorage } from '../services/mockDb';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for persisted session
    const storedUser = localStorage.getItem('mern_auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    // Mock Login Logic
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('mern_auth_user', JSON.stringify(foundUser));
    } else {
      // Auto-register for demo purposes if not found
      const newUser: User = {
        _id: Math.random().toString(36).substr(2, 9),
        email,
        username: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=random`
      };
      setUser(newUser);
      localStorage.setItem('mern_auth_user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mern_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
