import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';

const creditRatings = [
  {label: 'Excellent (780-750)', value: 'excellent'},
  {label: 'Good (700-779)', value: 'good'},
  {label: 'Fair (650-699)', value: 'fair'},
  {label: 'Poor (600-649)', value: 'poor'},
];

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const CustomizePayment: React.FC<Props> = ({isVisible, onClose}) => {
  const [creditRating, setCreditRating] = useState('excellent');
  const [zip, setZip] = useState('');
  const [tradeIn, setTradeIn] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState(36);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Customize Your Payment</Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceBox}>
          <Text style={styles.price}>$1,239/mo*</Text>
          <Text style={styles.priceDetail}>
            Based on est. car price of $65,940 at 7.0% APR* and 10.25% sales
            tax.
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.grid}>
          <View style={styles.row}>
            <Dropdown
              style={[styles.box, {marginRight: 8}]}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.text}
              data={creditRatings}
              labelField="label"
              valueField="value"
              value={creditRating}
              onChange={item => setCreditRating(item.value)}
              iconColor={colors.black}
              itemTextStyle={{
                fontFamily: Secondaryfonts.medium,
                fontSize: moderateScale(14),
                color: colors.black,
              }}
            />
            <TextInput
              style={styles.box}
              placeholder="Zip Code"
              placeholderTextColor="#999"
              value={zip}
              onChangeText={setZip}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={[styles.box, {marginRight: scale(8)}]}
              placeholder="No Trade In Value (optional)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={tradeIn}
              onChangeText={setTradeIn}
            />
            <TextInput
              style={styles.box}
              placeholder="Down Payment (optional)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={downPayment}
              onChangeText={setDownPayment}
            />
          </View>
        </View>

        {/* Labels */}
        <Text style={styles.tradeInLabel}>Estimate Trade In</Text>
        <Text style={styles.subLabel}>Lengths of Loan (in months)</Text>

        {/* Loan Terms */}
        <View style={styles.loanOptions}>
          {[36, 48, 60, 72].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.loanButton,
                loanTerm === option && styles.loanButtonActive,
              ]}
              onPress={() => setLoanTerm(option)}>
              <Text
                style={[
                  styles.loanText,
                  loanTerm === option && styles.loanTextActive,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.calculateBtn}>
          <Text style={styles.calculateText}>Calculate Amount</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    width: '90%', // popup width
    backgroundColor: '#fff',
    borderRadius: '16@ms',
    padding: '16@ms',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '12@vs',
    gap: '34@s',
    marginTop: '15@vs',
  },
  headerText: {
    fontSize: '19@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
  },
  priceBox: {
    backgroundColor: '#f1f1f1',
    marginTop: '20@vs',
    padding: '13@ms',
    borderRadius: '12@ms',
    marginBottom: '35@vs',
  },
  price: {
    fontSize: '23@ms',
    fontFamily: Secondaryfonts.bold,
    color: colors.black,
  },
  priceDetail: {
    fontSize: '13@ms',
    color: colors.black,
    marginTop: '4@vs',
    fontFamily: Secondaryfonts.medium,
  },
  grid: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '12@vs',
  },

  box: {
    flex: 1,
    height: '48@vs',
    backgroundColor: '#f9f9f9', // light gray background
    borderRadius: '8@s',
    paddingHorizontal: '12@s',
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },

  placeholder: {
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.regular,
  },

  text: {
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.regular,
  },
  tradeInLabel: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
    marginTop: '40@vs',
    color: colors.black,
    alignItems: 'center',
    textAlign: 'center',
  },
  subLabel: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginBottom: '8@vs',
    textAlign: 'center',
  },
  loanOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20@vs',
  },
  loanButton: {
    flex: 1,
    height: '40@vs',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10@s',
  },
  loanButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  loanText: {
    fontSize: '14@ms',
    color: '#000',
  },
  loanTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  calculateBtn: {
    marginTop: '30@vs',
    height: '35@vs',
    borderRadius: '24@ms',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateText: {
    fontSize: '16@ms',
    color: colors.white,
    fontFamily: Secondaryfonts.semibold,
  },
});

export default CustomizePayment;
