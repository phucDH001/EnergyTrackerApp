import { Switch } from 'react-native'

const StatusSwitch: React.FC<{ status: boolean }> = ({ status }) => {
  return (
    <Switch
      value={status}
      onValueChange={() => {
        console.log('change')
      }}
      thumbColor={status ? '#3894FF' : '#f4f3f4'}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
    />
  )
}

export default StatusSwitch
