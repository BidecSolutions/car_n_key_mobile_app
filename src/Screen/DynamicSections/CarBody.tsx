// CarBodySection.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Secondaryfonts } from '../../constant/fonts';
import { colors } from '../../constant/colors';

type Item = {
  id: number;
  label: string;
  icon: JSX.Element;
};

type CarBodyProps = {
  onSelect?: (item: Item) => void; // 👈 make it generic so parent can decide
};

const CarBody: React.FC<CarBodyProps> = ({onSelect}) => {
  const items: Item[] = [
    {id: 1, label: 'Interior', icon: <MaterialCommunityIcons name="seat" size={moderateScale(28)} color={colors.black} />},
    {id: 2, label: 'Tires', icon: <FontAwesome5 name="circle-notch" size={moderateScale(28)} color={colors.black} />},
    {id: 3, label: 'Lights', icon: <Entypo name="light-up" size={moderateScale(28)} color={colors.black} />},
    {id: 4, label: 'Glass', icon: <MaterialCommunityIcons name="car-windshield" size={moderateScale(28)} color={colors.black} />},
    {id: 5, label: 'Mechanical', icon: <FontAwesome5 name="tools" size={moderateScale(26)} color={colors.black} />},
    {id: 6, label: 'Aftermarket', icon: <Feather name="shopping-cart" size={moderateScale(28)} color={colors.black} />},
  ];

  const handleSelect = (item: Item) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Body</Text>
      <View style={styles.grid}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleSelect(item)}>
            {item.icon}
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CarBody;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: Secondaryfonts.semibold,
    marginBottom: verticalScale(25),
    color: colors.black,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: scale(14),
  },
  card: {
    width: moderateScale(100),
    height: verticalScale(95),
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    margin: -moderateScale(3),
  },
  label: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
});
