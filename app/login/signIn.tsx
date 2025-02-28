import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../config/AuthContext'

export default function SignIn() {
  const route = useRouter()
  const { isLogin, setIsLogin } = useAuth()

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
        <TextInput placeholder="Username" style={styles.text_input} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.text_input}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text
          style={{ fontSize: 18, textAlign: 'center', color: 'white' }}
          onPress={() => {
            setIsLogin(true)
            route.push('/(tabs)')
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
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
