import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { useRouter } from 'expo-router'
import { getConSumpAllDevice } from '@/services/conSump'

interface BarDataType {
  value: number
  label: string
}

const barDataInit : BarDataType[] = [
  { value: 10, label: 'Mon' },
  { value: 20, label: 'Tue' },
  { value: 50, label: 'Wed' },
  { value: 40, label: 'Thu' },
  { value: 700, label: 'Fri' },
  { value: 40, label: 'Sat' },
  { value: 50, label: 'Sun' },
]

export default function PowerChart({ userToken }: { userToken: string }) {
  const route = useRouter()
  const [barData, setBarData] = useState(barDataInit)
  const [isLoading, setIsLoading] = useState(false)
  const [maxValue, setMaxValue] = useState(100)
  const [sections, setSections] = useState(5)

  useEffect(() => {
    // Initial fetch
    fetchAndUpdateData()

    // Set up interval for periodic updates
    const intervalId = setInterval(() => {
      fetchAndUpdateData()
    }, 1000 * 10) // Update every 5 seconds

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId)
  }, [userToken])

  const fetchAndUpdateData = async () => {
    if (!userToken || isLoading) return

    setIsLoading(true)
    try {
      const devices = await getConSumpAllDevice(userToken)

      if (devices && devices.length > 0) {
        // deep copy barDataInit to avoid mutating the original data
        const newBarData = JSON.parse(JSON.stringify(barDataInit))
        devices.forEach((device) => {
          if (device.monday) {
            newBarData[0].value += device.monday || 0
          }
          if (device.tuesday) {
            newBarData[1].value += device.tuesday || 0
          }
          if (device.wednesday) {
            newBarData[2].value += device.wednesday || 0
          }
          if (device.thursday) {
            newBarData[3].value += device.thursday || 0
          }
          if (device.friday) {
            newBarData[4].value += device.friday || 0
          }
          if (device.saturday) {
            newBarData[5].value += device.saturday || 0
          }
          if (device.sunday) {
            newBarData[6].value += device.sunday || 0
          }
        })
        const { maxValue, sections } = calculateChartScale(newBarData)
        setMaxValue(maxValue)
        setSections(sections)
        setBarData(newBarData)
      }
    } catch (error) {
      console.error('Error fetching consumption data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateChartScale = (data: BarDataType[]) => {
    const maxValue = Math.max(...data.map((item) => item.value))

    // Tính số phần chia phù hợp dựa trên giá trị lớn nhất
    if (maxValue <= 10) {
      return { maxValue: 10, sections: 5 }
    } else if (maxValue <= 50) {
      return { maxValue: 50, sections: 5 }
    } else if (maxValue <= 100) {
      return { maxValue: 100, sections: 5 }
    } else if (maxValue <= 500) {
      return { maxValue: 500, sections: 5 }
    } else if (maxValue <= 1000) {
      return { maxValue: 1000, sections: 5 }
    } else if (maxValue <= 3000) {
      return { maxValue: 3000, sections: 5 }
    } else if (maxValue <= 5000) {
      return { maxValue: 5000, sections: 5 }
    } else if (maxValue <= 10000) {
      return { maxValue: 10000, sections: 5 }
    
    } else {
      // Làm tròn lên đến hàng nghìn gần nhất và chia thành 5 phần
      const roundedMax = Math.ceil(maxValue / 10000) * 10000
      return { maxValue: roundedMax, sections: 5 }
    }
  }

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
          noOfSections={sections}
          maxValue={maxValue}
          yAxisTextStyle={{ fontSize: 10 }}
          yAxisLabelTexts={Array(sections + 1)
            .fill(0)
            .map((_, i) => ((maxValue / sections) * i).toString())}
          showFractionalValues={true}
          roundToDigits={1}
        />
        <Text
          style={{
            fontSize: 13,
            color: '#626262',
            textAlign: 'right',
            marginTop: 10,
          }}
          onPress={() => route.push('/powerChart/PowerChartDetail')}
        >
          Show more
        </Text>
      </View>
    </View>
  )
}
