import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TimelineTabs = () => {
  const tabs = ['3 Months ', '6 Months ', '9 Months ', '12 Months '];
  const [selected, setSelected] = useState('3 Months ');

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} onPress={() => setSelected(tab)} style={[styles.tab, selected === tab && styles.activeTab]}>
          <Text style={[styles.tabText, selected === tab && styles.activeText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginTop: 12, marginBottom: 16 },
  tab: { paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#F9FAFB', borderRadius: 10, marginRight: 8 },
  activeTab: { backgroundColor: '#7E22CE' },
  tabText: { fontSize: 14, color: '#6B7280' },
  activeText: { color: '#fff' },
});

export default TimelineTabs;
