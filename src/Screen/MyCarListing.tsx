import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';
import {colors} from '../constant/colors';
import {Header} from '../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MyCarListing: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // Dummy data for now, later you’ll replace with API response
  const carListings = [
    {
      id: '1',
      title: 'BMW 430d',
      subtitle: 'Coupe M Sport',
      vin: 'DFKSJDFHS12341526',
      listedDate: '20/May/25',
      status: 'Active',
      price: '$20,000',
      image: require('../assets/Images/FinanceCar.png')
    },
    {
      id: '2',
      title: 'BMW 430d',
      subtitle: 'Coupe M Sport',
      vin: 'DFKSJDFHS12341526',
      listedDate: '20/May/25',
      status: 'Active',
      price: '$20,000',
      image: require('../assets/Images/FinanceCar.png')
    },
    {
      id: '3',
      title: 'BMW 430d',
      subtitle: 'Coupe M Sport',
      vin: 'DFKSJDFHS12341526',
      listedDate: '20/May/25',
      status: 'Active',
      price: '$20,000',
      image: require('../assets/Images/FinanceCar.png')
    },
  ];

  const renderCarItem = ({item}: {item: any}) => (
    <TouchableOpacity onPress={() => navigation.navigate('CarListingDetail')}>
    <View style={styles.card}>
      {/* Image Placeholder */}
      <Image source= {item.image} style={styles.image} />

      {/* Car Info */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.carTitle}>{item.title}</Text>
          <Text style={styles.carSubTitle}>{item.subtitle}</Text>
        </View>
         <View style={styles.rowBetween}>
        <Text style={styles.detailText}>VIN:</Text>
        <Text style={styles.detailText}>{item.vin}</Text>
        </View>
        <View style={styles.rowBetween}>
        <Text style={styles.detailText}>Car Listed:</Text>
        <Text style={styles.detailText}>{item.listedDate}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.detailText}>Status:</Text>
          <Text style={styles.activeText}>{item.status}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.detailText}>Price:</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        showBack={true}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Title */}
      <Text style={styles.title}>My Car Listings App</Text>
      <Text style={styles.subtitle}>
        View, manage, and update all the cars {'\n'} you’ve listed for sale.
      </Text>

      {/* FlatList for Car Listings */}
      <FlatList
        data={carListings}
        keyExtractor={item => item.id}
        renderItem={renderCarItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: vs(100)}}
        ListFooterComponent={
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Contact Dealer</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '16@ms',
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    color: colors.black,
    padding: '16@ms',
  },
  subtitle: {
    fontSize: '13@ms',
    textAlign: 'center',
    color: colors.black,
    marginBottom: '16@vs',
    marginHorizontal: '16@s',
    fontFamily: Secondaryfonts.medium,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '10@ms',
    padding: '12@ms',
    marginBottom: '16@vs',
  },
  image: {
    width: '150@ms',
    height: '100%',
    borderRadius: '8@ms',
    marginRight: '10@s',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  carTitle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  carSubTitle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  detailText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginTop: '2@vs',
  },
  activeText: {
    fontSize: '13@ms',
    color: '#199F08',
    fontFamily: Secondaryfonts.medium,
  },
  priceText: {
    fontSize: '13@ms',
    fontFamily: Primaryfonts.medium,
    color: colors.blue,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4@vs',
  },
  row: {
    flexDirection: 'row',
    marginTop: '4@vs',
    gap: '6@s'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: '8@vs',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: colors.blue,
    paddingVertical: '4@vs',
    width: '47%',
    borderRadius: '20@ms',
    marginRight: '10@s',
  },
  editText: {
    color: colors.white,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    alignSelf: 'center',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: '4@vs',
    width: '47%',
    borderRadius: '20@ms',
  },
  deleteText: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    alignSelf: 'center',
  },
  contactButton: {
    backgroundColor: colors.blue,
    paddingVertical: '12@vs',
    borderRadius: '25@ms',
    marginTop: '10@vs',
    alignSelf: 'center',
    paddingHorizontal: '50@s',
  },
  contactText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Primaryfonts.medium,
  },
});

export default MyCarListing;
