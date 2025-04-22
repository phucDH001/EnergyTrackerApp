import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { UserDataSaved } from '@/types/userdata'
import { Room } from '@/types/roomdata'

import { getRoomsAPI } from '@/services/rooms'
import { socket } from '@/utils'

// Định nghĩa interface cho Context Value
interface AuthContextProps {
  isLoading: boolean
  userToken: string
  userInfo: UserDataSaved | undefined // hoặc kiểu dữ liệu cụ thể cho userInfo nếu có
  rooms: Room[] // Hoặc kiểu dữ liệu cụ thể cho rooms nếu có
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  login: (token: string, userData: UserDataSaved) => Promise<void>
  logout: () => Promise<void>
}

// Tạo Context với kiểu dữ liệu đã định nghĩa hoặc undefined
const initContextValue: AuthContextProps = {
  isLoading: true,
  userToken: '',
  userInfo: undefined,
  rooms: [],
  setRooms: () => [],
  login: async () => {
    console.log('fail login of initContextValue')
  },
  logout: async () => {
    console.log('fail logout of initContextValue')
  },
}
export const AuthContext = createContext<AuthContextProps>(initContextValue)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true) // Thêm kiểu dữ liệu boolean
  const [userToken, setUserToken] = useState<string>('') // Thêm kiểu dữ liệu string | null
  const [userInfo, setUserInfo] = useState<UserDataSaved | undefined>(undefined) // Thêm kiểu dữ liệu any | null
  const [rooms, setRooms] = useState<Room[]>([]) // Thêm kiểu dữ liệu RoomData | null
  const router = useRouter()

  const login = async (token: string, userData: UserDataSaved) => {
    // Thêm kiểu dữ liệu cho tham số
    setIsLoading(true)
    setUserToken(token)
    setUserInfo(userData)
    await SecureStore.setItemAsync('userToken', token)
    await SecureStore.setItemAsync('userInfo', JSON.stringify(userData))

    // Fetch rooms based on token and setRooms
    try {
      const roomRec = await getRoomsAPI(token) // Gọi API lấy danh sách phòng
      setRooms(roomRec)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
    setIsLoading(false)
  }

  const logout = async () => {
    setIsLoading(true)
    setUserToken('')
    setUserInfo(undefined)
    await SecureStore.deleteItemAsync('userToken')
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    setIsLoading(true)
    let storedToken = await SecureStore.getItemAsync('userToken')
    if (storedToken) {
      setUserToken(storedToken)
      // Optional: Fetch user info based on token and setUserInfo
      const userInfoString = await SecureStore.getItemAsync('userInfo')
      if (userInfoString) {
        const userInfoData: UserDataSaved = JSON.parse(userInfoString)
        setUserInfo(userInfoData)
      }
      // Fetch rooms based on token and setRooms
      try {
        const roomRec = await getRoomsAPI(storedToken) // Gọi API lấy danh sách phòng
        setRooms(roomRec)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  useEffect(() => {
    if (userInfo && isLoading === false) {
      console.log('rooms 1', rooms)
      socket.connect() // Kết nối socket khi đã có token
      socket.on('connect', () => {
        console.log('Kết nối socket thành công')

        socket.emit('register', { userId: userInfo.UserID })
        console.log('Đã gửi register:', { userId: userInfo.UserID })
      })
      socket.on('mqtt_data', (data) => {
        console.log('data', data)
        const deviceId = data.deviceId
        const value = data.value

        // Sử dụng functional update để đảm bảo luôn cập nhật trên state mới nhất
        setRooms((currentRooms) => {
          return currentRooms.map((room) => {
            const updatedDevices = room.devices.map((device) => {
              if (device.device_id == deviceId) {
                return { ...device, status: value } // Cập nhật trạng thái thiết bị
              }
              return device
            })
            return { ...room, devices: updatedDevices }
          })
        })
      })

      socket.on('disconnect', () => {
        console.log('Kết nối socket đã ngắt')
      })

      return () => {
        socket.off('connect')
        socket.off('mqtt_data')
        socket.off('disconnect')
        socket.disconnect() // Ngắt kết nối khi component unmount
      }
    }
  }, [userInfo, isLoading])

  const value: AuthContextProps = {
    // Khai báo biến value và gán kiểu AuthContextProps
    isLoading,
    userToken,
    userInfo,
    rooms,
    setRooms,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {/* Sử dụng biến value đã định kiểu */}
      {children}
    </AuthContext.Provider>
  )
}
