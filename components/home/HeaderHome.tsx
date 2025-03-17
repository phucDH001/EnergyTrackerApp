import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Header() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
      }}
    >
      <View style={{}}>
        <Text style={{ fontSize: 25, color: '#3894FF' }}>Welcome</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#3894FF' }}>
          KKKKK
        </Text>
      </View>
      <Ionicons name="notifications" size={40} color="#FFCC3F" />
    </View>
  )
}
