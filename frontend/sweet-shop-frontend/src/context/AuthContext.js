import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API_BASE = "https://sweet-shop-backend-2-imm1.onrender.com";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const parseResponse = async (res) => {
    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }

    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const decodeRoleFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role || "user";
    } catch {
      return "user";
    }
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseResponse(res);

    const decodedRole = decodeRoleFromToken(data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", decodedRole);

    setToken(data.token);
    setRole(decodedRole);
  };

  const register = async (payload) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await parseResponse(res);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token,
        isAdmin: role === "admin",
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
