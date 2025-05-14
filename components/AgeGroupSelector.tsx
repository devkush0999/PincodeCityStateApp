import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AgeGroupSelector = () => {
  const ageGroups = [
    { label: '2-3 Years', img: require('../assets/images/kid3.png') },
    { label: '3-4 Years', img: require('../assets/images/kid2.png') },
    { label: '4-5 Years', img: require('../assets/images/kid3.png') },
  ];

  return (
    <View style={styles.container}>
      {ageGroups.map((group, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Image source={group.img} style={styles.image} />
          <Text style={styles.label}>{group.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 ,},
  button: { alignItems: 'center', paddingVertical: 10, paddingHorizontal:20, backgroundColor: '#F9FAFB', borderRadius: 12 , borderWidth:1, borderColor:'#E0E0E0'},
  image: { width: 40, height: 40, marginBottom: 6 },
  label: { fontSize: 12, color: '#000', fontWeight:'600' },
});

export default AgeGroupSelector;
