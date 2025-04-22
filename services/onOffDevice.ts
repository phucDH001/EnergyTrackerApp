const onOffDevice = async (
  deviceId: number,
  userId: number,
  state: 'ON' | 'OFF',
  token: string
) => {
  try {
    console.log(`${process.env.EXPO_PUBLIC_BE_URL_LOCAL}/devices/${userId}/${deviceId}`)
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BE_URL_LOCAL}/devices/${userId}/${deviceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          state: state,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to control device')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error controlling device:', error)
    throw error
  }
}

export { onOffDevice as onOffDeviceAPI }
