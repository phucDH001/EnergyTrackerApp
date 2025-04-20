import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useMemo } from 'react'
import Header from '@/components/home/HeaderHome'
import PowerChart from '@/components/home/PowerChart'
import DeviceList from '@/components/home/DeviceList'
import QuickActions from '@/components/home/QuickActions'
import RunningStatus from '@/components/home/RunningStatus'
import { AuthContext } from '@/context/auth'

export default function HomeScreen() {
  // const { isLogin, setIsLogin } = useAuth()

  // if (!isLogin) {
  //   return <Redirect href={'./login'} />
  // }

  const authContextValue = useContext(AuthContext)
  const { userInfo, rooms } = authContextValue

  // Use flatMap to gather all devices into a single array
  const allDevices = useMemo(() => {
    if (!rooms) return []
    return rooms.flatMap((room) => room.devices || [])
  }, [rooms])

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Header username={userInfo?.UserName} />
      <PowerChart />
      <DeviceList deviceList={allDevices} />
      <View style={styles.separate}></View>
      <QuickActions />
      <View style={styles.separate}></View>
      <RunningStatus rooms={rooms} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  separate: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginVertical: 20,
    marginHorizontal: 25,
  },
})
