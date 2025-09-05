import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScaledSheet, ms, vs } from 'react-native-size-matters';

const MyGarage = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={ms(26)} color="#000" />
        </TouchableOpacity>
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell-outline" size={ms(22)} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={ms(24)} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>My Garage</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add your car. Track its value.</Text>
        <Text style={styles.cardSubtitle}>
          Add your car to Your Garage to track its market value and cash in when the time is right to sell.
        </Text>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Sign In Text */}
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign in.</Text>
        </Text>

        {/* Placeholder for Car Image */}
        <View style={styles.imagePlaceholder}>
          {/* Replace this with <Image source={require('path/to/your/car.png')} style={styles.image}/> */}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '20@vs',
    paddingHorizontal: '16@s',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20@vs',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: '16@s',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: '20@vs',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: '12@ms',
    padding: '16@s',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: '16@ms',
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: '8@vs',
  },
  cardSubtitle: {
    fontSize: '14@ms',
    color: '#555',
    textAlign: 'center',
    lineHeight: '20@vs',
    marginBottom: '16@vs',
  },
  button: {
    backgroundColor: '#4338CA', // Purple
    paddingVertical: '10@vs',
    paddingHorizontal: '40@s',
    borderRadius: '20@ms',
    marginBottom: '12@vs',
  },
  buttonText: {
    fontSize: '14@ms',
    color: '#fff',
    fontWeight: '600',
  },
  signInText: {
    fontSize: '13@ms',
    color: '#555',
    marginBottom: '16@vs',
  },
  signInLink: {
    fontWeight: '700',
    color: '#000',
  },
  imagePlaceholder: {
    width: '100%',
    height: '180@vs',
    backgroundColor: '#f5f5f5',
    borderRadius: '8@ms',
    marginTop: '8@vs',
  },
  image: {
    width: '100%',
    height: '180@vs',
    resizeMode: 'contain',
  },
});

export default MyGarage;
