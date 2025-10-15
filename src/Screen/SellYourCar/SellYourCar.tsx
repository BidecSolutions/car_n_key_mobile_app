import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import {
  ScaledSheet,
  s,
  vs,
  ms,
  verticalScale,
  scale,
  moderateScale,
} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {TriangleColorPicker} from 'react-native-color-picker';

const colorBox = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#0000FF',
  '#008000',
  '#FFA500',
  'orange',
  'yellow',
  'purple',
];

const {height} = Dimensions.get('window');

const SellYourCar: React.FC = () => {
  const navigation = useNavigation();
  const [zipCode, setZipCode] = useState('');
  const [vin, setVin] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [style, setStyle] = useState('');
  const [condition, setCondition] = useState(null);
  const [selectedColor, setSelectedColor] = useState<
    'exterior' | 'interior' | null
  >(null);
  const [stillPaying, setStillPaying] = useState<string | null>(null);
  const [originalOwner, setOriginalOwner] = useState<string | null>(null);
  const [accident, setAccident] = useState<string | null>(null);
  const [loanType, setLoanType] = useState<'loan' | 'lease' | null>(null);
  const [carAccident, setCarAccident] = useState<string | null>(null);
  const [cleanReport, setCleanReport] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<{
    Exterior?: string;
    Interior?: string;
  }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<
    'Exterior' | 'Interior' | null
  >(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);

  const conditionOptions = [
    {label: 'Excellent', value: 'excellent'},
    {label: 'Good', value: 'good'},
    {label: 'Fair', value: 'fair'},
    {label: 'Poor', value: 'poor'},
  ];

  const scrollRef = useRef<ScrollView>(null);

  const handleColorSelect = (colorBox: string) => {
    if (selectedType) {
      setSelectedColors(prev => ({
        ...prev,
        [selectedType]: colorBox,
      }));
      setModalVisible(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: direction === 'left' ? 0 : 1000, // adjust distance
        animated: true,
      });
    }
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: verticalScale(40)}}>
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

        {/* Title & Subtitle */}

        <Text style={styles.title}>Sell your car</Text>
        <Text style={styles.subtitle}>
          We just need a few more details to generate{'\n'}
          helpful estimates on the current market value{'\n'}
          of your vehicle.
        </Text>

        {/* Image Placeholder */}
        <Image
          source={require('../../assets/Images/GarageCar.png')}
          style={styles.carImage}
          resizeMode="contain"
        />
        <View style={styles.appointmentDetailsSection}>
          <Text style={styles.heading}>Appointment Details</Text>

          {/* Upload Button */}
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={handleImageUpload}>
            <Text style={styles.uploadText}>Upload car images</Text>
            <Icon name="cloud-upload-outline" size={18} color="#4338CA" />
          </TouchableOpacity>

          {/* VIN + Price */}
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>VIN</Text>
              <TextInput
                placeholder="Enter your VIN number"
                placeholderTextColor="#666"
                style={styles.input}
                value={vin}
                onChangeText={setVin}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Add your car price</Text>
              <TextInput
                placeholder="Enter your VIN number"
                placeholderTextColor="#666"
                style={styles.input}
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>

          {/* Color Selection */}
          <Text style={styles.label}>What color is your car?</Text>
          <View style={styles.checkboxRow}>
            {/* Exterior */}
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                setSelectedType('Exterior');
                setModalVisible(true);
              }}>
              <View
                style={[
                  styles.colorBox,
                  selectedColors.Exterior
                    ? {backgroundColor: selectedColors.Exterior}
                    : null,
                ]}
              />
              <Text
                style={[
                  styles.checkboxText,
                  {color: selectedColors.Exterior ? '#000' : '#999'},
                ]}>
                Exterior
              </Text>
            </TouchableOpacity>

            {/* Interior */}
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                setSelectedType('Interior');
                setModalVisible(true);
              }}>
              <View
                style={[
                  styles.colorBox,
                  selectedColors.Interior
                    ? {backgroundColor: selectedColors.Interior}
                    : null,
                ]}
              />
              <Text
                style={[
                  styles.checkboxText,
                  {color: selectedColors.Interior ? '#000' : '#999'},
                ]}>
                Interior
              </Text>
            </TouchableOpacity>
          </View>

          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Select {selectedType} Color
                </Text>
                <View style={styles.colorRow}>
                  {colorBox.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.colorOption, {backgroundColor: color}]}
                      onPress={() => handleColorSelect(color)}
                    />
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Zip Code */}
          <Text style={styles.label}>What is your ZIP Code?</Text>
          <TextInput
            placeholder="Zip Code"
            placeholderTextColor="#666"
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
          />

          {/* Mileage */}
          <Text style={styles.label}>Enter your cars mileage.</Text>
          <TextInput
            placeholder="Mileage"
            placeholderTextColor="#666"
            style={styles.input}
            value={mileage}
            onChangeText={setMileage}
          />

          {/* Style */}
          <Text style={styles.label}>Style</Text>
          <TextInput
            placeholder="S 560 Sedan"
            placeholderTextColor="#666"
            style={styles.input}
            value={style}
            onChangeText={setStyle}
          />

          {/* Condition */}
          <Text style={styles.label}>Car Condition</Text>
          <Dropdown
            style={styles.dropdown}
            data={conditionOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Condition"
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownText}
            value={condition}
            onChange={item => setCondition(item.value)}
            itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
            renderRightIcon={() => (
              <Ionicons
                name="chevron-down"
                size={ms(16)}
                color={colors.black}
              />
            )}
          />
        </View>
        <View style={{padding: moderateScale(16)}}>
          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: stillPaying ? colors.blue : '#D1D5DB'}, // Blue if selected, Grey otherwise
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>Are you the original owner? *</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    originalOwner === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setOriginalOwner('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      originalOwner === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    originalOwner === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setOriginalOwner('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      originalOwner === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Accident */}
          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: accident ? colors.blue : '#D1D5DB'},
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>
                Was your car ever in an accident?
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    accident === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setAccident('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      accident === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    accident === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setAccident('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      accident === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Still Paying Duplicate (as per screenshot) */}
          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: stillPaying ? colors.blue : '#D1D5DB'},
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>
                Are you still making payments on your car? *
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    stillPaying === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setStillPaying('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      stillPaying === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    stillPaying === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setStillPaying('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      stillPaying === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Loan / Lease */}
          {stillPaying === 'yes' && (
            <>
              <Text style={styles.label}>What type of payments? *</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.loanOption,
                    loanType === 'loan' && styles.loanSelected,
                  ]}
                  onPress={() => setLoanType('loan')}>
                  <Text
                    style={[
                      styles.loanText,
                      loanType === 'loan' && styles.loanTextSelected,
                    ]}>
                    Loan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.loanOption,
                    loanType === 'lease' && styles.loanSelected,
                  ]}
                  onPress={() => setLoanType('lease')}>
                  <Text
                    style={[
                      styles.loanText,
                      loanType === 'lease' && styles.loanTextSelected,
                    ]}>
                    Lease
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Conditional Inputs */}

          {loanType === 'loan' && stillPaying === 'yes' && (
            <>
              <Text style={styles.label}>What type of payments? *</Text>
              <View style={styles.row}>
                <TextInput
                  placeholder="Mo. Payment*"
                  style={styles.inputBox}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Mo. Payments*"
                  style={styles.inputBox}
                  placeholderTextColor="#666"
                />
                <TextInput
                  placeholder="Amount*"
                  style={styles.inputBox}
                  placeholderTextColor="#666"
                />
              </View>
            </>
          )}

          {loanType === 'lease' && stillPaying === 'yes' && (
            <>
              <Text style={styles.label}>What type of payments? *</Text>
              <TextInput
                placeholder="Lease Payment*"
                style={styles.inputFull}
                placeholderTextColor="#666"
              />
            </>
          )}
        </View>

        <View style={{padding: moderateScale(16)}}>
          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: carAccident ? colors.blue : '#D1D5DB'},
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>
                Was your car ever in an accident? *
              </Text>
              <Text style={styles.questionExplanation}>
                Issues that may affect your car's history report include past
                insurance claims, outstanding liens, salvage or title issues
              </Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    carAccident === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setCarAccident('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      carAccident === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.option,
                    carAccident === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setCarAccident('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      carAccident === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              {carAccident === 'yes' && (
                <View style={styles.extraSection}>
                  <TextInput
                    placeholder="Select your value impacting options"
                    placeholderTextColor="#666"
                    style={styles.accidentInput}
                  />

                  {/* Frame Damage Radio */}
                  <TouchableOpacity
                    style={styles.radioRow}
                    onPress={() =>
                      setSelectedImpact(
                        selectedImpact === 'frameDamage' ? null : 'frameDamage',
                      )
                    }>
                    <View style={styles.radioOuter}>
                      {selectedImpact === 'frameDamage' && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text style={styles.radioLabel}>Frame Damage</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: cleanReport ? colors.blue : '#D1D5DB'},
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>
                Does your car have a clean history report? *
              </Text>
              <Text style={styles.questionExplanation}>
                Issues that may affect your car's history report include past
                insurance claims, outstanding liens, salvage or title issues
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    cleanReport === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setCleanReport('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      cleanReport === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    cleanReport === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setCleanReport('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      cleanReport === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.questionWrapper}>
            <View
              style={[
                styles.sideBar,
                {backgroundColor: modifications ? colors.blue : '#D1D5DB'},
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.question}>
                Does your car have any damage, mechanical issues, tire wear, or
                modifications?
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    modifications === 'yes' && styles.optionSelectedGreen,
                  ]}
                  onPress={() => setModifications('yes')}>
                  <Text
                    style={[
                      styles.optionText,
                      modifications === 'yes' && styles.optionTextSelectedGreen,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    modifications === 'no' && styles.optionSelected,
                  ]}
                  onPress={() => setModifications('no')}>
                  <Text
                    style={[
                      styles.optionText,
                      modifications === 'no' && styles.optionTextSelectedText,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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
  carImage: {
    width: '100%',
    height: '274@vs',
  },
  heading: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.bold,
    color: colors.black,
    marginBottom: '12@vs',
  },
  appointmentDetailsSection: {
    padding: '16@ms',
    marginVertical: '10@vs',
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
    width: '50%',
  },
  uploadText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
    marginRight: '10@s',
  },
  input: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '6@ms',
    paddingHorizontal: '10@s',
    paddingVertical: '10@vs',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  label: {
    fontSize: '14@ms',
    marginBottom: '10@vs',
    marginTop: '20@vs',
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: '16@vs',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@ms',
    paddingVertical: '8@vs',
    marginRight: '10@s',
  },
  colorBox: {
    width: '23@ms',
    height: '19@vs',
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: '8@s',
    borderRadius: '6@ms',
  },
  checkboxText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: '12@ms',
    padding: '20@ms',
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '12@vs',
    color: colors.black,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '20@vs',
  },
  colorOption: {
    width: '30@ms',
    height: '30@vs',
    borderRadius: '9@ms',
    margin: '6@s',
    borderWidth: 1,
    borderColor: colors.hind,
  },
  closeBtn: {
    paddingVertical: '10@vs',
    paddingHorizontal: '20@s',
    borderRadius: '8@ms',
    backgroundColor: colors.cardsBackgroundColor,
  },
  closeBtnText: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ✅ wrap into multiple rows
    justifyContent: 'center',
  },
  swatch: {
    width: '34@ms',
    height: '30@vs',
    margin: '6@ms',
    borderRadius: '6@s',
    borderColor: colors.black,
  },
  closeBtn: {
    textAlign: 'center',
    marginTop: '15@vs',
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  activeBox: {
    borderColor: colors.black,
  },
  colorText: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  activeText: {
    color: colors.black,
  },
  dropdown: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '6@ms',
    paddingHorizontal: '10@s',
    paddingVertical: '10@vs',
    marginTop: '4@vs',
  },
  dropdownText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  dropdownPlaceholder: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: '#666',
  },
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(15),
  },
  sideBar: {
    width: moderateScale(3),
    borderRadius: ms(2),
    marginRight: scale(10),
    alignSelf: 'stretch',
  },
  content: {flex: 1},
  question: {
    fontSize: ms(15),
    fontFamily: Secondaryfonts.medium,
    color: '#000',
    marginBottom: verticalScale(8),
  },
  questionExplanation: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: '#000',
    marginBottom: verticalScale(8),
  },
  bottomSectionRow: {flexDirection: 'row', alignItems: 'center'},
  option: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: ms(6),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(15),
    marginRight: scale(10),
  },
  optionSelectedGreen: {
    backgroundColor: '#329205',
    borderColor: '#329205',
  },
  optionSelected: {
    backgroundColor: '#FF0000',
  },
  optionText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  optionTextSelectedGreen: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
  optionTextSelectedText: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
  extraSection: {
    marginTop: '10@vs',
  },
  accidentInput: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '6@ms',
    paddingHorizontal: '10@s',
    paddingVertical: '10@vs',
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '12@vs',
    color: colors.black,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5@vs',
  },
  radioOuter: {
    width: '18@ms',
    height: '18@ms',
    borderRadius: '9@ms',
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8@s',
  },
  radioInner: {
    width: '12@ms',
    height: '12@ms',
    borderRadius: '6@ms',
    backgroundColor: colors.black,
  },
  radioLabel: {
    fontSize: '13@ms',
    color: '#000',
  },

  bottomSectionLabel: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.medium,
    marginBottom: verticalScale(8),
    color: colors.black,
  },
  loanOption: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: ms(6),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(20),
    marginRight: scale(10),
  },
  loanSelected: {backgroundColor: colors.blue, borderColor: colors.blue},
  loanText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: '#000',
  },
  loanTextSelected: {color: '#fff', fontWeight: '600'},
  optionDisabled: {opacity: 0.5},

  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: ms(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    marginRight: scale(8),
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: ms(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: '#000',
  },
});

export default SellYourCar;
