import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    if (email === 'admin@freshfoods.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUser({ email, role: 'admin' });
    } else if (email && password) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setUser({ email, role: 'customer' });
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
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