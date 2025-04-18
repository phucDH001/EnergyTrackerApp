import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StatusSwitch from '@/components/statusSwitch'

const DeviceOnOff: React.FC = ({ device }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View key={device.id} style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{device.name}</Text>
      <StatusSwitch status={device.status} />
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
