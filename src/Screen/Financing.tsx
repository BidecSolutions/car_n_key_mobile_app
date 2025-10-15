import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ScaledSheet,
  s,
  vs,
  ms,
  verticalScale,
  moderateScale,
  scale,
} from 'react-native-size-matters';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {TextInput} from 'react-native-gesture-handler';

const Financing: React.FC = () => {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<"info" | "form" | "result">("info");
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        showBack={true}
        showDrawer={true}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Know Your Buying Power</Text>
      <Text style={styles.subtitle}>
        Prequalify in minutes without impacting your{'\n'}credit score.
      </Text>

      {/* Feature Items */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons
            name="card-outline"
            size={ms(20)}
            color="#4B4DED"
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>No Impact on your Credit Card</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="time-outline"
            size={ms(20)}
            color="#4B4DED"
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>Takes Less Then 2 Minutes</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="hourglass-outline"
            size={ms(20)}
            color="#4B4DED"
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Get a Prequalified Spending Limit
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="shield-checkmark-outline"
            size={ms(20)}
            color="#4B4DED"
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>100% Free & Secure</Text>
        </View>
      </View>

      {/* Car Image Placeholder */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/Images/FinanceCar.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {step === "info" && (
        // 🔹 Step 1: Info Card
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prequalify Now</Text>

          <View style={styles.cardItem}>
            <View style={styles.leftBar} />
            <View style={styles.cardContent}>
              <Text style={styles.cardHeading}>
                Real-time Prequalification Result
              </Text>
              <Text style={styles.cardSubText}>
                See your estimated credit-based car affordability.
              </Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <View style={styles.secondLeftBar} />
            <View style={styles.cardContent}>
              <Text style={styles.cardHeading}>No Impact on Credit Score</Text>
              <Text style={styles.cardSubText}>
                Soft check only — 100% safe and secure.
              </Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <View style={styles.leftBar} />
            <View style={styles.cardContent}>
              <Text style={styles.cardHeading}>Takes Less Than 2 Minutes</Text>
              <Text style={styles.cardSubText}>
                Only a few basic fields to fill.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => setStep("form")}
          >
            <Text style={styles.cardButtonText}>Get Prequalified</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === "form" && (
        // 🔹 Step 2: Form Card
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Prequalify Now</Text>
          <Text style={styles.formSubtitle}>
            No risk. No commitment. Just a simple way to understand your budget
            before browsing.
          </Text>

          <TextInput
            placeholder="Name"
            style={styles.input}
            placeholderTextColor="#666"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#666"
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            placeholderTextColor="#666"
          />

          <View style={styles.row}>
            <TextInput
              placeholder="Zip Code"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="Employment Info*"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.row}>
            <TextInput
              placeholder="Monthly Income"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor="#666"
            />
            <TextInput
              placeholder="SSN or Last 4 Digit*"
              style={[styles.input, styles.halfInput]}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setStep("result")}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === "result" && (
        // 🔹 Step 3: Result Card
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Prequalify Now</Text>
          <Text style={styles.formSubtitle}>
            No risk. No commitment. Just a simple way to understand your budget
            before browsing.
          </Text>

          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>You're Prequalified`</Text>
            <Text style={styles.resultText}>
              You may qualify for financing up to $20,000 {"\n"}
              with an estimated monthly payment of $350.
            </Text>
            <Text style={styles.resultText}>
              Your Credit Tier is “Good (670-739)”
            </Text>
          </View>

          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}


      {/* Request Financing Section */}
      <Text style={styles.requestTitle}>
        Request Financing{'\n'}from the Car Owner
      </Text>

      <View style={styles.optionsRow}>
        <View style={styles.optionItem}>
          <View style={styles.optionIconWrapper}>
            <Ionicons name="cash-outline" size={ms(22)} color={colors.blue} />
          </View>
          <Text style={styles.optionText}>
            Owner Direct{'\n'}Financing Point
          </Text>
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionIconWrapper}>
            <Ionicons name="person-outline" size={ms(22)} color={colors.blue} />
          </View>
          <Text style={styles.optionText}>
            Connect with the{'\n'}Seller for Financing
          </Text>
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionIconWrapper}>
            <Ionicons name="pricetag-outline" size={ms(22)} color={colors.blue} />
          </View>
          <Text style={styles.optionText}>
            Talk Loan Terms{'\n'}with the Owner
          </Text>
        </View>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Get Prequalified</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    marginTop: vs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: s(15),
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: s(10),
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Primaryfonts.medium,
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
  features: {
    marginTop: vs(20),
    paddingHorizontal: s(15),
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
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    flexShrink: 1,
  },
  imageWrapper: {
    marginTop: vs(10),
    width: '100%',
    height: vs(200),
    backgroundColor: colors.white, // You can remove this when adding your image
  },
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(12),
    paddingVertical: vs(18),
    paddingHorizontal: s(15),
    marginHorizontal: s(15),
    marginTop: vs(20),
  },
  cardTitle: {
    fontSize: ms(16),
    fontFamily: Secondaryfonts.bold,
    textAlign: 'center',
    marginBottom: vs(15),
    bottom: '7@vs',
    color: colors.black,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vs(12),
  },
  leftBar: {
    width: ms(3),
    height: '100%', // takes full height of the cardItem
    backgroundColor: colors.blue,
    borderRadius: ms(2),
    marginRight: s(10),
  },
  secondLeftBar: {
    width: ms(3),
    height: '100%', // takes full height of the cardItem
    backgroundColor: '#00000033',
    borderRadius: ms(2),
    marginRight: s(10),
  },
  cardContent: {
    flex: 1,
  },
  cardHeading: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.bold,
    color: colors.black,
    marginBottom: vs(2),
  },
  cardSubText: {
    fontSize: ms(11),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    lineHeight: vs(14),
  },
  cardButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: ms(20),
    paddingVertical: vs(5),
    alignItems: 'center',
    marginTop: vs(10),
    width: '50%',
    alignSelf: 'center',
  },
  cardButtonText: {
    fontSize: ms(12),
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  requestTitle: {
    fontSize: ms(16),
    fontFamily: Secondaryfonts.bold,
    textAlign: 'center',
    marginTop: vs(25),
    color: colors.black,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: vs(20),
    paddingHorizontal: s(10),
  },
  optionItem: {
    alignItems: 'center',
    flex: 1,
  },
  optionIconWrapper: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(25),
    width: ms(50),
    height: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(8),
  },
  optionText: {
    fontSize: ms(12),
    textAlign: 'center',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  bottomButton: {
    backgroundColor: colors.blue,
    borderRadius: ms(20),
    paddingVertical: vs(7),
    alignItems: 'center',
    marginHorizontal: s(20),
    marginTop: vs(25),
    marginBottom: vs(40),
  },
  bottomButtonText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  formCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: scale(12),
    padding: moderateScale(16),
    margin: moderateScale(16),
  },
  formTitle: {
    fontSize: moderateScale(18),
    fontFamily: Secondaryfonts.bold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  formSubtitle: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.hind,
    borderRadius: scale(6),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(12),
    fontFamily: Secondaryfonts.medium,
    marginBottom: verticalScale(12),
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  halfInput: {
    flex: 1,
  },
  nextButton: {
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
   resultBox: {
    borderWidth: 1,
    borderColor: "#666",
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: moderateScale(14),
    marginBottom: verticalScale(16),
  },
  resultTitle: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: verticalScale(8),
  },
  resultText: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: verticalScale(6),
  },
});

export default Financing;
