export interface RoomData {
  rooms: Room[]
}

export interface Room {
  room_name: string
  room_id: number
  devices: Device[]
  adafruit_key?: string
  user_id?: number
}

export interface Device {
  device_name: string
  device_id: number
  room_id: number
  status: string
  adafruit_key?: string
  turnOnTime?: string
  turnOffTime?: string
  maxConsumption?: string
}
