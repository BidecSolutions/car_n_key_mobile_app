import React, {useState} from 'react';
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
import {colors} from '../../constant/colors';
import {Dropdown} from 'react-native-element-dropdown';
import FilterModal from './FilterModal';
import { Primaryfonts, Secondaryfonts } from '../../constant/fonts';
import { ScreenContainer } from 'react-native-screens';

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

  // new props 👇
  showPriceFilter?: boolean;
  showCarLabel?: boolean;
  carLabelText?: string;
  onPriceFilterChange?: (value: string) => void;
};

const CarListSection: React.FC<Props> = ({
  title = 'Find the Best Cars at the Best Prices the Right Choice',
  cars,
  showMoreBtn = true,
  onSearch,
  onFilterPress,
  onViewDeal,
  onLoadMore,

  showPriceFilter = false,
  showCarLabel = false,
  carLabelText = 'Cars',
  onPriceFilterChange,
}) => {
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const priceOptions = [
    {label: 'Price: Low to High', value: 'low'},
    {label: 'Price: High to Low', value: 'high'},
  ];
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
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setIsFilterVisible(true)}>
          <Image
            source={require('../../assets/Images/FilterIcon.png')} // 👈 put your filter image here
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Filters Row */}
      {(showPriceFilter || showCarLabel) && (
        <View style={styles.filtersRowContainer}>
          {showPriceFilter && (
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                data={[
                  {label: 'Price: Low to High', value: 'low'},
                  {label: 'Price: High to Low', value: 'high'},
                ]}
                labelField="label"
                valueField="value"
                placeholder="Sort"
                value={priceFilter}
                onChange={item => {
                  setPriceFilter(item.value);
                  onPriceFilterChange?.(item.value);
                }}
                // critical bits 👇
                containerStyle={styles.dropdownContainer}
                dropdownPosition="auto"
                maxHeight={220}
                renderRightIcon={() => (
                  <Icon
                    name="chevron-down"
                    size={16}
                    color="#555"
                    style={{marginRight: 8}}
                  />
                )}
              />
            </View>
          )}

          {showCarLabel && <Text style={styles.carLabel}>{carLabelText}</Text>}
        </View>
      )}

      {/* Cars List */}
      <FlatList
        data={cars}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: moderateScale(20)}}
        keyboardShouldPersistTaps="handled"
      />

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={() => {
          console.log('Filters applied!');
          setIsFilterVisible(false);
        }}
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
    fontSize: '20@ms',
    fontFamily: Primaryfonts.semibold,
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
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginLeft: '6@s',
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
  filterBtn: {
    backgroundColor: colors.blue,
    padding: '8@ms',
    borderRadius: '20@ms',
  },
  filtersRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '10@s',
    marginBottom: '10@vs',
    // make sure this sits above the list
    position: 'relative',
    zIndex: 100, // iOS
    elevation: 100, // Android
  },

  dropdownWrapper: {
    width: '48%',
    position: 'relative',
    zIndex: 110,
    elevation: 110,
    overflow: 'visible',
  },

  dropdown: {
    height: '40@vs',
    borderRadius: '8@ms',
    paddingHorizontal: '10@s',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },

  // this styles the floating menu list
  dropdownContainer: {
    position: 'absolute',
    top: '235@vs', // just below the input
    left: 30,
    right: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: '8@ms',
    backgroundColor: '#FFF',
    zIndex: 9999,
    elevation: 9999,
    overflow: 'hidden',
  },

  placeholderStyle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: '#000',
  },
  itemTextStyle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    paddingVertical: '8@vs',
    paddingHorizontal: '10@s',
  },

  carLabel: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },

  // keep the list *under* the dropdown
  listWrapper: {
    position: 'relative',
    zIndex: 1,
    elevation: 1,
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
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  carPrice: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
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
    fontFamily: Secondaryfonts.medium,
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
    fontFamily: Secondaryfonts.medium,
  },
  reportText: {
    fontSize: '10@ms',
    color: '#444',
    fontFamily: Secondaryfonts.medium,
  },
  viewDealBtn: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '5@vs',
    paddingHorizontal: '15@s',
    alignSelf: 'flex-start',
    marginTop: '8@vs',
  },
  viewDealText: {
    fontSize: '11@ms',
    color: colors.blue,
    fontFamily: Secondaryfonts.semibold,
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
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
});
