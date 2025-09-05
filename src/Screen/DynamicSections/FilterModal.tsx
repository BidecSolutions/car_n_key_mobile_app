import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RangeSlider from 'rn-range-slider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constant/colors';
import { Primaryfonts, Secondaryfonts } from '../../constant/fonts';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
};

const FilterModal: React.FC<Props> = ({visible, onClose, onApply}) => {
  const [zipCode, setZipCode] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    10000, 50000,
  ]);
  const [yearRange, setYearRange] = useState<[number, number]>([2015, 2024]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 200]);
  const [gearType, setGearType] = useState(null);
  const [fuelPreference, setFuelPreference] = useState(null);
  const [safetyFeature, setSafetyFeature] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [historyCheck, setHistoryCheck] = useState(null);
  const [driveMode, setDriveMode] = useState(null);
  const [selectedExterior, setSelectedExterior] = useState('');
  const [selectedInterior, setSelectedInterior] = useState('');
  const [selectedEV, setSelectedEV] = useState('');
  const [selectedDeal, setSelectedDeal] = useState('');
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [bodyStyle, setBodyStyle] = useState(null);

  // 👉 Inline custom renderers for RangeSlider
  const Thumb = () => (
    <View
      style={styles.thumb}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
    />
  );
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={styles.railSelected} />;
  const Label = ({text}: {text: string}) => (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );
  const Notch = () => <View style={styles.notch} />;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <GestureHandlerRootView style={{flex: 1}}>

        <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerBtn}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={() => onApply({reset: true})}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {/* Tabs */}
            <View style={styles.tabs}>
              {['New', 'All', 'Used', 'Certified'].map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, index === 0 && styles.tabActive]}>
                  <Text
                    style={[
                      styles.tabText,
                      index === 0 && styles.tabTextActive,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Zip Code */}
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Zip Code"
              keyboardType="numeric"
              value={zipCode}
              onChangeText={setZipCode}
            />

            {/* Quick Search */}
            <Text style={styles.label}>Quick Search</Text>
            <View style={styles.quickRow}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Brand"
                data={[
                  {label: 'Toyota', value: 'toyota'},
                  {label: 'Honda', value: 'honda'},
                  {label: 'BMW', value: 'bmw'},
                ]}
                labelField="label"
                valueField="value"
                value={brand}
                onChange={item => setBrand(item.value)}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="Model"
                data={[
                  {label: 'Corolla', value: 'corolla'},
                  {label: 'Civic', value: 'civic'},
                  {label: 'X5', value: 'x5'},
                ]}
                labelField="label"
                valueField="value"
                value={model}
                onChange={item => setModel(item.value)}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="Body Style"
                data={[
                  {label: 'Sedan', value: 'sedan'},
                  {label: 'SUV', value: 'suv'},
                  {label: 'Hatchback', value: 'hatchback'},
                ]}
                labelField="label"
                valueField="value"
                value={bodyStyle}
                onChange={item => setBodyStyle(item.value)}
              />
            </View>

            {/* Pricing Range */}
            <Text style={styles.label}>Pricing Range</Text>
            <View style={styles.rangeRow}>
              <Text style={styles.rangeText}>
                ${priceRange[0].toLocaleString()}
              </Text>
              <Text style={styles.rangeText}>TO</Text>
              <Text style={styles.rangeText}>
                ${priceRange[1].toLocaleString()}
              </Text>
            </View>
            <MultiSlider
              values={priceRange}
              min={0}
              max={100000}
              step={1000}
              onValuesChange={values =>
                setPriceRange(values as [number, number])
              }
              sliderLength={300} // adjust to fit your layout
              selectedStyle={{backgroundColor: '#4a3aff'}}
              unselectedStyle={{backgroundColor: '#ddd'}}
              markerStyle={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#4a3aff',
                elevation: 3,
              }}
            />

            {/* Manufacturing Year */}
            {/* Manufacturing Year */}
            <Text style={styles.label}>Manufacturing Year</Text>
            <View style={styles.rangeRow}>
              <Text style={styles.rangeText}>{yearRange[0]}</Text>
              <Text style={styles.rangeText}>TO</Text>
              <Text style={styles.rangeText}>{yearRange[1]}</Text>
            </View>

            <MultiSlider
              values={yearRange}
              min={2000}
              max={2025}
              step={1}
              onValuesChange={values =>
                setYearRange(values as [number, number])
              }
              sliderLength={300} // adjust width
              selectedStyle={{backgroundColor: '#4a3aff'}}
              unselectedStyle={{backgroundColor: '#ddd'}}
              markerStyle={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#4a3aff',
                elevation: 3,
              }}
            />

            {/* Mileage */}
            {/* Mileage */}
            <Text style={styles.label}>Mileage</Text>
            <View style={styles.rangeRow}>
              <Text style={styles.rangeText}>{mileageRange[0]}k</Text>
              <Text style={styles.rangeText}>TO</Text>
              <Text style={styles.rangeText}>{mileageRange[1]}k</Text>
            </View>

            <MultiSlider
              values={mileageRange}
              min={0}
              max={200}
              step={10}
              onValuesChange={values =>
                setMileageRange(values as [number, number])
              }
              sliderLength={300} // adjust width
              selectedStyle={{backgroundColor: '#4a3aff'}}
              unselectedStyle={{backgroundColor: '#ddd'}}
              markerStyle={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#4a3aff',
                elevation: 3,
              }}
            />

            {/* Vehicle Specification */}
            {/* Vehicle Specification */}
            <Text style={styles.label}>Vehicle Specification</Text>
            <View style={styles.quickRow}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Gear Type"
                data={[
                  {label: 'Automatic', value: 'automatic'},
                  {label: 'Manual', value: 'manual'},
                ]}
                labelField="label"
                valueField="value"
                value={gearType}
                onChange={item => setGearType(item.value)}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="Fuel Preferences"
                data={[
                  {label: 'Petrol', value: 'petrol'},
                  {label: 'Diesel', value: 'diesel'},
                  {label: 'Electric', value: 'electric'},
                ]}
                labelField="label"
                valueField="value"
                value={fuelPreference}
                onChange={item => setFuelPreference(item.value)}
              />
            </View>

            {/* Exterior Shade */}
            <Text style={styles.label}>Exterior Shade</Text>
            <View style={styles.colorRow}>
              {[
                '#FF6B6B',
                '#FFD93D',
                '#6BCB77',
                '#F7F7A1',
                '#4D96FF',
                '#7D5FFF',
              ].map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    {backgroundColor: color},
                    selectedExterior === color && styles.colorSelected,
                  ]}
                  onPress={() => setSelectedExterior(color)}
                />
              ))}
            </View>

            {/* Interior Theme */}
            <Text style={styles.label}>Interior Theme</Text>
            <View style={styles.colorRow}>
              {[
                '#FF6B6B',
                '#FFD93D',
                '#6BCB77',
                '#F7F7A1',
                '#4D96FF',
                '#7D5FFF',
              ].map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    {backgroundColor: color},
                    selectedInterior === color && styles.colorSelected,
                  ]}
                  onPress={() => setSelectedInterior(color)}
                />
              ))}
            </View>

            {/* Features */}
            {/* Features */}
            <Text style={styles.label}>Features</Text>
            <View style={styles.featureRow}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Safety First"
                data={[
                  {label: 'Airbags', value: 'airbags'},
                  {label: 'ABS', value: 'abs'},
                ]}
                labelField="label"
                valueField="value"
                value={safetyFeature}
                onChange={item => setSafetyFeature(item.value)}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="Capacity"
                data={[
                  {label: '2 Seater', value: '2'},
                  {label: '4 Seater', value: '4'},
                  {label: '7 Seater', value: '7'},
                ]}
                labelField="label"
                valueField="value"
                value={capacity}
                onChange={item => setCapacity(item.value)}
              />
            </View>
            <View style={styles.featureRow}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Comfort"
                data={[
                  {label: 'Standard', value: 'standard'},
                  {label: 'Luxury', value: 'luxury'},
                ]}
                labelField="label"
                valueField="value"
                value={comfort}
                onChange={item => setComfort(item.value)}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="History Check"
                data={[
                  {label: 'Yes', value: 'yes'},
                  {label: 'No', value: 'no'},
                ]}
                labelField="label"
                valueField="value"
                value={historyCheck}
                onChange={item => setHistoryCheck(item.value)}
              />
            </View>
            <View style={styles.featureRow}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Drive Mode"
                data={[
                  {label: 'FWD', value: 'fwd'},
                  {label: 'RWD', value: 'rwd'},
                  {label: 'AWD', value: 'awd'},
                ]}
                labelField="label"
                valueField="value"
                value={driveMode}
                onChange={item => setDriveMode(item.value)}
              />
            </View>

            {/* Electrical Vehicle */}
            <Text style={styles.label}>Electrical Vehicle</Text>
            <View style={styles.toggleRow}>
              {['EV Range', 'Charging Duration'].map((opt, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.toggleBtn,
                    selectedEV === opt && styles.toggleBtnActive,
                  ]}
                  onPress={() => setSelectedEV(opt)}>
                  <Text
                    style={[
                      styles.toggleText,
                      selectedEV === opt && styles.toggleTextActive,
                    ]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Deal Rating */}
            <Text style={styles.label}>Deal Rating</Text>
            <View style={styles.toggleRow}>
              {['Great Deals', 'Good Deals', 'Fair Deals'].map(
                (deal, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.toggleBtn,
                      selectedDeal === deal && styles.toggleBtnActive,
                    ]}
                    onPress={() => setSelectedDeal(deal)}>
                    <Text
                      style={[
                        styles.toggleText,
                        selectedDeal === deal && styles.toggleTextActive,
                      ]}>
                      {deal}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() =>
              onApply({zipCode, priceRange, yearRange, mileageRange})
            }>
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default FilterModal;

const styles = ScaledSheet.create({
  modalContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '70%', // <-- controls how much height modal takes
  backgroundColor: colors.backgroundColor,
  borderTopLeftRadius: '20@vs',
  borderTopRightRadius: '20@vs',
  padding: '16@s',
},

backdrop: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
},


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16@ms',
  },
  headerBtn: {fontSize: '20@ms', color: colors.black, fontFamily: Primaryfonts.medium},
  headerTitle: {
    fontSize: '18@ms',
    fontFamily: Primaryfonts.semibold,
    color: colors.black,
  },
  resetText: {fontSize: '14@ms', color: colors.blue, fontFamily: Secondaryfonts.medium},

  scrollContent: {padding: '16@ms'},

  tabs: {flexDirection: 'row', marginBottom: '16@vs'},
  tab: {
    paddingVertical: '6@vs',
    paddingHorizontal: '14@s',
    borderRadius: '8@ms',
    backgroundColor: '#eee',
    marginRight: '8@s',
  },
  tabActive: {backgroundColor: colors.blue},
  tabText: {fontSize: '14@ms', color: colors.hind, fontFamily: Secondaryfonts.medium},
  tabTextActive: {color: colors.backgroundColor, fontFamily: Secondaryfonts.medium},

  label: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginVertical: '8@vs',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '6@ms',
    padding: '10@ms',
    marginBottom: '16@vs',
  },

  quickRow: {flexDirection: 'row', justifyContent: 'space-between'},

  dropdown: {
    flex: 1,
    height: '30@vs',
    borderRadius: '6@ms',
    paddingHorizontal: '10@s',
    marginHorizontal: '4@s',
    backgroundColor: '#f9f9f9',
    marginBottom: '16@vs',
  },

  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4@vs',
  },
  rangeText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },

  slider: {marginBottom: '24@vs'},

  applyBtn: {
    backgroundColor: colors.blue,
    padding: '16@ms',
    borderRadius: '8@ms',
    margin: '16@ms',
  },
  applyText: {
    textAlign: 'center',
    color: colors.backgroundColor,
    fontFamily: Secondaryfonts.semibold,
  },

  // 👉 Custom slider UI
  thumb: {
    width: '20@ms',
    height: '20@ms',
    borderRadius: '10@ms',
    backgroundColor: colors.backgroundColor,
    borderWidth: 2,
    borderColor: colors.blue,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  rail: {
    flex: 1,
    height: '4@vs',
    borderRadius: '2@ms',
    backgroundColor: '#ddd',
  },
  railSelected: {
    flex: 1,
    height: '4@vs',
    borderRadius: '2@ms',
    backgroundColor: colors.blue,
  },
  labelContainer: {
    alignItems: 'center',
    padding: '4@ms',
    backgroundColor: colors.blue,
    borderRadius: '4@ms',
  },
  labelText: {
    fontSize: '12@ms',
    color: colors.backgroundColor,
    fontFamily: Secondaryfonts.semibold,
  },
  notch: {
    width: '8@ms',
    height: '8@ms',
    backgroundColor: colors.blue,
    transform: [{rotate: '45deg'}],
    marginTop: '2@vs',
  },
  colorRow: {
    flexDirection: 'row',
    marginVertical: '8@vs',
  },
  colorCircle: {
    width: '32@ms',
    height: '32@ms',
    borderRadius: '16@ms',
    marginRight: '12@s',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: colors.blue,
  },

  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  toggleRow: {
    flexDirection: 'row',
    marginVertical: '8@vs',
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    marginRight: '8@s',
  },
  toggleBtnActive: {
    backgroundColor: colors.blue,
    borderColor: '#4a3aff',
  },
  toggleText: {
    textAlign: 'center',
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
  },
  toggleTextActive: {
    color: colors.backgroundColor,
    fontFamily: Secondaryfonts.semibold,
  },
});
