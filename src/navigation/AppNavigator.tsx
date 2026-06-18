import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState } from 'react';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import WaterScreen from '../screens/onboarding/WaterScreen';
import AIWellnessCoach from '../screens/onboarding/AIWellnessCoach';

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const OnboardingContext = createContext<{
  onboardingComplete: () => void;
} | null>(null);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingStack');
  }
  return context;
};

//  Bottom Tabs for Authenticated Users
function BottomTabs() {}

//  Main Stack for Authenticated Users
function MainStack() {}

//  Auth Stack Navigator for login/signup screens
function AuthStack() {}

// Onboarding Stack Navigator for first time users
function OnboardingStack({
  onboardingComplete,
}: {
  onboardingComplete: () => void;
}) {
  return (
    <OnboardingContext.Provider value={{ onboardingComplete }}>
      <Stack.Navigator>
        {/* Add your onboarding screens here */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Water" component={WaterScreen} />
        <Stack.Screen name="WellnessCoach" component={AIWellnessCoach} />
      </Stack.Navigator>
    </OnboardingContext.Provider>
  );
}

const AppNavigator = () => {

  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // const handleOnboardingComplete = () => {

  // }

  if (!isOnboardingComplete) {
    return (
      <OnboardingStack onboardingComplete={() => setIsOnboardingComplete(true)} />
    );
  }
  
}

export default AppNavigator;