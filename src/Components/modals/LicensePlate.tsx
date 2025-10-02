import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet, moderateScale, ms, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constant/colors';
import {Secondaryfonts} from '../../constant/fonts';

interface CarLookupModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAction?: (tab: 'LICENSE' | 'VIN' | 'MAKE', values: Record<string, string | null>) => void;
}


const {width} = Dimensions.get('window');

const LicensePlate: React.FC<CarLookupModalProps> = ({isVisible, onClose, onAction}) => {
  const [activeTab, setActiveTab] = useState<'LICENSE' | 'VIN' | 'MAKE'>('LICENSE');
  const fadeAnim = useState(new Animated.Value(1))[0];

  // form state
  const [licensePlate, setLicensePlate] = useState<string | null>(null);
  const [vin, setVin] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleAction = () => {
    if (!onAction) return;

    switch (activeTab) {
      case 'LICENSE':
        onAction('LICENSE', {
          licensePlate,
          state: selectedState,
        });
        break;
      case 'VIN':
        onAction('VIN', {
          vin,
        });
        break;
      case 'MAKE':
        onAction('MAKE', {
          make: selectedMake,
          model: selectedModel,
          year: selectedYear,
          style: selectedStyle,
        });
        break;
    }
  };


  // Dropdown data
  const states = [
    {label: 'TX', value: 'TX'},
    {label: 'CA', value: 'CA'},
    {label: 'NY', value: 'NY'},
  ];

  const makes = [
    {label: 'Toyota', value: 'toyota'},
    {label: 'Honda', value: 'honda'},
    {label: 'Ford', value: 'ford'},
  ];

  const models = [
    {label: 'Camry', value: 'camry'},
    {label: 'Civic', value: 'civic'},
    {label: 'Mustang', value: 'mustang'},
  ];

  const years = [
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
  ];

  const stylesList = [
    {label: 'Sedan', value: 'sedan'},
    {label: 'SUV', value: 'suv'},
    {label: 'Truck', value: 'truck'},
  ];

  const changeTab = (tab: 'LICENSE' | 'VIN' | 'MAKE') => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveTab(tab));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'LICENSE':
        return (
          <View>
            <TextInput
              placeholder="License Plate No"
              style={styles.input}
              placeholderTextColor="#666"
            />
            <Dropdown
              style={styles.dropdown}
              data={states}
              labelField="label"
              valueField="value"
              placeholder="State"
              value={selectedState}
              placeholderStyle={{
                fontFamily: Secondaryfonts.medium,
                fontSize: moderateScale(15),
                color: colors.black,
              }}
              iconColor={colors.black}
              itemTextStyle={{
                fontFamily: Secondaryfonts.medium,
                fontSize: moderateScale(14),
                color: colors.black,
              }}
              onChange={item => setSelectedState(item.value)}
              selectedTextStyle={{
                fontFamily: Secondaryfonts.medium,
                fontSize: moderateScale(14),
                color: colors.black,
              }}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Lookup Car</Text>
            </TouchableOpacity>
          </View>
        );

      case 'VIN':
        return (
          <View>
            <TextInput
              placeholder="VIN No"
              style={styles.input}
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );

      case 'MAKE':
        return (
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Dropdown
                style={styles.makeDropdown}
                data={makes}
                labelField="label"
                valueField="value"
                placeholder="Make"
                value={selectedMake}
                onChange={item => setSelectedMake(item.value)}
                placeholderStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(15),
                  color: colors.black,
                }}
                iconColor={colors.black}
                itemTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
                selectedTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
              />
              <Dropdown
                style={styles.makeDropdown}
                data={models}
                labelField="label"
                valueField="value"
                placeholder="Model"
                value={selectedModel}
                onChange={item => setSelectedModel(item.value)}
                placeholderStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(15),
                  color: colors.black,
                }}
                iconColor={colors.black}
                itemTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
                selectedTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Dropdown
                style={styles.makeDropdown}
                data={years}
                labelField="label"
                valueField="value"
                placeholder="Year"
                value={selectedYear}
                onChange={item => setSelectedYear(item.value)}
                placeholderStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(15),
                  color: colors.black,
                }}
                iconColor={colors.black}
                itemTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
                selectedTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
              />
              <Dropdown
                style={styles.makeDropdown}
                data={stylesList}
                labelField="label"
                valueField="value"
                placeholder="Style"
                value={selectedStyle}
                onChange={item => setSelectedStyle(item.value)}
                placeholderStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(15),
                  color: colors.black,
                }}
                iconColor={colors.black}
                itemTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
                selectedTextStyle={{
                  fontFamily: Secondaryfonts.medium,
                  fontSize: moderateScale(14),
                  color: colors.black,
                }}
              />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Lookup Car</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="chevron-back" size={ms(20)} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {activeTab === 'LICENSE'
              ? 'License Plate'
              : activeTab === 'VIN'
              ? 'VIN'
              : 'Make'}
          </Text>
          <View style={{width: s(20)}} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['LICENSE', 'VIN', 'MAKE'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => changeTab(tab as 'LICENSE' | 'VIN' | 'MAKE')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab === 'LICENSE' ? 'LICENSE PLATE' : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Animated Content */}
        <Animated.View style={{opacity: fadeAnim, marginTop: vs(15)}}>
          {renderContent()}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: '12@s',
    padding: '15@ms',
    marginHorizontal: '20@s',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15@vs',
    margin: '15@ms',
  },
  headerTitle: {
    fontSize: '19@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '10@vs',
  },
  tab: {
    paddingVertical: '6@vs',
    paddingHorizontal: '12@s',
    borderRadius: '6@s',
    marginHorizontal: '5@s',
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: colors.blue,
  },
  tabText: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  activeTabText: {
    color: colors.white,
  },
  input: {
    borderRadius: '8@s',
    padding: '10@ms',
    marginBottom: '10@vs',
    backgroundColor: colors.cardsBackgroundColor,
  },
  makeDropdown: {
    borderRadius: '8@s',
    paddingHorizontal: '10@s',
    marginBottom: '10@vs',
    height: '40@vs',
    width: '45%',
    backgroundColor: colors.cardsBackgroundColor,
  },
  dropdown: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '8@s',
    paddingHorizontal: '10@s',
    marginBottom: '10@vs',
    height: '45@vs',
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: '20@s',
    paddingVertical: '9@vs',
    marginTop: '10@vs',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
  },
});

export default LicensePlate;
