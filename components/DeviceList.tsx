import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const rooms = [
  {
    name: 'Living Room',
    details: ['Living room main', 'Living room 2', 'Living room 3', 'Lamps'],
    status: ['off', 'off', 'off', 'on'],
  },
  {
    name: 'Bed Room main',
    details: ['Ceiling Light', 'Lamps', 'Back Lights'],
    status: ['off', 'on', 'off'],
  },
  {
    name: 'Kitchen',
    details: ['Kitchen Main', 'Kitchen Shelves', 'Back Lights'],
    status: ['on', 'off', 'on'],
  },
  {
    name: 'Bed Room second',
    details: ['Ceiling Lights', 'Lamps', 'Doors'],
    status: ['off', 'on', 'off'],
  },
  {
    name: 'Garage',
    details: ['Ceiling Lights', 'Doors'],
    status: ['on', 'off'],
  },
]

export default function DeviceList() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
          Device List
        </Text>
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
          <Text style={{ fontSize: 18, color: 'blue' }}>
            {isCollapsed ? (
              <FontAwesome name="chevron-up" size={18} color="#A6A6A6" />
            ) : (
              <FontAwesome name="chevron-down" size={18} color="#A6A6A6" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <ScrollView
          style={{
            marginTop: 10,
            height: 250,
            borderWidth: 1,
            borderColor: '#D3D3D3',
            borderRadius: 15,
          }}
        >
          {rooms.map((room, index) => (
            <View key={index}>
              <View>
                {room.details.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: 'black',
                        marginLeft: 20,
                      }}
                    >
                      {detail}
                    </Text>
                    <Switch style={{ marginRight: 10 }} />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </Collapsible>
    </View>
  )
}
