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
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';

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
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        title="Car Comparison"
        showBack={true}
        showDrawer={true}
        showTitle={true}
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

      {/* Background image section (wraps dropdown + continue + texts) */}
      <View style={styles.bgWrapper}>
      <ImageBackground
        source={require('../assets/Images/CarComparisonBG.png')}
        style={styles.bgImage}
        imageStyle={styles.bgImageStyle}>
        {/* Dropdowns */}
        <View style={styles.dropdownWrapper}>
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

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Section texts */}
        <Text style={styles.sectionTitle}>
          Compare Cars & Make{'\n'}the Right Choice
        </Text>
        <Text style={styles.sectionDesc}>
          Find answers to the most common questions about buying, selling, and
          renting cars. If you need more help, feel free to reach out!
        </Text>
      </ImageBackground>
      </View>

      {/* Comparison Card */}
      <View style={styles.cardContainer}>
        {/* Cars + VS */}
        <View style={styles.compareCard}>
          <View style={styles.carBox}>
            <Image
              source={require('../assets/Images/left_car.png')}
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
              source={require('../assets/Images/right_car.png')}
              style={styles.carImage}
              resizeMode="contain"
            />
            <Text style={styles.carName}>Kylad</Text>
            <Text style={styles.carPrice}>Rs. 11,000</Text>
          </View>
        </View>

        {/* View Comparison button inside card */}
        <TouchableOpacity style={styles.viewBtn} activeOpacity={0.85}>
          <Text style={styles.viewText}>View Comparison</Text>
        </TouchableOpacity>
      </View>

      {/* small pager / arrows (like screenshot) */}
      <View style={styles.pagerRow}>
        <TouchableOpacity style={styles.pagerBtn}>
          <Icon name="chevron-left" size={14} color={colors.backgroundColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pagerBtn}>
          <Icon name="chevron-right" size={14} color={colors.white} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CarComparison;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: '16@ms',
    paddingBottom: '40@vs',
  },

  title: {
    fontSize: '20@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    marginTop: '8@vs',
    color: '#111',
  },
  subtitle: {
    fontSize: '12@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    marginTop: '8@vs',
    marginBottom: '14@vs',
    color: colors.hind,
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
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
  },
  activeText: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
  bgWrapper: {
  marginHorizontal: -18, // cancels padding so image can stretch full width
},

  dropdownWrapper: {
    width: '90%',
    alignItems: 'center',
    marginTop: '20@vs',
    marginBottom: '55@vs',
    backgroundColor: colors.white,
    borderRadius: '12@ms',
    paddingVertical: '20@vs',
    alignSelf: 'center',
  },
  dropdown: {
    width: '80%',
    height: '45@vs',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: '8@ms',
    paddingHorizontal: '10@s',
    marginBottom: '15@vs',
    backgroundColor: colors.white,
  },
  dropdownContainer: {
    width: '80%',
    borderRadius: '8@ms',
  },
  continueButton: {
    width: '40%',
    height: '30@vs',
    borderRadius: '25@ms',
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10@vs',
  },
  continueText: {
    color: colors.white,
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.medium,
  },

  bgImage: {
    width: '100%', // full width
    marginTop: '20@vs', // pushes it lower on the screen
    paddingVertical: '20@vs',
    alignItems: 'center',
  },

  bgImageStyle: {
    resizeMode: 'cover',
    marginTop: '170@vs',
  },

  sectionTitle: {
    marginTop: '16@vs',
    fontSize: '30@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'left',
    color: colors.black,
  },
  sectionDesc: {
    fontSize: '14@ms',
    fontFamily:Secondaryfonts.medium,
    textAlign: 'left',
    color: colors.black,
    marginTop: '8@vs',
    paddingHorizontal: '10@s',
  },

  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: '14@ms',
    borderWidth: '1@s',
    borderColor: colors.black,
    paddingVertical: '14@vs',
    paddingHorizontal: '10@s',
    marginHorizontal: '12@s',
    marginTop: '16@vs',
    alignItems: 'center',
  },

  compareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '12@vs',
  },

  carBox: {
    alignItems: 'center',
    flex: 1,
  },

  carImage: {
    width: '140@ms', // bigger car images
    height: '90@vs',
    marginBottom: '8@vs',
  },

  carName: {
    fontFamily: Secondaryfonts.semibold,
    fontSize: '13@ms',
    marginBottom: '4@vs',
    color: colors.black,
  },
  carPrice: {
    fontSize: '12@ms',
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
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
    color: colors.white,
    fontWeight: '700',
    fontSize: '14@ms',
  },

  viewBtn: {
    borderWidth: '1@s',
    borderColor: colors.blue,
    borderRadius: '22@ms',
    paddingVertical: '7@vs',
    paddingHorizontal: '74@s',
  },
  viewText: {
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
    fontSize: '13@ms',
  },

  pagerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '12@vs',
  },
  pagerBtn: {
    width: '86@ms',
    height: '26@ms',
    borderRadius: '18@ms',
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8@s',
  },
});
