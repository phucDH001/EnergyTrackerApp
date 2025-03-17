import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'

const Header: React.FC<{title: string}> = ({title}) => {
  const route = useRouter()
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => route.back()}>
        <Entypo name="chevron-left" size={28} color="#3894FF" />
      </TouchableOpacity>

      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
