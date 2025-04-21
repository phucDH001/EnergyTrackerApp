import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import DetailButton from '../detailButton'
import StatusSwitch from '../statusSwitch'
import { Href } from 'expo-router'
import { Device } from '@/types/roomdata'

export default function DeviceList({ deviceList }: { deviceList: Device[] }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const route = useRouter()

  return (
    <View style={{ margin: 10, marginTop: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
              Device List
            </Text>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
              <View>
                <Text style={{ fontSize: 18, color: 'blue' }}>
                  {isCollapsed ? (
                    <FontAwesome name="chevron-up" size={18} color="#A6A6A6" />
                  ) : (
                    <FontAwesome
                      name="chevron-down"
                      size={18}
                      color="#A6A6A6"
                    />
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <DetailButton
            directory={'/device/deviceList' as Href}
            params={null}
          />
        </View>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <ScrollView
          nestedScrollEnabled
          style={{
            marginTop: 10,
            height: 250,
            borderWidth: 1,
            borderColor: '#D3D3D3',
            borderRadius: 15,
          }}
        >
          {deviceList.map((device, index) => (
            <View key={index} style={{ marginHorizontal: 10 }}>
              <View
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
                  }}
                >
                  {device.device_name}
                </Text>
                <StatusSwitch status={device.status == 'On'} />
              </View>
            </View>
          ))}
        </ScrollView>
      </Collapsible>
    </View>
  )
}
