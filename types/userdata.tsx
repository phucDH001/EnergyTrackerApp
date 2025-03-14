export interface UserDataSaved {
  name: string
  email: string
  room: Room[]
}

export interface Room {
  name: string
  id: number
  device: Device[]
}

export interface Device {
  name: string
  id: number
  key: string
}
