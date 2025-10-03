import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Svg, {Rect, G, Path, Circle} from 'react-native-svg';

type DamageOption = {
  name: string;
  cost: number;
};

type DamageOptions = {
  [key: string]: {
    types: DamageOption[];
    description: string;
    subcategories?: DamageOption[];
  };
};

interface Props {
  selectedPart: string | null;
  handlePartClick: (part: string) => void;
  damageOptions: DamageOptions;
  selectedDamageType: DamageOption | null;
  handleDamageTypeSelect: (type: DamageOption) => void;
  selectedSubcategory: DamageOption | null;
  handleSubcategorySelect: (subcategory: DamageOption) => void;
}

const CarInteriorDiagram: React.FC<Props> = ({
  selectedPart,
  handlePartClick,
  damageOptions,
  selectedDamageType,
  handleDamageTypeSelect,
  selectedSubcategory,
  handleSubcategorySelect,
}) => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <Svg viewBox="0 0 240 240" width="100%" height="300">
        {/* Center Console */}
        <G onPress={() => handlePartClick('Center Console')}>
          <Rect
            x="115"
            y="78"
            width="7"
            height="13"
            fill={selectedPart === 'Center Console' ? 'black' : 'lightgray'}
          />
        </G>

        {/* Glove Box */}
        <G onPress={() => handlePartClick('Glove Box')}>
          <Rect
            x="135"
            y="80"
            width="10"
            height="5"
            fill={selectedPart === 'Glove Box' ? 'black' : 'lightgray'}
          />
        </G>

        {/* Front Seat - Right */}
        <Rect
          x="125"
          y="95"
          width="25"
          height="25"
          fill={selectedPart === 'Front Seat - Right' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Front Seat - Right')}
        />

        {/* Front Seat - Left */}
        <Rect
          x="85"
          y="95"
          width="25"
          height="25"
          fill={selectedPart === 'Front Seat - Left' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Front Seat - Left')}
        />

        {/* Rear Seat - Left */}
        <Rect
          x="85"
          y="133"
          width="25"
          height="20"
          fill={selectedPart === 'Rear Seat - Left' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Seat - Left')}
        />

        {/* Rear Seat - Right */}
        <Rect
          x="125"
          y="133"
          width="25"
          height="20"
          fill={selectedPart === 'Rear Seat - Right' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Seat - Right')}
        />

        {/* Hood */}
        <G>
          <Path
            d="M117.3,72.9c0.6,0,1.1,0,1.7,0c0.6,0,1.1,0,1.7,0c17.8,0,37.9,3.1,37.9,3.1
            c2.7,0.4,4.6-1.5,4.2-4.2l-6.1-39.2c-0.4-2.7-3-4.9-5.8-4.9H86.1c-2.8,0-5.3,2.2-5.7,5l-5.3,39.1c-0.4,2.7,1.6,4.6,4.3,4.2
            C79.4,76,99.5,72.9,117.3,72.9z"
            fill={selectedPart === 'Hood' ? 'black' : 'lightgray'}
            onPress={() => handlePartClick('Hood')}
          />
        </G>

        {/* Trunk */}
        <G>
          <Path
            d="M117.3,168.6c0.6,0,1.1,0,1.7,0c0.6,0,1.1,0,1.7,0c17.8,0,37.9-3.1,37.9-3.1
            c2.7-0.4,4.6,1.5,4.1,4.2l-5.9,34.2c-0.5,2.7-3.1,4.9-5.9,4.9H86.1c-2.8,0-5.3-2.2-5.7-4.9l-5.1-34.2c-0.4-2.7,1.5-4.6,4.2-4.2
            C79.4,165.5,99.5,168.6,117.3,168.6z"
            fill={selectedPart === 'Trunk' ? 'black' : 'lightgray'}
            onPress={() => handlePartClick('Trunk')}
          />
        </G>

        {/* Left Rocker */}
        <Path
          d="M37.5,157.3c0,1.5-1.2,2.8-2.6,2.8c-1.4,0-2.6-1.2-2.6-2.8V81.2c0-1.5,1.2-2.8,2.6-2.8
          c1.4,0,2.6,1.2,2.6,2.8V157.3z"
          fill={selectedPart === 'Left Rocker' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Left Rocker')}
        />

        {/* Left Rear Door */}
        <Path
          d="M72.4,156.5c0,2.8-2.2,5-5,5H45c-2.8,0-5-2.2-5-5v-29.7c0-2.8,2.2-5,5-5h22.4
          c2.8,0,5,2.2,5,5L72.4,156.5L72.4,156.5z"
          fill={selectedPart === 'Rear Door Panel Left' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Door Panel Left')}
        />
        <G>
          {/* Left Mirror */}
          <G onPress={() => handlePartClick('Left Mirror')}>
            <Path
              d="M71.7,87c0,3.5-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4v-4.1c0-3.5,2.9-3.4,6.4-3.4
                s6.4-0.1,6.4,3.4V87z"
              fill={selectedPart === 'Left Mirror' ? 'black' : 'lightgray'}
            />
          </G>

          {/* Left Front Door */}
          <Path
            d="M65.1,96.7c-4.9,0-8.9-4-8.9-8.9v-8h-11c-2.8,0-5,2.2-5,5v29.7c0,2.8,2.2,5,5,5h22.4c2.8,0,5-2.2,5-5h0v-22
            C71.1,95,68.3,96.7,65.1,96.7z"
            fill={
              selectedPart === 'Front Door Panel Left' ? 'black' : 'lightgray'
            }
            onPress={() => handlePartClick('Front Door Panel Left')}
          />

          {/* Left Fender */}
          <Path
            d="M67.7,32.5c-0.3-2.2-1.9-4-3.5-4s-4.8-0.2-7-0.4L45,26.9
            c-2.2-0.2-4.7-0.4-5.5-0.4s-1.5,1.8-1.5,4V31c0,2.2,0.9,3.9,2,3.7c0,0,0,0,1,0c9,0,16.3,7.3,16.3,16.3c0,9-7.3,16.3-16.3,16.3
            c-1,0-1,0-1,0c-1.1-0.2-2,1.5-2,3.7v0.3c0,2.2,0.7,4,1.5,4s3.3,0,5.5,0h21.2c2.2,0,4.7,0,5.5,0s1.3-1.8,1-4L67.7,32.5z"
            fill={selectedPart === 'Front Left Fender' ? 'black' : 'lightgray'}
          />

          {/* Left Front Wheel */}
          <Circle
            cx="41"
            cy="50.9"
            r="14.6"
            fill={selectedPart === 'Left Front Wheel' ? 'black' : 'lightgray'}
            onPress={() => handlePartClick('Left Front Wheel')}
          />

          {/* Left Quarter Panel */}
          <Path
            d="M69.1,203.2c-0.2,2.2-2.1,4.2-4.3,4.4l-1,0.1c-2.2,0.2-5.8,0.5-8,0.7l-10.2,0.6
            c-2.2,0.1-4.7,0.2-5.5,0.2s-1.5-1.2-1.5-2.8c0-1.5,0.9-2.6,2-2.5c0,0,0,0,1,0c9,0,16.3-7.3,16.3-16.3c0-9-7.3-16.3-16.3-16.3
            c-1,0-1,0-1,0c-1.1-0.2-2,1.4-2,3.4c0-2,0.7-3.7,1.5-3.7s3.3,0,5.5,0h19.2c2.2,0,4.7,0,5.5,0s1.4,1.8,1.2,4L69.1,203.2z"
            fill={selectedPart === 'Rear Left Fender' ? 'black' : 'lightgray'}
          />

          {/* Left Rear Wheel */}
          <Circle
            cx="41.7"
            cy="187.7"
            r="14.6"
            fill={selectedPart === 'Rear Left Wheel' ? 'black' : 'lightgray'}
            onPress={() => handlePartClick('Rear Left Wheel')}
          />
        </G>

        <G>
          {/* Right Rocker */}
          <Path
            d="M201.2,81.2c0-1.5,1.2-2.8,2.6-2.8c1.4,0,2.6,1.2,2.6,2.8v76.1
            c0,1.5-1.2,2.8-2.6,2.8c-1.4,0-2.6-1.2-2.6-2.8V81.2z"
            fill={selectedPart === 'Right Rocker' ? 'black' : 'lightgray'}
          />

          {/* Right Rear Door */}
          <Path
            d="M166.3,156.5v-29.7c0-2.8,2.2-5,5-5h22.4c2.8,0,5,2.2,5,5v29.7c0,2.8-2.2,5-5,5
            h-22.4C168.5,161.5,166.3,159.3,166.3,156.5L166.3,156.5z"
            fill={
              selectedPart === 'Rear Door Panel Right' ? 'black' : 'lightgray'
            }
            onPress={() => handlePartClick('Rear Door Panel Right')}
          />

          {/* Right Mirror */}
          <Path
            d="M167,82.9c0-3.5,2.9-3.4,6.4-3.4c3.5,0,6.4-0.1,6.4,3.4V87c0,3.5-2.9,6.4-6.4,6.4
                c-3.5,0-6.4-2.9-6.4-6.4V82.9z"
            fill={selectedPart === 'Right Mirror' ? 'black' : 'lightgray'}
          />

          {/* Right Front Door */}
          <Path
            d="M173.5,96.7c4.9,0,8.9-4,8.9-8.9v-8h11c2.8,0,5,2.2,5,5v29.7c0,2.8-2.2,5-5,5H171c-2.8,0-5-2.2-5-5h0v-22
            C167.6,95,170.4,96.7,173.5,96.7z"
            fill={
              selectedPart === 'Front Door Panel Right' ? 'black' : 'lightgray'
            }
            onPress={() => handlePartClick('Front Door Panel Right')}
          />

          {/* Right Fender */}
          <Path
            d="M166,71.4c-0.3,2.2,0.2,4,1,4s3.3,0,5.5,0h21.2c2.2,0,4.7,0,5.5,0
            c0.8,0,1.5-1.8,1.5-4V71c0-2.2-0.9-3.9-2-3.7c0,0,0,0-1,0c-9,0-16.3-7.3-16.3-16.3c0-9,7.3-16.3,16.3-16.3c1,0,1,0,1,0
            c1.1,0.2,2-1.5,2-3.7v-0.5c0-2.2-0.7-4-1.5-4s-3.3,0.2-5.5,0.4l-12.2,1.2c-2.2,0.2-5.3,0.4-7,0.4c-1.6,0-3.2,1.8-3.5,4L166,71.4z"
            fill={selectedPart === 'Front Right Fender' ? 'black' : 'lightgray'}
          />
        </G>
        {/* Right Front Wheel */}
        <Circle
          id="ext_right-front-wheel"
          cx="197.7"
          cy="50.9"
          r="14.6"
          fill={selectedPart === 'Right Front Wheel' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Right Front Wheel')}
        />

        {/* Right Quarter Panel */}
        <Path
          id="ext_right-rear-fender"
          d="M167.1,168.3c-0.2,2.2,0.4-4,1.2-4s3.3,0,5.5,0H193c2.2,0,4.7,0,5.5,0
            s1.5,1.6,1.5,3.7c0,2-0.9,3.5-2,3.4c0,0,0,0-1,0c-9,0-16.3,7.3-16.3,16.3c0,9,7.3,16.3,16.3,16.3c1,0,1,0,1,0c1.1-0.2,2,1,2,2.5
            c0,1.5-0.7,2.8-1.5,2.8s-3.3-0.1-5.5-0.2l-10.2-0.6c-2.2-0.1-5.8-0.4-8-0.7l-1-0.1c-2.2-0.2-4.1-2.2-4.3-4.4L167.1,168.3z"
          fill={selectedPart === 'Rear Right Fender' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Right Fender')}
        />

        {/* Right Rear Wheel */}
        <Circle
          id="ext_right-rear-wheel"
          cx="197"
          cy="187.7"
          r="14.6"
          fill={selectedPart === 'Right Rear Wheel' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Right Rear Wheel')}
        />

        {/* Rear Bumper */}
        <Path
          id="ext_rear-bumper"
          d="M80.1,210.2c-0.6,0-1,0.4-1,1v6.3c0,0.6,0.4,0,1,0H82c0.6,0,1,0.6,1,0v-0.6
            c0-0.6,0.4-1,1-1h14.5c0.6,0,1,0.4,1,1v0.6c0,0.6,0.4,0,1,0h34.8c0.6,0,1,0.6,1,0v-0.6c0-0.6,0.4-1,1-1h14.5c0.6,0,1,0.4,1,1v0.6
            c0,0.6,0.4,0,1,0h1.9c0.6,0,1,0.6,1,0v-6.3c0-0.6-0.4-1-1-1H80.1z"
          fill={selectedPart === 'Rear Bumper' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Bumper')}
        />

        {/* Rear Left Light */}
        <Path
          id="ext_rear-left-light"
          d="M99,223c0,2.1-0.9,3.8-2,3.8H85.3c-1.1,0-2-1.7-2-3.8v-1.9c0-2.1,0.9-3.8,2-3.8H97
            c1.1,0,2,1.7,2,3.8L99,223L99,223z"
          fill={selectedPart === 'Rear Left Light' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Left Light')}
        />

        {/* Rear Right Light */}
        <Path
          id="ext_rear-right-light"
          d="M152.4,223c0,2.1-0.9,3.8-2,3.8h-11.7c-1.1,0-2-1.7-2-3.8v-1.9c0-2.1,0.9-3.8,2-3.8
            h11.7c1.1,0,2,1.7,2,3.8L152.4,223L152.4,223z"
          fill={selectedPart === 'Rear Right Light' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Rear Right Light')}
        />

        {/* Front Bumper */}
        <Path
          id="ext_front-bumper"
          d="M156.9,17.2h-2.3c-1.9,2.3-4.7,3.7-7.9,3.7s-6-1.5-7.9-3.7H99c-1.9,2.3-4.7,3.7-7.9,3.7c-3.2,0-6-1.5-7.9-3.7
            h-2c-0.5,0-1,0.4-1,1v2.3c0,0.6,0.5,5,1,5h75.7c0.6,0,1-4.4,1-5v-2.3C157.9,17.6,157.4,17.2,156.9,17.2z"
          fill={selectedPart === 'Front Bumper' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Front Bumper')}
        />

        {/* Front Lights */}
        <Path
          id="ext_front-left-light"
          d="M91.3,6.4c-5.7,0-11.4,4-10.2,4.9c4.4,3.2,4.6,7.3,10.2,7.3c5.7,0,5.7-4.1,10.2-7.3
            C102.2,10.7,96.9,6.4,91.3,6.4z"
          fill={selectedPart === 'Front Left Light' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Front Left Light')}
        />

        <Path
          id="ext_front-right-light"
          d="M146.7,6.4c-5.7,0-11.4,4-10.2,4.9c4.4,3.2,4.6,7.3,10.2,7.3c5.7,0,5.7-4.1,10.2-7.3
            C157.7,10.7,152.3,6.4,146.7,6.4z"
          fill={selectedPart === 'Front Right Light' ? 'black' : 'lightgray'}
          onPress={() => handlePartClick('Front Right Light')}
        />
      </Svg>
      {selectedPart && damageOptions[selectedPart] && (
        <View style={styles.container}>
          {/* Damage Types - horizontal scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.typeScroll}
            contentContainerStyle={{paddingRight: moderateScale(10)}}>
            {damageOptions[selectedPart].types.map(type => (
              <TouchableOpacity
                key={type.name}
                onPress={() => handleDamageTypeSelect(type)}
                style={[
                  styles.typeButton,
                  selectedDamageType?.name === type.name &&
                    styles.typeButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.typeText,
                    selectedDamageType?.name === type.name &&
                      styles.typeTextSelected,
                  ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Damage Description */}
          <Text style={styles.description}>
            {damageOptions[selectedPart].description}
          </Text>

          {/* Subcategory Selection */}
          {selectedDamageType && damageOptions[selectedPart].subcategories && (
            <View style={styles.subcategoryWrapper}>
              <Text style={styles.subcategoryTitle}>Select a Subcategory</Text>
              <View style={styles.subcategoryContainer}>
                {damageOptions[selectedPart].subcategories.map(subcategory => (
                  <TouchableOpacity
                    key={subcategory.name}
                    onPress={() => handleSubcategorySelect(subcategory)}
                    style={[
                      styles.subcategoryButton,
                      selectedSubcategory?.name === subcategory.name &&
                        styles.subcategoryButtonSelected,
                    ]}>
                    <Text
                      style={[
                        styles.subcategoryText,
                        selectedSubcategory?.name === subcategory.name &&
                          styles.subcategoryTextSelected,
                      ]}>
                      {subcategory.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "20@ms",
    backgroundColor: "white",
  },
  typeScroll: {
    marginBottom: "16@ms",
  },
  typeButton: {
    paddingHorizontal: "16@ms",
    paddingVertical: "8@ms",
    borderRadius: "20@ms",
    backgroundColor: "#f2f2f2",
    marginRight: "10@ms",
  },
  typeButtonSelected: {
    backgroundColor: "#4B2EFF", // purple highlight
  },
  typeText: {
    fontSize: "14@ms",
    color: "black",
  },
  typeTextSelected: {
    color: "white",
    fontWeight: "600",
  },
  description: {
    fontSize: "13@ms",
    color: "gray",
    marginBottom: "16@ms",
    lineHeight: "18@ms",
  },
  subcategoryWrapper: {
    marginBottom: "16@ms",
  },
  subcategoryTitle: {
    fontSize: "15@ms",
    fontWeight: "600",
    marginBottom: "8@ms",
  },
  subcategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subcategoryButton: {
    paddingHorizontal: "12@ms",
    paddingVertical: "8@ms",
    borderRadius: "20@ms",
    marginRight: "8@ms",
    marginBottom: "8@ms",
    backgroundColor: "#f2f2f2",
  },
  subcategoryButtonSelected: {
    backgroundColor: "#4B2EFF",
  },
  subcategoryText: {
    fontSize: "13@ms",
    color: "black",
  },
  subcategoryTextSelected: {
    color: "white",
    fontWeight: "600",
  },
  nextButton: {
    marginTop: "10@ms",
    backgroundColor: "#4B2EFF",
    paddingVertical: "12@ms",
    borderRadius: "25@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: "16@ms",
    fontWeight: "600",
    color: "white",
  },
});

export default CarInteriorDiagram;
