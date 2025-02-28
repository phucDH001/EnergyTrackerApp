import { Stack } from 'expo-router'
import { AuthProvider } from '../config/AuthContext'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}
