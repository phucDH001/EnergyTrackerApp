// filepath: d:\Microsoft VSCode repos\EnergyTrackerApp\utils\index.ts
import { io } from "socket.io-client";

export const socket = io("http://192.168.1.14:3000", {
  transports: ['websocket'],
  reconnectionAttempts: 15,
  reconnectionDelay: 500,
  reconnection: true,
  autoConnect: false // Đảm bảo chỉ kết nối khi gọi socket.connect()
});