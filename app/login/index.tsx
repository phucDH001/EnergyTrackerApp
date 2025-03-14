import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const route = useRouter()

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.image}>
        <Image
          source={require('../../assets/images/login.png')}
          style={{ width: 375, height: 375 }}
        />
      </View>
      <View style={styles.info}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}
        >
          See the Change, Save the Energy!
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Monitor appliances and auto-control devices when consumption exceeds
          limits.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => route.push('./login/signIn')}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#3894FF',
              }}
            >
              Continue
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'white', marginTop: 10 }}>
          Note: By clicking Continue, you will agree to our terms and
          conditions.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingBottom: 30,
  },
  info: {
    padding: 35,
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#3894FF',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 999,
    marginTop: 30,
  },
})
