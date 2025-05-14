import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AgeGroupSelector from '../components/AgeGroupSelector';
import TimelineCard from '../components/TimelineCard';
import TimelineTabs from '../components/TimelineTabs';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [manualInputVisible, setManualInputVisible] = useState(false);
  const [locationData, setLocationData] = useState({ city: '', state: '' });
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAutoDetect = async () => {
    setModalVisible(false);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();

      setLocationData({
        city: data.city || data.locality || 'Unknown',
        state: data.principalSubdivision || 'Unknown',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to get location');
    }
  };

  const handleManualSelect = () => {
    setModalVisible(false);
    setManualInputVisible(true);
  };

  const fetchLocationByPincode = async (enteredPincode: string) => {
    if (enteredPincode.length !== 6) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${enteredPincode}`);
      const data = await response.json();

      if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        setLocationData({ city: postOffice.District, state: postOffice.State });
        setManualInputVisible(false);
      } else {
        setError('Invalid Pincode');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Evening</Text>
          <TouchableOpacity style={styles.talkButton}>
            <Ionicons name="call-outline" size={16} color="#7E22CE" />
            <Text style={styles.talkText}>Talk to Expert </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.location}>
            <Ionicons name="location-outline" size={24} color="#7E22CE" />
          </TouchableOpacity>
        </View>

        {locationData.city !== '' && (
          <View style={styles.locationDisplay}>
            <Text style={styles.locationText}>{locationData.city}, {locationData.state}</Text>
          </View>
        )}

        <Text style={styles.date}>Tuesday, May 12, 2025</Text>
        <Text style={styles.chooseAgeGroup}>Choose Age Group</Text>
        <AgeGroupSelector />

        <Text style={styles.timelineTitle}>Development Timeline</Text>
        <TimelineTabs />

        <TimelineCard title="Learning Goals" desc="Uses 50+ words and begins forming simple sentences" icon="book-outline" color="#2563EB" />
        <TimelineCard title="Problem Solving" desc="Completes simple puzzles with assistance" icon="construct-outline" color="#F97316" />
        <TimelineCard title="Social Skills" desc="Shows interest in playing alongside other children" icon="people-outline" color="#22C55E" />
        <TimelineCard title="Emotional Growth" desc="Expresses basic emotions and recognizes others’ feelings" icon="heart-outline" color="#EF4444" />
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location Option</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAutoDetect}>
              <Text style={styles.modalButtonText}>Auto Detect Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleManualSelect}>
              <Text style={styles.modalButtonText}>Enter Pincode Manually</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close {' '}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={manualInputVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit Pincode"
              keyboardType="numeric"
              value={pincode}
              onChangeText={(text) => {
                setPincode(text);
                if (text.length === 6) fetchLocationByPincode(text);
              }}
              maxLength={6}
            />
            {loading && <ActivityIndicator size="large" color="#7E22CE" />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.closeButton} onPress={() => setManualInputVisible(false)}>
              <Text style={styles.closeButtonText}>Close{' '}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { fontSize: 20, fontWeight: '800' },
  talkButton: { flexDirection:'row', backgroundColor: '#EDE9FE', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
  talkText: { color: '#7E22CE', fontSize: 12 },
  location:{backgroundColor:'#EDE9FE', padding:5, borderRadius:20},
  locationDisplay: { marginTop: 5 },
  locationText: { fontSize: 12, color: '#7E22CE', fontWeight: '500' },
  date: { color: '#A0A0A0', marginTop: 4, marginBottom: 16 },
  chooseAgeGroup: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  timelineTitle: { fontSize: 16, fontWeight: '800', marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  modalButton: { backgroundColor: '#EDE9FE', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 },
  modalButtonText: { color: '#7E22CE', fontSize: 14 },
  closeButton: { marginTop: 10 },
  closeButtonText: { color: 'red' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, width: '100%', fontSize: 16 },
  errorText: { color: 'red', marginTop: 10 },
});
