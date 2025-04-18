import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import Header from '@/components/Header'
import DeviceDetail from '@/components/device/deviceDetail'
import { useRouter } from 'expo-router'

const sample_devides = [
  {
    id: 1,
    name: 'Kitchen Main',
    turnOnTime: '11:30 AM',
    turnOffTime: '05:30 PM',
    maxConsumption: '100 Wh',
    status: true,
  },
  {
    id: 2,
    name: 'Kitchen Shelves',
    turnOnTime: '11:30 AM',
    turnOffTime: '05:30 PM',
    maxConsumption: '100 Wh',
    status: false,
  },
  {
    id: 3,
    name: 'Back Lights',
    turnOnTime: '11:30 AM',
    turnOffTime: '05:30 PM',
    maxConsumption: '100 Wh',
    status: false,
  },
]

export default function DeviceConfig() {
  const route = useRouter()
  const [devices, setDevices] = useState(sample_devides)

  const toggleStatus = (index: number) => {
    const updatedDevices = [...devices]
    updatedDevices[index].status = !updatedDevices[index].status
    setDevices(updatedDevices)

    // Cập nhật dữ liệu mới lên backend
  }

  const handleConsumption = (index: number) => {}

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <Header title={'Device Configuration'} />
      <View style={styles.subHeader}>
        <Text style={[styles.subHeaderText, { color: 'black', opacity: 0.6 }]}>
          Room:
        </Text>
      </View>

      {/* devices in room */}
      {devices.map((device, index) => (
        <DeviceDetail
          key={index}
          device={device}
          index={index}
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
