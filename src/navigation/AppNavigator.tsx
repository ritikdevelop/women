import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Svg, {Path, Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import {useApp} from '../context/AppContext';
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

//  Param lists 

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

// Navigators 
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

//  SVG Tab Icons 
const HomeIcon = ({color}: {color: string}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
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

const FitnessIcon = ({color}: {color: string}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.5 6.5h1.8v11h-1.8M15.7 6.5h1.8v11h-1.8M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const CalendarIcon = ({color}: {color: string}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
      stroke={color}
      strokeWidth={1.8}
    />
    <Path
      d="M16 3v4M8 3v4M3 9h18"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const ProfileIcon = ({color}: {color: string}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

// Center Maya SVG icon (lotus/sparkle)
const MayaIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Path
      d="M16 6c0 0-4 4-4 10s4 10 4 10s4-4 4-10S16 6 16 6z"
      fill="white"
      opacity={0.9}
    />
    <Path
      d="M6 16c0 0 4-4 10-4s10 4 10 4s-4 4-10 4S6 16 6 16z"
      fill="white"
      opacity={0.7}
    />
    <Circle cx={16} cy={16} r={3} fill="white" />
  </Svg>
);


// Custom Tab Bar 
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
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : (options.title ?? route.name);

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

        // Center Maya button before the Calendar tab (index 2)
        if (route.name === 'AICoach') {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.centerTabItem}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={Colors.wellnessGradient}
                style={styles.centerCircle}
              >
                <MayaIcon />
              </LinearGradient>
              <Text
                style={[
                  styles.tabLabel,
                  {color: isFocused ? Colors.tabActive : Colors.tabInactive},
                ]}>
                Maya
              </Text>
            </TouchableOpacity>
          );
        }

        const iconColor = isFocused ? Colors.tabActive : Colors.tabInactive;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            {TAB_ICONS[route.name]?.(iconColor)}
            <Text style={[styles.tabLabel, {color: iconColor}]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── Main Tabs 
const MainTabs: React.FC = () => (
  <View style={{flex: 1}}>
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Home'}} />
      <Tab.Screen name="Fitness" component={FitnessScreen} options={{tabBarLabel: 'Fitness'}} />
      <Tab.Screen name="AICoach" component={AICoachScreen} options={{tabBarLabel: 'Maya'}} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{tabBarLabel: 'Calendar'}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: 'Profile'}} />
    </Tab.Navigator>
  </View>
);

// ─── Onboarding Stack
const OnboardingNavigator: React.FC = () => {
  const {dispatch} = useApp();

  return (
    <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
      <OnboardingStack.Screen name="Welcome">
        {({navigation}) => (
          <WelcomeScreen onNext={() => navigation.navigate('FitnessGoals')} />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="FitnessGoals">
        {({navigation}) => (
          <FitnessGoalsScreen
            onNext={goals => {
              dispatch({type: 'SET_FITNESS_GOALS', payload: goals});
              navigation.navigate('WellnessPreferences');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="WellnessPreferences">
        {({navigation}) => (
          <WellnessPreferencesScreen
            onNext={prefs => {
              dispatch({type: 'SET_WELLNESS_PREFERENCES', payload: prefs});
              navigation.navigate('PeriodSetup');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="PeriodSetup">
        {({navigation}) => (
          <PeriodSetupScreen
            onNext={data => {
              dispatch({type: 'SET_PERIOD_DATA', payload: data});
              navigation.navigate('WaterGoal');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="WaterGoal">
        {({navigation}) => (
          <WaterGoalScreen
            initialGoal={3000}
            onNext={goal => {
              dispatch({type: 'SET_WATER_GOAL', payload: goal});
              navigation.navigate('AIWellnessCoach');
            }}
          />
        )}
      </OnboardingStack.Screen>

      <OnboardingStack.Screen name="AIWellnessCoach">
        {({navigation}) => (
          <AIWellnessCoach
            onNext={() => dispatch({type: 'SET_ONBOARDED', payload: true})}
            onBack={() => navigation.goBack()}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
};

// ─── Auth Stack 
const AuthNavigator: React.FC = () => {
  const {dispatch} = useApp();

  const handleLogin = () => {
    dispatch({type: 'SET_AUTHENTICATED', payload: true});
    dispatch({
      type: 'SET_USER',
      payload: {name: 'Sarah', email: 'sarah@example.com', age: 28, currentGoal: 'General Wellness'},
    });
  };

  const handleSignUp = (name: string, email: string) => {
    dispatch({type: 'SET_AUTHENTICATED', payload: true});
    dispatch({
      type: 'SET_USER',
      payload: {name, email, age: 28, currentGoal: 'General Wellness'},
    });
  };

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login">
        {({navigation}) => (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignUp={() => navigation.navigate('SignUp')}
            onNavigateToForgotPassword={() => navigation.navigate('ForgotPassword')}
          />
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name="SignUp">
        {({navigation}) => (
          <SignUpScreen
            onSignUp={handleSignUp}
            onNavigateToLogin={() => navigation.navigate('Login')}
          />
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name="ForgotPassword">
        {({navigation}) => (
          <ForgotPasswordScreen onBack={() => navigation.goBack()} />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

// ─── Root
const AppNavigator: React.FC = () => {
  const {state} = useApp();
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

// ─── Styles 
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#FFF',
    borderRadius: 35,
    elevation: 10,
    shadowColor: '#FF6BAA',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  centerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    elevation: 8,
    shadowColor: '#FF6BAA',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
