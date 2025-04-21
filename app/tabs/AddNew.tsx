import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { getAllDevicesAPI } from '@/services/allDevice';
import Header from '@/components/Header';
import { Device } from '@/types/roomdata';

export default function AddNew() {
  const authContextValue = useContext(AuthContext);
  const { userToken } = authContextValue;
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      if (!userToken) {
        setError('User token is missing. Please log in again.');
        return;
      }
      const allDevices = await getAllDevicesAPI(userToken);
      // const unTrackedDevices = allDevices.filter(device => device.room_id == undefined);
      // setDevices(unTrackedDevices);
      setDevices(allDevices);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch devices:', err);
      setError('Could not load devices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceSelect = (device : Device) => {
    router.push({
      pathname: '/addNew/AddNew',
      params: { device: JSON.stringify(device) }
    });
  };

  const renderDevice = ({ item }: { item: Device }) => (
    <TouchableOpacity 
      style={styles.deviceItem}
      onPress={() => handleDeviceSelect(item)}
    >
      <View style={styles.deviceContent}>
        <Text style={styles.deviceName}>{item.device_name}</Text>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add New Device" />
      
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading available devices...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchDevices}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.instructionText}>
              Select a device to add to your home
            </Text>
            <FlatList
              data={devices}
              renderItem={renderDevice}
              keyExtractor={(item) => item.device_id.toString()}
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceContent: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceType: {
    fontSize: 14,
    color: '#666',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#999',
  },
});