import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface RoomStatusCardProps {
  title: string
  active: number
  inactive: number
  bgColor: string
}

const RoomStatusCard: React.FC<RoomStatusCardProps> = ({
  title,
  active,
  inactive,
  bgColor,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.card_header}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
          {title}
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>Active: {active}</Text>
        <Text style={styles.text}>Inactive: {inactive}</Text>
      </View>
    </View>
  )
}

export default function RunningStaus() {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
        Running Status
      </Text>
      <View style={styles.container}>
        <RoomStatusCard
          title="Living Room"
          active={2}
          inactive={3}
          bgColor="#FFCC3F"
        />
        <RoomStatusCard
          title="Bed Room"
          active={1}
          inactive={2}
          bgColor="#1AB44F"
        />
        <RoomStatusCard
          title="Kitchen"
          active={2}
          inactive={4}
          bgColor="#3894FF"
        />
        <RoomStatusCard
          title="Store Room"
          active={1}
          inactive={3}
          bgColor="#FF7B1C"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  card: {
    width: '47.5%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { fontSize: 16, color: 'white' },
})
