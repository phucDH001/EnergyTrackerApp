import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { AuthContext } from '@/context/auth'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import Collapsible from 'react-native-collapsible'
import Header from '@/components/Header'

import { createRoomAPI, addDeviceAPI } from '@/services/addDevice'
import { getRoomsAPI } from '@/services/rooms'

interface RadioButtonProps {
  title: string
  status: string
  onPress: (title: string) => void
}

const RadioButon: React.FC<RadioButtonProps> = React.memo(
  ({ title, status, onPress }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <TouchableOpacity
          style={{
            height: 22,
            width: 22,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: '#3894FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onPress(title)}
        >
          {status === title ? (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 999,
                backgroundColor: '#3894FF',
              }}
            />
          ) : null}
        </TouchableOpacity>
        <Text style={{ fontSize: 17 }}>{title}</Text>
      </View>
    )
  }
)

const AddNewADevice:React.FC = () => {
  const { userToken, rooms, setRooms } = useContext(AuthContext)
  const { device } = useLocalSearchParams()

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [selectedTiming, setSelectedTiming] = useState('Auto')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [repeatDays, setRepeatDays] = useState<string[]>([])
  const [existingRoom, setExistingRoom] = useState(rooms.map((room) => {
    return {
      label: room.room_name,
      value: room.room_id,
      new: false,
    }
  }))

  const newDevice = JSON.parse(device as string)

  const handleRepeatToggle = (day: string) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter((d) => d !== day))
    } else {
      setRepeatDays([...repeatDays, day])
    }
  }

  const handleSaveRoomName = () => {
    if (!newRoomName) return
    if (existingRoom.some((room) => room.label === newRoomName)) {
      alert('Room name already exists')
      return
    }
    const newRoom = {
      label: newRoomName,
      value: 0,
      new: true,
    }
    const addExistingRoom = [...existingRoom, newRoom]
    setExistingRoom(addExistingRoom)
  }

  const handleAddDevice = async () => {
    if (!selectedRoom) {
      alert('Please select a room')
      return
    }
    const room = existingRoom.find((room) => room.value === selectedRoom)
    if (room?.new) {
      try {
        const response = await createRoomAPI(selectedRoom, userToken)
        if (response.status === 200) {
          const roomId = response.data.room.room_id
          await addDeviceAPI(newDevice, roomId, userToken)
          const updatedRooms = await getRoomsAPI(userToken)
          setRooms(updatedRooms)
          // navigate back to the previous screen
          Alert.alert('Device added successfully', 'Room created successfully', [
            {
              text: 'OK',
              onPress: () => {
                const router = useRouter()
                router.back()
              },
            },
          ])

        } else {
          alert('Failed to create room')
        }
      } catch (error) {
        console.error('Error creating room:', error)
      }
    } else {
      const selectedRoomId = existingRoom.find((room) => room.label === selectedRoom)?.value
      if (!selectedRoomId) {
        alert('Room not found')
        return
      }
      await addDeviceAPI(newDevice, selectedRoomId, userToken)
      const updatedRooms = await getRoomsAPI(userToken)
      setRooms(updatedRooms)
      // navigate back to the previous screen
      Alert.alert('Device added successfully', '', [
        {
          text: 'OK',
          onPress: () => {
            const router = useRouter()
            router.back()
          },
        },
      ])
    }
  }

  const handleRadioChange = useCallback((title: string) => {
    setSelectedTiming(title)
  }, [])

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 16,
      }}
    >
      <Header title="Configure New Device" />
      <Text style={{ marginTop: 20 }}>Device Name:</Text>
      {/* <TextInput placeholder="Device Name" style={styles.text_input} /> */}
      <Text style={styles.text_input}>{newDevice.device_name}</Text>
      <Text style={{ marginTop: 20 }}>Select Room:</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <Dropdown
          style={[styles.text_input, { width: '72%' }]}
          data={existingRoom}
          labelField="label"
          valueField="value"
          placeholder="Select Room"
          value={selectedRoom}
          onChange={(item) => setSelectedRoom(item.label)}
        />
        <Text>or</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.text_create_new_room}>create </Text>
          <Text style={styles.text_create_new_room}>new room</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={[styles.text_input, { width: 225 }]}
              placeholder="New Room Name"
              value={newRoomName}
              onChangeText={setNewRoomName}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  backgroundColor: 'white',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#3894FF',
                  borderRadius: 999,
                  marginTop: 20,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text
                  style={{
                    color: '#3894FF',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  backgroundColor: '#3894FF',
                  padding: 10,
                  borderRadius: 999,
                  marginTop: 20,
                }}
                onPress={() => {
                  handleSaveRoomName()
                  setModalVisible(!modalVisible)
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 17 }}>Timing:</Text>
        <RadioButon
          title="Auto"
          status={selectedTiming}
          onPress={handleRadioChange}
        />
        <RadioButon
          title="Manual"
          status={selectedTiming}
          onPress={handleRadioChange}
        />
      </View>
      <Collapsible
        style={{ paddingHorizontal: 1 }}
        collapsed={selectedTiming === 'Auto'}
        // need more inspection
      >
        <Text style={{ marginTop: 5 }}>Start Time:</Text>
        <TextInput
          style={styles.text_input}
          placeholder="hh:mm"
          value={startTime}
          onChangeText={setStartTime}
        />
        <Text style={{ marginTop: 10 }}>End Time:</Text>
        <TextInput
          style={styles.text_input}
          placeholder="hh:mm"
          value={endTime}
          onChangeText={setEndTime}
        />
        <Text style={{ marginTop: 10 }}>Repeat on Days:</Text>
        <View style={styles.daysContainer}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                repeatDays.includes(day) && styles.selectedDay,
              ]}
              onPress={() => handleRepeatToggle(day)}
            >
              <Text style={repeatDays.includes(day) && { color: 'white' }}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Collapsible>

      {/* need onPress prop */}
      <TouchableOpacity
        style={{
          backgroundColor: '#3894FF',
          padding: 10,
          borderRadius: 999,
          marginTop: 25,
        }}
        onPress={handleAddDevice}
      >
        <View>
          <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
            Confirm
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AddNewADevice

const styles = StyleSheet.create({
  text_input: {
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  text_create_new_room: {
    textAlign: 'center',
    color: '#3894FF',
    fontSize: 14,
    fontWeight: '500',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 9,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 5,
  },
  selectedDay: {
    backgroundColor: '#3894FF',
    borderColor: '#3894FF',
  },
})
