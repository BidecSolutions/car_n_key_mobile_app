import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBox from '../Components/SearchBox/SearchBox';
import {colors} from '../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {Image} from 'react-native-animatable';
import FindDealersFilter from '../Components/modals/FindDealersFilter';
import {Header} from '../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const dealers = [
  {
    id: '1',
    name: 'Polstar Short Hills',
    address: '1200 Morris Turnpike Suite B145, Millburn, NJ 07078',
    milesAway: '27',
    phone: '(973) 474-9899',
    rating: 3,
    inventoryCount: 280,
    image: require('../assets/Images/DealerLogo.png'),
  },
  {
    id: '2',
    name: 'Polstar Short Hills',
    address: '1200 Morris Turnpike Suite B145, Millburn, NJ 07078',
    milesAway: '27',
    phone: '(973) 474-9899',
    rating: 3,
    inventoryCount: 280,
    image: require('../assets/Images/DealerLogo.png'),
  },
];

const FindADealer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const renderDealerCard = (item: (typeof dealers)[0]) => (
    <TouchableOpacity onPress={() => navigation.navigate('DealersDetail')}>
    <View style={styles.card}>
      {/* Leave logo space */}

      <Image source={item.image} style={styles.logoBox} />
      <Text style={styles.titleCard}>{item.name}</Text>

      <View style={styles.addressRow}>
        <Ionicons
          name="location-outline"
          size={moderateScale(14)}
          color="#000"
        />
        <Text style={styles.address}>
          {item.address} • {item.milesAway} miles away
        </Text>
      </View>

      <View style={styles.phoneRow}>
        <Text style={styles.phone}>New {item.phone}</Text>
        <Text style={styles.phone}>Used {item.phone}</Text>
        <Text style={styles.phone}>Service {item.phone}</Text>
      </View>

      <View style={styles.ratingRow}>
        {Array.from({length: 5}).map((_, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={moderateScale(14)}
            color={i < item.rating ? '#F4B400' : '#ccc'}
            style={{marginRight: scale(2)}}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DealersInventory')}>
        <Text style={styles.buttonText}>
          View inventory ({item.inventoryCount} cars)
        </Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <Header
        showBack={true}
        showDrawer={true}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Title */}
      <Text style={styles.title}>Your Next Car Awaits</Text>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchBox
          value={search}
          onChangeText={setSearch}
          onPressFilter={() => setIsFilterVisible(true)}
        />
      </View>

      <FindDealersFilter
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)} // 🔹 close modal
      />

      {/* Subtitle */}
      <Text style={styles.subtitle}>Dealers new Corona, NY</Text>

      {/* Dealers List */}
      <FlatList
        data={dealers}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
          paddingTop: verticalScale(10),
        }}
        renderItem={({item}) => renderDealerCard(item)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(16),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    marginVertical: verticalScale(12),
    color: colors.black,
  },
  searchWrapper: {
    paddingHorizontal: scale(16),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    marginVertical: verticalScale(12),
    color: colors.black,
  },
  card: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: verticalScale(12),
    marginHorizontal: -scale(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  logoBox: {
    width: moderateScale(24),
    height: verticalScale(24),
    backgroundColor: 'transparent',
    marginRight: scale(8),
    resizeMode: 'contain',
  },
  titleCard: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  address: {
    fontSize: moderateScale(11),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginLeft: scale(4),
    flexShrink: 1,
  },
  phoneRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(6),
    justifyContent: 'space-evenly',
  },
  phone: {
    fontSize: moderateScale(10),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: verticalScale(2),
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  button: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    fontSize: moderateScale(11),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
});

export default FindADealer;
