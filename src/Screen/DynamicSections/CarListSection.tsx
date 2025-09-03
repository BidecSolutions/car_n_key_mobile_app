import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constant/colors';
import { fonts } from '../../constant/fonts';

type Car = {
  id: string;
  name: string;
  price: string;
  image: any;
  transmission: string;
  mileage: string;
  mpg: string;
  fuel: string;
  location: string;
  rating?: number; // optional rating
};

type Props = {
  title?: string;
  cars: Car[];
  showMoreBtn?: boolean;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  onViewDeal?: (car: Car) => void;
  onLoadMore?: () => void;
};

const CarListSection: React.FC<Props> = ({
  title = 'Find the Best Cars at the Best Prices the Right Choice',
  cars,
  showMoreBtn = true,
  onSearch,
  onFilterPress,
  onViewDeal,
  onLoadMore,
}) => {
  const renderItem = ({item}: {item: Car}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.carImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carPrice}>Price : {item.price}</Text>

        {/* Car info row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{item.transmission}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.infoText}>{item.mileage}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.infoText}>{item.mpg}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.infoText}>{item.fuel}</Text>
        </View>

        {/* Stars */}
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Icon
              key={star}
              name="star"
              size={moderateScale(14)}
              color={star <= (item.rating || 4) ? '#FFD700' : '#C0C0C0'}
            />
          ))}
        </View>

        {/* Location & Report */}
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>📍 {item.location}</Text>
          <Text style={styles.reportText}>
            📝 Get a free Vehicle X Ray Report
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.viewDealBtn}
          onPress={() => onViewDeal?.(item)}>
          <Text style={styles.viewDealText}>View Deal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={moderateScale(18)} color="#555" />
        <TextInput
          placeholder="search"
          placeholderTextColor="#777"
          style={styles.searchInput}
          onChangeText={onSearch}
        />
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <Icon name="options-outline" size={moderateScale(18)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Cars List */}
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: moderateScale(20)}}
      />

      {/* Bottom Button */}
      {showMoreBtn && (
        <TouchableOpacity style={styles.resultsBtn} onPress={onLoadMore}>
          <Text style={styles.resultsText}>{cars.length} Results More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CarListSection;

const styles = ScaledSheet.create({
  container: {
    marginTop: '20@vs',
    paddingHorizontal: '15@s',
  },
  sectionTitle: {
    fontSize: '16@ms',
    fontFamily:fonts.semibold,
    textAlign: 'center',
    marginBottom: '15@vs',
    color: colors.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: '25@ms',
    paddingHorizontal: '10@s',
    marginBottom: '20@vs',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: '13@ms',
    fontFamily:fonts.medium,
    marginLeft: '6@s',
    color: colors.black,
  },
  filterBtn: {
    backgroundColor: colors.blue,
    padding: '8@ms',
    borderRadius: '20@ms',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E9E8E899',
    borderRadius: '12@ms',
    padding: '10@ms',
    marginBottom: '15@vs',
  },
  carImage: {
    width: '100@ms',
    height: '80@vs',
    borderRadius: '10@ms',
  },
  cardContent: {
    flex: 1,
    marginLeft: '10@s',
  },
  carName: {
    fontSize: '13@ms',
    fontFamily:fonts.semibold,
    color: colors.black,
  },
  carPrice: {
    fontSize: '12@ms',
    fontFamily:fonts.medium,
    color: colors.hind,
    marginTop: '4@vs',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '6@vs',
  },
  infoText: {
    fontSize: '10@ms',
    color: '#555',
    fontFamily:fonts.medium,
  },
  dot: {
    marginHorizontal: '4@s',
    color: '#999',
  },
  starRow: {
    flexDirection: 'row',
    marginTop: '6@vs',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6@vs',
    flexWrap: 'wrap',
  },
  locationText: {
    fontSize: '10@ms',
    color: '#444',
    marginRight: '10@s',
    fontFamily:fonts.medium,
  },
  reportText: {
    fontSize: '10@ms',
    color: '#444',
    fontFamily:fonts.medium,
  },
  viewDealBtn: {
    borderWidth: 1,
    borderColor: '#4C3BCF',
    borderRadius: '20@ms',
    paddingVertical: '5@vs',
    paddingHorizontal: '15@s',
    alignSelf: 'flex-start',
    marginTop: '8@vs',
  },
  viewDealText: {
    fontSize: '11@ms',
    color: colors.blue,
    fontFamily:fonts.semibold,
  },
  resultsBtn: {
    backgroundColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '30@s',
    alignSelf: 'center',
    marginTop: '10@vs',
  },
  resultsText: {
    fontSize: '12@ms',
    fontFamily:fonts.semibold,
    color: colors.white,
  },
});
