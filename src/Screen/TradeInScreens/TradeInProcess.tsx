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
  moderateScale,
} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../constant/colors';
import CarBody from '../DynamicSections/CarBody';
import CarBodyDiagram from '../DynamicSections/CarBodyDiagram';
import CarInteriorDiagram from '../DynamicSections/CarInteriorDiagram';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const TradeInProcess = () => {
  const [selectedTab, setSelectedTab] = useState<'tab1' | 'tab2' | 'tab3'>(
    'tab1',
  );
  const [dropdownValue, setDropdownValue] = useState(null);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
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
  const [carAccident, setCarAccident] = useState<string | null>(null);
  const [cleanReport, setCleanReport] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const [damageDetails, setDamageDetails] = useState<Record<string, any>>({});
  const [selectedInteriorPart, setSelectedInteriorPart] = useState<
    string | null
  >(null);
  const [selectedDamageType, setSelectedDamageType] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);

  // Example damage options
  const damageOptions = {
  Hood: {
    types: [
      { name: "Overspray", cost: 50 },
      { name: "Chipped", cost: 100 },
      { name: "Dent", cost: 200 },
      { name: "Hail Damage", cost: 300 },
      { name: "Paintless Dent Repair", cost: 150 },
      { name: "Previous Paint Work", cost: 75 },
      { name: "Rust", cost: 250 },
      { name: "Scratch", cost: 80 },
    ],
    description:
      "Dents can be repaired if they are not cracked, have sharp indents, or are very large. If the body panel is made of aluminum, a dent cannot be repaired.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 500 },
    ],
  },
  Trunk: {
    types: [
      { name: "Dent", cost: 180 },
      { name: "Scratch", cost: 60 },
      { name: "Rust", cost: 220 },
    ],
    description: "Trunk damage considerations.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 450 },
    ],
  },
  "Front Bumper": {
    types: [
      { name: "Scratch", cost: 70 },
      { name: "Crack", cost: 300 },
      { name: "Dent", cost: 150 },
    ],
    description: "Front bumper damage details.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 350 },
    ],
  },
  "Rear Bumper": {
    types: [
      { name: "Scratch", cost: 70 },
      { name: "Crack", cost: 300 },
      { name: "Dent", cost: 150 },
    ],
    description: "Rear bumper damage details.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 350 },
    ],
  },
  "Front Left Light": {
    types: [
      { name: "Cracked", cost: 120 },
      { name: "Non-functional", cost: 250 },
    ],
    description: "Front left light issues.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  "Front Right Light": {
    types: [
      { name: "Cracked", cost: 120 },
      { name: "Non-functional", cost: 250 },
    ],
    description: "Front right light issues.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  "Rear Left Light": {
    types: [
      { name: "Cracked", cost: 100 },
      { name: "Non-functional", cost: 200 },
    ],
    description: "Rear left light issues.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  "Rear Right Light": {
    types: [
      { name: "Cracked", cost: 100 },
      { name: "Non-functional", cost: 200 },
    ],
    description: "Rear right light issues.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  "Front Left Fender": {
    types: [
      { name: "Dent", cost: 180 },
      { name: "Scratch", cost: 90 },
    ],
    description: "Front left fender damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 400 },
    ],
  },
  "Rear Left Fender": {
    types: [
      { name: "Dent", cost: 180 },
      { name: "Scratch", cost: 90 },
    ],
    description: "Rear left fender damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 400 },
    ],
  },
  "Front Right Fender": {
    types: [
      { name: "Dent", cost: 180 },
      { name: "Scratch", cost: 90 },
    ],
    description: "Front right fender damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 400 },
    ],
  },
  "Rear Right Fender": {
    types: [
      { name: "Dent", cost: 180 },
      { name: "Scratch", cost: 90 },
    ],
    description: "Rear right fender damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 400 },
    ],
  },
  "Front Left Doors": {
    types: [
      { name: "Dent", cost: 250 },
      { name: "Scratch", cost: 120 },
      { name: "Ding", cost: 80 },
    ],
    description: "Front left door issues.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 600 },
    ],
  },
  "Back Left Door": {
    types: [
      { name: "Dent", cost: 250 },
      { name: "Scratch", cost: 120 },
      { name: "Ding", cost: 80 },
    ],
    description: "Back left door issues.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 600 },
    ],
  },
  "Front Right Door": {
    types: [
      { name: "Dent", cost: 250 },
      { name: "Scratch", cost: 120 },
      { name: "Ding", cost: 80 },
    ],
    description: "Front right door issues.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 600 },
    ],
  },
  "Back Right Door": {
    types: [
      { name: "Dent", cost: 250 },
      { name: "Scratch", cost: 120 },
      { name: "Ding", cost: 80 },
    ],
    description: "Back right door issues.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 600 },
    ],
  },
  "Left Rocker": {
    types: [
      { name: "Scrape", cost: 100 },
      { name: "Rust", cost: 200 },
    ],
    description: "Left rocker panel damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 300 },
    ],
  },
  "Right Rocker": {
    types: [
      { name: "Scrape", cost: 100 },
      { name: "Rust", cost: 200 },
    ],
    description: "Right rocker panel damage.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 300 },
    ],
  },
  "Left Mirror": {
    types: [
      { name: "Cracked Glass", cost: 50 },
      { name: "Broken Casing", cost: 150 },
    ],
    description: "Left mirror damage.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  "Right Mirror": {
    types: [
      { name: "Cracked Glass", cost: 50 },
      { name: "Broken Casing", cost: 150 },
    ],
    description: "Right mirror damage.",
    subcategories: [{ name: "Replace", cost: 0 }],
  },
  Roof: {
    types: [
      { name: "Hail Damage", cost: 400 },
      { name: "Large Dent", cost: 350 },
    ],
    description: "Roof damage considerations.",
    subcategories: [
      { name: "Repair", cost: 0 },
      { name: "Replace", cost: 800 },
    ],
  },
};


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

  const handleColorSelect = (colorBox: string) => {
    if (selectedType) {
      setSelectedColors(prev => ({
        ...prev,
        [selectedType]: colorBox,
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
          <View style = {{padding: moderateScale(16)}}>
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
          </View>
        );

      case 'tab2':
        return (
          <View>
            <View style={styles.questionWrapper}>
              <View
                style={[
                  styles.sideBar,
                  {backgroundColor: carAccident ? colors.blue : '#D1D5DB'},
                ]}
              />
              <View style={styles.secondContent}>
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
                          selectedImpact === 'frameDamage'
                            ? null
                            : 'frameDamage',
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
              <View style={styles.secondContent}>
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
              <View style={styles.secondContent}>
                <Text style={styles.question}>
                  Does your car have any damage, mechanical issues, tire wear,
                  or modifications?
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
                        modifications === 'yes' &&
                          styles.optionTextSelectedGreen,
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
            <View style = {{paddingHorizontal: moderateScale(16)}}>
            <CarBody
              onSelect={item => {
                console.log('Selected:', item.label);
                setSelectedBodyPart(item.label); // store selection
              }}
            />
            </View>
            {selectedBodyPart && (
              <View style={{marginTop: verticalScale(20)}}>
                <Text style={{marginBottom: verticalScale(16), fontFamily: Secondaryfonts.medium, fontSize: moderateScale(17), color: '#000', paddingHorizontal: scale(16)}}>
                  {selectedBodyPart} Diagram
                </Text>

                {selectedBodyPart === 'Interior' && (
                  <CarInteriorDiagram
                    selectedPart={selectedInteriorPart}
                    handlePartClick={setSelectedInteriorPart}
                    damageOptions={damageOptions}
                    selectedDamageType={selectedDamageType}
                    handleDamageTypeSelect={setSelectedDamageType}
                    selectedSubcategory={selectedSubcategory}
                    handleSubcategorySelect={setSelectedSubcategory}
                  />
                )}

                {selectedBodyPart === 'Tires' && (
                  <CarBodyDiagram
                    selectedPart={selectedBodyPart}
                    handlePartClick={setSelectedBodyPart}
                    setSelectedPart={setSelectedBodyPart}
                    damageOptions={damageOptions}
                    selectedDamageType={selectedDamageType}
                    handleDamageTypeSelect={setSelectedDamageType}
                    selectedSubcategory={selectedSubcategory}
                    handleSubcategorySelect={setSelectedSubcategory}
                  />
                )}

                {/* {selectedBodyPart === "Glass" && (
      <CarGlassDiagram
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        damageOptions={damageOptions}
        selectedDamageType={selectedDamageType}
        setSelectedDamageType={setSelectedDamageType}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
    )} */}

                {/* {selectedBodyPart === "Tires" && (
      <CarTyreDiagram
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        damageOptions={damageOptions}
        selectedDamageType={selectedDamageType}
        setSelectedDamageType={setSelectedDamageType}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
    )} */}

                {/* {selectedBodyPart === "Lights" && (
      <IssueSelector
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
        damageOptions={damageOptions}
      />
    )} */}

                {/* {selectedBodyPart === "Mechanical" && (
      <CarMechanicalDiagram
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
        damageOptions={damageOptions}
        selectedDamageType={selectedDamageType}
        setSelectedDamageType={setSelectedDamageType}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
    )} */}

                {/* {selectedBodyPart === "Aftermarket" && (
      <CarAftermarketDiagram
        damageOptions={damageOptions}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
      />
    )} */}

                {/* {selectedBodyPart === "Other" && (
      <CarOther
        damageOptions={damageOptions}
        selectedIssues={otherIssues2}
        setSelectedIssues={setOtherIssues2}
      />
    )} */}
              </View>
            )}
          </View>
        );

      case 'tab3':
        return (
          <View style = {{padding: moderateScale(16)}}>
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
    paddingVertical: '16@ms',
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
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(15),
    paddingHorizontal: '16@s',
  },
  sideBar: {
    width: moderateScale(3),
    borderRadius: ms(2),
    marginRight: scale(10),
    alignSelf: 'stretch',
  },
  secondContent: {flex: 1},
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
});

export default TradeInProcess;
