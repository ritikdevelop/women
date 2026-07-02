// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Svg, { Path } from 'react-native-svg';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import Colors from '../../theme/colors';
// import type { MainStackParamList } from '../../navigation/AppNavigator';
// import type { WorkoutData, WorkoutSection } from './FitnessScreen';

// // ─── Icons ────────────────────────────────────────────────────────────────────

// const BackIcon = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M15 18l-6-6 6-6"
//       stroke={Colors.textPrimary}
//       strokeWidth={2.2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const HeartOutlineIcon = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
//       stroke={Colors.primaryPink}
//       strokeWidth={1.8}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const PlayIcon = () => (
//   <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
//     <Path d="M10 7l14 8-14 8V7z" fill="#FFFFFF" />
//   </Svg>
// );

// const ChevronRightIcon = () => (
//   <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M9 6l6 6-6 6"
//       stroke={Colors.textSecondary}
//       strokeWidth={2.2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // ─── Stat Item ────────────────────────────────────────────────────────────────

// interface StatItemProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }

// const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
//   <View style={styles.statItem}>
//     <View style={styles.statIconBox}>{icon}</View>
//     <View>
//       <Text style={styles.statLabel}>{label}</Text>
//       <Text style={styles.statValue}>{value}</Text>
//     </View>
//   </View>
// );

// // ─── What's Inside Row ────────────────────────────────────────────────────────

// interface SectionRowProps {
//   icon: string;
//   label: string;
//   duration: string;
//   onPress?: () => void;
// }

// const SectionRow: React.FC<SectionRowProps> = ({
//   icon,
//   label,
//   duration,
//   onPress,
// }) => (
//   <TouchableOpacity
//     style={styles.sectionRow}
//     activeOpacity={0.85}
//     onPress={onPress}
//     accessibilityRole="button"
//     accessibilityLabel={`${label}, ${duration}`}
//   >
//     <View style={styles.sectionIconBox}>
//       <Text style={styles.sectionIcon}>{icon}</Text>
//     </View>
//     <Text style={styles.sectionLabel}>{label}</Text>
//     <Text style={styles.sectionDuration}>{duration}</Text>
//     <ChevronRightIcon />
//   </TouchableOpacity>
// );

// // ─── Main Screen ──────────────────────────────────────────────────────────────

// type WorkoutDetailsRouteProp = RouteProp<MainStackParamList, 'WorkoutDetails'>;

// const FitnessDetailsScreen: React.FC = () => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<MainStackParamList>>();
//   const route = useRoute<WorkoutDetailsRouteProp>();
//   const workout = route.params.workout;

//   const handleBack = () => navigation.goBack();
//   const handleStart = () => {
//     // Navigate to workout exercise screen or start workout flow
//     console.log('Start workout');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

//       {/* ── Header ── */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.iconBtn}
//           onPress={handleBack}
//           activeOpacity={0.7}
//           accessibilityRole="button"
//           accessibilityLabel="Go back"
//         >
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Workout Details</Text>
//         <TouchableOpacity
//           style={styles.iconBtn}
//           activeOpacity={0.7}
//           accessibilityRole="button"
//           accessibilityLabel="Add to favorites"
//         >
//           <HeartOutlineIcon />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* ── Workout Image Card ── */}
//         <View style={styles.imageCard}>
//           {/* Character illustration */}
//           <View style={styles.imageAreaInner}>
//             <Text style={styles.workoutCharEmoji}>🧘‍♀️</Text>
//           </View>

//           {/* Duration badge top-right */}
//           <View style={styles.durationBadge}>
//             <Text style={styles.durationBadgeText}>{workout.duration}</Text>
//           </View>

//           {/* Large play button centered */}
//           <TouchableOpacity
//             style={styles.largePlayBtn}
//             activeOpacity={0.85}
//             accessibilityRole="button"
//             accessibilityLabel="Play workout video"
//           >
//             <PlayIcon />
//           </TouchableOpacity>
//         </View>

//         {/* ── Title & Level ── */}
//         <View style={styles.titleRow}>
//           <Text style={styles.workoutTitle}>{workout.title}</Text>
//           <View style={styles.levelBadge}>
//             <Text style={styles.levelBadgeText}>{workout.level}</Text>
//           </View>
//         </View>

//         {/* ── Rating ── */}
//         <View style={styles.ratingRow}>
//           <Text style={styles.starIcon}>⭐</Text>
//           <Text style={styles.ratingText}>
//             {workout.rating} ({workout.reviews})
//           </Text>
//         </View>

//         {/* ── Description ── */}
//         <Text style={styles.description}>
//           A complete fat burn workout to help you lose weight and improve
//           overall fitness.
//         </Text>

//         {/* ── Stats Row ── */}
//         <View style={styles.statsRow}>
//           <StatItem
//             icon={
//               <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
//                 <Path
//                   d="M12 2v20M17 12H7"
//                   stroke="#B89CFF"
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                 />
//               </Svg>
//             }
//             label="Duration"
//             value={workout.duration}
//           />
//           <StatItem
//             icon={
//               <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
//                 <Path
//                   d="M8.5 14.5l2.5 2.5 4.5-4.5M12 2a9.67 9.67 0 00-9 6 9.67 9.67 0 0018 0 9.67 9.67 0 00-9-6z"
//                   stroke="#F6C667"
//                   strokeWidth={1.8}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </Svg>
//             }
//             label="Calories"
//             value={workout.calories}
//           />
//           <StatItem
//             icon={
//               <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
//                 <Path
//                   d="M3 12h2"
//                   stroke="#B89CFF"
//                   strokeWidth={2.2}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M5 9v6"
//                   stroke="#B89CFF"
//                   strokeWidth={2.8}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M7 10.5v3"
//                   stroke="#B89CFF"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M7 12h10"
//                   stroke="#B89CFF"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M17 10.5v3"
//                   stroke="#B89CFF"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M19 9v6"
//                   stroke="#B89CFF"
//                   strokeWidth={2.8}
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d="M19 12h2"
//                   stroke="#B89CFF"
//                   strokeWidth={2.2}
//                   strokeLinecap="round"
//                 />
//               </Svg>
//             }
//             label="Exercises"
//             value={`${workout.exercises}`}
//           />
//         </View>

//         {/* ── What's Inside ── */}
//         <Text style={styles.sectionTitle}>What's Inside</Text>

//         {workout.sections.map((section: WorkoutSection, idx: number) => (
//           <SectionRow
//             key={idx}
//             icon={section.icon}
//             label={section.name}
//             duration={section.duration}
//           />
//         ))}

//         {/* Bottom spacer for button */}
//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* ── Start Workout Button (Fixed at bottom) ── */}
//       <View style={styles.buttonArea}>
//         <TouchableOpacity
//           style={styles.startBtn}
//           activeOpacity={0.9}
//           onPress={handleStart}
//           accessibilityRole="button"
//           accessibilityLabel="Start workout"
//         >
//           <Text style={styles.startBtnText}>Start Workout</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default FitnessDetailsScreen;

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: Colors.background },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 8,
//     paddingBottom: 12,
//   },
//   headerTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: Colors.textPrimary,
//   },
//   iconBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//   },

//   // Image Card
//   imageCard: {
//     backgroundColor: '#FFF0F6',
//     borderRadius: 22,
//     height: 220,
//     marginBottom: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   imageAreaInner: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   workoutCharEmoji: {
//     fontSize: 140,
//   },
//   durationBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   durationBadgeText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: Colors.textPrimary,
//   },
//   largePlayBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: Colors.primaryPink,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: Colors.primaryPink,
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     elevation: 8,
//   },

//   // Title & Level
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   workoutTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: Colors.textPrimary,
//     letterSpacing: -0.5,
//     flex: 1,
//   },
//   levelBadge: {
//     backgroundColor: Colors.primaryPink,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     marginLeft: 8,
//   },
//   levelBadgeText: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },

//   // Rating
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   starIcon: {
//     fontSize: 16,
//     marginRight: 4,
//   },
//   ratingText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: Colors.textPrimary,
//   },

//   // Description
//   description: {
//     fontSize: 14,
//     color: Colors.textSecondary,
//     lineHeight: 21,
//     marginBottom: 18,
//   },

//   // Stats
//   statsRow: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 22,
//     shadowColor: Colors.primaryPink,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.07,
//     shadowRadius: 8,
//     elevation: 3,
//     gap: 18,
//   },
//   statItem: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   statIconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 12,
//     backgroundColor: '#F8F4FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   statLabel: {
//     fontSize: 11,
//     color: Colors.textSecondary,
//     fontWeight: '400',
//     marginBottom: 1,
//   },
//   statValue: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: Colors.textPrimary,
//   },

//   // Section
//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: Colors.textPrimary,
//     marginBottom: 12,
//   },
//   sectionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 10,
//     shadowColor: Colors.primaryPink,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   sectionIconBox: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: '#FFF0F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   sectionIcon: {
//     fontSize: 22,
//   },
//   sectionLabel: {
//     flex: 1,
//     fontSize: 15,
//     fontWeight: '700',
//     color: Colors.textPrimary,
//   },
//   sectionDuration: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: Colors.textSecondary,
//     marginRight: 8,
//   },

//   // Start Button
//   buttonArea: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: Colors.background,
//     borderTopWidth: 1,
//     borderTopColor: Colors.border,
//   },
//   startBtn: {
//     backgroundColor: Colors.primaryPink,
//     borderRadius: 22,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: Colors.primaryPink,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   startBtnText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.3,
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FitnessDetailsScreen = () => {
  return (
    <View>
      <Text>FitnessDetailsScreen</Text>
    </View>
  )
}

export default FitnessDetailsScreen

const styles = StyleSheet.create({})