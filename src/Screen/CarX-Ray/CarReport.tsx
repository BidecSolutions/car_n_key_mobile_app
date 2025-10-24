import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  moderateScale,
  ms,
  s,
  scale,
  ScaledSheet,
  verticalScale,
  vs,
} from 'react-native-size-matters';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Secondaryfonts, Primaryfonts} from '../../constant/fonts';
import Svg, {Circle, Path} from 'react-native-svg';
import {LineChart} from 'react-native-chart-kit';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const recallInfo = [
  {
    date: '2019-05-14',
    type: 'Airbag',
    desc: 'Driver-side airbag inflator may rupture in a crash, increasing risk of injury',
    action: 'Yes',
  },
  {
    date: '2022-03-22',
    type: 'Brakes',
    desc: 'Rear brake calipers may leak fluid, reducing braking performance',
    action: 'Yes',
  },
  {
    date: '2020-07-10',
    type: 'Transmission',
    desc: 'Software update required to prevent sudden gear disengagement',
    action: 'Yes',
  },
  {
    date: '2019-05-14',
    type: 'Electrical',
    desc: 'Faulty wiring harness may cause headlights to fail',
    action: 'Yes',
  },
];

const srvInfo = [
  {
    date: '2019-05-14',
    type: 'Oil Change - Service Center',
    desc: '72,450',
    action: 'Consistent',
  },
  {
    date: '2022-03-22',
    type: 'Registration Inspection',
    desc: '72,450',
    action: 'Consistent',
  },
  {
    date: '2020-07-10',
    type: 'Service Record',
    desc: '72,450',
    action: 'Consistent',
  },
  {
    date: '2019-05-14',
    type: 'Emissions Test',
    desc: '72,450',
    action: 'Potential rollback',
  },
];

const carReport = [
  {
    icon: 'shield-checkmark',
    title: 'State Title Brand',
    status: 'CLEAN',
    issue: false,
  },
  {
    icon: 'hammer',
    title: 'Auction Brand / Issue',
  },
  {
    icon: 'car',
    title: 'Accident / Damage',
    status: 'NO ISSUE',
    issue: false,
  },
  {
    icon: 'alert-circle',
    title: 'Open Recall Check',
    status: 'NO RECALLS',
    issue: false,
  },
  {
    icon: 'swap-horizontal',
    title: 'Insurance Loss / Transfer',
    status: 'NO ISSUE',
    issue: false,
  },
  {
    icon: 'speedometer',
    title: 'Odometer Check',
    status: 'NO ISSUE',
    subtext: 'Lien Reported',
    issue: false,
  },
  {
    icon: 'ribbon',
    title: 'Certified Pre-Owned',
    status: 'NO RECENT CPO',
    issue: false,
  },
  {
    icon: 'construct',
    title: 'Service / Repair',
    status: 'NO ISSUE',
    issue: false,
  },
  {
    icon: 'document-text',
    title: 'Additional History',
    status: 'EVENTS REPORTED',
    subtext: 'Lien Reported',
    issue: true,
  },
];

const equipment = [
  {
    title: 'Back Seat Safety Belts',
  },
  {
    title: 'Back Seat Safety Belts',
  },
  {
    title: 'Back Seat Safety Belts',
  },
  {
    title: 'Back Seat Safety Belts',
  },
  {
    title: 'Fog Lights',
  },
  {
    title: 'Fog Lights',
  },
  {
    title: 'Fog Lights',
  },
  {
    title: 'Traction Control',
  },
  {
    title: 'Traction Control',
  },
];

const screenWidth = Dimensions.get('window').width - scale(80);

const CarReport = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [form, setForm] = useState({
    vin: '',
    carClass: '',
    make: '',
    model: '',
    estimatedService: '',
    odometer: '',
    assemblyCountry: '',
    engine: '',
    bodyStyle: '',
    fuel: '',
    assemblyCountry2: '',
    vehicleAge: '',
  });
  const [selectedRange, setSelectedRange] = useState<
    'Forecast' | 'All' | '1yr' | '6mo' | '3mo'
  >('6mo');

  const chartDataSets: any = {
    Forecast: [19000, 18500, 18000, 17500, 17000],
    All: [21000, 20500, 20000, 19500, 19000],
    '1yr': [20000, 19500, 18500, 18000, 17500],
    '6mo': [20000, 18500, 17000, 16500, 16000],
    '3mo': [19000, 18000, 17000, 15500, 15000],
  };

  // ✅ Dynamically select data
  const selectedData = useMemo(
    () => chartDataSets[selectedRange] || [],
    [selectedRange],
  );

  const value = 70;

  // Map range 53–74 to arc (0°–180°)
  const min = 0;
  const max = 100;
  const percentage = (value - min) / (max - min);
  const angle = Math.PI * percentage;

  const radius = 70;
  const centerX = 80;
  const centerY = 80;
  const circleX = centerX - radius * Math.cos(angle);
  const circleY = centerY - radius * Math.sin(angle);

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({...prev, [key]: value}));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: verticalScale(30)}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          showBack={true}
          title="Car Report"
          showDrawer={true}
          onDrawerPress={() => navigation.openDrawer()}
          backgroundColor={colors.backgroundColor}
          onBackPress={() => navigation.goBack()}
          iconColor={colors.black}
          titleColor={colors.black}
        />
        <View style={styles.reportCard}>
          <Text style={styles.carTitle}>BMW 430d Coupe – 190k</Text>
          <Image
            source={require('../../assets/Images/BentleyCar.png')}
            style={styles.carImage}
            resizeMode="contain"
          />

          <View style={styles.row}>
            <Text style={styles.label}>Car VIN:</Text>
            <Text style={styles.value}>WAULFAFR1AA123456</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>Jan 27, 2025</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>19:07:04 EST</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Icon name="download-outline" size={ms(16)} color={colors.white} />
            <Text style={styles.downloadText}>Download PDF</Text>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            {/* Row 1 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>VIN:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.vin}
                  onChangeText={text => handleChange('vin', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Class:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter class"
                  placeholderTextColor="#666"
                  value={form.carClass}
                  onChangeText={text => handleChange('carClass', text)}
                />
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Make</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter make"
                  placeholderTextColor="#666"
                  value={form.make}
                  onChangeText={text => handleChange('make', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Model</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter model"
                  placeholderTextColor="#666"
                  value={form.model}
                  onChangeText={text => handleChange('model', text)}
                />
              </View>
            </View>

            {/* Row 3 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Estimated In Service:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter date"
                  placeholderTextColor="#666"
                  value={form.estimatedService}
                  onChangeText={text => handleChange('estimatedService', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Last Reported Odometer:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.odometer}
                  onChangeText={text => handleChange('odometer', text)}
                />
              </View>
            </View>

            {/* Row 4 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Country of Assembly:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.assemblyCountry}
                  onChangeText={text => handleChange('assemblyCountry', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Engine</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.engine}
                  onChangeText={text => handleChange('engine', text)}
                />
              </View>
            </View>

            {/* Row 5 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Body Style</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.bodyStyle}
                  onChangeText={text => handleChange('bodyStyle', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Fuel</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.fuel}
                  onChangeText={text => handleChange('fuel', text)}
                />
              </View>
            </View>

            {/* Row 6 */}
            <View style={styles.rowContainer}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Country of Assembly:</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.assemblyCountry2}
                  onChangeText={text => handleChange('assemblyCountry2', text)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Vehicle Age</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Enter your VIN number"
                  placeholderTextColor="#666"
                  value={form.vehicleAge}
                  onChangeText={text => handleChange('vehicleAge', text)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ownershipContainer}>
          {/* Owners Section */}
          <View style={styles.ownerCard}>
            <View style={styles.ownerLeft}>
              <Icon name="people" size={ms(28)} color={colors.blue} />
              <View>
                <Text style={styles.ownerTitle}>Owners</Text>
                <Text style={styles.ownerSubtitle}>Vehicle Usage</Text>
              </View>
            </View>
            <View style={styles.ownerRight}>
              <Text style={styles.ownerCount}>2</Text>
              <Text style={styles.ownerType}>Lease</Text>
            </View>
          </View>

          {/* Gauge Section */}
          <View style={styles.gaugeContainer}>
            <View style={styles.gaugeWrapper}>
              <Svg width={ms(170)} height={vs(90)} viewBox="0 0 160 100">
                {/* Background Arc */}
                <Path
                  d="M10 80 A70 70 0 0 1 150 80"
                  stroke={colors.cardsBackgroundColor}
                  strokeWidth={12}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Indicator Circle (dynamic) */}
                <Circle
                  cx={circleX}
                  cy={circleY}
                  r={12}
                  stroke={colors.blue}
                  strokeWidth={3}
                  fill={colors.white}
                />
              </Svg>

              <View style={styles.gaugeLabelsRow}>
                <Text style={styles.gaugeLabel}>0</Text>
                <Text style={styles.gaugeLabel}>100</Text>
              </View>
            </View>

            <Text style={styles.gaugeTitle}>CarnKey X-Ray</Text>
            <Text style={styles.gaugeSubtitle}>
              Similarly Vehicles usually range between 53 and 74
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.titleButtonText}>
              Title & Ownership History
            </Text>
          </TouchableOpacity>
        </View>
        {/* Vehicle Report Status Section */}
        <View style={styles.reportStatusContainer}>
          {carReport.map((item, index) => (
            <View key={index} style={styles.statusCard}>
              <View style={styles.statusLeft}>
                <View style={styles.iconWrapper}>
                  <Icon name={item.icon} size={ms(20)} color={colors.blue} />
                </View>
                <View>
                  <Text style={styles.statusTitle}>{item.title}</Text>
                  {item.subtext && (
                    <Text style={styles.statusSub}>{item.subtext}</Text>
                  )}
                </View>
              </View>
              <View style={styles.statusRight}>
                <Icon
                  name={item.issue ? 'close-circle' : 'checkmark-circle'}
                  size={ms(18)}
                  color={item.issue ? '#E53935' : '#4CAF50'}
                />
                <Text style={styles.statusValue}>{item.status}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.titleButtonText}>
              Title & Ownership History
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleSectionContainer}>
          {/* CURRENT TITLE */}
          <View style={styles.titleCard}>
            <Text style={styles.titleCardHeading}>CURRENT TITLE</Text>

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Location</Text>
              <Text style={styles.titleValue}>GA</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Odometer</Text>
              <Text style={styles.titleValue}>106,450 mi</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Purchased in</Text>
              <Text style={styles.titleValue}>2023</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Was Used</Text>
              <Text style={styles.titleValue}>1 yrs. 7 mo</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Status</Text>
              <Text style={styles.titleValue}>Midnight Black</Text>
            </View>
          </View>

          {/* HISTORICAL TITLE */}
          <View style={styles.titleCard}>
            <Text style={styles.titleCardHeading}>HISTORICAL TITLE #1</Text>

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Location</Text>
              <Text style={styles.titleValue}>TX</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Odometer</Text>
              <Text style={styles.titleValue}>106,450 mi</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Purchased in</Text>
              <Text style={styles.titleValue}>2023</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Was Used</Text>
              <Text style={styles.titleValue}>1 yrs. 7 mo</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.titleLabel}>Status</Text>
              <Text style={styles.titleValue}>Salvage</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.titleButtonText}>
              Title & Ownership History
            </Text>
          </TouchableOpacity>
        </View>
        {/* REPORTED DAMAGES SECTION */}
        <View style={styles.damageSection}>
          <Text style={styles.damageInfoText}>
            This section lists reported damages to this vehicle. You can use
            this information as leverage when negotiating the price of the car.
            If the damages are excessive, consider a different vehicle
          </Text>

          <View style={styles.damageRow}>
            <Image
              source={require('../../assets/Images/damageCar.png')}
              style={styles.carImagePlaceholder}
            />

            {/* Damage Info Card */}
            <View style={styles.damageInfoCard}>
              {/* Top Row: Usage */}
              <View style={styles.usageRow}>
                <Text style={styles.usageLabel}>Was Used</Text>
                <Text style={styles.usageValue}>1 yrs. 7 mo</Text>
              </View>

              <View style={styles.divider} />

              {/* Country */}
              <View style={styles.countryRow}>
                <Image
                  source={require('../../assets/Images/USFlag.png')}
                  style={{width: moderateScale(20), height: verticalScale(15)}}
                  resizeMode="contain"
                />
                <Text style={styles.countryText}>United States</Text>
              </View>

              {/* Damage Items */}
              <View style={styles.damageItem}>
                <Icon
                  name="location-outline"
                  size={moderateScale(22)}
                  color={colors.blue}
                />
                <View style={styles.damageItemTextBox}>
                  <Text style={styles.damageItemTitle}>Area of Impact</Text>
                  <Text style={styles.damageItemSubtitle}>Area of Impact</Text>
                </View>
              </View>

              <View style={styles.damageItem}>
                <Icon
                  name="location-outline"
                  size={moderateScale(22)}
                  color={colors.blue}
                />
                <View style={styles.damageItemTextBox}>
                  <Text style={styles.damageItemTitle}>Area of Impact</Text>
                  <Text style={styles.damageItemSubtitle}>Area of Impact</Text>
                </View>
              </View>

              <View style={styles.damageItem}>
                <Icon
                  name="car-outline"
                  size={moderateScale(22)}
                  color={colors.blue}
                />
                <View style={styles.damageItemTextBox}>
                  <Text style={styles.damageItemTitle}>Area of Impact</Text>
                  <Text style={styles.damageItemSubtitle}>Area of Impact</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.titleButton}>
          <Text style={styles.titleButtonText}>Open Recalls</Text>
        </TouchableOpacity>
        {/* RECALL INFORMATION SECTION */}
        <View style={styles.recallSection}>
          {recallInfo.map((item, index) => (
            <View key={index} style={styles.recallCard}>
              {/* Header Row */}
              <View style={styles.recallRow}>
                <Text style={styles.recallLabel}>Recall Date</Text>
                <Text style={styles.recallLabel}>Recall Type</Text>
                <Text style={styles.recallLabel}>Description</Text>
                <Text style={styles.recallLabel}>Action Required</Text>
              </View>

              {/* Values Row */}
              <View style={[styles.recallRow, {marginTop: verticalScale(4)}]}>
                <View style={styles.recallCell}>
                  <Text style={styles.recallValue}>{item.date}</Text>
                </View>
                <View style={styles.recallCell}>
                  <Text style={styles.recallValue}>{item.type}</Text>
                </View>
                <View style={[styles.recallCell]}>
                  <Text style={[styles.recallValue, {flexShrink: 1}]}>
                    {item.desc}
                  </Text>
                </View>
                <View style={[styles.recallCell, {justifyContent: 'center'}]}>
                  <Text style={[styles.recallValue, {color: colors.black}]}>
                    {item.action}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.titleButton}>
          <Text style={styles.titleButtonText}>
            Market Value & Price Analysis
          </Text>
        </TouchableOpacity>
        <View style={styles.rangeSection}>
          <View style={styles.rangeContainer}>
            <View style={styles.rangeCard}>
              <Text style={styles.rangeText}>$15,500 - $17,200</Text>
              <Text style={styles.rangeLabel}>Estimated Value Range</Text>
            </View>
            <View style={styles.priceCard}>
              <Text style={styles.priceText}>$16,400</Text>
              <Text style={styles.priceLabel}>Fair Price Today</Text>
            </View>
          </View>

          {/* --- Market Comparison --- */}
          <View style={styles.marketContainer}>
            <Text style={styles.marketTitle}>Comparison With Market</Text>

            {[
              {label: 'Similar Cars Average', value: '$17,000'},
              {label: 'Dealer’s Listing', value: '$17,000'},
              {label: 'Private Listing', value: '$17,000'},
            ].map((item, index) => (
              <View key={index} style={styles.comparisonRow}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* --- Filter Buttons --- */}
          <View style={styles.filterContainer}>
            {['Forecast', 'All', '1yr', '6mo', '3mo'].map((item: any) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelectedRange(item)}
                style={[
                  styles.filterButton,
                  selectedRange === item && styles.activeFilterButton,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    selectedRange === item && styles.activeFilterText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* --- Line Chart --- */}

          <View style={styles.chartContainer}>
            {/* Y-Axis Labels */}
            <View style={styles.yAxisContainer}>
              {['$20,0K', '$19,0K', '$17,0K', '$15,0K'].map((label, index) => (
                <Text key={index} style={styles.yAxisLabel}>
                  {label}
                </Text>
              ))}
            </View>

            {/* Chart Box */}
            <View style={styles.chartBox}>
              <LineChart
                data={{
                  datasets: [
                    {
                      data: [19800, 19700, 19600, 19500],
                      color: () => colors.hind,
                      strokeWidth: 1.5,
                      withDots: false,
                    },
                    {
                      data: selectedData,
                      color: () => colors.blue,
                      strokeWidth: 1.5,
                      withDots: false,
                    },
                  ],
                }}
                width={moderateScale(270)}
                height={verticalScale(220)}
                withShadow={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                fromZero={false}
                withHorizontalLabels={false}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: 'transparent',
                  backgroundGradientTo: 'transparent',
                  fillShadowGradient: 'transparent',
                  fillShadowGradientOpacity: 0,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(66,103,178,${opacity})`,
                }}
                style={{
                  borderRadius: moderateScale(20),
                  marginLeft: 0,
                  marginRight: 0,
                  paddingRight: 0,
                  paddingTop: verticalScale(5),
                  backgroundColor: 'transparent',
                }}
                decorator={() => {
                  const verticalLineHeight = verticalScale(175);
                  const dotLeftPosition = scale(115);

                  // Y positions for each custom horizontal line (adjust to align perfectly)
                  const customYLines = [
                    verticalScale(35),
                    verticalScale(90),
                    verticalScale(140),
                    verticalScale(190),
                  ];

                  return (
                    <>
                      {/* Custom Horizontal Lines */}
                      {customYLines.map((yPos, index) => (
                        <View
                          key={index}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: yPos,
                            height: 1,
                            borderBottomWidth: 1,
                            borderBottomColor: '#666',
                            opacity: 0.4,
                          }}
                        />
                      ))}

                      {/* Vertical line */}
                      <View
                        style={{
                          position: 'absolute',
                          left: dotLeftPosition,
                          top: verticalScale(50),
                          height: verticalLineHeight,
                          width: 1.5,
                          backgroundColor: colors.blue,
                        }}
                      />

                      {/* Blue Dot */}
                      <View
                        style={{
                          position: 'absolute',
                          left: dotLeftPosition - 5,
                          top: verticalScale(45),
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: colors.blue,
                        }}
                      />

                      {/* Tooltip */}
                      <View
                        style={{
                          position: 'absolute',
                          left: dotLeftPosition - 30,
                          top: verticalScale(15),
                          backgroundColor: 'white',
                          paddingHorizontal: moderateScale(10),
                          paddingVertical: verticalScale(2),
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#F0F0F0',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: colors.hind,
                            fontSize: moderateScale(10),
                            fontFamily: Secondaryfonts.medium,
                          }}>
                          January 16
                        </Text>
                        <Text
                          style={{
                            fontSize: moderateScale(12),
                            fontFamily: Secondaryfonts.semibold,
                            color: colors.black,
                            marginTop: 2,
                          }}>
                          $20,000
                        </Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>

            {/* X-Axis Labels */}
            <View style={styles.xAxisContainer}>
              {['Jan', 'Feb', 'Mar', 'Apr'].map((label, index) => (
                <Text key={index} style={styles.xAxisLabel}>
                  {label}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.titleButton}>
          <Text style={styles.titleButtonText}>
            Market Value & Price Analysis
          </Text>
        </TouchableOpacity>
        {/* --- Vehicle Detail Section --- */}
        <View style={styles.vehicleSection}>
          {/* --- Top Row --- */}
          <View style={styles.usageRow2}>
            <Text style={styles.usageText}>Was Used</Text>

            <Text style={styles.usageDuration}>1 yrs. 7 mo</Text>
          </View>
          <View style={styles.divider} />

          {/* --- Country Row --- */}
          <View style={styles.countryRow2}>
            <Image
              source={require('../../assets/Images/USFlag.png')}
              style={{width: moderateScale(20), height: verticalScale(15)}}
              resizeMode="contain"
            />
            <Text style={styles.countryText2}>United States</Text>
          </View>

          {/* --- Area of Impact Cards --- */}
          <View style={styles.impactRow}>
            {[
              {icon: 'search-outline', label: 'Area of Impact'},
              {icon: 'location-outline', label: 'Area of Impact'},
              {icon: 'shield-outline', label: 'Area of Impact'},
            ].map((item, index) => (
              <View key={index} style={styles.impactCard}>
                <Icon
                  name={item.icon}
                  size={moderateScale(15)}
                  color={colors.blue}
                  style={{left: scale(5)}}
                />
                <View style={styles.damageItemTextBox}>
                  <Text style={styles.impactTitle}>{item.label}</Text>
                  <Text style={styles.impactSubtitle}>Area of Impact</Text>
                </View>
              </View>
            ))}
          </View>

          {/* --- Gray Placeholder Boxes --- */}
          <View style={styles.placeholderGrid}>
            {Array.from({length: 6}).map((_, index) => (
              <View key={index} style={styles.placeholderBox} />
            ))}
          </View>
        </View>
        {[
          {label: 'Sales History', value: 'Toyota Prius Persona Series SE'},
          {label: 'Engine', value: '1.8L Electric and Gas Hybrid I4'},
          {label: 'Transmission', value: 'Automatic'},
          {label: 'Exterior color', value: 'Black'},
          {label: 'Interior color', value: 'Black'},
          {label: 'Body style', value: 'Hatchback'},
          {label: 'Condition', value: 'Clean'},
          {label: 'Fuel type', value: 'Hybrid-Electric'},
        ].map((item, index) => (
          <View key={index} style={styles.specRow}>
            <Text style={styles.specLabel}>{item.label}</Text>
            <Text style={styles.specValue}>{item.value}</Text>
          </View>
        ))}
        <View style={{marginTop: verticalScale(10)}} />
        <View style={styles.reportStatusContainer}>
          <Text style={styles.equipmentTitle}>EQUIPMENT</Text>
          {equipment.map((item, index) => (
            <View key={index} style={styles.equipmentStatusCard}>
              <View style={styles.statusLeft}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../../assets/Images/greenTickIcon.png')}
                    style={{resizeMode: 'contain'}}
                  />
                </View>
                <View>
                  <Text style={styles.statusTitle}>{item.title}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>NOTES</Text>
          <Text style={styles.notesText}>
            *ONE OWNER*, *TOYOTA CERTIFIED*, *ACCIDENT FREE*, *LEATHER*,
            *NAVIGATION/GPS*, *FULLY SERVICED*, and *PERSONA SERIES SE*. 1.8L
            4-Cylinder DOHC 16V VVT-i. This wonderful-looking 2013 Toyota Prius
            is the car that you have been hunting for. It will take you where
            you need to go every time... all you have to do is steer! Toyota
            Certified Pre-Owned means you not only get the reassurance of a
            12mo/12,000 mile Comprehensive warranty, but also up to a
            7yr/100,000-Mile Powertrain Limited Warranty, a 160-point
            inspection/reconditioning, 1yr Roadside Assistance,
            trip-interruption services, rental car benefits, and a complete
            vehicle history report.
          </Text>
        </View>

        {/* --- Dealer Info Section --- */}
        <View style={styles.dealerSection}>
          <Text style={styles.dealerTitle}>DEALER INFO</Text>

          <View style={styles.dealerRow}>
            <Text style={styles.dealerLabel}>Name</Text>
            <Text style={styles.dealerValue}>Tri-Star Blairsville</Text>
          </View>
          <View style={styles.dealerDivider} />
          <View style={styles.dealerRow}>
            <Text style={styles.dealerLabel}>Address</Text>
            <Text style={styles.dealerValue}>930 Route 22 West</Text>
          </View>
          <View style={styles.dealerDivider} />
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.titleButtonText}>
              Odometer / Mileage Verification
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recallSection}>
          {srvInfo.map((item, index) => (
            <View key={index} style={styles.recallCard}>
              {/* Header Row */}
              <View style={styles.recallRow}>
                <Text style={styles.srvLabel}>Date</Text>
                <Text style={[styles.srvLabel, {right: scale(10)}]}>
                  Srv/Inspect
                </Text>
                <Text style={[styles.srvLabel, {right: scale(18)}]}>
                  Reported Mileage
                </Text>
                <Text style={[styles.srvLabel]}>Status</Text>
              </View>

              {/* Values Row */}
              <View style={[styles.recallRow, {marginTop: verticalScale(4)}]}>
                <View style={styles.recallCell}>
                  <Text style={styles.recallValue}>{item.date}</Text>
                </View>
                <View style={styles.recallCell}>
                  <Text style={[styles.recallValue, {right: scale(5)}]}>
                    {item.type}
                  </Text>
                </View>
                <View style={[styles.recallCell]}>
                  <Text style={[styles.recallValue, {flexShrink: 1}]}>
                    {item.desc}
                  </Text>
                </View>
                <View style={[styles.recallCell, {justifyContent: 'center'}]}>
                  <Text
                    style={[
                      styles.recallValue,
                      {color: colors.black, left: scale(5)},
                    ]}>
                    {item.action}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.titleButtonText}>
              Odometer / Mileage Verification
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verificationSection}>
          {/* Theft / Stolen Check */}
          <Text style={styles.sectionHeading}>Theft / Stolen Check</Text>
          <View style={styles.verificationCard}>
            <View style={styles.verificationLeft}>
              <View style={{marginLeft: scale(10), flex: 1}}>
                <Text style={styles.verificationTitle}>
                  No theft records found
                </Text>
                <Text style={styles.verificationSubtitle}>
                  Verified against national and international stolen vehicle
                  databases.
                </Text>
              </View>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: '#00BA00'}]}>
              <Text style={styles.statusText}>Clear</Text>
            </View>
          </View>

          {/* Lien / Loan Check */}
          <Text style={[styles.sectionHeading, {marginTop: verticalScale(16)}]}>
            Lien / Loan Check
          </Text>
          <View style={styles.verificationCard}>
            <View style={styles.verificationLeft}>
              <View style={{marginLeft: scale(10), flex: 1}}>
                <Text style={styles.verificationTitle}>loans found</Text>
                <Text style={styles.verificationSubtitle}>
                  This vehicle is free from any outstanding loans or financial
                  claims
                </Text>
              </View>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: '#00BA00'}]}>
              <Text style={styles.statusText}>Clear</Text>
            </View>
          </View>

          {/* Registration Records */}
          <Text style={[styles.sectionHeading, {marginTop: verticalScale(16)}]}>
            Registration Records
          </Text>
          <View style={styles.verificationCard}>
            <View style={styles.verificationLeft}>
              <View style={{marginLeft: scale(10), flex: 1}}>
                <Text style={styles.verificationTitle}>
                  Valid Registration Record Founds
                </Text>
                <Text style={styles.verificationSubtitle}>
                  Verified against official DMV records.
                </Text>
              </View>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: '#00BA00'}]}>
              <Text style={styles.statusText}>Clear</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarReport;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '16@ms',
    backgroundColor: colors.white,
  },
  reportCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '14@ms',
    padding: '14@ms',
    marginTop: '25@vs',
  },
  carImage: {
    width: '100%',
    height: verticalScale(130),
    borderRadius: '12@ms',
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
  carTitle: {
    fontSize: '19@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(6),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
  },
  label: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  value: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10@s',
    marginTop: verticalScale(12),
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    paddingVertical: '7@vs',
    borderRadius: '30@ms',
    paddingHorizontal: '30@s',
    marginTop: '10@vs',
  },
  downloadText: {
    color: colors.white,
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
  },
  infoContainer: {
    marginTop: '16@vs',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10@vs',
    gap: '10@s',
  },
  field: {
    flex: 1,
  },
  fieldLabel: {
    color: colors.black,
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '4@vs',
  },
  inputBox: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '6@ms',
    paddingVertical: '9@vs',
    paddingHorizontal: '10@s',
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  ownershipContainer: {
    alignItems: 'center',
    marginTop: vs(20),
    marginHorizontal: s(10),
  },
  ownerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(10),
    paddingVertical: vs(9),
    paddingHorizontal: s(16),
    width: '100%',
  },
  ownerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
  ownerTitle: {
    fontSize: ms(16),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  ownerSubtitle: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  ownerRight: {
    alignItems: 'flex-end',
  },
  ownerCount: {
    fontSize: ms(16),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  ownerType: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  gaugeContainer: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(10),
    paddingVertical: vs(15),
    marginTop: vs(12),
    alignItems: 'center',
    width: '100%',
  },
  gaugeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(10),
    marginTop: vs(12),
  },
  gaugeLabelsRow: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '30@vs',
  },
  gaugeLabel: {
    fontSize: ms(12),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginHorizontal: '3@s',
  },
  gaugeLabels: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: vs(6),
  },
  gaugeLabelLeft: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  gaugeLabelRight: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  gaugeTitle: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  gaugeSubtitle: {
    fontSize: ms(12),
    color: colors.hind,
    marginTop: vs(4),
    textAlign: 'center',
    width: '100%',
    fontFamily: Secondaryfonts.medium,
  },
  titleButton: {
    backgroundColor: colors.blue,
    borderRadius: ms(10),
    paddingVertical: vs(8),
    width: '100%',
    alignItems: 'center',
    marginTop: vs(16),
  },
  titleButtonText: {
    color: colors.white,
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
  },
  reportStatusContainer: {
    marginTop: verticalScale(25),
    backgroundColor: colors.white,
    borderRadius: ms(12),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(30),
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(6),
  },

  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
  },
  statusTitle: {
    fontFamily: Secondaryfonts.semibold,
    fontSize: ms(12),
    color: colors.black,
  },
  statusSub: {
    fontFamily: Secondaryfonts.medium,
    fontSize: ms(11),
    color: colors.hind,
    marginTop: verticalScale(1),
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  statusValue: {
    fontFamily: Secondaryfonts.medium,
    fontSize: ms(11),
    color: colors.hind,
  },
  titleSectionContainer: {
    marginTop: verticalScale(10),
  },
  titleCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(12),
  },
  titleCardHeading: {
    fontSize: moderateScale(13.5),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(8),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(13),
  },
  divider: {
    height: 1,
    backgroundColor: colors.hind,
  },
  titleLabel: {
    fontSize: moderateScale(12.5),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  titleValue: {
    fontSize: moderateScale(12.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  damageSection: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(10),
  },
  damageInfoText: {
    fontSize: moderateScale(13),
    color: colors.hind,
    textAlign: 'center',
    marginBottom: verticalScale(15),
    lineHeight: verticalScale(18),
    fontFamily: Secondaryfonts.medium,
  },
  damageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  carImagePlaceholder: {
    width: moderateScale(120),
    height: verticalScale(290),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
    right: '20@s',
    marginLeft: '13@s',
    marginRight: '10@s',
  },
  damageInfoCard: {
    flex: 1,
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    marginHorizontal: -scale(10),
    top: '20@vs',
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(5),
    margin: '11@ms',
    right: '3@s',
  },
  usageLabel: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  usageValue: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    marginTop: '10@vs',
  },
  countryText: {
    fontSize: moderateScale(13),
    color: colors.black,
    marginLeft: scale(8),
    fontFamily: Secondaryfonts.medium,
  },
  damageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(10),
  },
  damageItemTextBox: {
    marginLeft: scale(10),
  },
  damageItemTitle: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  damageItemSubtitle: {
    fontSize: moderateScale(11),
    color: colors.hind,
    marginTop: verticalScale(2),
    fontFamily: Secondaryfonts.medium,
  },
  recallSection: {
    marginTop: verticalScale(25),
  },
  recallCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(12),
    maxHeight: '200@vs',
  },
  recallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recallLabel: {
    fontSize: moderateScale(10.8),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
    width: moderateScale(80),
  },
  recallCell: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: moderateScale(80),
  },
  recallValue: {
    fontSize: moderateScale(10),
    color: colors.black,
    flexShrink: 1,
    flexWrap: 'wrap',
    lineHeight: verticalScale(16),
    fontFamily: Secondaryfonts.medium,
  },
  rangeSection: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(14),
    marginTop: verticalScale(25),

    paddingVertical: verticalScale(14),
  },
  rangeContainer: {
    marginBottom: verticalScale(15),
  },
  rangeCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    marginHorizontal: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  rangeLabel: {
    fontSize: ms(11.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  priceCard: {
    backgroundColor: colors.blue,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    marginHorizontal: scale(15),
    marginTop: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  priceLabel: {
    fontSize: ms(11.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  marketContainer: {
    marginTop: verticalScale(18),
    paddingHorizontal: scale(18),
  },
  marketTitle: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(12),
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.hind,
    paddingVertical: verticalScale(10),
  },
  rowLabel: {
    fontSize: ms(12.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  rowValue: {
    fontSize: ms(12.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(25),
    marginBottom: verticalScale(10),
  },
  filterButton: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(4),
    borderRadius: scale(6),
  },
  activeFilterButton: {
    backgroundColor: colors.blue,
  },
  filterText: {
    fontSize: ms(11.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  activeFilterText: {
    color: colors.white,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: verticalScale(25),
    paddingBottom: verticalScale(10),
  },

  chartBox: {
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.hind,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    marginLeft: scale(40),
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  yAxisContainer: {
    position: 'absolute',
    left: scale(10),
    top: verticalScale(40),
    height: verticalScale(170),
    justifyContent: 'space-between',
  },

  yAxisLabel: {
    fontSize: moderateScale(10),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },

  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - scale(90),
    marginTop: verticalScale(5),
    marginLeft: scale(20),
  },

  xAxisLabel: {
    fontSize: moderateScale(10),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  vehicleSection: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: verticalScale(20),
  },

  usageRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  usageText: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  usageDuration: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },

  countryRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: verticalScale(8),
    marginTop: '15@vs',
  },
  countryText2: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },

  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(10),
  },
  impactCard: {
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(4),
    marginBottom: verticalScale(10),
    marginHorizontal: -moderateScale(5),
    width: '105@ms',
  },
  impactTitle: {
    fontSize: moderateScale(10),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  impactSubtitle: {
    fontSize: moderateScale(9),
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },

  placeholderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(4),
  },
  placeholderBox: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(4),
    marginVertical: verticalScale(6),
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 0.4,
    borderBottomColor: colors.hind,
    marginVertical: '8@vs',
    top: '20@vs',
  },
  specLabel: {
    fontSize: moderateScale(13),
    color: colors.black,
    flex: 1.2,
    fontFamily: Secondaryfonts.semibold,
  },
  specValue: {
    fontSize: moderateScale(13),
    color: colors.black,
    flex: 1.8,
    textAlign: 'right',
    fontFamily: Secondaryfonts.medium,
  },
  equipmentStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(30),
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(6),
  },
  equipmentTitle: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: '15@vs',
  },
  notesSection: {
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginTop: verticalScale(10),
  },
  notesTitle: {
    fontSize: moderateScale(15),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
    marginBottom: verticalScale(6),
  },
  notesText: {
    fontSize: moderateScale(12),
    color: colors.black,
    lineHeight: verticalScale(16),
    fontFamily: Secondaryfonts.medium,
  },

  dealerSection: {
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginTop: verticalScale(14),
  },
  dealerTitle: {
    fontSize: moderateScale(15),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
    marginBottom: verticalScale(10),
  },
  dealerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  dealerLabel: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  dealerValue: {
    fontSize: moderateScale(13),
    color: colors.black,
    textAlign: 'right',
    fontFamily: Secondaryfonts.medium,
  },
  dealerDivider: {
    height: 1,
    backgroundColor: colors.hind,
    opacity: 0.5,
  },
  srvLabel: {
    fontSize: moderateScale(10.8),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
    width: moderateScale(88),
  },
  verificationSection: {
    marginTop: verticalScale(25),
  },

  sectionHeading: {
    fontFamily: Secondaryfonts.semibold,
    fontSize: moderateScale(14),
    color: colors.black,
    marginBottom: verticalScale(6),
  },

  verificationCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  verificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },

  verificationTitle: {
    fontFamily: Secondaryfonts.semibold,
    fontSize: moderateScale(13),
    color: colors.black,
    marginBottom: verticalScale(2),
  },

  verificationSubtitle: {
    fontFamily: Secondaryfonts.medium,
    fontSize: moderateScale(12),
    color: colors.black,
    lineHeight: verticalScale(16),
  },

  statusBadge: {
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(5),
    alignSelf: 'center',
    marginLeft: '10@s',
  },

  statusText: {
    fontFamily: Secondaryfonts.medium,
    fontSize: moderateScale(11.5),
    color: colors.white,
  },
});
