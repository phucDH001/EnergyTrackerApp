import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DetailButton from '@/components/detailButton'
import DeviceOnOff from './deviceOnOff'
import { Room as RoomType } from '@/types/roomdata'
import { UserDataSaved } from '@/types/userdata'

interface RoomProps {
  room: RoomType
  userToken: string
  userInfo: UserDataSaved | undefined
}

const Room: React.FC<RoomProps> = ({ room, userInfo, userToken }) => {
  return (
    <View key={room.room_id} style={styles.roomContainer}>
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{room.room_name}</Text>
        <DetailButton
          directory={'./deviceConfig'}
          params={{ room_id: room.room_id }}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.roomDevice}>
        {room.devices.map((device) => (
          <DeviceOnOff
            device={device}
            userToken={userToken}
            userInfo={userInfo}
          />
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
