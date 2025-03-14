import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useState, useContext } from 'react'
import { useRouter } from 'expo-router'
import { AuthContext } from '../../context/auth'

export default function SignIn() {
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

  const route = useRouter()
  // const { isLogin, setIsLogin } = useAuth()
  const { login, isLoading } = authContextValue
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    try {
      // **Thay thế bằng endpoint API đăng nhập thực tế của bạn**
      const response = await fetch('http://192.168.1.2:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()
      const token = data.user.Username
      const userData = data.user

      await login(token, userData) // Gọi hàm login từ AuthContext
    } catch (e: any) {
      // need a specific type
      setError(e.message)
      console.error('Login error:', e)
    }
  }

  return (
    <View style={{ height: '100%', padding: 40, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Let's Sign In!</Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo-app.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        Welcome to HDSC
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text>Username</Text>
        <TextInput
          placeholder="Username"
          style={styles.text_input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.text_input}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button}>
          <View>
            <Text
              style={{ fontSize: 18, textAlign: 'center', color: 'white' }}
              onPress={() => {
                // setIsLogin(true)
                // route.push('/(tabs)')
                handleLogin()
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 18, marginTop: 20, textAlign: 'center' }}>
        Or Login with
      </Text>
      <View style={styles.extend_login}>
        <Image
          source={require('../../assets/images/google-icon.png')}
          style={{ width: 50, height: 50 }}
        />
        <Image
          source={require('../../assets/images/facebook-icon.png')}
          style={{ width: 33, height: 33 }}
        />
      </View>
      <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
        Don't have an account?{' '}
        <Text
          style={{
            color: '#3894FF',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}
          onPress={() => route.push('./signUp')}
        >
          Register Now
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3894FF',
    width: 120,
    height: 120,
    borderRadius: 20,
    marginTop: 20,
  },
  text_input: {
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3894FF',
    padding: 10,
    borderRadius: 999,
    marginTop: 30,
  },
  extend_login: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
})
