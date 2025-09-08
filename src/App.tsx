import {NavigationContainer, TabRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Profiler, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {
  ActivityIndicator,
  Alert,
  Appearance,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from 'react-native';

import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
  IAppearanceOptions,
  TabButtonLayout,
} from 'react-native-animated-nav-tab-bar';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {TransitionSpecs, CardStyleInterpolators} from '@react-navigation/stack';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import messaging from '@react-native-firebase/messaging';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomDrawer from './constant/CustomDrawer';
import {colors} from './constant/colors';
import {UserProvider, useUser} from './context/UserContext';
import {
  NotificationsService,
  requestUserPermission,
} from './firebase/NotificationListener';
import { Loader } from './Components/loader/Loader';


//Screens Imports
import Home from './Screen/Home';
import CarListing from './Screen/CarListing';
import CarComparison from './Screen/CarComparison';
import CarDetail from './Screen/CarDetail';
import MyGarage from './Screen/MyGarage';
import Valuation from './Screen/Valulation';

export type RootStackParamList = {
  BottomTabs: undefined;
  Home:undefined;
  CarListing:undefined;
  CarComparison:undefined;
  MyGarage: undefined;
  CarDetail: undefined;
  Valuation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = AnimatedTabBarNavigator<RootStackParamList>();
const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
const Drawer = createDrawerNavigator();

export const HomeDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Tabs"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: colors.backgroundColor,
      drawerInactiveTintColor: colors.black,
      drawerActiveBackgroundColor: colors.black,
      drawerLabelStyle: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Medium',
      },
      drawerStyle: {
        backgroundColor: colors.backgroundColor,
        borderTopRightRadius: moderateScale(70),
        overflow: 'hidden',
      },
    }}>
    <Drawer.Screen
      name="Tabs"
      component={Home} // Your bottom tab navigator here
      options={{
        drawerLabel: ({color}) => (
          <Text
            style={{
              color,
              fontFamily: 'Poppins-Regular',
              fontSize: moderateScale(14),
            }}>
            Home
          </Text>
        ),
        drawerIcon: ({focused}) => (
          <FontAwesome
            name="home"
            size={moderateScale(24)}
            color={focused ? colors.backgroundColor : colors.black}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="CarListing"
      component={CarListing}
      options={{
        drawerLabel: ({color}) => (
          <Text
            style={{
              color,
              fontFamily: 'Poppins-Regular',
              fontSize: moderateScale(14),
            }}>
            Home
          </Text>
        ),
        drawerIcon: ({focused}) => (
          <FontAwesome
            name="home"
            size={moderateScale(24)}
            color={focused ? colors.backgroundColor : colors.black}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="CarComparison"
      component={CarComparison}
      options={{
        drawerLabel: ({color}) => (
          <Text
            style={{
              color,
              fontFamily: 'Poppins-Regular',
              fontSize: moderateScale(14),
            }}>
            Home
          </Text>
        ),
        drawerIcon: ({focused}) => (
          <FontAwesome
            name="Car Comparison"
            size={moderateScale(24)}
            color={focused ? colors.backgroundColor : colors.black}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);

const AppContent = () => {
  const {user, loading} = useUser();
  if ((Text as any).defaultProps == null) {
    (Text as any).defaultProps = {};
  }
  if ((TextInput as any).defaultProps == null) {
    (TextInput as any).defaultProps = {};
  }

  (Text as any).defaultProps.allowFontScaling = false;
  (TextInput as any).defaultProps.allowFontScaling = false;

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="CarDetail"
          component={CarDetail}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="MyGarage"
          component={MyGarage}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Valuation"
          component={Valuation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [notification, setNotification] = useState(null);
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //   //  console.log('FCM message received:', remoteMessage);
  //     setNotification(remoteMessage); // Set the notification state
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationsService();
  // });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={barStyle}
        />
      <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundColor}}>
        <UserProvider>
          <AppContent />
          {/* <NotificationHandler/> */}
        </UserProvider>
      </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
