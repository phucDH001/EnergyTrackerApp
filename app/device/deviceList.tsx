import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import DetailButton from '@/components/detailButton'
import Header from '@/components/Header'

const sample_data = [
  {
    id: 1,
    name: 'Living Room',
    devices: [
      { id: 1, name: 'Living room main', status: false },
      { id: 2, name: 'Living room 2', status: true },
      { id: 3, name: 'Living room 3', status: false },
      { id: 4, name: 'Lamps', status: true },
    ],
  },
  {
    id: 2,
    name: 'Bed Room main',
    devices: [
      { id: 5, name: 'Ceiling Light', status: false },
      { id: 6, name: 'Lamps', status: true },
      { id: 7, name: 'Back Lights', status: false },
    ],
  },
  {
    id: 3,
    name: 'Kitchen',
    devices: [
      { id: 8, name: 'Kitchen Main', status: false },
      { id: 9, name: 'Kitchen Shelves', status: true },
      { id: 10, name: 'Back Lights', status: false },
    ],
  },
  {
    id: 4,
    name: 'Bed Room second',
    devices: [
      { id: 11, name: 'Ceiling Lights', status: true },
      { id: 12, name: 'Lamps', status: false },
      { id: 13, name: 'Doors', status: false },
    ],
  },
  {
    id: 5,
    name: 'Garage',
    devices: [
      { id: 14, name: 'Ceiling Lights', status: true },
      { id: 15, name: 'Doors', status: false },
    ],
  },
]

export default function DeviceList() {
  const route = useRouter()

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
      {sample_data.map((room, index) => (
        <View key={room.id} style={styles.roomContainer}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomName}>{room.name}</Text>
            <DetailButton directory={'./test'} />
          </View>
          <View style={styles.divider} />
          <View style={styles.roomDevice}>
            {room.devices.map((device) => (
              <View key={device.id} style={styles.deviceContainer}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Switch
                  value={device.status}
                  onValueChange={() => {console.log('change')}}
                  thumbColor={device.status ? '#3894FF' : '#f4f3f4'}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
              </View>
            ))}
          </View>
        </View>
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
  roomContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
  },
  roomHeader: {
    gap: 15,
    alignItems: 'center',
    paddingVertical: 10,
    flex: 3,
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  roomDevice: {
    flex: 5,
    gap: 0,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 16,
  },
})
