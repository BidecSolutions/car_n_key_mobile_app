import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import CarListSection from './DynamicSections/CarListSection';
import { Primaryfonts, Secondaryfonts } from '../constant/fonts';

const CarListing = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}

      <Header
        showBack={true}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.white}
        iconColor={colors.black}
        titleColor={colors.black}
        onBackPress={() => navigation.goBack()}
      />

      <CarListSection
        cars={[
          {
            id: '1',
            name: 'BMW 430d Coupe M Sport',
            price: '$20,000',
            image: require('../assets/Images/Car.png'),
            transmission: 'Automatic',
            mileage: '2500.6',
            mpg: '53.0 Avg MPG',
            fuel: 'Diesel',
            location: 'Chicago, IL (Intl)',
            rating: 4,
          },
          {
            id: '2',
            name: 'Tesla Model 3',
            price: '$35,000',
            image: require('../assets/Images/Car.png'),
            transmission: 'Automatic',
            mileage: '1200',
            mpg: 'Electric',
            fuel: 'EV',
            location: 'San Francisco, CA',
            rating: 5,
          },
        ]}
        onSearch={text => console.log('Searching:', text)}
        onFilterPress={() => console.log('Filter pressed')}
        onViewDeal={() => navigation.navigate('CarDetail')}
        onLoadMore={() => console.log('Load more pressed')}
        title="Your Next Car Awaits"
        showPriceFilter={true}
        showCarLabel={true}
        carLabelText="Featured Cars"
        onPriceFilterChange={value => console.log('Sort by:', value)}
      />
    </ScrollView>
  );
};

export default CarListing;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bannerBackground: {
    backgroundColor: colors.backgroundColor,
    borderBottomLeftRadius: '20@s',
    borderBottomRightRadius: '20@s',
    paddingVertical: '20@vs',
    alignItems: 'center',
  },
  bannerTitle: {
    color: colors.black,
    fontSize: '18@ms',
    marginBottom: '5@vs',
    fontFamily: Primaryfonts.semibold,
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: '25@s',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    width: '80%',
    height: '35@vs',
  },
  searchInput: {
    flex: 1,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  searchIcon: {
    backgroundColor: colors.blue,
    padding: '6@s',
    borderRadius: '20@s',
    height: '30@ms',
    width: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: '18@ms',
    height: '18@ms',
    tintColor: colors.white, // 👈 keeps it white like your vector icon
  },
});
