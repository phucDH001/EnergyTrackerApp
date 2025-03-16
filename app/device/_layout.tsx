import React from 'react'
import { Stack } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="deviceList" />
      {/* <Stack.Screen name="test" /> */}
    </Stack>
  )
}
