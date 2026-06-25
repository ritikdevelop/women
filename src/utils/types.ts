// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  MayaAI: undefined;
  VoiceAssistant: undefined;
  FitnessCategories: undefined;
  WorkoutDetail: { workout: Workout };
  ExerciseScreen: { workout: Workout };
  WorkoutCompletion: { calories: number; badge: string };
  MeditationSession: { category: string };
  Notifications: undefined;
  Settings: undefined;
  ProfileDetail: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  FitnessGoals: { selectedGoals?: string[] };
  WellnessPreferences: { selectedGoals?: string[] };
  PeriodSetup: { preferences?: string[] };
  WaterGoal: { periodData?: any };
  MeetMaya: { waterGoal?: number };
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
  Profile: undefined;
};

// Data types
export interface User {
  name: string;
  email: string;
  age?: number;
  avatar?: string;
  currentGoal?: string;
  fitnessGoals?: string[];
  wellnessPreferences?: string[];
  cycleData?: PeriodData;
  waterGoal?: number;
}

export interface PeriodData {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
}

export interface CycleDay {
  day: number;
  phase: CyclePhase;
  symptoms?: string[];
  mood?: string;
}

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface Workout {
  id: string;
  title: string;
  category: string;
  duration: number;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  exercises: Exercise[];
  image: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration: number;
  image: string;
}

export interface WaterLog {
  amount: number;
  timestamp: string;
}

export interface MoodEntry {
  mood: string;
  emoji: string;
  timestamp: string;
  note?: string;
}

export interface SymptomEntry {
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  timestamp: string;
}

export interface Streak {
  current: number;
  longest: number;
  lastActivity: string;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  earned: boolean;
  date?: string;
}

export interface Notification {
  id: string;
  type: 'health' | 'water' | 'fitness' | 'meditation' | 'maya' | 'general';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface MeditationSession {
  id: string;
  title: string;
  category: string;
  duration: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'maya';
  timestamp: string;
  type?: 'text' | 'voice' | 'image';
}
