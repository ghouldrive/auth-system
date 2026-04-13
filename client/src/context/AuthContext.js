import { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get('/profile');
        setUser(res.data.data.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};