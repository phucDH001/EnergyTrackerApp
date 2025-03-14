import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import Header from '@/components/Header'
import PowerChart from '@/components/PowerChart'
import DeviceList from '@/components/DeviceList'
import QuickActions from '@/components/QuickActions'
import RunningStatus from '@/components/RunningStatus'
// import { useAuth } from '../../config/AuthContext'

export default function HomeScreen() {
  // const { isLogin, setIsLogin } = useAuth()

  // if (!isLogin) {
  //   return <Redirect href={'./login'} />
  // }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Header />
      <PowerChart />
      <DeviceList />
      <View style={styles.separate}></View>
      <QuickActions />
      <View style={styles.separate}></View>
      <RunningStatus />
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
