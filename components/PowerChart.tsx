import { View, Text } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-gifted-charts'

const barData = [
  { value: 5.5, label: 'Mon' },
  { value: 3.1, label: 'Tue' },
  { value: 4.9, label: 'Wed' },
  { value: 6.3, label: 'Thu' },
  { value: 2.3, label: 'Fri' },
  { value: 4.5, label: 'Sat' },
  { value: 3.6, label: 'Sun' },
]

const getMaxValue = () => {
  let maxValue = Math.max(...barData.map((item) => item.value))
  return maxValue > 6.3 ? Math.ceil(maxValue) : Math.floor(maxValue)
}

export default function PowerChart() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 15,
          width: '95%',
          borderWidth: 1,
          borderColor: '#D3D3D3',
        }}
      >
        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Power Consumption (kWh)
        </Text>
        <BarChart
          data={barData}
          height={135}
          barWidth={25}
          initialSpacing={20}
          spacing={16}
          barBorderTopLeftRadius={7}
          barBorderTopRightRadius={7}
          frontColor="#3894FF"
          xAxisThickness={1}
          yAxisThickness={1}
          xAxisColor="#D3D3D3"
          yAxisColor="#D3D3D3"
          dashGap={0}
          noOfSections={getMaxValue()}
          maxValue={getMaxValue()}
        />
        <Text
          style={{
            fontSize: 13,
            color: '#626262',
            textAlign: 'right',
            marginTop: 10,
          }}
        >
          Show more
        </Text>
      </View>
    </View>
  )
}
