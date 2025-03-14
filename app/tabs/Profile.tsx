import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../context/auth'
import React, { useContext } from 'react'
import { useRouter } from 'expo-router';

export default function Profile() {
  const authContextValue = useContext(AuthContext)

  if (!authContextValue) {
    // Xử lý trường hợp Context Value là undefined (AuthProvider có thể bị thiếu)
    console.error('AuthContext.Provider is missing!')
    return <Text>Lỗi: Thiếu AuthContext Provider</Text> // Hoặc render UI fallback
  }

  const { logout } = authContextValue

  const router = useRouter()

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}
