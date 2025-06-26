import React, { createContext, useContext, useState, useEffect } from "react";
import { account } from "../api/appwrite";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for session on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await account.get();
        setUser(res);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      setUser(res);
      toast.success("Login successful");
      return true;
    } catch (err) {
      toast.error(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      await account.create("unique()", email, password, name);
      await login(email, password);
      toast.success("Registration successful");
      return true;
    } catch (err) {
      toast.error(err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
