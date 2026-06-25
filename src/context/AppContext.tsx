import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  PeriodData,
  WaterLog,
  MoodEntry,
  SymptomEntry,
  Streak,
  Badge,
  Notification,
  ChatMessage,
  Workout,
} from '../utils/types';

interface AppState {
  isOnboarded: boolean;
  isAuthenticated: boolean;
  user: User | null;
  waterLogs: WaterLog[];
  moodEntries: MoodEntry[];
  symptomEntries: SymptomEntry[];
  streak: Streak;
  badges: Badge[];
  notifications: Notification[];
  chatMessages: ChatMessage[];
  steps: number;
  stepGoal: number;
  waterGoal: number;
  completedWorkouts: Workout[];
  meditationHistory: string[];
  currentCycleDay: number;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_WATER_LOG'; payload: WaterLog }
  | { type: 'SET_WATER_GOAL'; payload: number }
  | { type: 'ADD_MOOD'; payload: MoodEntry }
  | { type: 'ADD_SYMPTOM'; payload: SymptomEntry }
  | { type: 'UPDATE_STREAK'; payload: Streak }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_STEPS'; payload: number }
  | { type: 'SET_CYCLE_DAY'; payload: number }
  | { type: 'SET_PERIOD_DATA'; payload: PeriodData }
  | { type: 'SET_FITNESS_GOALS'; payload: string[] }
  | { type: 'SET_WELLNESS_PREFERENCES'; payload: string[] }
  | { type: 'COMPLETE_WORKOUT'; payload: Workout }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESTORE_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  isOnboarded: false,
  isAuthenticated: false,
  user: null,
  waterLogs: [],
  moodEntries: [],
  symptomEntries: [],
  streak: { current: 0, longest: 0, lastActivity: '' },
  badges: [],
  notifications: [],
  chatMessages: [],
  steps: 0,
  stepGoal: 10000,
  waterGoal: 3000,
  completedWorkouts: [],
  meditationHistory: [],
  currentCycleDay: 1,
  isLoading: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ONBOARDED':
      return { ...state, isOnboarded: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_WATER_LOG':
      return { ...state, waterLogs: [...state.waterLogs, action.payload] };
    case 'SET_WATER_GOAL':
      return { ...state, waterGoal: action.payload };
    case 'ADD_MOOD':
      return { ...state, moodEntries: [...state.moodEntries, action.payload] };
    case 'ADD_SYMPTOM':
      return { ...state, symptomEntries: [...state.symptomEntries, action.payload] };
    case 'UPDATE_STREAK':
      return { ...state, streak: action.payload };
    case 'ADD_BADGE':
      return { ...state, badges: [...state.badges, action.payload] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n,
        ),
      };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_STEPS':
      return { ...state, steps: action.payload };
    case 'SET_CYCLE_DAY':
      return { ...state, currentCycleDay: action.payload };
    case 'SET_PERIOD_DATA':
      return {
        ...state,
        user: state.user
          ? { ...state.user, cycleData: action.payload }
          : state.user,
      };
    case 'SET_FITNESS_GOALS':
      return {
        ...state,
        user: state.user
          ? { ...state.user, fitnessGoals: action.payload }
          : state.user,
      };
    case 'SET_WELLNESS_PREFERENCES':
      return {
        ...state,
        user: state.user
          ? { ...state.user, wellnessPreferences: action.payload }
          : state.user,
      };
    case 'COMPLETE_WORKOUT':
      return {
        ...state,
        completedWorkouts: [...state.completedWorkouts, action.payload],
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESTORE_STATE':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      saveState();
    }
  }, [state]);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem('appState');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'RESTORE_STATE', payload: parsed });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveState = async () => {
    try {
      const toSave = {
        isOnboarded: state.isOnboarded,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        waterLogs: state.waterLogs,
        moodEntries: state.moodEntries,
        symptomEntries: state.symptomEntries,
        streak: state.streak,
        badges: state.badges,
        notifications: state.notifications,
        chatMessages: state.chatMessages,
        steps: state.steps,
        waterGoal: state.waterGoal,
        stepGoal: state.stepGoal,
        completedWorkouts: state.completedWorkouts,
        meditationHistory: state.meditationHistory,
        currentCycleDay: state.currentCycleDay,
      };
      await AsyncStorage.setItem('appState', JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
