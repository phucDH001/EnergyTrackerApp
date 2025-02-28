import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext({
  isLogin: false,
  setIsLogin: (value: boolean) => {},
})

import { ReactNode } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
