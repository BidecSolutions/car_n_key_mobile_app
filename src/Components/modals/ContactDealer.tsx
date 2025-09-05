import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constant/colors';
import { Primaryfonts, Secondaryfonts } from '../../constant/fonts';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const makes = [
  {label: 'Toyota', value: 'toyota'},
  {label: 'Honda', value: 'honda'},
];
const models = [
  {label: 'Corolla', value: 'corolla'},
  {label: 'Civic', value: 'civic'},
];
const years = [
  {label: '2024', value: '2024'},
  {label: '2023', value: '2023'},
];
const carcolors = [
  {label: 'Black', value: 'black'},
  {label: 'White', value: 'white'},
];
const mileages = [
  {label: '0-10k', value: '0-10k'},
  {label: '10k-50k', value: '10k-50k'},
];

const ContactDealer: React.FC<Props> = ({isVisible, onClose}) => {
  const [isMarked, setIsMarked] = useState(false);
  const [isTermMarked, setIsTermMarked] = useState(false);

  // Dropdown states
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMileage, setSelectedMileage] = useState<string | null>(null);

  return (
    <Modal isVisible={isVisible} style={styles.modal}
    onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Contact Dealer</Text>
          </View>

          {/* Dealer Info */}
          <View style={styles.dealerRow}>
            <Text style={styles.dealerName}>Jordan Motorcars</Text>
            <View style={styles.phoneRow}>
              <Icon name="call-outline" size={16} color="#3B28CC" />
              <Text style={styles.phoneText}>(888) 422-5279</Text>
            </View>
          </View>

          {/* Inputs */}
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="E-mail Address"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone No"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              placeholderTextColor="#999"
            />
          </View>
          <TextInput
            style={[
              styles.input,
              {width: '100%', height: vs(60), textAlignVertical: 'top'},
            ]}
            placeholder="Description"
            placeholderTextColor="#999"
            multiline
          />

          {/* Custom Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            activeOpacity={0.8}
            onPress={() => setIsMarked(!isMarked)}>
            <View style={[styles.checkbox, isMarked && styles.checkboxMarked]}>
              {isMarked && <Icon name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxText}>I've trade in</Text>
          </TouchableOpacity>

          {/* Trade-in dropdowns */}
          {isMarked && (
            <>
              <View style={styles.row}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  data={makes}
                  labelField="label"
                  valueField="value"
                  placeholder="Choose a Make"
                  value={selectedMake}
                  itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
                  onChange={item => setSelectedMake(item.value)}
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  data={models}
                  labelField="label"
                  valueField="value"
                  placeholder="Choose a Model"
                  value={selectedModel}
                  itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
                  onChange={item => setSelectedModel(item.value)}
                />
              </View>
              <View style={styles.row}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  data={years}
                  labelField="label"
                  valueField="value"
                  placeholder="Choose a Year"
                  value={selectedYear}
                  itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
                  onChange={item => setSelectedYear(item.value)}
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  data={carcolors}
                  labelField="label"
                  valueField="value"
                  placeholder="Exterior Color"
                  value={selectedColor}
                  itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
                  onChange={item => setSelectedColor(item.value)}
                />
              </View>
              <View style={styles.row}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownText}
                  itemTextStyle={{color: '#000', fontFamily: Secondaryfonts.medium}}
                  data={mileages}
                  labelField="label"
                  valueField="value"
                  placeholder="Mileage"
                  value={selectedMileage}
                  onChange={item => setSelectedMileage(item.value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="VIN (Optional)"
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}

          {/* Disclaimer */}
         
            <TouchableOpacity
              style={styles.checkboxTermRow}
              activeOpacity={0.8}
              onPress={() => setIsTermMarked(!isTermMarked)}>
              <View
                style={[styles.checkboxTerm, isTermMarked && styles.checkboxTermMarked]}>
                {isTermMarked && <Icon name="checkmark" size={16} color="#fff" />}
              </View>
               <Text style={styles.checkboxTermText}>By clicking, you agree Carnkey.com may contact you via call/text
            (incl. marketing). Consent not required. See Privacy Notice.</Text>
            </TouchableOpacity>
            
          

          {/* Button */}
          <TouchableOpacity style={styles.checkBtn}>
            <Text style={styles.checkText}>Check Availability</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center', // <-- center vertically
    alignItems: 'center', // <-- center horizontally
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: '16@ms',
    padding: '16@ms',
    width: '90%', // give it a fixed width for center look
    maxHeight: '92%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '12@vs',
    gap: '60@s',
    marginTop: '5@vs',
  },
  headerText: {
    fontSize: '19@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
  },
  dealerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16@vs',
  },
  dealerName: {
    fontSize: '17@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: '16@ms',
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
    marginLeft: '4@s',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '12@vs',
  },
  input: {
    flex: 1,
    height: '35@vs',
    backgroundColor: '#f1f1f1',
    borderRadius: '8@ms',
    paddingHorizontal: '10@s',
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginHorizontal: '4@s',
  },
  dropdown: {
    flex: 1,
    height: '32@vs',
    backgroundColor: '#f1f1f1',
    borderRadius: '8@ms',
    paddingHorizontal: '8@s',
    marginHorizontal: '4@s',
  },
  dropdownPlaceholder: {
    fontSize: '14@ms',
    color: '#999',
  },
  dropdownText: {
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '12@vs',
    marginTop: '20@vs',
  },
  checkbox: {
    width: '18@ms',
    height: '17@vs',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: '4@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTermRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  checkboxMarked: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  checkboxText: {
    marginLeft: '8@s',
    fontFamily: Secondaryfonts.medium,
    fontSize: '15@ms',
    color: colors.black,
  },
  checkboxTerm: {
    width: '18@ms',
    height: '17@vs',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: '3@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTermMarked: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,

  },
  checkboxTermText: {
    marginLeft: '8@s',
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginVertical: '15@vs',
    width: '90%',
  },
  disclaimer: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginVertical: '15@vs',
  },
  checkBtn: {
    height: '30@vs',
    borderRadius: '24@ms',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '13@vs',
  },
  checkText: {
    fontSize: '15@ms',
    color: colors.white,
    fontFamily: Secondaryfonts.semibold,
  },
});

export default ContactDealer;
