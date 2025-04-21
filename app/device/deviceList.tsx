import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth'
import { useRouter } from 'expo-router'
import Header from '@/components/Header'
import Room from '@/components/device/room'

export default function DeviceList() {
  const route = useRouter()
  const authContextValue = useContext(AuthContext)
  const { rooms } = authContextValue

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <Header title={'Device List'}/>

      <View style={styles.subHeader}>
        <Text style={[styles.subHeaderText, { color: 'black', opacity: 0.6 }]}>
          Manual control
        </Text>
      </View>

      {/* room */}
      {rooms.map((room, index) => (
        <Room key={index} room={room} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
