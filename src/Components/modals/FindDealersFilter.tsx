import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../constant/colors";
import { Secondaryfonts } from "../../constant/fonts";

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
}

const dropdownData = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

const FindDealersFilter: React.FC<FiltersModalProps> = ({ visible, onClose }) => {
  const [zipCode, setZipCode] = useState("");
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [bodyStyle, setBodyStyle] = useState(null);
  const [gearType, setGearType] = useState(null);
  const [dealRating, setDealRating] = useState("");
  const [dealerName, setDealerName] = useState("");

  const resetFilters = () => {
    setZipCode("");
    setBrand(null);
    setModel(null);
    setBodyStyle(null);
    setGearType(null);
    setDealRating("");
    setDealerName("");
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-back" size={moderateScale(20)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Zip Code */}
          <View style={styles.zipCodeSection}>
            <Text style={styles.zipCodeLabel}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
              placeholder="e.g. 9999"
              placeholderTextColor="#666"
            />
          </View>

          {/* Dropdowns Row */}
          <Text style={styles.label}>Deal Rating</Text>
          <View style={styles.dropdownRow}>
            <Dropdown
              style={styles.dropdown}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Brand"
              value={brand}
              onChange={(item) => setBrand(item.value)}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              iconColor='#666'
            />
            <Dropdown
              style={styles.dropdown}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Model"
              value={model}
              onChange={(item) => setModel(item.value)}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              iconColor='#666'
            />
          </View>

          <View style={styles.dropdownRow}>
            <Dropdown
              style={styles.dropdown}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Body Style"
              value={bodyStyle}
              onChange={(item) => setBodyStyle(item.value)}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              iconColor='#666'
            />
            <Dropdown
              style={styles.dropdown}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Gear Type"
              value={gearType}
              onChange={(item) => setGearType(item.value)}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              iconColor='#666'
            />
          </View>

          {/* Deal Rating */}
          <View style={styles.section}>
            <Text style={styles.label}>Deal Rating</Text>
            <View style={styles.ratingRow}>
              {["Great Deals", "Good Deals", "Fair Deals"].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingButton,
                    dealRating === rating && styles.ratingButtonActive,
                  ]}
                  onPress={() => setDealRating(rating)}
                >
                  <Text
                    style={[
                      styles.ratingText,
                      dealRating === rating && styles.ratingTextActive,
                    ]}
                  >
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Dealer Name */}
          <View style={styles.section}>
            <Text style={styles.label}>Dealer Name</Text>
            <TextInput
              style={styles.dealerNameinput}
              value={dealerName}
              onChangeText={setDealerName}
              placeholder="e.g. Subaru of Sterling"
              placeholderTextColor="#666"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(16),
    height: "70%",
    paddingVertical: verticalScale(20),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  resetText: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.medium,
    color: colors.blue,
  },
  section: {
    marginBottom: verticalScale(16),
    marginTop: verticalScale(15),
  },
  zipCodeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(15),
    fontFamily: Secondaryfonts.semibold,
    marginBottom: verticalScale(14),
    color: colors.black,
  },
  zipCodeLabel: {
    fontSize: moderateScale(15),
    fontFamily: Secondaryfonts.semibold,
    marginBottom: verticalScale(6),
    color: colors.black,
    top: verticalScale(10),
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    height: verticalScale(36),
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  dealerNameinput: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    height: verticalScale(36),
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },
  dropdown: {
    flex: 1,
    height: verticalScale(36),
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(8),
    marginRight: scale(8),
  },
  dropdownPlaceholder: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: "#666",
  },
  dropdownText: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black, 
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingButton: {
    flex: 1,
    borderRadius: moderateScale(6),
    backgroundColor: colors.cardsBackgroundColor,
    paddingVertical: verticalScale(8),
    marginHorizontal: scale(4),
    alignItems: "center",
  },
  ratingButtonActive: {
    backgroundColor: colors.blue,
  },
  ratingText: {
    fontSize: moderateScale(13),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  ratingTextActive: {
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
});

export default FindDealersFilter;
