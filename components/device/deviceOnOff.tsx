import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StatusSwitch from '@/components/statusSwitch'
import { Device } from '@/types/roomdata'

const DeviceOnOff: React.FC<{ device: Device }> = ({ device }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View key={device.device_id} style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{device.device_name}</Text>
      <StatusSwitch status={device.status == 'On'} />
    </View>
  )
}

export default DeviceOnOff

const styles = StyleSheet.create({
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 16,
  },
})
