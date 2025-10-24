import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { ScaledSheet, s, vs, ms, scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBox from "../Components/SearchBox/SearchBox";
import { Header } from "../Components/Header/Header";
import { colors } from "../constant/colors";
import { Primaryfonts, Secondaryfonts } from "../constant/fonts";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface CarData {
  id: string;
  title: string;
  price: number;
  mileage: string;
  mpg: string;
  fuel: string;
  location: string;
  rating: number;
  transmission: string;
  image: any;
}

const DealersInventory = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest">("highest");
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const data: CarData[] = [
    {
      id: "1",
      title: "BMW 430d Coupe M Sport",
      price: 20000,
      mileage: "9123mi",
      mpg: "53.3 Avg. MPG",
      fuel: "Diesel",
      location: "Chicago, IL (8mi.)",
      rating: 4,
      transmission: "Automatic",
      image: require("../assets/Images/Car.png"),
    },
    {
      id: "2",
      title: "BMW 430d Coupe M Sport",
      price: 22000,
      mileage: "12500mi",
      mpg: "53.3 Avg. MPG",
      fuel: "Diesel",
      location: "Chicago, IL (8mi.)",
      rating: 4,
      transmission: "Automatic",
      image: require("../assets/Images/Car.png"),
    },
    {
      id: "3",
      title: "BMW 320i Sedan",
      price: 18500,
      mileage: "15000mi",
      mpg: "45.2 Avg. MPG",
      fuel: "Gasoline",
      location: "New York, NY (12mi.)",
      rating: 5,
      transmission: "Automatic",
      image: require("../assets/Images/Car.png"),
    },
    {
      id: "4",
      title: "BMW X5 SUV",
      price: 35000,
      mileage: "8500mi",
      mpg: "38.5 Avg. MPG",
      fuel: "Gasoline",
      location: "Los Angeles, CA (5mi.)",
      rating: 4,
      transmission: "Automatic",
      image: require("../assets/Images/Car.png"),
    },
    {
      id: "5",
      title: "BMW 530e Hybrid",
      price: 28000,
      mileage: "11000mi",
      mpg: "65.2 Avg. MPG",
      fuel: "Hybrid",
      location: "Miami, FL (15mi.)",
      rating: 5,
      transmission: "Automatic",
      image: require("../assets/Images/Car.png"),
    },
  ];

  // Filter and sort data based on search and sort order
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((car) =>
      car.title.toLowerCase().includes(searchText.toLowerCase()) ||
      car.location.toLowerCase().includes(searchText.toLowerCase()) ||
      car.fuel.toLowerCase().includes(searchText.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortOrder === "highest") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
  }, [searchText, sortOrder]);

  const handleFilterPress = () => {
    // Toggle sort order
    setSortOrder(sortOrder === "highest" ? "lowest" : "highest");
  };

  const renderCard = ({ item }: { item: CarData }) => (
    <View style={styles.card}>
      {/* Left - Car Image */}
      <View style={styles.carImageContainer}>
        <Image source={item.image} style={styles.carImage} resizeMode="contain" />
      </View>

      {/* Right - Car Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.carPrice}>Price : $ {item.price.toLocaleString()}</Text>

        {/* Row with icons */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Icon name="car-shift-automatic" size={ms(14)} color="#444" />
            <Text style={styles.featureText}>{item.transmission}</Text>
          </View>

          <View style={styles.featureItem}>
            <Icon name="map-marker-distance" size={ms(14)} color="#444" />
            <Text style={styles.featureText}>{item.mileage}</Text>
          </View>

          <View style={styles.featureItem}>
            <Icon name="gas-station" size={ms(14)} color="#444" />
            <Text style={styles.featureText}>{item.mpg}</Text>
          </View>

          <View style={styles.featureItem}>
            <Icon name="engine" size={ms(14)} color="#444" />
            <Text style={styles.featureText}>{item.fuel}</Text>
          </View>
        </View>

        {/* Ratings */}
        <View style={[styles.row, { marginTop: vs(4) }]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name={i < item.rating ? "star" : "star-outline"}
              size={ms(16)}
              color="#FFB400"
              style={{ marginRight: s(2) }}
            />
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationItem}>
            <Icon name="map-marker" size={ms(14)} color="#444" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.reportItem}>
            <Icon name="file-document-outline" size={ms(14)} color="#444" />
            <Text style={styles.reportText}>Get a free Vehicle X Ray Report</Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.dealButton}>
          <Text style={styles.dealButtonText}>View Deal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Generic Header */}
      <Header 
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => {}}
        onDrawerPress={() => {}}
      />
      
      {/* Main Title */}
      <Text style={styles.title}>Dealers Inventory</Text>
      
      <Text style={styles.subtitle}>
        Browse live wholesale vehicle auctions from verified dealers across the
        U.S. Place bids, set auto-bids, or list your own vehicles in minutes.
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBox
          placeholder="Find your car"
          value={searchText}
          onChangeText={setSearchText}
          onPressFilter={handleFilterPress}
        />
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New BMWs</Text>
        <TouchableOpacity onPress={handleFilterPress}>
          <Text style={styles.sectionSort}>
            {sortOrder === "highest" ? "Highest Price ▾" : "Lowest Price ▾"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredAndSortedData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 120, // Approximate height of each item
          offset: 120 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '12@s',
  },
  title: {
    fontSize: "24@ms",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "10@vs",
    fontFamily: Primaryfonts.semibold,
    color: colors.black,
  },
  subtitle: {
    fontSize: "14@ms",
    color: colors.black,
    textAlign: "center",
    marginTop: "6@vs",
    marginBottom: "16@vs",
    lineHeight: "18@vs",
    fontFamily: Secondaryfonts.regular,
  },
  searchContainer: {
    marginBottom: "16@vs",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10@vs",
  },
  sectionTitle: {
    fontSize: "18@ms",
    fontWeight: "600",
    fontFamily: Primaryfonts.semibold,
    color: colors.black,
  },
  sectionSort: {
    fontSize: "14@ms",
    color: "#444",
    fontFamily: Secondaryfonts.medium,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: "10@ms",
    padding: "12@s",
    marginBottom: "14@vs",
    marginHorizontal: -scale(7),
  },
  carImageContainer: {
    width: "120@ms",
    height: "90@vs",
    borderRadius: "8@ms",
    overflow: "hidden",
    marginRight: "12@s",
    backgroundColor: colors.white,
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
  },
  carTitle: {
    fontSize: "15@ms",
    fontWeight: "600",
    marginBottom: "4@vs",
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  carPrice: {
    fontSize: "14@ms",
    marginBottom: "8@vs",
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "6@vs",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "12@s",
    marginBottom: "4@vs",
  },
  featureText: {
    fontSize: "11@ms",
    color: "#333",
    marginLeft: "4@s",
    fontFamily: Secondaryfonts.regular,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "6@vs",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4@vs",
    flexWrap: "wrap",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "8@s",
  },
  locationText: {
    fontSize: "11@ms",
    color: "#333",
    marginLeft: "4@s",
    fontFamily: Secondaryfonts.regular,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  reportText: {
    fontSize: "11@ms",
    color: "#333",
    marginLeft: "4@s",
    fontFamily: Secondaryfonts.regular,
  },
  dealButton: {
    borderRadius: "20@ms",
    alignSelf: "flex-start",
    paddingHorizontal: "16@s",
    paddingVertical: "6@vs",
    marginTop: "10@vs",
    borderColor: colors.blue,
    borderWidth: 1,
  },
  dealButtonText: {
    color: colors.blue,
    fontSize: "13@ms",
    fontFamily: Secondaryfonts.medium,
  },
});

export default DealersInventory;
