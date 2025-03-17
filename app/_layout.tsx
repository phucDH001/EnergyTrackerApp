import { Stack, useRouter } from 'expo-router'
import { AuthProvider, AuthContext } from '../context/auth'
import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNavigator />
    </AuthProvider>
  )
}

const RootLayoutNavigator: React.FC = () => {
  const authContextValue = useContext(AuthContext)

  if (!authContextValue) {
    // Xử lý trường hợp Context Value là undefined (AuthProvider có thể bị thiếu)
    console.error('AuthContext.Provider is missing!')
    return (
      <View>
        <Text>Lỗi: Thiếu AuthContext Provider</Text>
      </View>
    ) // Hoặc render UI fallback
  }

  const { userToken } = authContextValue

  const router = useRouter()

  useEffect(() => {
    if (userToken == null) {
      // Nếu không có token và không phải đang loading, điều hướng đến trang đăng nhập
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace('/login'); // Điều hướng đến màn hình đăng nhập (app/login/index.tsx hoặc app/login.tsx)
    } else {
      // Nếu có token và không phải đang loading, điều hướng đến trang chủ
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace(`/tabs`); // Điều hướng đến nhóm tab (app/(tabs)/index.tsx) - hoặc '/index' nếu muốn đến app/index.tsx
    }
  }, [userToken])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Các route khác của ứng dụng sẽ được render ở đây */}
    </Stack>
  )
}
