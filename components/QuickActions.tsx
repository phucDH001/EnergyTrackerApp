import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import Fontisto from '@expo/vector-icons/Fontisto'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function QuickActions() {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quick Actions</Text>
        <TouchableOpacity
          style={{
            height: 25,
            width: 50,
            backgroundColor: '#73E568',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 15 }}>detail</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}
      >
        <View>
          <View style={styles.icon}>
            <FontAwesome5 name="home" size={30} color="#FFCC3F" />
          </View>
          <Text style={styles.tilte}>All lights</Text>
        </View>
        <View>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="party-popper"
              size={30}
              color="#FF7B1C"
            />
          </View>
          <Text style={styles.tilte}>Dinner</Text>
        </View>
        <View>
          <View style={styles.icon}>
            <Fontisto name="film" size={30} color="#1AB44F" />
          </View>
          <Text style={styles.tilte}>Cinema</Text>
        </View>
        <View>
          <View style={styles.icon}>
            <Ionicons name="trash" size={30} color="#3894FF" />
          </View>
          <Text style={styles.tilte}>Remove</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tilte: { fontSize: 15, textAlign: 'center', marginTop: 7 },
})
