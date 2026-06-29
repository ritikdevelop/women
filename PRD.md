# My Women — Product Requirements Document

**Version:** 1.0  
**Last Updated:** June 2026  
**Platform:** React Native (iOS & Android)  
**AI Companion:** Maya  

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Vision & Mission](#2-vision--mission)
3. [Target Audience](#3-target-audience)
4. [Core Value Proposition](#4-core-value-proposition)
5. [Brand Identity](#5-brand-identity)
6. [Design System](#6-design-system)
7. [Tech Stack](#7-tech-stack)
8. [App Architecture](#8-app-architecture)
9. [User Journey & Navigation Flow](#9-user-journey--navigation-flow)
10. [Splash Screen](#10-splash-screen)
11. [Onboarding Module](#11-onboarding-module)
12. [Authentication Module](#12-authentication-module)
13. [Home Dashboard](#13-home-dashboard)
14. [Period & Cycle Tracking Module](#14-period--cycle-tracking-module)
15. [Wellness Calendar](#15-wellness-calendar)
16. [Fitness Module](#16-fitness-module)
17. [Water Tracker](#17-water-tracker)
18. [Step Tracker](#18-step-tracker)
19. [Meditation Module](#19-meditation-module)
20. [Maya AI Coach](#20-maya-ai-coach)
21. [Voice Assistant](#21-voice-assistant)
22. [Profile Module](#22-profile-module)
23. [Notifications](#23-notifications)
24. [Rewards & Streaks](#24-rewards--streaks)
25. [Settings](#25-settings)
26. [State Management](#26-state-management)
27. [Security](#27-security)
28. [Analytics & Success Metrics](#28-analytics--success-metrics)
29. [MVP Scope](#29-mvp-scope)
30. [Future Roadmap](#30-future-roadmap)

---

## 1. Product Overview

**My Women** is a premium AI-powered women's wellness app built in React Native. It combines period tracking, fitness coaching, hydration monitoring, mood logging, step tracking, meditation, and personalized AI guidance into a single emotionally intelligent platform.

The app's AI companion, **Maya**, acts as a wellness coach, women's health expert, and supportive friend — delivering contextual, personalized recommendations across every feature.

### Core Feature Set

| Feature | Status |
|---|---|
| Splash Screen | ✅ Built |
| Onboarding (6 steps) | ✅ Built |
| Authentication (Login / Sign Up / Forgot Password) | ✅ Built |
| Home Dashboard | ✅ Built |
| Period & Cycle Calendar | ✅ Built |
| Fitness Screen | ✅ Built |
| Water Tracker | ✅ Built |
| Step Tracker | ✅ Built |
| Maya AI Coach Screen | ✅ Built |
| Profile Screen | ✅ Built |
| Settings | 🔲 Planned |
| Meditation Module | 🔲 Planned |
| Voice Assistant | 🔲 Planned |
| Notifications Center | 🔲 Planned |
| Rewards Screen | 🔲 Planned |

---

## 2. Vision & Mission

**Vision:** Become the most trusted AI-powered wellness companion for women worldwide.

**Mission:** Help women understand their bodies, build healthy habits, improve mental wellness, track their menstrual cycle, achieve fitness goals, and receive personalized AI guidance — all from a single beautiful app.

---

## 3. Target Audience

### Teen Girls (13–18)
- Period education and first-cycle tracking
- Mood tracking
- Light fitness guidance

### College Students (18–25)
- Fitness programs
- Stress management
- Hydration tracking
- Period tracking

### Working Women (25–40)
- Time-efficient wellness routines
- Hormonal and cycle insights
- Productivity support

### Married Women / Women Planning Pregnancy
- Fertility awareness and ovulation tracking
- Wellness management
- Cycle regularity monitoring

---

## 4. Core Value Proposition

A single platform that covers:
- Women's health and cycle tracking
- Fitness and movement
- Mental wellness and meditation
- Hydration and nutrition tracking
- AI-powered personal coaching via Maya

---

## 5. Brand Identity

| Attribute | Value |
|---|---|
| Product Name | My Women |
| Tagline | Understand Your Body. Empower Your Life. |
| AI Companion | Maya |
| Maya's Personality | 50% Wellness Coach · 30% Women's Health Expert · 20% Best Friend |

---

## 6. Design System

### Color Palette

| Token | Hex |
|---|---|
| Primary Pink | `#FF6BAA` |
| Lavender | `#B89CFF` |
| Ovulation Blue | `#7CCF8A` |
| Wellness Event Yellow | `#F6C667` |
| Self Care Green | (soft green) |
| Nude Beige | `#F5E7E1` |
| Background | `#FFF9FB` |
| Surface | `#FFFFFF` |
| Success | `#7CCF8A` |
| Warning | `#F6C667` |
| Text Primary | `#2D2D2D` |
| Text Secondary | `#6D6D6D` |
| Tab Active | Pink |
| Tab Inactive | Muted gray |

### Typography

- **Primary Font:** Poppins
- **Secondary Font:** Inter

### Design Language

- Premium, feminine, emotionally warm
- Soft gradients and pastel palettes
- Rounded cards and components (border radius 16–24)
- Subtle glassmorphism
- Micro-animations on mount and interaction (300–500ms, ease-out cubic)
- Modern startup aesthetic

### Animation Standards

All animations use `react-native-reanimated` v4 with these conventions:
- Mount animations: fade + slide-up (400ms, ease-out-quad, ~100–200ms delay)
- Circular progress rings: animate from 0 → value (900ms, ease-out-cubic)
- Mood buttons: bounce scale on press (`withSequence` spring)
- Flame/pulse icons: repeating gentle scale pulse
- Step counter: animated count-up from 0 to value (1000ms, ease-out-cubic)

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.86.0 |
| Language | TypeScript 5.8 |
| Navigation | React Navigation 7 (Native Stack + Bottom Tabs) |
| Animations | react-native-reanimated 4.4 |
| SVG Graphics | react-native-svg 15 |
| Gradients | react-native-linear-gradient 2.8 |
| Safe Area | react-native-safe-area-context 5.5 |
| Gesture Handling | react-native-gesture-handler 3 |
| Lottie Animations | lottie-react-native 7 |
| Persistent Storage | @react-native-async-storage/async-storage 3 |
| State Management | React Context API + useReducer |
| Testing | Jest + React Native preset |
| Linting | ESLint + Prettier |

---

## 8. App Architecture

### Directory Structure

```
src/
├── assets/              # Images, avatars (maya_avatar.png, welcome.png)
├── components/          # Shared components (CustomDatePicker)
├── context/             # AppContext (global state)
├── navigation/          # AppNavigator (all stacks + tab bar)
├── screens/
│   ├── SplashScreen.tsx
│   ├── auth/            # Login, SignUp, ForgotPassword
│   ├── onboarding/      # Welcome, FitnessGoals, WellnessPreferences,
│   │                    #   PeriodSetup, WaterGoal, AIWellnessCoach
│   ├── main/            # Home, Fitness, Calendar, AICoach, Profile
│   ├── Features/        # WaterTracker, StepTracker
│   └── settings/        # (planned)
├── theme/               # colors.ts, typography
└── utils/               # types.ts (all shared TypeScript types)
```

### Navigation Structure

```
AppNavigator
├── SplashScreen (shown once on launch)
├── OnboardingStack (if not onboarded)
│   ├── WelcomeScreen
│   ├── FitnessGoalsScreen
│   ├── WellnessPreferencesScreen
│   ├── PeriodSetupScreen
│   ├── WaterGoalScreen
│   └── AIWellnessCoach
├── AuthStack (if onboarded but not authenticated)
│   ├── LoginScreen
│   ├── SignUpScreen
│   └── ForgotPasswordScreen
└── MainStack (authenticated)
    ├── MainTabs (Bottom Tab Bar)
    │   ├── Home
    │   ├── Fitness
    │   ├── AICoach (Maya — center floating avatar button)
    │   ├── Calendar
    │   └── Profile
    ├── WaterTracker (pushed from Home)
    └── StepTracker (pushed from Home)
```

### Global State (AppContext)

The app uses a single React Context + `useReducer` for global state, persisted to `AsyncStorage`:

| State Key | Type | Description |
|---|---|---|
| `isOnboarded` | boolean | Whether the user has completed onboarding |
| `isAuthenticated` | boolean | Login status |
| `user` | User | Name, email, age, goals, cycleData, fitnessGoals, wellnessPreferences |
| `waterLogs` | WaterLog[] | Daily hydration entries |
| `waterGoal` | number | Daily water target in ml (default 3000) |
| `moodEntries` | MoodEntry[] | Mood log history |
| `symptomEntries` | SymptomEntry[] | Cycle symptom log |
| `streak` | Streak | Current and longest streak |
| `badges` | Badge[] | Earned badges |
| `notifications` | Notification[] | In-app notification list |
| `chatMessages` | ChatMessage[] | Maya AI chat history |
| `steps` | number | Today's step count |
| `stepGoal` | number | Daily step goal (default 10,000) |
| `completedWorkouts` | Workout[] | Workout completion history |
| `meditationHistory` | string[] | Session IDs |
| `currentCycleDay` | number | Today's cycle day |

---

## 9. User Journey & Navigation Flow

```
App Launch
    │
    ▼
Splash Screen (animated, ~2s)
    │
    ▼
[First Launch] ──► Onboarding Flow (6 screens)
    │                   ├── Welcome
    │                   ├── Fitness Goals
    │                   ├── Wellness Preferences
    │                   ├── Period Setup
    │                   ├── Water Goal
    │                   └── AI Wellness Coach (intro to Maya)
    │
    ▼
Auth Flow
    ├── Login ──► (Google / Apple / Email)
    ├── Sign Up
    └── Forgot Password (Email → OTP → Reset)
    │
    ▼
Main App (Bottom Tab Navigation)
    ├── Home Dashboard
    ├── Fitness Screen
    ├── Maya AI Coach (center tab)
    ├── Calendar (Period Tracker)
    └── Profile
    │
    ▼
Feature Screens (pushed from Home)
    ├── Water Tracker
    └── Step Tracker
```

---

## 10. Splash Screen

- Animated brand intro screen
- Displays Maya avatar and app logo
- Uses Lottie or custom animation
- Transitions automatically after ~2 seconds
- Checks `isOnboarded` state to route correctly

---

## 11. Onboarding Module

A 6-step guided flow shown only on first launch. All selections are saved to global state via `dispatch`.

### Step 1 — Welcome Screen
- Maya avatar intro
- Brand tagline
- CTA: "Get Started"

### Step 2 — Fitness Goals
- Multi-select goal options (e.g. Weight Loss, Strength, Flexibility, General Wellness)
- Saved to `user.fitnessGoals`
- Dispatches: `SET_FITNESS_GOALS`

### Step 3 — Wellness Preferences
- Multi-select wellness areas (e.g. Meditation, Hydration, Sleep, Mental Health)
- Saved to `user.wellnessPreferences`
- Dispatches: `SET_WELLNESS_PREFERENCES`

### Step 4 — Period Setup
- Inputs: Last period date, Cycle length, Period duration
- Uses `CustomDatePicker` component
- Dispatches: `SET_PERIOD_DATA`

### Step 5 — Water Goal
- Slider or preset options to set daily water target (ml)
- Default: 3,000 ml (3L)
- Dispatches: `SET_WATER_GOAL`

### Step 6 — AI Wellness Coach (Maya Intro)
- Animated intro card for Maya
- Explains Maya's role as wellness coach
- "Back" and "Get Started" actions
- Completing this step dispatches: `SET_ONBOARDED: true`

---

## 12. Authentication Module

### Login Screen
- Fields: Email, Password
- Actions: Login, Google Sign-In, Apple Sign-In, Forgot Password link
- On success: dispatches `SET_AUTHENTICATED: true` + `SET_USER`

### Sign Up Screen
- Fields: Full Name, Email, Password, Confirm Password
- On success: dispatches `SET_AUTHENTICATED: true` + `SET_USER`

### Forgot Password Screen
- Flow: Email input → OTP verification → Reset Password
- Back navigation

> **Note:** Authentication is currently mocked (no backend). Dispatching `SET_AUTHENTICATED` and `SET_USER` with mock data simulates a logged-in state.

---

## 13. Home Dashboard

The main screen users see after login. Shows a personalized daily snapshot with 7 key health widgets.

### Header
- Personalized greeting: "Good Morning, [Name] 🌸"
- Current date display
- Bell icon with unread notification dot

### Widgets

#### Cycle Status Banner
- Gradient banner (pink-to-rose)
- Shows: Cycle Day number, Ovulation countdown ("Ovulation in X Days")
- Shows: Current phase message ("You're in your fertile window")
- Animated entrance (fade + scale on mount)

#### Water Intake Card
- Shows: Current intake (L) vs daily goal (L)
- Animated circular progress ring (0 → current %, 900ms)
- Tappable → navigates to `WaterTrackerScreen`
- Color: Blue (`#4FC3F7`)

#### Steps Card
- Shows: Animated count-up from 0 → current step count
- Animated circular progress ring (0 → % of 10K goal)
- Tappable → navigates to `StepTrackerScreen`
- Color: Green (`#4CAF50`)

#### Workout Progress Card
- Shows: Today's workout completion percentage
- Animated circular progress ring
- Pulsing flame emoji icon (repeating spring animation)
- Color: Orange (`#FF9800`)

#### Period Card
- Shows: "Next Period in X Days"
- Animated dotted half-moon arc (right-side semicircle)
- Active dots filled with Primary Pink

#### Mood Card
- 5 emoji options: 😄 😊 😐 😠 😔
- Selecting a mood triggers bounce-scale animation
- Selected mood highlighted with lavender background + shadow

#### Maya's Insight Card
- Pink-tinted card (`#FFF0F6`)
- AI-generated wellness tip relevant to cycle phase
- Maya avatar thumbnail

#### Daily Motivation Card
- Short motivational quote
- 🌸 flower decoration

#### Wellness Streak Row
- "🔥 X Day Wellness Streak"
- Tappable (navigates to Rewards — planned)

---

## 14. Period & Cycle Tracking Module

Accessible from the **Calendar** tab.

### Monthly Calendar

- 7-column week grid (Sun–Sat)
- Month navigation (previous/next chevrons)
- Day cells with color-coded markers:

| Marker | Color | Meaning |
|---|---|---|
| Period Ring | Primary Pink | Period day |
| Filled Pink | Primary Pink | Today |
| Lavender fill | `#B89CFF` | Ovulation day |
| Yellow fill | `#F6C667` | PMS window |
| Self-care border | Soft green | Self-care day |
| Light purple fill | Lavender | Fertility window |

### Phase Info Card (Animated)
- Current phase name (e.g. "Ovulation")
- Cycle Day badge (lavender pill)
- Animated donut ring with gradient (pink → lavender → purple)
- Flower SVG icon centered in ring
- Entrance animation: fade + slide up (420ms, 150ms delay)

### Phase Timeline
- Period window dates
- Fertility window dates
- Ovulation date
- PMS window dates
- Each row has color dot + label + date range

### Quick Actions Row
- 4 action buttons: Symptoms | Mood | Cramp | Notes
- Each button opens a logging bottom sheet (planned)

### Cycle Health Score Card
- Score out of 100 (e.g. "85 / 100")
- Status label ("Good", "Fair", "Needs Attention")
- Semi-circular gauge with green gradient
- Animated entrance

### Symptom Tracking
Symptoms supported: Cramps, Headache, Acne, Fatigue, Bloating, Mood Swings

### Mood Logging
- Daily mood entry from Calendar screen
- Stored in `moodEntries[]`

---

## 15. Wellness Calendar

The Calendar tab doubles as both the period tracker and general wellness calendar. Color coding:

| Color | Event Type |
|---|---|
| Pink | Period days |
| Purple/Lavender | Fertility window |
| Lavender fill | Ovulation |
| Yellow | PMS window / Wellness events |
| Green border | Self-care reminder |

---

## 16. Fitness Module

Accessible from the **Fitness** tab.

### Workout Categories
- Weight Loss
- Weight Gain / Muscle Gain
- Strength Training
- Flexibility & Yoga
- Post-Pregnancy Recovery

### Workout Detail Screen
- Workout title and description
- Video player or image guide
- Step-by-step instructions
- Duration estimate
- Calories burned
- Difficulty level

### Active Exercise Screen
- Exercise timer (count-up or countdown)
- Audio guide / voice cues
- Rep counter
- Progress through the set
- On completion: dispatches `COMPLETE_WORKOUT`

---

## 17. Water Tracker

Feature screen accessible from the Water card on Home or as a standalone route (`WaterTracker`).

### Main Display
- Large animated circular progress ring (blue gradient, 230px)
- Inner: percentage value (count-up animation), intake (L) / goal (L), label
- Wave SVG animation at the bottom of the ring inner circle

### Quick Add Buttons
- Preset amounts: +100ml, +250ml, +500ml, +1L
- Each tap: spring scale animation + increments intake state
- Capped at daily goal

### Reminder Row
- Displays current reminder interval (e.g. "Every 1 Hour")
- "Edit" button → opens reminder settings (planned)

### State Behavior
- Intake stored in `waterLogs[]` via `ADD_WATER_LOG`
- Goal stored in `waterGoal` (set during onboarding)
- Data persisted to `AsyncStorage`

---

## 18. Step Tracker

Feature screen accessible from the Steps card on Home (`StepTracker` route).

### Display
- Daily step count (large, animated)
- Progress toward goal (10,000 steps default)
- Distance (km/miles)
- Calories burned estimate

### Charts
- Weekly step trend bar chart
- Daily breakdown

### State
- Step count stored in `steps` field
- Goal stored in `stepGoal`
- Updated via `SET_STEPS` dispatch

---

## 19. Meditation Module

> **Status:** Planned (not yet built)

### Session Categories
- Sleep
- Stress Relief
- Focus
- Anxiety Relief
- Self Love
- Breathing Exercises

### Session Player Features
- Background audio playback
- Countdown timer
- Progress indicator
- Favorites / save session
- Offline downloads
- Session history stored in `meditationHistory[]`

---

## 20. Maya AI Coach

Accessible from the **center tab button** (floating Maya avatar in the tab bar).

### Chat Interface
- Full-screen conversational chat UI
- Maya avatar displayed in header
- Chat bubbles with message history (persisted in `chatMessages[]`)
- Suggested quick-reply questions

### AI Capabilities
- Context-aware responses (uses cycle day, mood, recent activity)
- Personalized wellness recommendations
- Workout guidance aligned with cycle phase
- Cycle phase education and insights
- Hydration coaching
- Mental wellness support

### Conversation Topics Supported
- "How is my cycle affecting my energy today?"
- "What workout should I do on day 12?"
- "How much water should I drink?"
- "I'm feeling anxious — what helps?"
- General health Q&A

> **Note:** AI responses are currently simulated/rule-based. LLM integration (GPT-4 / Claude) is planned for a future phase.

---

## 21. Voice Assistant

> **Status:** Planned (not yet built)

### Features
- Voice input for hands-free interaction with Maya
- Text-to-speech output (Maya's voice)
- Real-time speech recognition
- Voice commands for quick actions (log water, check cycle, start meditation)

---

## 22. Profile Module

Accessible from the **Profile** tab.

### Profile Card
- Avatar photo (with camera icon to update)
- Name, age, height, weight display
- "Edit Profile" button

### Health Summary Row (4 cards)
| Card | Value Shown |
|---|---|
| Cycle | Current day (e.g. "Day 12") |
| Steps | Today's steps (e.g. "7,834") |
| Water | Intake vs goal (e.g. "1.8 / 3 L") |
| Workout | Completion % (e.g. "68%") |

### Current Streaks (5 items)
| Streak | Icon Color |
|---|---|
| Water | Blue |
| Workout | Purple |
| Meditation | Purple |
| Mood | Yellow |
| Cycle | Pink |

### Maya's Insight Card
- Gradient card (pink gradient)
- Personalized encouragement message from Maya
- Maya avatar

### Edit Profile (Planned)
- Update: name, DOB, height, weight, goal, profile photo
- Connected to `SET_USER` dispatch

---

## 23. Notifications

> **Status:** Planned (not yet built)

### Notification Types
| Category | Example |
|---|---|
| Water Reminder | "Time to drink water! 💧" |
| Fitness | "Your workout is scheduled in 30 min" |
| Meditation | "3-min breathing exercise?" |
| Period | "Your period is expected in 3 days" |
| AI Recommendation | "Maya has a tip for you today" |
| System | App updates, sync status |

### Notification State
- Stored in `notifications[]`
- `MARK_NOTIFICATION_READ` action
- `ADD_NOTIFICATION` action
- Bell icon on Home and Profile shows red dot when unread

---

## 24. Rewards & Streaks

> **Status:** Partially built (streak display on Home + Profile); full Rewards screen planned.

### Streak Types
| Type | Tracked By |
|---|---|
| Water | Daily water goal completion |
| Fitness | Daily workout completion |
| Meditation | Daily meditation session |
| Mood Tracking | Daily mood log |
| Period Logging | Consistent cycle logging |

### Streak State
- `streak.current` — current active streak (days)
- `streak.longest` — all-time longest streak
- `streak.lastActivity` — ISO date string
- Updated via `UPDATE_STREAK` dispatch

### Badges
| Badge | Trigger |
|---|---|
| Hydration Queen 💧 | 7-day water streak |
| Fitness Star 🏋️ | 7-day workout streak |
| Meditation Master 🧘 | 7-day meditation streak |
| Cycle Expert 🌸 | 3 months of consistent logging |
| Consistency Champion 🔥 | 30-day wellness streak |

---

## 25. Settings

> **Status:** Directory exists; screens not yet built.

### Account
- Edit profile
- Change password
- Delete account

### Privacy
- Consent management
- Data export
- Data removal request

### Notifications
- Toggle categories (water, fitness, meditation, period, AI)
- Reminder timing preferences

### AI Settings
- Maya personality mode
- Voice selection (if voice assistant enabled)
- Response style (brief vs detailed)

### App Preferences
- Dark mode toggle (planned)
- Units (metric / imperial)
- Language

---

## 26. State Management

The app uses a single `AppContext` (React Context + `useReducer`) for all global state. Data is persisted to `AsyncStorage` on every state change and restored on app launch.

### Key Dispatch Actions

| Action | Payload | Effect |
|---|---|---|
| `SET_ONBOARDED` | boolean | Marks onboarding complete |
| `SET_AUTHENTICATED` | boolean | Sets login status |
| `SET_USER` | User object | Stores user profile |
| `ADD_WATER_LOG` | WaterLog | Appends hydration entry |
| `SET_WATER_GOAL` | number (ml) | Updates daily water target |
| `ADD_MOOD` | MoodEntry | Appends mood log |
| `ADD_SYMPTOM` | SymptomEntry | Appends symptom log |
| `UPDATE_STREAK` | Streak | Updates streak counters |
| `ADD_BADGE` | Badge | Unlocks a badge |
| `ADD_NOTIFICATION` | Notification | Adds to notification list |
| `MARK_NOTIFICATION_READ` | string (id) | Marks notification as read |
| `ADD_CHAT_MESSAGE` | ChatMessage | Appends to Maya chat history |
| `SET_STEPS` | number | Updates today's step count |
| `SET_CYCLE_DAY` | number | Updates current cycle day |
| `SET_PERIOD_DATA` | PeriodData | Stores cycle configuration |
| `SET_FITNESS_GOALS` | string[] | Updates fitness goal selections |
| `SET_WELLNESS_PREFERENCES` | string[] | Updates wellness preference selections |
| `COMPLETE_WORKOUT` | Workout | Logs a completed workout |
| `RESTORE_STATE` | Partial<AppState> | Hydrates state from AsyncStorage |

---

## 27. Security

| Requirement | Status |
|---|---|
| JWT Authentication | Planned (backend) |
| Refresh Token Rotation | Planned |
| Password Hashing (bcrypt) | Planned (backend) |
| Biometric Login (FaceID / TouchID) | Planned |
| HTTPS for all API calls | Required |
| Encrypted storage for sensitive data | Planned |
| Secure token storage (react-native-keychain) | Planned |
| Input validation and sanitization | Required |

---

## 28. Analytics & Success Metrics

### Key Metrics to Track

| Metric | Target |
|---|---|
| Day 1 Retention | > 50% |
| Day 30 Retention | > 20% |
| Average Session Duration | > 8 minutes |
| Workout Completion Rate | > 60% |
| Water Goal Completion | > 50% |
| AI (Maya) Engagement Rate | > 40% |
| Meditation Usage | > 30% |
| Cycle Tracking Consistency | > 60% |

### Events to Track
- Onboarding step completions
- Feature screen opens
- Water intake logs
- Mood logs
- Workout starts / completions
- Maya chat sessions
- Streak milestones
- Badge unlocks

---

## 29. MVP Scope

### Included in MVP

| Feature | Built |
|---|---|
| Splash Screen | ✅ |
| Onboarding (6 screens) | ✅ |
| Login / Sign Up / Forgot Password | ✅ |
| Home Dashboard (all 7 widgets) | ✅ |
| Period & Cycle Calendar | ✅ |
| Fitness Screen | ✅ |
| Water Tracker (full) | ✅ |
| Step Tracker | ✅ |
| Maya AI Coach Screen | ✅ |
| Profile Screen | ✅ |
| Global state + AsyncStorage persistence | ✅ |
| Custom Bottom Tab Bar with Maya avatar | ✅ |

### Remaining to Build (MVP)

| Feature | Priority |
|---|---|
| Settings Screen | High |
| Notifications Center + Local Push Notifications | High |
| Rewards & Badges Screen | Medium |
| Meditation Module | Medium |
| Voice Assistant (Maya) | Low |
| Edit Profile Screen | High |
| Backend API + Real Auth (JWT) | High |

### Explicitly Out of MVP Scope

- Community / Social Features
- Marketplace
- TeleMedicine / Doctor Consultations
- Pregnancy Tracking
- Nutrition Tracking
- Subscription / In-App Purchases
- Wearable Integration (Apple Watch, Fitbit)

---

## 30. Future Roadmap

### Phase 2
- Pregnancy tracking module
- Nutrition and meal logging
- Sleep tracking integration
- Wearable integration (Apple Health, Google Fit, Fitbit)
- Community features (forums, challenges)
- Telehealth / doctor consultations

### Phase 3
- AI-generated monthly health reports
- Personalized wellness plans (Maya generates a weekly plan)
- Marketplace (supplements, wellness products)
- Premium subscription tier
- Women's health ecosystem (partner integrations)
- Multi-language support
- Menopause tracking module

---

*End of Document*

