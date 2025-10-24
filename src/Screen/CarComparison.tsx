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
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
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
        showBack={true}
        showDrawer={true}
        showTitle={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        iconColor={colors.black}
        titleColor={colors.black}
        onBackPress={() => navigation.goBack()}
      />
      <Text style= {styles.title}>Car Comparison</Text>
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
              placeholderStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: '#666'}}
              itemTextStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: colors.black}}
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
              placeholderStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: '#666'}}
              itemTextStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: colors.black}}
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
              placeholderStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: '#666'}}
              itemTextStyle= {{fontSize: moderateScale(13), fontFamily: Secondaryfonts.medium, color: colors.black}}
            />

            {selectedCar === 1 ? (
              // Continue for Car 1
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => setSelectedCar(2)}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              // Back + See Comparison for Car 2
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.equalButtonBack}
                  onPress={() => setSelectedCar(1)}>
                  <Text style={styles.continueTextBack}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.equalButton}
                  onPress={() => {
                    navigation.navigate('CarComparisonDetail');
                  }}>
                  <Text style={styles.continueText}>See Comparison</Text>
                </TouchableOpacity>
              </View>
            )}
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
          <Icon name="arrow-left" size={16} color={colors.backgroundColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pagerWhiteBtn}>
          <Icon name="arrow-right" size={16} color={colors.black} />
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
    fontFamily: Secondaryfonts.medium,
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
    marginHorizontal: -18, 
    bottom: '60@vs',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12@vs',
    gap: '12@s', // spacing between buttons (RN 0.71+)
  },

  equalButton: {
    flex: 1, // makes both equal width
    maxWidth: '130@ms', // keeps them compact and equal
    backgroundColor: colors.blue,
    paddingVertical: '5@vs',
    borderRadius: '18@ms',
    alignItems: 'center',
  },
  equalButtonBack: {
    flex: 1, // makes both equal width
    maxWidth: '130@ms', // keeps them compact and equal
    backgroundColor: colors.white,
    paddingVertical: '5@vs',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '18@ms',
    alignItems: 'center',
  },

  continueButton: {
    backgroundColor: colors.blue,
    paddingVertical: '5@vs',
    paddingHorizontal: '24@ms',
    borderRadius: '18@ms',
    alignItems: 'center',
    alignSelf: 'center', // keeps Continue centered
    marginTop: '12@vs',
  },

  continueButtonSmall: {
    backgroundColor: '#000',
    paddingVertical: '10@vs',
    paddingHorizontal: '20@ms',
    borderRadius: '8@ms',
    alignItems: 'center',
    marginHorizontal: '8@ms', // spacing between Back & See Comparison
  },

  continueText: {
    color: colors.white,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  continueTextBack: {
    color: colors.black,
    fontSize: '12@ms',
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
    marginTop: '130@vs',
  },

  sectionTitle: {
    marginTop: '16@vs',
    fontSize: '30@ms',
    fontFamily: Primaryfonts.medium,
    alignSelf: 'flex-start',
    color: colors.black,
    marginLeft: '15@s',
    top: '70@vs'
  },
  sectionDesc: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'left',
    color: colors.black,
    marginTop: '8@vs',
    paddingHorizontal: '10@s',
    top: '70@vs'
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
    marginTop: '90@vs',
  },
  vsText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: '14@ms',
  },

  viewBtn: {
    borderWidth: '1@s',
    borderColor: colors.blue,
    borderRadius: '12@ms',
    paddingVertical: '5@vs',
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
    width: '70@ms',
    height: '26@ms',
    borderRadius: '18@ms',
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8@s',
  },
  pagerWhiteBtn: {
    width: '70@ms',
    height: '26@ms',
    borderRadius: '18@ms',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8@s',
    borderWidth: 1,
    borderColor: colors.black
  },
});
