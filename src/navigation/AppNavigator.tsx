import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path, Circle } from 'react-native-svg';

import { useApp } from '../context/AppContext';
import Colors from '../theme/colors';

// Screens – Splash
import SplashScreen from '../screens/SplashScreen';

// Onboarding
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import FitnessGoalsScreen from '../screens/onboarding/FitnessGoalsScreen';
import WellnessPreferencesScreen from '../screens/onboarding/WellnessPreferencesScreen';
import PeriodSetupScreen from '../screens/onboarding/PeriodSetupScreen';
import WaterGoalScreen from '../screens/onboarding/WaterGoalScreen';
import AIWellnessCoach from '../screens/onboarding/AIWellnessCoach';

// Auth
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main tabs
import HomeScreen from '../screens/main/HomeScreen';
import FitnessScreen from '../screens/main/FitnessScreen';
import CalendarScreen from '../screens/main/CalendarScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import AICoachScreen from '../screens/main/AICoachScreen';

// ─── Param Lists ─────────────────────────────────────────────────────────────

export type OnboardingStackParamList = {
  Welcome: undefined;
  FitnessGoals: undefined;
  WellnessPreferences: undefined;
  PeriodSetup: undefined;
  WaterGoal: undefined;
  AIWellnessCoach: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Fitness: undefined;
  Calendar: undefined;
  AICoach: undefined;
  Profile: undefined;
};

// ─── Navigators ───────────────────────────────────────────────────────────────
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// ─── Tab Icons ────────────────────────────────────────────────────────────────

const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <Path
      d="M9 21V12h6v9"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </Svg>
);

const FitnessIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12h2" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M5 9v6" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <Path d="M7 10.5v3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M7 12h10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M17 10.5v3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M19 9v6" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <Path d="M19 12h2" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const CalendarIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"
      stroke={color}
      strokeWidth={1.8}
    />
    <Path
      d="M16 3v4M8 3v4M4 9h16"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M8 13h2M14 13h2M8 17h2"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const ProfileIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={3.5} stroke={color} strokeWidth={1.8} />
    <Path
      d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

const TAB_ICONS: Record<string, (color: string) => React.ReactElement> = {
  Home: color => <HomeIcon color={color} />,
  Fitness: color => <FitnessIcon color={color} />,
  Calendar: color => <CalendarIcon color={color} />,
  Profile: color => <ProfileIcon color={color} />,
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    // Outer wrapper: full width, overflow visible so avatar can pop above
    <View style={styles.tabBarOuter}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // ── Center Maya avatar ─────────────────────────────────────────
          if (route.name === 'AICoach') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.centerTabItem}
                activeOpacity={0.85}
              >
                {/* White ring gives the lifted halo effect */}
                <View style={styles.centerRing}>
                  <View style={styles.centerCircle}>
                    <Image
                      source={require('../assets/maya_avatar.png')}
                      style={styles.centerAvatar}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }

          // ── Regular tab ────────────────────────────────────────────────
          const iconColor = isFocused ? Colors.tabActive : Colors.tabInactive;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              {TAB_ICONS[route.name]?.(iconColor)}
              <Text style={[styles.tabLabel, { color: iconColor }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─── Main Tabs ────────────────────────────────────────────────────────────────
const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    tabBar={props => <CustomTabBar {...props} />}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Fitness"
      component={FitnessScreen}
      options={{ tabBarLabel: 'Fitness' }}
    />
    <Tab.Screen
      name="AICoach"
      component={AICoachScreen}
      options={{ tabBarLabel: 'Maya' }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{ tabBarLabel: 'Calendar' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

// ─── Onboarding Stack ─────────────────────────────────────────────────────────
const OnboardingNavigator: React.FC = () => {
  const { dispatch } = useApp();

  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Welcome">
        {({ navigation }) => (
          <WelcomeScreen onNext={() => navigation.navigate('FitnessGoals')} />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="FitnessGoals">
        {({ navigation }) => (
          <FitnessGoalsScreen
            onNext={goals => {
              dispatch({ type: 'SET_FITNESS_GOALS', payload: goals });
              navigation.navigate('WellnessPreferences');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="WellnessPreferences">
        {({ navigation }) => (
          <WellnessPreferencesScreen
            onNext={prefs => {
              dispatch({ type: 'SET_WELLNESS_PREFERENCES', payload: prefs });
              navigation.navigate('PeriodSetup');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="PeriodSetup">
        {({ navigation }) => (
          <PeriodSetupScreen
            onNext={data => {
              dispatch({ type: 'SET_PERIOD_DATA', payload: data });
              navigation.navigate('WaterGoal');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="WaterGoal">
        {({ navigation }) => (
          <WaterGoalScreen
            initialGoal={3000}
            onNext={goal => {
              dispatch({ type: 'SET_WATER_GOAL', payload: goal });
              navigation.navigate('AIWellnessCoach');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="AIWellnessCoach">
        {({ navigation }) => (
          <AIWellnessCoach
            onNext={() => dispatch({ type: 'SET_ONBOARDED', payload: true })}
            onBack={() => navigation.goBack()}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
};

// ─── Auth Stack ───────────────────────────────────────────────────────────────
const AuthNavigator: React.FC = () => {
  const { dispatch } = useApp();

  const handleLogin = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    dispatch({
      type: 'SET_USER',
      payload: {
        name: 'Sarah',
        email: 'sarah@example.com',
        age: 28,
        currentGoal: 'General Wellness',
      },
    });
  };

  const handleSignUp = (name: string, email: string) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    dispatch({
      type: 'SET_USER',
      payload: { name, email, age: 28, currentGoal: 'General Wellness' },
    });
  };

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignUp={() => navigation.navigate('SignUp')}
            onNavigateToForgotPassword={() =>
              navigation.navigate('ForgotPassword')
            }
          />
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name="SignUp">
        {({ navigation }) => (
          <SignUpScreen
            onSignUp={handleSignUp}
            onNavigateToLogin={() => navigation.navigate('Login')}
          />
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name="ForgotPassword">
        {({ navigation }) => (
          <ForgotPasswordScreen onBack={() => navigation.goBack()} />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
const AppNavigator: React.FC = () => {
  const { state } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      {!state.isOnboarded ? (
        <OnboardingNavigator />
      ) : !state.isAuthenticated ? (
        <AuthNavigator />
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Full-width flat bar — flush to bottom, no pill, no border radius
  tabBarOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible', // lets the avatar circle rise above the bar
  },
  tabBar: {
    width: '100%',
    height: Platform.OS === 'ios' ? 96 : 76,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 0, // flat — no rounded corners
    borderTopWidth: 1,
    borderTopColor: '#F0E6EB',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    // top-only shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // ── Center Maya button ─────────────────────────────────────────────────
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    // align to top so the avatar floats above the bar surface
    justifyContent: 'flex-start',
    marginTop: -30, // pulls avatar above the bar top edge
  },
  // Thin white halo ring (matches design)
  centerRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6BAA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 16,
  },
  // Solid pink circle
  centerCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FF6BAA',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centerAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
});
