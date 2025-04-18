import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DetailButton from '@/components/detailButton'
import DeviceOnOff from './deviceOnOff'

const Room: React.FC = ({ room }) => {
  return (
    <View key={room.id} style={styles.roomContainer}>
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{room.name}</Text>
        <DetailButton directory={'./test'} />
      </View>
      <View style={styles.divider} />
      <View style={styles.roomDevice}>
        {room.devices.map((device) => (
          <DeviceOnOff device={device} />
        ))}
      </View>
    </View>
  )
}

export default Room

const styles = StyleSheet.create({
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
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
  roomDevice: {
    flex: 5,
    gap: 0,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})