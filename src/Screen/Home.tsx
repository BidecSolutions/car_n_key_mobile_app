import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import CarListSection from './DynamicSections/CarListSection';
import {BlurView} from '@react-native-community/blur';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {DrawerParamList} from '../types';

const topBrands = [
  {id: '1', name: 'Tesla', icon: require('../assets/Images/TeslaIcon.png')},
  {id: '2', name: 'Mercedes', icon: require('../assets/Images/MercedesIcon.png')},
  {id: '3', name: 'BMW', icon: require('../assets/Images/BMWIcon.png')},
  {id: '4', name: 'Audi', icon: require('../assets/Images/AudiIcon.png')},
  {id: '5', name: 'Nissan', icon: require('../assets/Images/NissanIcon.png')},
  {id: '6', name: 'Nissan', icon: require('../assets/Images/NissanIcon.png')},
  {id: '7', name: 'Nissan', icon: require('../assets/Images/NissanIcon.png')},
];

const features = [
  {id: '1', title: 'BUY A CAR', image: require('../assets/Images/Car.png')},
  {id: '2', title: 'SELL YOUR CAR', image: require('../assets/Images/Car.png')},
  {
    id: '3',
    title: 'CAR COMPARISONS',
    image: require('../assets/Images/Car.png'),
  },
];

const carCategories = [
  {id: '1', name: 'Luxury', image: require('../assets/Images/Car.png')},
  {id: '2', name: 'Pickup Truck', image: require('../assets/Images/Car.png')},
  {id: '3', name: 'Electric', image: require('../assets/Images/Car.png')},
  {id: '4', name: 'Luxury', image: require('../assets/Images/Car.png')},
  {id: '5', name: 'Pickup Truck', image: require('../assets/Images/Car.png')},
  {id: '6', name: 'Electric', image: require('../assets/Images/Car.png')},
];

const Home = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}

      <Header
        showBack={false}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.blue}
        showLogo={true}
        iconColor={colors.white}
        titleColor={colors.white}
      />

      <View style={styles.bannerBackground}>
        <Text style={styles.bannerTitle}>Find Your Dream Car</Text>
        <Text style={styles.bannerTitle}>Buy, Sell & Trade with Ease</Text>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="search" style={styles.searchInput} />
          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={require('../assets/Images/FilterIcon.png')} // 👈 put your filter image here
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Deals Image */}
      <View style={styles.dealCard}>
        <Image
          source={require('../assets/Images/CarBanner.png')} // 👈 replace with your car image
          style={styles.dealImage}
          resizeMode="cover"
        />
      </View>

      {/* Top Brands */}
      <Text style={styles.sectionTitle}>Top Brands</Text>
      <FlatList
        horizontal
        data={topBrands}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.brandList}
        renderItem={({item}) => (
          <View style={styles.brandItem}>
            <Image source={item.icon} style={styles.brandIcon} />
            <Text style={styles.brandName}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Browse Feature */}
      <Text style={styles.sectionTitle}>Browse Feature</Text>
      <View style={styles.featureRow}>
        {features.map(item => (
          <TouchableOpacity key={item.id} style={styles.featureCard}>
            <Image source={item.image} style={styles.featureImage} />
            <Text style={styles.featureText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        Best Cars Deals & Services Near You
      </Text>
      <Text style={styles.subTitle}>If GPS Off Show Trending Car Deal</Text>
      <FlatList
        data={carCategories}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.carCategoryCard}>
            <Image source={item.image} style={styles.carCategoryImage} />
            <Text style={styles.carCategoryText}>{item.name}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* --- New Section: Car Value --- */}
      <View style={styles.carValueContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.valueTitle}>Discover Your Car’s True Value</Text>
          <Text style={styles.valueDesc}>
            Real-time market insights to help you sell smarter.
          </Text>
          <TouchableOpacity style={styles.valueButton}>
            <Text style={styles.valueButtonText}>Get Your Cars Value</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueBoxTitle}>Your Car Value Today</Text>
          <Text style={styles.valueRange}>$45,000 – $49,000</Text>
          <Text style={styles.valueBoxSub}>Valuation</Text>
        </View>
      </View>

      <Image
        source={require('../assets/Images/Car.png')}
        style={styles.bigCarImage}
        resizeMode="contain"
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
        onViewDeal={car => console.log('Viewing deal:', car)}
        onLoadMore={() => console.log('Load more pressed')}
      />

      {/* --- Selling Card Section --- */}
      <View style={styles.sellingSection}>
        {/* Background image with graph + car */}
        <Image
          source={require('../assets/Images/CarGraph.png')}
          style={styles.graphCarImage}
          resizeMode="contain"
        />

        {/* Frosted glass card */}
        <View style={styles.sellingCard}>
          <BlurView
            style={styles.blurBackground}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.cardContent}>
            <Text style={styles.sellingPrice}>$ 390,000</Text>
            <Text style={styles.sellingTitle}>Selling Your Car?</Text>
            <Text style={styles.sellingSubtitle}>
              Let’s Make It Quick & Easy
            </Text>
            <Text style={styles.sellingDesc}>
              Your car, your price—sell on your terms and get the best deal
              effortlessly
            </Text>

            <TouchableOpacity style={styles.sellingBtn}>
              <Text style={styles.sellingBtnText}>List Your Car Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- Compare Cars Section --- */}

      <Text style={styles.compareTitle}>
        Compare Cars & Make the Right Choice
      </Text>

      <View style={styles.compareContainer}>
        {/* Cars Row */}
        <View style={styles.compareCard}>
          {/* Left Car */}
          <View style={styles.carBox}>
            <Image
              source={require('../assets/Images/Car.png')}
              style={[styles.compareCarImage, {transform: [{scaleX: -1}]}]}
              resizeMode="contain"
            />
            <Text style={styles.carBrand}>Toyota</Text>
            <Text style={styles.carModel}>Camry</Text>
            <Text style={styles.carPrice}>Rs. 10,000</Text>
          </View>

          {/* VS Circle */}
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {/* Right Car */}
          <View style={styles.carBox}>
            <Image
              source={require('../assets/Images/Car.png')}
              style={styles.compareCarImage}
              resizeMode="contain"
            />
            <Text style={styles.carBrand}>Skoda</Text>
            <Text style={styles.carModel}>Kylad</Text>
            <Text style={styles.carPrice}>Rs. 11,000</Text>
          </View>
        </View>

        {/* Button inside same container */}
        <TouchableOpacity style={styles.compareBtn}>
          <Text style={styles.compareBtnText}>View Comparison</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bannerBackground: {
    backgroundColor: colors.blue,
    borderBottomLeftRadius: '20@s',
    borderBottomRightRadius: '20@s',
    paddingVertical: '20@vs',
    alignItems: 'center',
  },
  bannerTitle: {
    color: colors.white,
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
  dealCard: {
    marginTop: '-30@vs', // 👈 overlaps into banner background
    marginHorizontal: '15@s',
    borderRadius: '12@s',
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: '150@vs',
    borderRadius: '18@s',
  },
  dealTextContainer: {
    position: 'absolute',
    left: '10@s',
    bottom: '10@vs',
  },
  dealTitle: {
    color: colors.white,
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
  },
  dealSubtitle: {
    color: colors.hind,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },

  sectionTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    marginTop: '16@vs',
    marginLeft: '16@s',
    color: colors.black,
  },
  subTitle: {
    fontSize: '12@ms',
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
    marginLeft: '15@s',
    marginBottom: '10@vs',
  },

  brandList: {
    paddingHorizontal: '16@s',
    marginTop: '8@s',
  },
  brandItem: {
    alignItems: 'center',
    marginRight: '16@s',
  },
  brandIcon: {
    width: '35@ms',
    height: '35@ms',
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: '10@ms',
    marginTop: '4@vs',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },

  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
    marginTop: '12@vs',
  },
  featureCard: {
    width: '30%',
    backgroundColor: colors.white,
    borderRadius: '10@ms',
    overflow: 'hidden',
    height: '150@vs',
  },
  featureImage: {
    width: '100%',
    height: '100%',
  },
  featureText: {
    fontSize: '10@ms',
    textAlign: 'center',
    marginVertical: '6@vs',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
  },
  carCategoryCard: {
    flex: 1,
    alignItems: 'center',
    margin: '5@s',
    borderRadius: '12@ms',
    backgroundColor: colors.white,
    padding: '10@s',
  },
  carCategoryImage: {
    width: '80@ms',
    height: '60@vs',
    resizeMode: 'contain',
  },
  carCategoryText: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    marginTop: '5@vs',
  },
  carValueContainer: {
    flexDirection: 'row',
    marginHorizontal: '15@s',
    marginVertical: '20@vs',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueTitle: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.medium,
  },
  valueDesc: {
    fontSize: '12@ms',
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
    marginVertical: '5@vs',
  },
  valueButton: {
    backgroundColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '6@vs',
    paddingHorizontal: '15@s',
    marginTop: '5@vs',
    width: '160@ms',
  },
  valueButtonText: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
    fontSize: '12@ms',
  },
  valueBox: {
    backgroundColor: colors.white,
    padding: '10@s',
    borderRadius: '10@ms',
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: '120@s',
  },
  valueBoxTitle: {
    fontSize: '10@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  valueRange: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    marginVertical: '5@vs',
  },
  valueBoxSub: {
    fontSize: '10@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  bigCarImage: {
    width: '100%',
    height: '160@vs',
    marginBottom: '20@vs',
  },
  sellingSection: {
    marginTop: '20@vs',
    marginHorizontal: '15@s',
    position: 'relative',
    height: '180@vs',
  },

  graphCarImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  sellingCard: {
    position: 'absolute',
    right: 0,
    top: '20@vs',
    borderRadius: '16@ms',
    overflow: 'hidden',
    width: '65%',
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  cardContent: {
    padding: '14@ms',
  },

  sellingPrice: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    marginBottom: '4@vs',
  },
  sellingTitle: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
  },
  sellingSubtitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
    marginBottom: '6@vs',
  },
  sellingDesc: {
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
    color: '#666',
    marginBottom: '10@vs',
  },
  sellingBtn: {
    backgroundColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '6@vs',
    paddingHorizontal: '14@s',
    alignSelf: 'flex-start',
  },
  sellingBtnText: {
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },

  compareTitle: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    marginBottom: '14@vs',
    color: colors.hind,
  },
  compareContainer: {
    borderWidth: 1,
    borderColor: colors.hind,
    borderRadius: '18@ms',
    backgroundColor: colors.white,
    marginBottom:'16@vs',
    padding:'16@ms',
    marginHorizontal: '10@s',
  },

  compareCard: {
    flexDirection: 'row',
    alignItems: 'flex-start', // push VS down
    justifyContent: 'space-between',
  },

  carBox: {
    flex: 1,
    alignItems: 'center',
  },

  compareCarImage: {
    width: '140@ms',
    height: '100@vs',
    marginBottom: '6@vs',
  },

  carBrand: {
    fontSize: '11@ms',
    color: '#888',
    fontFamily: Secondaryfonts.medium,
  },

  carModel: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
  },

  carPrice: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
    marginTop: '3@vs',
  },

  vsCircle: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: '25@ms',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10@s',
    marginTop: '100@vs', // push it a little lower
  },

  vsText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
  },

  compareBtn: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '22@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '80@s',
    alignSelf: 'center',
    marginTop: '15@vs',
  },

  compareBtnText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
  },
});
