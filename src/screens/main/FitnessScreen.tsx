import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Colors from '../../theme/colors';

const BellIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={Colors.textSecondary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type WorkoutCategory = 'All' | 'Yoga' | 'HIIT' | 'Strength' | 'Cardio';

const CATEGORIES: WorkoutCategory[] = [
  'All',
  'Yoga',
  'HIIT',
  'Strength',
  'Cardio',
];

interface WorkoutItem {
  emoji: string;
  title: string;
  duration: string;
  difficulty: string;
  category: WorkoutCategory;
}

const WORKOUTS: WorkoutItem[] = [
  {
    emoji: '🧘',
    title: 'Morning Yoga Flow',
    duration: '20 min',
    difficulty: 'Beginner',
    category: 'Yoga',
  },
  {
    emoji: '🏋️',
    title: 'Strength Training',
    duration: '45 min',
    difficulty: 'Intermediate',
    category: 'Strength',
  },
  {
    emoji: '🏃',
    title: 'Cardio Blast',
    duration: '30 min',
    difficulty: 'Beginner',
    category: 'Cardio',
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#7CCF8A',
  Intermediate: '#F6C667',
  Advanced: '#FF6BAA',
};

interface WorkoutCardProps {
  workout: WorkoutItem;
}
const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => (
  <TouchableOpacity
    style={styles.workoutCard}
    activeOpacity={0.8}
    accessibilityLabel={`${workout.title}, ${workout.duration}, ${workout.difficulty}`}
    accessibilityRole="button"
  >
    <View style={styles.workoutEmojiBox}>
      <Text style={styles.workoutEmoji}>{workout.emoji}</Text>
    </View>
    <View style={styles.workoutInfo}>
      <Text style={styles.workoutTitle}>{workout.title}</Text>
      <View style={styles.workoutMeta}>
        <Text style={styles.workoutDuration}>{workout.duration}</Text>
        <View
          style={[
            styles.difficultyBadge,
            {
              backgroundColor:
                DIFFICULTY_COLORS[workout.difficulty] ?? '#C4C4C4',
            },
          ]}
        >
          <Text style={styles.difficultyText}>{workout.difficulty}</Text>
        </View>
      </View>
    </View>
    <ChevronRightIcon />
  </TouchableOpacity>
);

const FitnessScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory>('All');
  const filteredWorkouts =
    activeCategory === 'All'
      ? WORKOUTS
      : WORKOUTS.filter(w => w.category === activeCategory);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fitness</Text>
        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
        >
          <BellIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={Colors.wellnessGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredCard}
        >
          <View style={styles.featuredDecorCircle} />
          <Text style={styles.featuredLabel}>Today's Featured Workout</Text>
          <Text style={styles.featuredTitle}>Full Body HIIT</Text>
          <Text style={styles.featuredMeta}>30 min • 320 kcal</Text>
          <TouchableOpacity
            style={styles.startBtn}
            activeOpacity={0.85}
            accessibilityLabel="Start Full Body HIIT workout"
            accessibilityRole="button"
          >
            <Text style={styles.startBtnText}>Start Workout</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryPill,
                activeCategory === cat && styles.categoryPillActive,
              ]}
              activeOpacity={0.8}
              accessibilityLabel={`${cat} category`}
              accessibilityRole="button"
              accessibilityState={{ selected: activeCategory === cat }}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.workoutList}>
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.title} workout={workout} />
          ))}
          {filteredWorkouts.length === 0 && (
            <Text style={styles.emptyText}>
              No workouts in this category yet.
            </Text>
          )}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FitnessScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredCard: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    overflow: 'hidden',
    minHeight: 170,
  },
  featuredDecorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -60,
    right: -40,
  },
  featuredLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 6,
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  featuredMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginBottom: 18,
  },
  startBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  startBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  categoriesScroll: { marginBottom: 20 },
  categoriesContent: { paddingHorizontal: 2, gap: 8 },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  categoryPillActive: {
    backgroundColor: Colors.primaryPink,
    borderColor: Colors.primaryPink,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTextActive: { color: '#FFFFFF' },
  workoutList: { gap: 12 },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutEmojiBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFF5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  workoutEmoji: { fontSize: 28 },
  workoutInfo: { flex: 1 },
  workoutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  workoutMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  workoutDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  difficultyBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  difficultyText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
