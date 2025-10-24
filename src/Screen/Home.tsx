import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, version} from 'react';
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
import {ScaledSheet, ms, s, verticalScale, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import CarListSection from './DynamicSections/CarListSection';
import {BlurView} from '@react-native-community/blur';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {BodyType, Brand, DrawerParamList} from '../types';
import SearchBox from '../Components/SearchBox/SearchBox';
import {Loader} from '../Components/loader/Loader';
import {fetchBrands} from '../api/HomeApis/brands';
import {fetchBodyTypes} from '../api/HomeApis/bodyTypes';

const features = [
  {
    id: '1',
    title: 'BUY A CAR',
    image: require('../assets/Images/BuyACar.png'),
    screen: 'CarListing',
  },
  {
    id: '2',
    title: 'SELL YOUR CAR',
    image: require('../assets/Images/SellYourCar.png'),
    screen: 'SellYourCar',
  },
  {
    id: '3',
    title: 'CAR COMPARISONS',
    image: require('../assets/Images/CarComparisons.png'),
    screen: 'CarComparison',
  },
];

const carCategories = [
  {id: '1', name: 'Luxury', image: require('../assets/Images/Luxury.png')},
  {
    id: '2',
    name: 'Pickup Truck',
    image: require('../assets/Images/PickupTruck.png'),
  },
  {id: '3', name: 'Electric', image: require('../assets/Images/Electric.png')},
  {id: '4', name: 'Luxury', image: require('../assets/Images/Luxury.png')},
  {
    id: '5',
    name: 'Pickup Truck',
    image: require('../assets/Images/PickupTruck.png'),
  },
  {id: '6', name: 'Electric', image: require('../assets/Images/Electric.png')},
];

const Home = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [searchText, setSearchText] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
        const bodyTypesData = await fetchBodyTypes();
        setBodyTypes(bodyTypesData);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupIntoColumns = (data: any[]) => {
    const columns = [];
    for (let i = 0; i < data.length; i += 2) {
      columns.push(data.slice(i, i + 2)); // each column = 2 items (2 rows)
    }
    return columns;
  };

  const groupedData = groupIntoColumns(bodyTypes);

  if (loading) {
    return <Loader />;
  }

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
          <SearchBox
            placeholder="Find your car"
            value={searchText}
            onChangeText={setSearchText}
            // onPressFilter={handleFilterPress}
          />
        </View>
      </View>

      {/* Deals Image */}
      <View style={styles.dealCard}>
        <Image
          source={require('../assets/Images/CarBanner.png')}
          style={styles.dealImage}
          resizeMode="cover"
        />
      </View>

      {/* Top Brands */}
      <Text style={styles.sectionTitle}>Top Brands</Text>
      <FlatList
        horizontal
        data={brands}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.brandList}
        renderItem={({item}) => (
          <View style={styles.brandItem}>
            <Image
              source={
                item.logoUrl
                  ? {uri: item.logoUrl}
                  : require('../assets/Images/MercedesIcon.png')
              }
              style={styles.brandIcon}
            />
            <Text style={styles.brandName}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Browse Feature */}
      <Text style={styles.sectionTitle}>Browse Feature</Text>
      <View style={styles.featureRow}>
        {features.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={styles.featureCard}
            onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.featureImage} />
            <Text style={styles.featureText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, {alignSelf: 'center'}]}>
        Best Cars Deals & Services Near You
      </Text>
      <Text style={[styles.subTitle, {alignSelf: 'center'}]}>
        If GPS Off Show Trending Car Deal
      </Text>
      <FlatList
        horizontal
        data={groupedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.column}>
            {item.map((car: any) => (
              <TouchableOpacity key={car.id.toString()} style={{flex: 1}}>
                <View style={styles.carCategoryCard}>
                  <Image
                    source={
                      car.image
                        ? {uri: car.image}
                        : require('../assets/Images/Electric.png')
                    }
                    style={styles.carCategoryImage}
                  />
                </View>
                <Text style={styles.carCategoryText}>{car.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
      {/* --- New Section: Car Value --- */}
      <View style={styles.carValueContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.valueTitle}>Discover Your Car’s True Value</Text>
          <Text style={styles.valueDesc}>
            Real-time market insights to help you sell smarter.
          </Text>
          <TouchableOpacity
            style={styles.valueButton}
            onPress={() => navigation.navigate('SellYourCar')}>
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
        source={require('../assets/Images/curve.png')}
        style={styles.bigCarImage}
        resizeMode="cover"
      />
      <Image
        source={require('../assets/Images/curveCar.png')}
        style={styles.curveCarImage}
        resizeMode="contain"
      />

      <CarListSection
        cars={[
          {
            id: '1',
            name: 'BMW 430d Coupe M Sport',
            price: '$20,000',
            image: require('../assets/Images/blackCar.png'),
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
            image: require('../assets/Images/blackCar.png'),
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
            <Text style={styles.sellingTitle}>Selling Your Car?</Text>
            <Text style={styles.sellingSubtitle}>
              Let’s Make It Quick & Easy
            </Text>
            <Text style={styles.sellingDesc}>
              Your car, your price—sell on your terms and get the best deal
              effortlessly
            </Text>

            <TouchableOpacity
              style={styles.sellingBtn}
              onPress={() => navigation.navigate('SellYourCar')}>
              <Text style={styles.sellingBtnText}>List Your Car Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- Compare Cars Section --- */}

      <Text style={styles.compareTitle}>
        Compare Cars & Make the Right {'\n'} Choice
      </Text>

      <View style={styles.compareContainer}>
        {/* Cars Row */}
        <View style={styles.compareCard}>
          {/* Left Car */}
          <View style={styles.carBox}>
            <Image
              source={require('../assets/Images/silver.png')}
              style={[styles.compareCarImage, {transform: [{scaleX: -1}]}]}
              resizeMode="contain"
            />
            <Text style={styles.carBrand}>Toyota</Text>
            <Text style={styles.carModel}>Camry</Text>
            <Text style={styles.carPrice}>$10,000</Text>
          </View>

          {/* VS Circle */}
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {/* Right Car */}
          <View style={styles.carBox}>
            <Image
              source={require('../assets/Images/right_car.png')}
              style={styles.compareCarImage}
              resizeMode="contain"
            />
            <Text style={styles.carBrand}>Skoda</Text>
            <Text style={styles.carModel}>Kylad</Text>
            <Text style={styles.carPrice}>$11,000</Text>
          </View>
        </View>

        {/* Button inside same container */}
        <TouchableOpacity
          style={styles.compareBtn}
          onPress={() => navigation.navigate('CarComparison')}>
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
    fontSize: '22@ms',
    marginBottom: '5@vs',
    fontFamily: Primaryfonts.medium,
    bottom: '10@vs',
  },

  searchContainer: {
    paddingHorizontal: '16@ms',
    marginBottom: '16@vs',
    width: '100%',
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
    tintColor: colors.white,
  },
  dealCard: {
    marginTop: '-35@vs',
    marginHorizontal: '15@s',
    borderRadius: '12@s',
    // overflow: 'hidden',
  },
  dealImage: {
    width: '115%',
    height: '150@vs',
    borderRadius: '18@s',
    alignSelf: 'center',
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
    fontSize: '17@ms',
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
    marginTop: '13@vs',
  },
  brandIcon: {
    width: '35@ms',
    height: '35@ms',
    resizeMode: 'contain',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '17.5@ms',
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
    resizeMode: 'contain',
  },
  featureText: {
    fontSize: '10@ms',
    textAlign: 'center',
    marginVertical: '6@vs',
    fontFamily: Secondaryfonts.semibold,
    color: colors.hind,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '8@ms',
  },
  carCategoryCard: {
    alignItems: 'center',
    borderRadius: '12@ms',
    backgroundColor: colors.cardsBackgroundColor,
    padding: '10@ms',
    width: '110@ms', 
  },
  carCategoryImage: {
    width: '100%',
    height: '115@vs',
    resizeMode: 'contain',
  },
  carCategoryText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    textAlign: 'left',
    marginTop: '3@vs',
    marginBottom: '7@vs',
  },
  carValueContainer: {
    flexDirection: 'row',
    marginHorizontal: '15@s',
    marginVertical: '20@vs',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueTitle: {
    fontSize: '17@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
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
    alignSelf: 'center',
  },
  valueBox: {
    backgroundColor: colors.white,
    padding: '9@ms',
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
    fontSize: '12.5@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginVertical: '5@vs',
  },
  valueBoxSub: {
    fontSize: '10@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  bigCarImage: {
    width: '90%',
    height: '200@vs',
    marginBottom: '20@vs',
    alignSelf: 'center',
  },
  curveCarImage: {
    width: '100%',
    height: '120@vs',
    marginBottom: '20@vs',
    bottom: '1096@vs',
    position: 'absolute',
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
    right: '40@s',
  },

  sellingCard: {
    position: 'absolute',
    right: 0,
    top: '20@vs',
    borderRadius: '16@ms',
    overflow: 'hidden',
    width: '55%',
    height: '150@vs',
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
    color: colors.blue,
  },
  sellingSubtitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: '6@vs',
  },
  sellingDesc: {
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
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
    fontSize: '17@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    marginBottom: '20@vs',
    color: colors.black,
    marginTop: '20@vs',
  },
  compareContainer: {
    borderWidth: 1,
    borderColor: colors.hind,
    borderRadius: '18@ms',
    backgroundColor: colors.white,
    marginBottom: '16@vs',
    padding: '16@ms',
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
    width: '161@ms',
    height: '120@vs',
    marginBottom: '6@vs',
  },

  carBrand: {
    fontSize: '13@ms',
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
  },

  carModel: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },

  carPrice: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
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
    marginTop: '130@vs',
  },

  vsText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
  },

  compareBtn: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '12@ms',
    paddingVertical: '8@vs',
    paddingHorizontal: '90@s',
    alignSelf: 'center',
    marginTop: '15@vs',
  },

  compareBtnText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
  },
});
