import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TimelineCard = ({ title, desc, icon, color }) => {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={24} color={color} style={styles.icon} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal:12, backgroundColor: '#fff', borderRadius: 12, borderColor:'#E0E0E0', borderWidth:1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, marginBottom: 10 },
  icon: { marginRight: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 12, color: '#6B7280' },
});

export default TimelineCard;
