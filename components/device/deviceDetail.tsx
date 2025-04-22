import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DetailButton from '../detailButton'
import StatusSwitch from '../statusSwitch'

import { Device } from '@/types/roomdata'
import { UserDataSaved } from '@/types/userdata'

import React, { useState } from 'react'

interface DeviceDetailProps {
  device: Device
  index: number
  userToken: string
  userInfo: UserDataSaved | undefined
}

const DeviceDetail = ({ device, index, userToken, userInfo }: DeviceDetailProps) => {
  const [isLoadingTurnOnOff, setIsLoadingTurnOnOff] = useState(false)

  return (
    <View key={index} style={styles.deviceContainer}>
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{device.device_name}</Text>
        <DetailButton directory={'./deviceConsumption'} params={device} />
      </View>
      <View style={styles.divider} />
      <View style={styles.roomDevice}>
        <View style={styles.alignTextRow}>
          <Text style={styles.fieldName}>On/Off</Text>
          <StatusSwitch
            status={device.status}
            userId={userInfo?.UserID}
            deviceId={device.device_id}
            userToken={userToken}
          />
        </View>
        <View style={styles.alignTextRow}>
          <Text style={styles.fieldName}>Turn on time</Text>
          <Text style={styles.fieldName}>{device.turnOnTime}</Text>
        </View>
        <View style={[styles.alignTextRow, { marginTop: 10 }]}>
          <Text style={styles.fieldName}>Turn off time</Text>
          <Text style={styles.fieldName}>{device.turnOffTime}</Text>
        </View>
        <View style={[styles.alignTextRow, { marginVertical: 8 }]}>
          <Text style={styles.fieldName}>Max consumption</Text>
          <Text style={styles.fieldName}>{device.maxConsumption}</Text>
        </View>
      </View>
    </View>
  )
}

export default DeviceDetail

const styles = StyleSheet.create({
  deviceContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  roomHeader: {
    gap: 15,
    alignItems: 'center',
    paddingVertical: 10,
    flex: 3,
  },
  roomDevice: { flex: 6 },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alignTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldName: { fontSize: 15 },
})
