// filepath: d:\Microsoft VSCode repos\EnergyTrackerApp\utils\index.ts
import { io } from "socket.io-client";

// export const socket = io(`${process.env.EXPO_PUBLIC_BE_URL_LOCAL}`, {
export const socket = io(`${process.env.EXPO_PUBLIC_BE_URL_LOCAL}`, {
  transports: ['websocket'],
  reconnectionAttempts: 15,
  reconnectionDelay: 500,
  reconnection: true,
  autoConnect: false // Đảm bảo chỉ kết nối khi gọi socket.connect()
});