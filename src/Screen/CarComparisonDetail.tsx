import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';

type RootStackParamList = {
  Home: undefined;
  CarDetail: undefined;
  MyGarage: undefined;
  CarComparisonDetail: undefined;
};

type RootDrawerParamList = {
  Tabs: undefined;
  CarListing: undefined;
  CarComparison: undefined;
};

type CarComparisonDetailNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'CarComparisonDetail'>,
  DrawerNavigationProp<RootDrawerParamList>
>;

const CarComparisonDetail = () => {
  const navigation = useNavigation<CarComparisonDetailNavProp>();
  const categories = [
    {label: 'Pricing', icon: require('../assets/Images/Car.png')},
    {label: 'Electrical', icon: require('../assets/Images/Car.png')},
    {label: 'Wheel', icon: require('../assets/Images/Car.png')},
    {label: 'Suspension', icon: require('../assets/Images/Car.png')},
    {label: 'Steering', icon: require('../assets/Images/Car.png')},
    {label: 'Brakes', icon: require('../assets/Images/Car.png')},
    {label: 'Capacity', icon: require('../assets/Images/Car.png')},
    {label: 'Safety', icon: require('../assets/Images/Car.png')},
    {label: 'Dimensions', icon: require('../assets/Images/Car.png')},
    {label: 'Engine', icon: require('../assets/Images/Car.png')},
  ];

  const categoryDetails = [
    {
      title: 'Highlights',
      data: [
        {left: '12V', label: 'Battery', right: '12V'},
        {left: 'LED + DRLs', label: 'Headlights', right: 'LED + DRLs'},
        {
          left: '9” Touchscreen',
          label: 'Infotainment',
          right: '9” Android/Apple',
        },
        {left: '6', label: 'Speakers', right: '9'},
      ],
    },
    {
      title: 'Performance',
      data: [
        {left: '200 HP', label: 'Horsepower', right: '220 HP'},
        {left: '6 Speed', label: 'Transmission', right: '8 Speed'},
        {left: '6 Speed', label: 'Transmission', right: '8 Speed'},
        {left: '6 Speed', label: 'Transmission', right: '8 Speed'},
      ],
    },
    {
      title: 'Safety',
      data: [
        {left: '4', label: 'Airbags', right: '6'},
        {left: 'ABS', label: 'Brakes', right: 'ABS + EBD'},
        {left: 'ABS', label: 'Brakes', right: 'ABS + EBD'},
        {left: 'ABS', label: 'Brakes', right: 'ABS + EBD'},
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header
        showBack
        showDrawer
        onDrawerPress={() => navigation.openDrawer()} // ✅ works now
        backgroundColor={colors.backgroundColor}
        iconColor={colors.black}
        titleColor={colors.black}
        onBackPress={navigation.goBack}
      />
      <Text style={styles.title}>Compare Cars Side-by-Side</Text>
      <Text style={styles.subtitle}>
        Choose the better ride. View features, specs, and performance at a
        glance.
      </Text>

      {/* Category Icons */}
      <View style={styles.categoryGrid}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Image source={cat.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Car Comparison */}
      <View style={styles.carRow}>
        <View style={styles.carBox}>
          <Image
            source={require('../assets/Images/Car.png')}
            style={styles.carImage}
          />
          <Text style={styles.carName}>2020 Alfa Romeo 4C</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.carBox}>
          <Image
            source={require('../assets/Images/Car.png')}
            style={styles.carImage}
          />
          <Text style={styles.carName}>2020 Alfa Romeo 4C</Text>
        </View>
      </View>

      {/* Highlights Rows */}
      <View style={styles.highlightBox}>
        {categoryDetails.map((section, sectionIdx) => (
          <View key={sectionIdx} style={styles.sectionWrapper}>
            {/* Header */}
            <View style={styles.highlightHeader}>
              <Text style={styles.highlightTitle}>{section.title}</Text>
            </View>

            {/* Rows */}
            {section.data.map((item, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.value}>{item.left}</Text>
                <View style={styles.separator} />
                <Text style={styles.label}>{item.label}</Text>
                <View style={styles.separator} />
                <Text style={styles.value}>{item.right}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
          Compare Cars & Make{'\n'}the Right Choice
        </Text>
        <Text style={styles.sectionDesc}>
          Find answers to the most common questions about buying, selling, and
          renting cars. If you need more help, feel free to reach out!
        </Text>

      <View style={styles.cardContainer}>
        
        {/* Cars + VS */}
        <View style={styles.compareCard}>
          <View style={styles.compareCarBox}>
            <Image
              source={require('../assets/Images/left_car.png')}
              style={styles.carImage}
              resizeMode="contain"
            />
            <Text style={styles.compareCarName}>Camry</Text>
            <Text style={styles.carPrice}>Rs. 10,000</Text>
          </View>

          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={styles.compareCarBox}>
            <Image
              source={require('../assets/Images/right_car.png')}
              style={styles.compareCarImage}
              resizeMode="contain"
            />
            <Text style={styles.compareCarName}>Kylad</Text>
            <Text style={styles.carPrice}>Rs. 11,000</Text>
          </View>
        </View>

        {/* View Comparison button inside card */}
        <TouchableOpacity style={styles.viewBtn} activeOpacity={0.85}>
          <Text style={styles.viewText}>View Comparison</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CarComparisonDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  contentContainer: {
    padding: '16@ms',
    paddingBottom: '40@vs',
  },
  title: {
    fontSize: '18@ms',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: colors.black,
  },
  subtitle: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.regular,
    textAlign: 'center',
    color: colors.hind,
    marginTop: '4@vs',
    marginBottom: '16@vs',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  icon: {
    width: '40@ms',
    height: '40@ms',
    marginBottom: '6@vs',
  },
  categoryLabel: {
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.regular,
    textAlign: 'center',
    color: colors.black,
  },
  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
  },
  carBox: {
    width: '40%',
    alignItems: 'center',
  },
  carImage: {
    width: '100%',
    height: '120@vs',
    resizeMode: 'contain',
    marginBottom: '8@vs',
  },
  carName: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    textAlign: 'center',
  },
  vs: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  highlightHeader: {
    backgroundColor: '#EAEAEA', // different background
    paddingVertical: '10@ms',
    borderRadius: '10@ms',
    alignItems: 'center',
    marginHorizontal: '15@ms',
  },
  highlightTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  highlightBox: {
    backgroundColor: colors.backgroundColor,
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    paddingVertical: '8@ms',
    paddingHorizontal: '4@ms',
  },
  sectionWrapper: {
    marginTop: '16@vs', // space between sections
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '6@vs',
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: '6@s',
    alignSelf: 'stretch', // makes it full row height
  },
  label: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
    textAlign: 'center',
    flex: 1,
  },
  value: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.regular,
    color: colors.black,
    textAlign: 'center',
    flex: 1,
  },
  sectionTitle: {
    marginTop: '16@vs',
    fontSize: '30@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'left',
    color: colors.black,
    paddingHorizontal: '10@s',
  },
  sectionDesc: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'left',
    color: colors.black,
    marginTop: '8@vs',
    paddingHorizontal: '10@s',
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: '14@ms',
    borderWidth: '1@s',
    borderColor: colors.hind,
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

  compareCarBox: {
    alignItems: 'center',
    flex: 1,
  },

  compareCarImage: {
    width: '140@ms', // bigger car images
    height: '90@vs',
    marginBottom: '8@vs',
  },

  compareCarName: {
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
  },
  vsText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: '14@ms',
  },

  viewBtn: {
    borderWidth: '1@s',
    borderColor: colors.blue,
    borderRadius: '22@ms',
    paddingVertical: '7@vs',
    paddingHorizontal: '74@s',
  },
  viewText: {
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
    fontSize: '13@ms',
  },
});
