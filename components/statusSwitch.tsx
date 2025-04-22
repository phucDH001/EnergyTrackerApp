import { Switch } from 'react-native'
import { onOffDeviceAPI } from '@/services/onOffDevice'

interface StatusSwitchProps {
  status: string
  userId: number | undefined
  deviceId: number
  userToken: string
}

const StatusSwitch: React.FC<StatusSwitchProps> = ({
  status,
  userId,
  deviceId,
  userToken,
}) => {
  return (
    <Switch
      value={status == 'ON'}
      onValueChange={() => {
        if (userId && deviceId) {
          onOffDeviceAPI(
            deviceId,
            userId,
            status == 'ON' ? 'OFF' : 'ON',
            userToken
          )
            .then(() => {
              console.log('Device state changed successfully')
            })
            .catch((error) => {
              console.error('Error changing device state:', error)
            })
        }
      }}
      thumbColor={status == 'ON' ? '#3894FF' : '#f4f3f4'}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
    />
  )
}

export default StatusSwitch
