import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/colors';
import { Primaryfonts, Secondaryfonts } from '../../constant/fonts';

const BuyReport = () => {
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const navigation = useNavigation();

  const renderPaymentOption = (id: string, label: string, iconName: string) => (
    <TouchableOpacity
      style={styles.paymentOption}
      activeOpacity={0.8}
      onPress={() => setSelectedPayment(id)}>
      <View style={styles.radioOuter}>
        {selectedPayment === id && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.paymentLabel}>{label}</Text>
      <Ionicons name={iconName} size={ms(24)} color="#000" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        showBack={true}
        title="Buy Report"
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Subtitle */}
      <Text style={styles.title}>Unlock Your Full Report</Text>
      <Text style={styles.subtitle}>
        Secure checkout – your car’s full history in minutes.
      </Text>

      {/* Order Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>

        <View style={styles.row}>
          <Text style={styles.label}>VIN:</Text>
          <Text style={styles.value}>1HGCM82633A004352</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Car:</Text>
          <Text style={styles.value}>2020 Audi A8</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>20 - Aug - 2025</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.price}>$24.99</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* Payment Options */}
      <Text style={styles.paymentTitle}>Payment Options</Text>

      {renderPaymentOption('credit', 'Credit Card', 'card-outline')}
      {renderPaymentOption('paypal', 'Paypal', 'logo-paypal')}
      {renderPaymentOption('apple', 'Apple Pay', 'logo-apple')}
      {renderPaymentOption('google', 'Google Pay', 'logo-google')}

      {/* Proceed Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentDetails')}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BuyReport;

const styles = ScaledSheet.create({
  container: {
    padding: '16@ms',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15@vs',
  },
  headerTitle: {
    fontSize: '16@ms',
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: '8@s',
  },
    title: {
      fontSize: '20@ms',
      fontFamily: Secondaryfonts.semibold,
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
  card: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '10@ms',
    padding: '16@ms',
    marginBottom: '25@vs',
    marginVertical: '10@vs',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: '10@vs',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '6@vs',
  },
  label: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  value: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  price: {
    fontSize: '13@ms',
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
  },
  divider: {
    height: 0.91,
    backgroundColor: colors.black,
  },
  paymentTitle: {
    fontSize: '18@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: '15@vs',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '10@ms',
    paddingVertical: '12@vs',
    paddingHorizontal: '15@s',
    marginBottom: '10@vs',
    justifyContent: 'space-between',
  },
  radioOuter: {
    width: '18@ms',
    height: '18@ms',
    borderRadius: '9@ms',
    borderWidth: 1.8,
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@s',
  },
  radioInner: {
    width: '10@ms',
    height: '10@ms',
    borderRadius: '5@ms',
    backgroundColor: colors.blue,
  },
  paymentLabel: {
    flex: 1,
    fontSize: '14@ms',
    color: colors.black,
    marginLeft: '10@s',
    fontFamily: Secondaryfonts.semibold,
  },
  button: {
    marginTop: '20@vs',
    backgroundColor: colors.blue,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
  },
});
