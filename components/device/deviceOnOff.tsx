import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StatusSwitch from '@/components/statusSwitch'
import { Device } from '@/types/roomdata'
import { UserDataSaved } from '@/types/userdata'

interface DeviceOnOffProps {
  device: Device
  userToken: string
  userInfo: UserDataSaved | undefined
}

const DeviceOnOff: React.FC<DeviceOnOffProps> = ({
  device,
  userInfo,
  userToken,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View key={device.device_id} style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{device.device_name}</Text>
      <StatusSwitch
        status={device.status}
        userId={userInfo?.UserID}
        deviceId={device.device_id}
        userToken={userToken}
      />
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
