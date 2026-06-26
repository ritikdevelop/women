import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useApp } from '../context/AppContext';

// Splash Screen
import SplashScreen from '../screens/SplashScreen';

// Onboarding Screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import FitnessGoalsScreen from '../screens/onboarding/FitnessGoalsScreen';
import WellnessPreferencesScreen from '../screens/onboarding/WellnessPreferencesScreen';
import PeriodSetupScreen from '../screens/onboarding/PeriodSetupScreen';
import AIWellnessCoach from '../screens/onboarding/AIWellnessCoach';
import WaterGoalScreen from '../screens/onboarding/WaterGoalScreen';

// Authentication Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import FitnessCategoriesScreen from '../screens/main/FitnessScreen';
import CalendarScreen from '../screens/main/CalendarScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const AppNavigator = () => {
  const { state, dispatch } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState<'login' | 'signup' | 'forgot'>(
    'login',
  );
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [showFitnessCategories, setShowFitnessCategories] = useState(false);
  const [showWorkOutDetails, setShowWorkOutDetails] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showWaterTracker, setShowWaterTracker] = useState(false);
  const [showStepTracker, setShowStepTracker] = useState(false);
  const [showPeriodTracker, setShowPeriodTracker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMeditationCategories, setShowMeditationCategories] =
    useState(false);
  const [showMeditationSession, setShowMeditationSession] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    fitnessGoals: [] as string[],
    wellnessPrefs: [] as string[],
    periodData: {} as any,
    waterGoal: 3000,
  });

  useEffect(() => {
    const backAction = () => {
      if (!state.isOnboarded && currentOnboardingStep > 0) {
        setCurrentOnboardingStep(prev => prev - 1);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentOnboardingStep, state.isOnboarded]);

  // Splash Screen function
  const handleSplashScreenFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingNext = () => {
    if (currentOnboardingStep < 5) {
      setCurrentOnboardingStep(currentOnboardingStep + 1);
    } else {
      dispatch({
        type: 'SET_ONBOARDED',
        payload: true,
      });
      if (onboardingData.waterGoal) {
        dispatch({ type: 'SET_WATER_GOAL', payload: onboardingData.waterGoal });
      }
      if (onboardingData.fitnessGoals.length > 0) {
        dispatch({
          type: 'SET_FITNESS_GOALS',
          payload: onboardingData.fitnessGoals,
        });
      }
      if (onboardingData.wellnessPrefs.length > 0) {
        dispatch({
          type: 'SET_WELLNESS_PREFERENCES',
          payload: onboardingData.wellnessPrefs,
        });
      }
    }
  };

  // Onboarding Data
  const handleFitnessGoals = (goals: string[]) => {
    setOnboardingData(prev => ({ ...prev, fitnessGoals: goals }));
    handleOnboardingNext();
  };

  const handleWellnessPrefs = (prefs: string[]) => {
    setOnboardingData(prev => ({ ...prev, wellnessPrefs: prefs }));
    handleOnboardingNext();
  };

  const handlePeriodData = (data: any) => {
    setOnboardingData(prev => ({ ...prev, periodData: data }));
    dispatch({ type: 'SET_PERIOD_DATA', payload: data });
    handleOnboardingNext();
  };

  const handleWaterGoal = (goal: number) => {
    setOnboardingData(prev => ({ ...prev, waterGoal: goal }));
    dispatch({ type: 'SET_WATER_GOAL', payload: goal });
    handleOnboardingNext();
  };

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

  //   Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashScreenFinish} />;
  }

  // Onboarding Flow
  if (!state.isOnboarded) {
    switch (currentOnboardingStep) {
      case 0:
        return <WelcomeScreen onNext={handleOnboardingNext} />;
      case 1:
        return <FitnessGoalsScreen onNext={handleFitnessGoals} />;
      case 2:
        return <WellnessPreferencesScreen onNext={handleWellnessPrefs} />;
      case 3:
        return <PeriodSetupScreen onNext={handlePeriodData} />;
      case 4:
        return <WaterGoalScreen onNext={handleWaterGoal} initialGoal={3000} />;
      case 5:
        return (
          <AIWellnessCoach
            onNext={handleOnboardingNext}
            onBack={() => setCurrentOnboardingStep(prev => prev - 1)}
          />
        );
      default:
        return null;
    }
  }

  // Auth Flow
  if (!state.isAuthenticated) {
    switch (authScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignUp={() => setAuthScreen('signup')}
            onNavigateToForgotPassword={() => setAuthScreen('forgot')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onSignUp={handleSignUp}
            onNavigateToLogin={() => setAuthScreen('login')}
          />
        );
      case 'forgot':
        return <ForgotPasswordScreen onBack={() => setAuthScreen('login')} />;
      default:
        return null;
    }
  }
};

export default AppNavigator;
