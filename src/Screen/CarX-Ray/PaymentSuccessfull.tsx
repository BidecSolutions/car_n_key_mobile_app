import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {moderateScale, ms, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const PaymentSuccessfull = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: verticalScale(30)}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          showBack={true}
          title="Payment Successfull"
          showDrawer={true}
          onDrawerPress={() => navigation.openDrawer()}
          backgroundColor={colors.backgroundColor}
          onBackPress={() => navigation.goBack()}
          iconColor={colors.black}
          titleColor={colors.black}
        />
        <Text style={styles.title}>Your Report Is Ready</Text>
        <Image
          source={require('../../assets/Images/SuccessIcon.png')}
          style={styles.successIcon}
          resizeMode="contain"
        />
        <Text style={styles.thankyouText}>
          Thank you for your purchase. Your car report is {'\n'} now available
          for download.
        </Text>
        <View style={styles.reportCard}>
          <Image
            source={require('../../assets/Images/reportCar.png')}
            style={styles.carImage}
            resizeMode="contain"
          />
          <Text style={styles.carTitle}>2020 Audi A8 Quattro</Text>
          <View style={styles.row}>
            <Text style={styles.label}>VIN:</Text>
            <Text style={styles.value}>WAULFAFR1AA123456</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>Jan 27, 2025</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadText}>Download PDF</Text>
              <Icon name="download-outline" size={ms(16)} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.viewBtn]} onPress={() => navigation.navigate('CarReport')}>
              <Text style={styles.viewText}>View Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.importantContainer}>
            <View style = {styles.textContainer}>
            <Text style= {styles.importantText}>Important</Text>
            <Text style= {styles.accessText}>Access to this report is valid until <Text style= {styles.boldDate}>20 May 2025</Text> </Text>
            <Text style = {styles.dontWorryText}>Don’t worry — you can download and keep it forever</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentSuccessfull;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '16@ms',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: '19@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
    padding: '16@ms',
    marginTop: '10@vs',
  },
  successIcon: {
    alignSelf: 'center',
    width: '100%',
    marginTop: '30@vs',
  },
  thankyouText: {
    color: colors.black,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginTop: '17@vs',
  },
   reportCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '14@ms',
    padding: '14@ms',
    marginTop: '25@vs',
  },
  carImage: {
    width: '100%',
    height: verticalScale(130),
    borderRadius: '12@ms',
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
  carTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
  },
  label: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  value: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,   
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10@s',
    marginTop: verticalScale(12),
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    gap: '6@s',
    paddingHorizontal: '30@s',
  },
  downloadText: {
    color: colors.white,
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
  },
  viewBtn: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: colors.hind,
    backgroundColor: colors.white,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: '35@s',
  },
  viewText: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  importantContainer: {
    paddingHorizontal: '60@s',
    
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '11@ms',
    marginTop: '25@vs',
    padding: '16@ms',
    height: '150@vs',
  },
  textContainer: {
    marginTop: '47@vs',
  },
  importantText: {
    color: colors.black,
    fontSize: '18@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    bottom: '40@vs',
  },
  accessText: {
    color: colors.black,
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginHorizontal: -moderateScale(35),
    bottom: '20@vs',
  },
  boldDate: {
    color: colors.black,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.bold,
  },
  dontWorryText: {
    color: colors.black,
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginHorizontal: -moderateScale(35),
    bottom: '15@vs',
  },
});
