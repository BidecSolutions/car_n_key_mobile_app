// src/screens/CarComparison.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constant/colors'; // adjust import path to your project
import {Header} from '../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const makes = [
  {label: 'Toyota', value: 'toyota'},
  {label: 'Honda', value: 'honda'},
  {label: 'BMW', value: 'bmw'},
];

const models = [
  {label: 'Camry', value: 'camry'},
  {label: 'Civic', value: 'civic'},
  {label: 'Corolla', value: 'corolla'},
];

const years = [
  {label: '2025', value: '2025'},
  {label: '2024', value: '2024'},
  {label: '2023', value: '2023'},
];

const CarComparison: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<1 | 2>(1);
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      {/* Header */}
      <Header
        showBack={true}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        iconColor={colors.black}
        titleColor={colors.black}
      />
      <Text style={styles.subtitle}>
        Make smarter choices by comparing features, specs, and prices of your
        favorite cars — all in one place.
      </Text>

      {/* Toggle buttons */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggleBtn, selectedCar === 1 && styles.activeBtn]}
          onPress={() => setSelectedCar(1)}>
          <Text
            style={[styles.toggleText, selectedCar === 1 && styles.activeText]}>
            Detail of Car 1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggleBtn, selectedCar === 2 && styles.activeBtn]}
          onPress={() => setSelectedCar(2)}>
          <Text
            style={[styles.toggleText, selectedCar === 2 && styles.activeText]}>
            Detail of Car 2
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dropdowns */}
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={makes}
        labelField="label"
        valueField="value"
        placeholder="Choose a Make"
        value={make}
        onChange={item => setMake(item.value)}
      />

      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={models}
        labelField="label"
        valueField="value"
        placeholder="Choose a Model"
        value={model}
        onChange={item => setModel(item.value)}
      />

      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={years}
        labelField="label"
        valueField="value"
        placeholder="Choose a Year"
        value={year}
        onChange={item => setYear(item.value)}
      />

      <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Background hero/car image */}
      <ImageBackground
        source={require('../assets/Images/Car.png')} 
        style={styles.bgImage}
        imageStyle={styles.bgImageStyle}>
        {/* optional overlay content */}
      </ImageBackground>

      {/* Section */}
      <Text style={styles.sectionTitle}>
        Compare Cars & Make the Right Choice
      </Text>
      <Text style={styles.sectionDesc}>
        Find answers to the most common questions about buying, selling, and
        renting cars. If you need more help, feel free to reach out!
      </Text>

      {/* Comparison Card */}
      <View style={styles.compareCard}>
        <View style={styles.carBox}>
          <Image
            source={require('../assets/Images/Car.png')} // replace
            style={styles.carImage}
            resizeMode="contain"
          />
          <Text style={styles.carName}>Camry</Text>
          <Text style={styles.carPrice}>Rs. 10,000</Text>
        </View>

        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.carBox}>
          <Image
            source={require('../assets/Images/Car.png')} // replace
            style={styles.carImage}
            resizeMode="contain"
          />
          <Text style={styles.carName}>Kylad</Text>
          <Text style={styles.carPrice}>Rs. 11,000</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewBtn} activeOpacity={0.85}>
        <Text style={styles.viewText}>View Comparison</Text>
      </TouchableOpacity>

      {/* small pager / arrows (like screenshot) */}
      <View style={styles.pagerRow}>
        <TouchableOpacity style={styles.pagerBtn}>
          <Icon name="chevron-left" size={14} color={colors.backgroundColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pagerBtn}>
          <Icon name="chevron-right" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CarComparison;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: '16@ms',
    paddingBottom: '40@vs',
  },

  title: {
    fontSize: '20@ms',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: '8@vs',
    color: '#111',
  },
  subtitle: {
    fontSize: '12@ms',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: '8@vs',
    marginBottom: '14@vs',
    color: '#666',
    paddingHorizontal: '8@s',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '12@vs',
  },
  toggleBtn: {
    paddingVertical: '8@vs',
    paddingHorizontal: '14@s',
    borderRadius: '25@ms',
    borderWidth: '1@s',
    borderColor: '#E6E6E6',
    marginHorizontal: '6@s',
    backgroundColor: '#F8F8F8',
  },
  activeBtn: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  toggleText: {
    fontSize: '12@ms',
    color: '#222',
    fontFamily: 'Poppins-Regular',
  },
  activeText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },

  dropdown: {
    height: '40@vs',
    borderRadius: '22@ms',
    borderWidth: '1@s',
    borderColor: '#E6E6E6',
    paddingHorizontal: '12@s',
    marginTop: '10@vs',
    backgroundColor: '#fff',
    padding:'16@s',
  },
  dropdownContainer: {
    borderRadius: '12@ms',
    backgroundColor: '#fff',
  },

  continueBtn: {
    marginTop: '12@vs',
    backgroundColor: colors.blue,
    paddingVertical: '10@vs',
    borderRadius: '22@ms',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: '13@ms',
  },

  bgImage: {
    height: '160@vs',
    marginTop: '18@vs',
    borderRadius: '12@ms',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bgImageStyle: {
    borderRadius: '12@ms',
  },

  sectionTitle: {
    marginTop: '16@vs',
    fontSize: '16@ms',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#111',
  },
  sectionDesc: {
    fontSize: '12@ms',
    textAlign: 'center',
    color: '#444',
    marginTop: '8@vs',
    paddingHorizontal: '10@s',
  },

  compareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16@vs',
    marginHorizontal: '8@s',
  },
  carBox: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '12@vs',
    borderRadius: '12@ms',
  },
  carImage: {
    width: '110@ms',
    height: '70@vs',
    marginBottom: '8@vs',
  },
  carName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: '13@ms',
    marginBottom: '4@vs',
    color: '#111',
  },
  carPrice: {
    fontSize: '12@ms',
    color: '#666',
  },

  vsCircle: {
    width: '44@ms',
    height: '44@ms',
    borderRadius: '22@ms',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10@s',
  },
  vsText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: '14@ms',
  },

  viewBtn: {
    borderWidth: '1@s',
    borderColor: colors.blue,
    borderRadius: '22@ms',
    paddingVertical: '10@vs',
    alignItems: 'center',
    marginHorizontal: '20@s',
    marginTop: '8@vs',
  },
  viewText: {
    color: colors.blue,
    fontFamily: 'Poppins-Medium',
    fontSize: '13@ms',
  },

  pagerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '12@vs',
  },
  pagerBtn: {
    width: '36@ms',
    height: '36@ms',
    borderRadius: '18@ms',
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8@s',
  },
});
