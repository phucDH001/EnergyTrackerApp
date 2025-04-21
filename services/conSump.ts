import { Room, Device } from "@/types/roomdata";

const getConSumpOneDevice = async (token: string, device_id: number) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/device/${device_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch device consumption data');
  }

  const data = await response.json();
  return data.devices as Device;
}

const getConSumpRoom = async (token: string, room_id: number) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/list-device/${room_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch room consumption data');
  }

  const data = await response.json();
  return data.devices as Device[];
}

const getConSumpAllDevice = async (token: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/all-device`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all room consumption data');
  }

  const data = await response.json();
  return data.devices as Device[];
}

export { getConSumpOneDevice, getConSumpRoom, getConSumpAllDevice }