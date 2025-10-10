import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet, ms, s, vs} from 'react-native-size-matters';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/colors';
import {Secondaryfonts} from '../../constant/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentDetails = () => {
  const [saveCard, setSaveCard] = useState(true);
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        showBack={true}
        title="Payment Details"
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Title */}
      <Text style={styles.title}>Add Your Payment Details</Text>

      {/* Card Details */}
      <View style={{marginTop: vs(25)}}>
        <Text style={styles.label}>Card Details</Text>
        <TextInput
          placeholder="xxxx xxxx xxxx xxxx"
          placeholderTextColor="#B0B0B0"
          style={styles.inputFull}
        />
      </View>

      {/* Expiration and CVV */}
      <View style={styles.row}>
        <View style={[styles.inputHalfContainer, {marginRight: s(10)}]}>
          <Text style={styles.label}>Expiration</Text>
          <TextInput
            placeholder="MM/YY"
            placeholderTextColor="#B0B0B0"
            style={styles.inputHalf}
          />
        </View>
        <View style={styles.inputHalfContainer}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            placeholder="xxxx"
            placeholderTextColor="#B0B0B0"
            style={styles.inputHalf}
            secureTextEntry
          />
        </View>
      </View>

      {/* Billing Address */}
      <View style={{marginTop: vs(20)}}>
        <Text style={styles.label}>Billing Address</Text>
        <TextInput
          placeholder="NY, Street 209"
          placeholderTextColor="#B0B0B0"
          style={styles.inputFull}
        />
      </View>

      {/* Save Card Toggle */}
      <View style={styles.toggleRow}>
        <Text style={styles.saveLabel}>Save Card</Text>
        <Switch
          value={saveCard}
          onValueChange={setSaveCard}
          trackColor={{
            false: colors.cardsBackgroundColor,
            true: colors.cardsBackgroundColor,
          }}
          thumbColor={saveCard ? '#00C200' : '#f4f3f4'}
        />
      </View>
      <View style={styles.features}>
        <Text style={styles.trustSectionTitle}>Trust & Security</Text>
        <View style={styles.featureItem}>
          <Icon
            name="time-outline"
            size={ms(20)}
            color={colors.blue}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Your payment is 100% secure with SSL encryption
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon
            name="hourglass-outline"
            size={ms(20)}
            color={colors.blue}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            We support Visa, Mastercard, PayPal, and others
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon
            name="shield-checkmark-outline"
            size={ms(20)}
            color="#4B4DED"
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Your card details are never stored or shared.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentSuccessfull')}>
          <Text style={styles.buttonText}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PaymentDetails;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '20@s',
    paddingTop: '10@vs',
    paddingBottom: '30@vs',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
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
    fontSize: '19@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
    padding: '16@ms',
    marginTop: '10@vs',
  },
  label: {
    fontSize: '13@ms',
    color: colors.black,
    marginBottom: '6@vs',
    fontFamily: Secondaryfonts.medium,
  },
  inputFull: {
    width: '100%',
    backgroundColor: colors.cardsBackgroundColor, // cardsBackgroundColor equivalent
    borderRadius: '10@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '15@s',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '18@vs',
  },
  inputHalfContainer: {
    flex: 1,
  },
  inputHalf: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '10@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '15@s',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '25@vs',
    gap: '6@s',
  },
  saveLabel: {
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  features: {
    marginTop: vs(30),
  },
  trustSectionTitle: {
    fontSize: '18@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: '15@vs',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(20),
    paddingVertical: vs(10),
    paddingHorizontal: s(12),
    marginBottom: vs(12),
  },
  featureIcon: {
    marginRight: s(12),
  },
  featureText: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    flexShrink: 1,
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
