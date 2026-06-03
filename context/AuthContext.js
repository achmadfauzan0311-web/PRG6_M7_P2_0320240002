import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) setUserData(JSON.parse(data));
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (data) => {
    if (!data) return;
    setUserData(data);
    await AsyncStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = async () => {
    setUserData(null);
    await AsyncStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
