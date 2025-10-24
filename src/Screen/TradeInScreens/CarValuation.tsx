import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/colors';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import SearchBox from '../../Components/SearchBox/SearchBox';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const cars = [
  {
    id: '1',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../../assets/Images/GarageCar.png'), // replace with your image
  },
  {
    id: '2',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../../assets/Images/GarageCar.png'),
  },
  {
    id: '3',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../../assets/Images/GarageCar.png'),
  },
];

const CarValuation = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [searchText, setSearchText] = useState('');

  const renderItem = ({item}: {item: (typeof cars)[0]}) => (
    <View style={styles.carCard}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.carsTitle}>{item.title}</Text>
          <Text style={styles.carsSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.rating}>
            {[...Array(item.rating)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size={ms(14)}
                color="#FACC15"
                style={{marginRight: ms(2)}}
              />
            ))}
          </View>
        </View>
        <View style = {styles.buttonRow}>
        <TouchableOpacity style={styles.dealButton}>
          <Text style={styles.dealButtonText}>View Deal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tradeInButton}>
          <Text style={styles.tradeInButtonText}>Trade In</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: vs(40)}}>
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

      <Text style={styles.title}>Ask For Valuation</Text>

      {/* Image */}
      <View style={styles.imageContainer}>
        {/* Replace this with your image */}
        <Image
          source={require('../../assets/Images/ValuationCar.png')}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.carTitle}>2020 Mercedes-Benz S-Class S 560</Text>
      <Text style={styles.carSubtitle}>
        This images is for reference only and may not match your car’s details.
      </Text>

      {/* Info rows */}
      <View style={styles.infoContainer}>
        <Row label="Transmission" value="Automatic" />
        <Row label="Engine" value="V6 Petrol" />
        <Row label="Option" value="Premium Package" />
        <Row label="Exterior color" value="Midnight Black" />
        <Row label="Interior color" value="Beige Leather" />
        <Row label="Accident(s)" value="No" />
        <Row label="Clean history report" value="Verified" />
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue to Review</Text>
      </TouchableOpacity>

      <View style={styles.carSection}>
        <Text style={styles.nextCarTitle}>Choose Your Next Car</Text>
        <View style={styles.searchContainer}>
          <SearchBox
            placeholder="Find your car"
            value={searchText}
            onChangeText={setSearchText}
            onPressFilter={() => console.log('filter pressed')}
          />
        </View>
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: s(10)}}
        />
      </View>
    </ScrollView>
  );
};

interface RowProps {
  label: string;
  value: string;
}

const Row: React.FC<RowProps> = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '16@ms',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(15),
    paddingTop: vs(15),
    paddingBottom: vs(10),
  },
  title: {
    fontSize: '21@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    marginTop: '8@vs',
    color: colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Image
  imageContainer: {
    alignItems: 'center',
    marginTop: vs(15),
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '15@ms',
  },
  carImage: {
    width: '90%',
    height: vs(150),
    borderRadius: ms(8),
  },

  // Title
  carTitle: {
    fontSize: ms(17),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
    marginTop: vs(15),
    paddingHorizontal: s(15),
  },
  carSubtitle: {
    fontSize: ms(12),
    color: colors.hind,
    textAlign: 'center',
    marginTop: vs(5),
    paddingHorizontal: s(15),
  },

  // Info Rows
  infoContainer: {
    marginTop: vs(15),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vs(10),
    paddingHorizontal: s(15),
    borderBottomWidth: 0.8,
    borderBottomColor: colors.hind,
  },
  rowLabel: {
    fontSize: ms(14),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  rowValue: {
    fontSize: ms(14),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  continueButton: {
    marginTop: '25@vs',
    backgroundColor: colors.blue,
    paddingVertical: '8@vs',
    borderRadius: '20@ms',
  },
  continueButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
  },
  carSection: {
    marginTop: '25@vs',
  },
  nextCarTitle: {
    fontSize: '20@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
  },
  searchContainer: {
    marginTop: '15@vs',
    width: '90%',
    alignSelf: 'center',
  },
  carCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(12),
    marginRight: s(12),
    width: ms(180),
    overflow: 'hidden',
    marginTop: '25@vs',
  },
  image: {
    width: '100%',
    height: vs(100),
    resizeMode: 'cover',
  },
  cardContent: {
    padding: ms(10),
  },
  carsTitle: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  carsSubtitle: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: vs(6),
  },
  price: {
    fontSize: ms(15),
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    marginBottom: vs(6),
  },
  rating: {
    flexDirection: 'row',
    marginBottom: vs(8),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  dealButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: vs(5),
    borderRadius: ms(20),
    alignItems: 'center',
    width: '48%',
  },
  dealButtonText: {
    fontSize: ms(10),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
   tradeInButton: {
    backgroundColor: colors.white,
    paddingVertical: vs(5),
    borderRadius: ms(20),
    alignItems: 'center',
    width: '48%',
  },
  tradeInButtonText: {
    fontSize: ms(10),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
});

export default CarValuation;
