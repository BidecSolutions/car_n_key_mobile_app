import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../constant/colors";
import { Secondaryfonts } from "../../constant/fonts";

interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onPressFilter?: () => void; 
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  value,
  onChangeText,
  onPressFilter,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={moderateScale(18)}
        color={colors.black}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Find your car"}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onPressFilter} activeOpacity={0.7}>
        <Ionicons
          name="options-outline"
          size={moderateScale(18)}
          color={colors.white}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(10),
    backgroundColor: "#fff",
    height: verticalScale(40),
  },
  icon: {
    marginRight: scale(5),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  filterIcon: {
    backgroundColor: colors.blue,
    borderRadius: moderateScale(20),
    padding: moderateScale(6),
  },
});

export default SearchBox;
