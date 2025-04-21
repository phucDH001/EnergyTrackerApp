const createRoom = async (roomName: string, token: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roomName: roomName }),
  })

  if (!response.ok) {
    throw new Error('Failed to add room')
  }

  const data = await response.json()
  return data
}

const addDevice = async (deviceId : number, roomId: number, token: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/add-device`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId, roomId }),
  })

  if (!response.ok) {
    throw new Error('Failed to add device')
  }

  const data = await response.json()
  return data
}

export { createRoom as createRoomAPI, addDevice as addDeviceAPI }
