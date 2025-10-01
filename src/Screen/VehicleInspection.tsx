import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScaledSheet, moderateScale, ms, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {Calendar} from 'react-native-calendars';
import {Header} from '../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';

const VehicleInspection = () => {
  const [activeTab, setActiveTab] = useState<'inspection' | 'confirm'>(
    'inspection',
  );
  const [fadeAnim] = useState(new Animated.Value(1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [secondDate, setSecondDate] = useState<string | null>(null);
  const [showSecondCalendar, setShowSecondCalendar] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [termsMarked, setTermsMarked] = useState(false);
  const [atMyHomeSelected, setAtMyHomeSelected] = useState(false);

  const navigation = useNavigation();

  const dropdownData = [
    {label: 'Select Date', value: '1'},
    {label: 'Option 1', value: '2'},
    {label: 'Option 2', value: '3'},
  ];

  const switchTab = (tab: 'inspection' | 'confirm') => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleImageUpload = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission denied');
        return;
      }
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // 0 means unlimited
      },
      response => {
        if (!response.didCancel && response.assets) {
          console.log('Selected Images:', response.assets);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <Header
        showBack={true}
        showDrawer={true}
        backgroundColor={colors.backgroundColor}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: vs(30)}}>
        {/* Title */}
        <Text style={styles.title}>
          {activeTab === 'inspection'
            ? 'Schedule Your Vehicle Inspection'
            : 'Review & Confirm Your Details'}
        </Text>
        <Text style={styles.subtitle}>
          {activeTab === 'inspection'
            ? 'Choose a time and location that works for you. A dealer rep will inspect your car and finalize the offer.'
            : 'Make sure everything looks good before submitting your appointment.'}
        </Text>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'inspection' && styles.activeTab,
            ]}
            onPress={() => switchTab('inspection')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'inspection' && styles.activeTabText,
              ]}>
              Schedule Inspection 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'confirm' && styles.activeTab,
            ]}
            onPress={() => switchTab('confirm')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'confirm' && styles.activeTabText,
              ]}>
              Confirm & Submit 2
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fade Content */}
        <Animated.View style={{opacity: fadeAnim}}>
          {/* First Tab */}
          {activeTab === 'inspection' && (
            <View>
              {/* Date Row */}
              <View style={styles.dateRow}>
                {/* Calendar Button */}
                <TouchableOpacity
                  style={styles.dateBox}
                  onPress={() => setShowCalendar(true)}>
                  <Text style={styles.dateText}>
                    {selectedDate || 'Select Date'}
                  </Text>
                  <Icon
                    name="calendar-outline"
                    size={18}
                    color={colors.black}
                  />
                </TouchableOpacity>

                {/* Calendar Modal */}
                <Modal visible={showCalendar} transparent animationType="slide">
                  <TouchableWithoutFeedback
                    onPress={() => setShowCalendar(false)}>
                    <View style={styles.modalContainer}>
                      <View style={styles.calendarWrapper}>
                        <Calendar
                          onDayPress={(day: any) => {
                            setSelectedDate(day.dateString);
                            setShowCalendar(false);
                          }}
                          markedDates={{
                            [selectedDate || '']: {
                              selected: true,
                              selectedColor: colors.blue,
                            },
                          }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                {/* Dropdown */}
                <Dropdown
                  style={styles.dropdown}
                  data={dropdownData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Date"
                  value={dropdownValue}
                  onChange={item => setDropdownValue(item.value)}
                  selectedTextStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                  iconStyle={{tintColor: colors.black}}
                  iconColor={colors.black}
                  itemTextStyle={{
                    fontFamily: Secondaryfonts.medium,
                    fontSize: moderateScale(14),
                    color: colors.black,
                  }}
                />
              </View>

              {/* Choose Location */}
              <Text style={styles.sectionTitle}>Choose Location</Text>
              <View style={styles.radioRow}>
                {/* Option 1 */}
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSelectedLocation('dealer')}>
                  <Icon
                    name={
                      selectedLocation === 'dealer'
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={18}
                    color={
                      selectedLocation === 'dealer' ? colors.blue : colors.black
                    }
                  />
                  <Text style={styles.radioText}>At Dealer Location</Text>
                </TouchableOpacity>

                {/* Option 2 */}
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSelectedLocation('home')}>
                  <Icon
                    name={
                      selectedLocation === 'home'
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={18}
                    color={
                      selectedLocation === 'home' ? colors.blue : colors.black
                    }
                  />
                  <Text style={styles.radioText}>
                    At My Home/Office (if applicable)
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Address */}
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#333"
              />

              {/* Text field */}
              <TextInput
                style={styles.textArea}
                placeholder="Text Field (optional)"
                placeholderTextColor="#333"
                multiline
              />

              {/* Terms */}
              <View style={styles.termsRow}>
                <TouchableOpacity onPress={() => setTermsMarked(!termsMarked)}>
                  <Icon
                    name={termsMarked ? 'radio-button-on' : 'radio-button-off'}
                    size={14}
                    color={termsMarked ? colors.blue : colors.black}
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  Term & Condition : The Quoted price is only Valid after test
                  drive and inspection by dealer
                </Text>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  !termsMarked && {backgroundColor: '#ccc'}, // gray when disabled
                ]}
                disabled={!termsMarked}
                onPress={() => console.log('Continue pressed')}>
                <Text style={styles.continueText}>Continue to Review</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Second Tab */}
          {activeTab === 'confirm' && (
            <View>
              {/* Vehicle Summary */}
              <Text style={styles.sectionTitle}>Vehicle Summary</Text>
              <View style={styles.row3}>
                <TextInput style={styles.box} placeholder="Model" />
                <TextInput style={styles.box} placeholder="Year" />
                <TextInput style={styles.box} placeholder="Trim" />
              </View>
              <View style={styles.row2}>
                <TextInput style={styles.box} placeholder="Mileage" />
                <TextInput style={styles.box} placeholder="VIN" />
              </View>

              {/* Dealer Info */}
              <Text style={styles.sectionTitle}>Dealer Info</Text>
              <View style={styles.row2}>
                <TextInput style={styles.box} placeholder="Dealer name" />
                <TextInput style={styles.box} placeholder="Offer range" />
              </View>
              <TextInput style={styles.boxFull} placeholder="Dealer location" />

              {/* Appointment Details */}
              <Text style={styles.sectionTitle}>Appointment Details</Text>
              <View style={styles.row2}>
                <TouchableOpacity
                  style={styles.dateBox}
                  onPress={() => setShowSecondCalendar(true)}>
                  <Text style={styles.dateText}>
                    {secondDate || 'Select Date'}
                  </Text>
                  <Icon
                    name="calendar-outline"
                    size={18}
                    color={colors.black}
                  />
                </TouchableOpacity>

                <Modal
                  visible={showSecondCalendar}
                  transparent
                  animationType="slide">
                  <TouchableWithoutFeedback
                    onPress={() => setShowSecondCalendar(false)}>
                    <View style={styles.modalContainer}>
                      <View style={styles.calendarWrapper}>
                        <Calendar
                          onDayPress={(day: any) => {
                            setSecondDate(day.dateString);
                            setShowSecondCalendar(false);
                          }}
                          markedDates={{
                            [secondDate || '']: {
                              selected: true,
                              selectedColor: colors.blue,
                            },
                          }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>

                <Dropdown
                  style={styles.dropdown}
                  data={dropdownData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Time Slot"
                  value={dropdownValue}
                  onChange={item => setDropdownValue(item.value)}
                  selectedTextStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                  iconStyle={{tintColor: colors.black}}
                  iconColor={colors.black}
                  itemTextStyle={{
                    fontFamily: Secondaryfonts.medium,
                    fontSize: moderateScale(14),
                    color: colors.black,
                  }}
                />
              </View>

              {/* Choose Location */}
              <Text style={styles.sectionTitle}>Choose Location</Text>
              <View style={styles.radioRow}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setAtMyHomeSelected(!atMyHomeSelected)}>
                  <Icon
                    name={
                      atMyHomeSelected ? 'radio-button-on' : 'radio-button-off'
                    }
                    size={14}
                    color={atMyHomeSelected ? colors.blue : colors.black}
                  />
                  <Text style={styles.radioText}>
                    At My Home/Office (if applicable)
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Address */}
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#333"
              />

              {/* Upload Car Images */}
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={handleImageUpload}>
                <Text style={styles.uploadText}>Upload car images</Text>
                <Icon name="cloud-upload-outline" size={18} color="#4338CA" />
              </TouchableOpacity>

              {/* Terms */}
              <View style={styles.termsRow}>
                <Icon name="radio-button-off" size={14} color={colors.black} />
                <Text style={styles.termsText}>
                  Term & Condition : The Quoted price is only Valid after test
                  drive and inspection by dealer
                </Text>
              </View>

              {/* Continue Button */}
              <TouchableOpacity style={styles.continueBtn}>
                <Text style={styles.continueText}>Continue to Review</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: '16@ms',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: '16@ms',
  },
  calendarWrapper: {
    backgroundColor: colors.white,
    borderRadius: '12@ms',
    padding: '10@ms',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10@vs',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20@vs',
  },
  tabButton: {
    paddingVertical: '8@vs',
    paddingHorizontal: '15@ms',
    borderRadius: '30@ms',
    backgroundColor: colors.cardsBackgroundColor,
    marginHorizontal: '5@ms',
  },
  activeTab: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  tabText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  activeTabText: {
    color: colors.white,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
  },
  dateBox: {
    backgroundColor: colors.cardsBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8@ms',
    paddingHorizontal: '10@ms',
    flex: 1,
    marginRight: '8@ms',
    height: '40@vs',
  },
  dateText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  dropdown: {
    flex: 1,
    height: '40@vs',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '8@ms',
    paddingHorizontal: '10@s',
  },
  dropdownText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  dropdownPlaceholder: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: '#333',
  },
  sectionTitle: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.bold,
    color: colors.black,
    marginBottom: '10@vs',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
    gap: '6@s',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: '12.5@ms',
    fontFamily: Secondaryfonts.medium,
    marginLeft: '5@s',
    color: colors.black,
  },
  input: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    marginBottom: '15@vs',
    fontFamily: Secondaryfonts.medium,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '15@vs',
    height: '80@vs',
    textAlignVertical: 'top',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '20@vs',
  },
  termsText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginLeft: '6@s',
    flex: 1,
    bottom: '2@vs',
  },
  continueBtn: {
    backgroundColor: colors.blue,
    borderRadius: '30@ms',
    paddingVertical: '12@vs',
    alignItems: 'center',
  },
  continueText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15@vs',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15@vs',
  },
  box: {
    flex: 1,
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginRight: '10@s',
    backgroundColor: colors.cardsBackgroundColor,
  },
  boxFull: {
    borderRadius: '8@ms',
    padding: '10@ms',
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '15@vs',
    backgroundColor: colors.cardsBackgroundColor,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    gap: '6@s',
    borderRadius: '25@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '15@ms',
    marginBottom: '20@vs',
    width: '50%',
  },
  uploadText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
});

export default VehicleInspection;
