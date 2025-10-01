import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {colors} from '../constant/colors';
import {Header} from '../Components/Header/Header';
import { ScrollView } from 'react-native-gesture-handler';

const CarListingDetail: React.FC = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator= {false}>
      {/* Header */}
      <Header
        showBack={true}
        showDrawer={true}
        showTitle={true}
        title="Your Car Listing"
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Car Title */}
      <Text style={styles.carName}>Honda Civic</Text>

      {/* Car Info Rows */}
      <View style={styles.row}>
        <Text style={styles.label}>CAR VIN :</Text>
        <Text style={styles.value}>DFKSJDFHS12341526</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Listed:</Text>
        <Text style={styles.value}>20/June/25</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>$25,000,00</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Switch
          trackColor={{false: '#e5e5e5', true: '#e5e5e5'}}
          thumbColor={isEnabled ? 'green' : '#f4f3f4'}
          ios_backgroundColor="#e5e5e5"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Additional Info Section */}
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transmission</Text>
          <Text style={styles.value}>Automatic</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mileage</Text>
          <Text style={styles.value}>1234eby89</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Engine</Text>
          <Text style={styles.value}>V6 Petrol</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Option</Text>
          <Text style={styles.value}>Premium Package</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Exterior color</Text>
          <Text style={styles.value}>Midnight Black</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Interior color</Text>
          <Text style={styles.value}>Beige Leather</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Number of Keys</Text>
          <Text style={styles.value}>2</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Original Owner</Text>
          <Text style={styles.value}>Yes</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Accident(s)</Text>
          <Text style={styles.value}>No</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Clean history report</Text>
          <Text style={styles.value}>Verified</Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '16@ms',
  },
  carName: {
    fontSize: '20@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: '20@vs',
    marginTop: '20@vs',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '8@vs',
  },
  label: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  value: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  card: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '10@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    marginTop: '20@vs',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '8@vs',
  },
  divider: {
    height: 1,
    backgroundColor: '#666',
  },
  saveButton: {
    backgroundColor: colors.blue,
    paddingVertical: '9@vs',
    borderRadius: '25@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30@vs',
  },
  saveText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Primaryfonts.medium,
  },
});

export default CarListingDetail;
