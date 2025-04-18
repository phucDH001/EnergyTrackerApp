import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Href } from 'expo-router'
import React from 'react'

const DetailButton: React.FC<{directory: Href, params: any}> = ( {directory, params} ) => {
  const route = useRouter()
  return (
    <TouchableOpacity
      style={styles.detailButton}
      onPress={() => route.push({
        pathname: directory,
        params: params,
      })}
    >
      <Text style={styles.detailButtonText}>detail</Text>
    </TouchableOpacity>
  )
}

export default DetailButton

const styles = StyleSheet.create({
  detailButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  },
})
