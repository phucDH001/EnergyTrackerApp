import { Device } from "@/types/roomdata";

const getAllDevices = async (token: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BE_URL}/room/all-device`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }

  const data = await response.json();
  return data.devices as Device[]; // Assuming the response contains a 'devices' array
}

export { getAllDevices as getAllDevicesAPI };