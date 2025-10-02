import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  ScaledSheet,
  s,
  vs,
  ms,
  verticalScale,
  scale,
} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constant/colors';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const TradeInProcess = () => {
  const [selectedTab, setSelectedTab] = useState<'tab1' | 'tab2' | 'tab3'>(
    'tab1',
  );
  const [dropdownValue, setDropdownValue] = useState(null);
  const navigation = useNavigation();
  const [loanType, setLoanType] = useState<'loan' | 'lease' | null>(null);
  const [payment, setPayment] = useState<'Yes' | 'No' | null>(null);
  const [selectedColors, setSelectedColors] = useState<{
    Exterior?: string;
    Interior?: string;
  }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<
    'Exterior' | 'Interior' | null
  >(null);
  const colors = [
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

  const handleColorSelect = (color: string) => {
    if (selectedType) {
      setSelectedColors(prev => ({
        ...prev,
        [selectedType]: color,
      }));
      setModalVisible(false);
    }
  };

  const tabs = [
    {key: 'tab1', title: 'Details 1'},
    {key: 'tab2', title: 'Condition 2'},
    {key: 'tab3', title: 'Personal Info 4'},
  ];

  const dropdownData = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

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

  const renderTabUI = () => {
    switch (selectedTab) {
      case 'tab1':
        return (
          <>
            <Text style={styles.label}>
              Select your value impacting options
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconColor={colors.hind}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select your value impacting options"
              value={dropdownValue}
              onChange={item => setDropdownValue(item.value)}
              itemTextStyle={{
                color: colors.black,
                fontFamily: Secondaryfonts.medium,
              }}
            />

            <View style={styles.row}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Odometer Reading</Text>
                <TextInput style={styles.input} placeholder="Subject" />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>ZIP Code</Text>
                <TextInput style={styles.input} placeholder="Zip Code" />
              </View>
            </View>

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
                    {colors.map((color, index) => (
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
            <Text style={styles.label}>How many keys do you have?</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              iconColor={colors.hind}
              selectedTextStyle={styles.selectedTextStyle}
              data={[
                {label: '1', value: '1'},
                {label: '2', value: '2'},
              ]}
              labelField="label"
              valueField="value"
              placeholder="How many keys do you have?"
              value={dropdownValue}
              onChange={item => setDropdownValue(item.value)}
              itemTextStyle={{
                color: colors.black,
                fontFamily: Secondaryfonts.medium,
              }}
            />

            <Text style={styles.label}>Are you the original owner?</Text>
            <View style={styles.ownerRow}>
              <TouchableOpacity style={styles.ownerBtn}>
                <Text style={styles.ownerText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ownerBtn}>
                <Text style={styles.ownerText}>No</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={handleImageUpload}>
              <Text style={styles.uploadText}>Upload car images</Text>
              <Icon name="cloud-upload-outline" size={18} color="#4338CA" />
            </TouchableOpacity>
            <View style={{marginTop: verticalScale(18)}}>
              <Text style={styles.label}>
                Are you still making payments on your car? *
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.loanOption,
                    payment === 'Yes' && styles.loanSelected,
                  ]}
                  onPress={() => setPayment('Yes')}>
                  <Text
                    style={[
                      styles.loanText,
                      payment === 'Yes' && styles.loanTextSelected,
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.loanOption,
                    payment === 'No' && styles.loanSelected,
                  ]}
                  onPress={() => setPayment('No')}>
                  <Text
                    style={[
                      styles.loanText,
                      payment === 'No' && styles.loanTextSelected,
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              {payment === 'Yes' && (
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

              {loanType === 'loan' && payment === 'Yes' && (
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

              {loanType === 'lease' && payment === 'Yes' && (
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
          </>
        );

      case 'tab2':
        return (
          <View>
            <Text style={styles.placeholderText}>
              Condition 2 screen content here
            </Text>
          </View>
        );

      case 'tab3':
        return (
          <View>
            <View style={styles.row}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#666"
                style={styles.inputHalfWidth}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666"
                style={styles.inputHalfWidth}
              />
            </View>

            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#666"
              style={styles.inputFullWidth}
              keyboardType="phone-pad"
            />

            <Text style={styles.helperText}>
              We will send a code to your mobile to verify your phone number
            </Text>

            <View style={styles.row}>
              <TextInput
                placeholder="Code"
                placeholderTextColor="#666"
                style={styles.inputHalfWidth}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Email*"
                placeholderTextColor="#666"
                style={styles.inputHalfWidth}
                keyboardType="email-address"
              />
            </View>

            <TextInput
              placeholder="Vin"
              placeholderTextColor="#666"
              style={styles.inputFullWidth}
            />

            <Text style={styles.termsText}>
              By clicking the button below, you agree to the instant Offer Terms
              and conditions and Carnkey.com Privacy Statement
            </Text>

            <TouchableOpacity style={styles.nextBtn}>
              <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: verticalScale(40)}}>
        <Header
          showBack
          showDrawer
          onDrawerPress={() => navigation.openDrawer()} // ✅ works now
          backgroundColor={colors.backgroundColor}
          iconColor={colors.black}
          titleColor={colors.black}
          onBackPress={navigation.goBack}
        />
        {/* Title */}
        <Text style={styles.title}>
          {selectedTab === 'tab1'
            ? 'Tell us about your car'
            : selectedTab === 'tab2'
            ? "Your Car's Shape"
            : "You're Almost Done"}
        </Text>

        <Text style={styles.subtitle}>All fields with * are required</Text>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key as any)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText,
                ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render Tab UI */}
        <View style={styles.content}>{renderTabUI()}</View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '16@ms',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: '21@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    marginTop: '8@vs',
    color: colors.black,
  },
  subtitle: {
    fontSize: '14@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    marginTop: '8@vs',
    marginBottom: '14@vs',
    color: colors.hind,
    paddingHorizontal: '8@s',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20@vs',
  },
  tab: {
    paddingVertical: '9@vs',
    paddingHorizontal: '12@s',
    marginHorizontal: '4@s',
    borderRadius: '20@ms',
    backgroundColor: colors.cardsBackgroundColor,
    width: '30%',
  },
  activeTab: {
    backgroundColor: colors.blue,
  },
  tabText: {
    fontSize: '10@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
  },
  activeTabText: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
  content: {
    marginTop: '10@vs',
  },
  dropdown: {
    height: '45@vs',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '8@ms',
    paddingHorizontal: '10@s',
    marginBottom: '16@vs',
  },
  placeholderStyle: {
    fontSize: '12@ms',
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
  },
  selectedTextStyle: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  input: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(6),
    paddingHorizontal: s(10),
    paddingVertical: vs(8),
    fontSize: ms(14),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '16@vs',
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
    marginTop: '18@vs',
  },
  uploadText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  fieldContainer: {
    flex: 1,
    marginHorizontal: s(5),
  },
  label: {
    fontSize: '14@ms',
    marginBottom: '8@vs',
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
  ownerRow: {
    flexDirection: 'row',
    marginTop: '8@vs',
  },
  ownerBtn: {
    flexDirection: 'row',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: '8@ms',

    marginRight: '8@s',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
  },
  ownerText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  placeholderText: {
    fontSize: '15@ms',
    textAlign: 'center',
    marginTop: '50@vs',
    color: colors.hind,
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
  inputHalfWidth: {
    flex: 1,
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    marginRight: scale(8),
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  inputFullWidth: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: '#000',
  },
  helperText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginTop: '15@vs',
    marginBottom: '15@vs',
  },
  termsText: {
    fontSize: '11@ms',
    color: colors.black,
    marginVertical: '16@vs',
    fontFamily: Secondaryfonts.medium,
  },
  nextBtn: {
    width: '100%',
    backgroundColor: colors.blue,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10@vs',
  },
  nextBtnText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
  },
});

export default TradeInProcess;
