import React, { useState, createContext, useContext } from "react";
import { storeToken, getToken } from "../helpers/tokenStorage";
import { login as loginHelper } from "./../api/authAPI";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface Context {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  token: null,
  username: null,
  login: async () => false,
  logout: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const storedToken = getToken();
  const [token, setToken] = useState<string | null>(storedToken);

  const setAxiosToken = (token: string | null) => {
    token === null
      ? (axios.defaults.headers["Authorization"] = null)
      : (axios.defaults.headers["Authorization"] = `Bearer ${token}`);
  };

  setAxiosToken(storedToken);

  const login = async (username: string, password: string) => {
    const token = await loginHelper(username, password);

    storeToken(token);
    setToken(token);

    token === null ? setAxiosToken(null) : setAxiosToken(token);

    return token !== null;
  };

  const logout = async () => {
    if (token === null) return false;
    setAxiosToken(null);
    setToken(null);
    storeToken(null);
    return true;
  };

  axios.interceptors.response.use(
    (value) => value,
    (error) => {
      if (error.response && error.response.status) {
        if (error.response.status === 403 || error.response.status === 401) {
          logout();
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: token != null,
        token,
        username: token != null ? (jwt_decode(token) as any)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] : null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
