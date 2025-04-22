import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '@/context/auth'
import Header from '@/components/Header'
import DeviceDetail from '@/components/device/deviceDetail'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function DeviceConfig() {
  const route = useRouter()
  const authContextValue = useContext(AuthContext)
  const { rooms, userToken, userInfo } = authContextValue
  const { room_id } = useLocalSearchParams()
  const roomIndex = rooms.findIndex((room) => room.room_id === Number(room_id))
  const devices = rooms[roomIndex].devices || [] // Lấy danh sách thiết bị trong phòng

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <Header title={'Device Configuration'} />
      <View style={styles.subHeader}>
        <Text style={[styles.subHeaderText, { color: 'black', opacity: 0.6 }]}>
          Room: {rooms[roomIndex].room_name}
        </Text>
      </View>

      {/* devices in room */}
      {devices.map((device, index) => (
        <DeviceDetail
          key={index}
          device={device}
          index={index}
          userToken={userToken}
          userInfo={userInfo}
        />
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
