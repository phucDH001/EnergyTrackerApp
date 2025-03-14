import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { UserDataSaved } from '@/types/userdata';

// Định nghĩa interface cho Context Value
interface AuthContextProps {
  isLoading: boolean;
  userToken: string | null;
  userInfo: UserDataSaved | null; // hoặc kiểu dữ liệu cụ thể cho userInfo nếu có
  login: (token: string, userData: UserDataSaved) => Promise<void>;
  logout: () => Promise<void>;
}

// Tạo Context với kiểu dữ liệu đã định nghĩa hoặc undefined
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Thêm kiểu dữ liệu boolean
  const [userToken, setUserToken] = useState<string | null>(null); // Thêm kiểu dữ liệu string | null
  const [userInfo, setUserInfo] = useState<any | null>(null); // Thêm kiểu dữ liệu any | null
  const router = useRouter();

  const login = async (token: string, userData: any) => { // Thêm kiểu dữ liệu cho tham số
    setIsLoading(true);
    setUserToken(token);
    setUserInfo(userData);
    await SecureStore.setItemAsync('userToken', token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await SecureStore.deleteItemAsync('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    let storedToken = await SecureStore.getItemAsync('userToken');
    if (storedToken) {
      setUserToken(storedToken);
      // Optional: Fetch user info based on token and setUserInfo
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const value: AuthContextProps = { // Khai báo biến value và gán kiểu AuthContextProps
    isLoading,
    userToken,
    userInfo,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}> {/* Sử dụng biến value đã định kiểu */}
      {children}
    </AuthContext.Provider>
  );
};