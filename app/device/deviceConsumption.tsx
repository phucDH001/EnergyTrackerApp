import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth'
import Header from '@/components/Header'
import PowerChart from '@/components/home/PowerChart'
import { useLocalSearchParams } from 'expo-router'

export default function deviceConsumption() {
  const authContextValue = useContext(AuthContext)
  const { userToken } = authContextValue
  const { device, room_name } = useLocalSearchParams()
  const deviceObj = JSON.parse(device as string) 
  return (
    <View style={styles.container}>
      <Header title={'Device Configuration'} />
      <View style={styles.subHeader}>
        <Text style={[styles.subHeaderText, { color: 'black', opacity: 0.6 }]}>
          Room: {room_name}
        </Text>
      </View>
      <View style={[styles.subHeader, { paddingTop: 0 }]}>
        <Text style={[styles.subHeaderText, { color: 'black', opacity: 0.6 }]}>
          Device: {deviceObj.device_name}
        </Text>
      </View>
      <View style={{ marginHorizontal: -16 }}>
        <PowerChart userToken={userToken} deviceConsumpScreen={true} device_id={deviceObj.device_id}/>
      </View>
      <View style={styles.statsBox}>
        <Text style={styles.statsText}>This Week</Text>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Run time:</Text>
          <Text style={styles.label}>15 Hrs 24 Mins</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.label}>Power usage:</Text>
          <Text style={styles.label}>48 KWh</Text>
        </View>
      </View>
    </View>
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
  statsBox: {
    marginTop: 15,
    padding: 16,
  },
  statsText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: { fontSize: 17 },
})
