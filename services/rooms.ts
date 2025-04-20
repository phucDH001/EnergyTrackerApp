import { RoomData } from '@/types/roomdata'

const getRooms = async (token: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch rooms')
  }

  const data: RoomData = await response.json()
  return data.rooms
}

export { getRooms as getRoomsAPI }
