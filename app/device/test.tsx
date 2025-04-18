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

export default function Test() {
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
        <View key={index} style={styles.deviceContainer}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomName}>{device.name}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#32CD32',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() =>
                route.push({
                  pathname: './deviceConsumption',
                  params: { deviceName: device.name },
                })
              }
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>
                consumption
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.roomDevice}>
            <View style={styles.alignTextRow}>
              <Text style={styles.fieldName}>On/Off</Text>
              <Switch
                value={device.status}
                onValueChange={() => toggleStatus(index)}
                thumbColor={device.status ? '#3894FF' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
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
