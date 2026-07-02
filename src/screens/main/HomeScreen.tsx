import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../theme/colors';
import type { MainStackParamList } from '../../navigation/AppNavigator';
import { useApp } from '../../context/AppContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DURATION = 400;
const SPRING_CONFIG = { damping: 12, stiffness: 180 };

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  bgColor?: string;
  children?: React.ReactNode;
  delay?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  color,
  bgColor = '#F0E6EB',
  children,
  delay = 0,
}) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withDelay(
      delay,
      withTiming(progress, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, delay, animatedProgress]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90, ${cx}, ${cy})`}
          animatedProps={animatedCircleProps}
        />
      </Svg>
      {children}
    </View>
  );
};

const DottedArc: React.FC = () => {
  const dots = 10;
  const r = 30;
  const cx = 36;
  const cy = 36;
  const startAngle = -90;
  const totalAngle = 180;
  const activeCount = 7;
  return (
    <Svg width={72} height={72}>
      {Array.from({ length: dots }).map((_, i) => {
        const angle = startAngle + (totalAngle / (dots - 1)) * i;
        const rad = (angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const dotR = i === activeCount - 1 ? 5 : 3.5;
        return (
          <Circle
            key={i}
            cx={x}
            cy={y}
            r={dotR}
            fill={i < activeCount ? Colors.primaryPink : '#F0D0DC'}
          />
        );
      })}
    </Svg>
  );
};

const BellIcon = () => (
  <View style={styles.bellWrapper}>
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
    <View style={styles.bellDot} />
  </View>
);

const MOODS = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😔', label: 'Sad' },
];

interface MoodButtonProps {
  emoji: string;
  mood: string;
  isSelected: boolean;
  onPress: () => void;
}
const MoodButton: React.FC<MoodButtonProps> = ({
  emoji,
  mood,
  isSelected,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.25, { damping: 6, stiffness: 300 }),
      withSpring(1.0, SPRING_CONFIG),
    );
    onPress();
  };
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.moodButton, isSelected && styles.moodButtonActive]}
      activeOpacity={0.8}
      accessibilityLabel={`${mood} mood`}
      accessibilityRole="button"
      accessibilityHint="Double tap to track mood"
    >
      <Animated.View style={animStyle}>
        <Text style={styles.moodEmoji}>{emoji}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AnimatedStepsCounter: React.FC = () => {
  const [displayed, setDisplayed] = useState(0);
  const target = 7834;
  useEffect(() => {
    let start: number | null = null;
    const duration = 1000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const fraction = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - fraction, 3);
      setDisplayed(Math.round(eased * target));
      if (fraction < 1) requestAnimationFrame(step);
    };
    const timer = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(timer);
  }, []);
  return <Text style={styles.stepsValue}>{displayed.toLocaleString()}</Text>;
};

const HomeScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number>(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { state } = useApp();
  const userName = state.user?.name ?? 'there';

  const greetingOpacity = useSharedValue(0);
  const greetingTranslateY = useSharedValue(18);
  const cycleCardScale = useSharedValue(0.96);
  const cycleCardOpacity = useSharedValue(0);
  const flamePulse = useSharedValue(1);

  useEffect(() => {
    greetingOpacity.value = withDelay(
      100,
      withTiming(1, { duration: DURATION, easing: Easing.out(Easing.quad) }),
    );
    greetingTranslateY.value = withDelay(
      100,
      withTiming(0, { duration: DURATION, easing: Easing.out(Easing.quad) }),
    );
    cycleCardOpacity.value = withDelay(
      200,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.quad) }),
    );
    cycleCardScale.value = withDelay(200, withSpring(1, SPRING_CONFIG));
    flamePulse.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1.18, { duration: 500, easing: Easing.inOut(Easing.sin) }),
          withTiming(1.0, { duration: 500, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const greetingStyle = useAnimatedStyle(() => ({
    opacity: greetingOpacity.value,
    transform: [{ translateY: greetingTranslateY.value }],
  }));
  const cycleCardStyle = useAnimatedStyle(() => ({
    opacity: cycleCardOpacity.value,
    transform: [{ scale: cycleCardScale.value }],
  }));
  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flamePulse.value }],
  }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Animated.View style={greetingStyle}>
            <View style={styles.greetingRow}>
              <Text style={styles.greetingText}>Good Morning, {userName} </Text>
              <Text style={styles.greetingEmoji}>🌸</Text>
            </View>
            <Text style={styles.dateText}>Monday, 20 May</Text>
          </Animated.View>
          <BellIcon />
        </View>

        <Animated.View style={[cycleCardStyle, styles.cycleBannerOuter]}>
          <LinearGradient
            colors={['#EE4D85', '#F87CAD', '#FBAECC', '#FBAECC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.cycleBanner}
          >
            <View style={styles.cyclePeachBlob} />
            <View style={styles.cycleTopRow}>
              <View style={styles.cycleStatBlock}>
                <Text style={styles.cycleStatLabel}>Cycle Day</Text>
                <Text style={styles.cycleStatNumber}>12</Text>
              </View>
              <View style={styles.cycleDivider} />
              <View style={styles.cycleStatBlock}>
                <Text style={styles.cycleStatLabel}>Ovulation in</Text>
                <Text style={styles.cycleStatNumber}>2 Days</Text>
              </View>
            </View>
            <View style={styles.cycleBottomRow}>
              <Text style={styles.cycleSubtext} numberOfLines={1}>
                You're in your fertile window
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.statsRow}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitlePink}>Period</Text>
            <Text style={styles.cardSubtitle}>Next Period in</Text>
            <Text style={styles.cardValueLarge}>5 Days</Text>
            <View style={styles.dottedArcContainer}>
              <DottedArc />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.card, styles.halfCard]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('WaterTracker')}
            accessibilityLabel="Water tracker, 60% of goal"
            accessibilityRole="button"
          >
            <Text style={styles.cardTitleBlue}>Water</Text>
            <View style={styles.waterRow}>
              <View>
                <Text style={styles.waterValue}>1.8</Text>
                <Text style={styles.waterGoal}>/ 3 L</Text>
                <Text style={styles.waterDropEmoji}>💧</Text>
              </View>
              <CircularProgress
                size={58}
                strokeWidth={6}
                progress={0.6}
                color="#4FC3F7"
                bgColor="#E3F4FD"
                delay={300}
              >
                <Text style={styles.progressLabel}>60%</Text>
              </CircularProgress>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity
            style={[styles.card, styles.halfCard]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('StepTracker')}
            accessibilityLabel="Step tracker"
            accessibilityRole="button"
          >
            <Text style={styles.cardTitleGray}>Steps</Text>
            <View style={styles.stepsRow}>
              <View>
                <AnimatedStepsCounter />
                <Text style={styles.stepsGoal}>/ 10,000</Text>
              </View>
              <CircularProgress
                size={58}
                strokeWidth={6}
                progress={0.78}
                color="#4CAF50"
                bgColor="#E8F5E9"
                delay={350}
              >
                <Text style={styles.stepsEmoji}>👟</Text>
              </CircularProgress>
            </View>
          </TouchableOpacity>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitleGray}>Workout</Text>
            <Text style={styles.cardSubtitle}>Today's Progress</Text>
            <View style={styles.workoutRow}>
              <Text style={styles.workoutValue}>68%</Text>
              <CircularProgress
                size={58}
                strokeWidth={6}
                progress={0.68}
                color="#FF9800"
                bgColor="#FFF3E0"
                delay={400}
              >
                <Animated.Text style={[styles.fireEmoji, flameStyle]}>
                  🔥
                </Animated.Text>
              </CircularProgress>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.fullCard]}>
          <View style={styles.moodHeader}>
            <View>
              <Text style={styles.cardTitleGrayBold}>Mood</Text>
              <Text style={styles.cardSubtitle}>How are you feeling?</Text>
            </View>
            <Text style={styles.moodLambda}>λ</Text>
          </View>
          <View style={styles.moodRow}>
            {MOODS.map((mood, index) => (
              <MoodButton
                key={index}
                emoji={mood.emoji}
                mood={mood.label}
                isSelected={selectedMood === index}
                onPress={() => setSelectedMood(index)}
              />
            ))}
          </View>
        </View>

        <View style={[styles.card, styles.fullCard, styles.insightCard]}>
          <View style={styles.insightContent}>
            <View style={styles.insightLeft}>
              <Text style={styles.insightTitle}>Maya's Insight</Text>
              <Text style={styles.insightText}>
                Your energy levels are likely to be high today. Great day for
                strength training!
              </Text>
            </View>
            <Image
              source={require('../../assets/welcome.png')}
              style={styles.insightAvatar}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={[styles.card, styles.fullCard, styles.motivationCard]}>
          <View style={styles.motivationContent}>
            <View style={styles.motivationLeft}>
              <Text style={styles.motivationTitle}>Daily Motivation</Text>
              <Text style={styles.motivationText}>
                Small steps every day{'\n'}create big results.
              </Text>
            </View>
            <Text style={styles.motivationFlower}>🌸</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.streakRow}
          activeOpacity={0.8}
          accessibilityLabel="12 Day Wellness Streak"
          accessibilityRole="button"
        >
          <View style={styles.streakLeft}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakText}>12 Day Wellness Streak</Text>
          </View>
          <Text style={styles.streakArrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 110 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 16,
  },
  greetingRow: { flexDirection: 'row', alignItems: 'center' },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  greetingEmoji: { fontSize: 20 },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '400',
  },
  bellWrapper: {
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
    elevation: 3,
    marginTop: 4,
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryPink,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  cycleBannerOuter: { marginBottom: 12, marginTop: 5 },
  cycleBanner: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    overflow: 'hidden',
    minHeight: 120,
  },
  cyclePeachBlob: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FBAECC',
    top: -60,
    right: -30,
  },
  cycleTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  cycleStatBlock: { flex: 1 },
  cycleStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '500',
    marginBottom: 2,
  },
  cycleStatNumber: {
    fontSize: 35,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 44,
  },
  cycleDivider: {
    width: 1.2,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginHorizontal: 18,
  },
  cycleBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 76,
  },
  cycleSubtext: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  halfCard: { flex: 1 },
  fullCard: { marginBottom: 12 },
  cardTitlePink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryPink,
    marginBottom: 2,
  },
  cardTitleBlue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4FC3F7',
    marginBottom: 4,
  },
  cardTitleGray: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardTitleGrayBold: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardSubtitle: { fontSize: 11, color: Colors.textSecondary, marginBottom: 4 },
  cardValueLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginTop: 4,
  },
  dottedArcContainer: { position: 'absolute', right: 6, bottom: 10 },
  waterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  waterValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  waterGoal: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500' },
  waterDropEmoji: { fontSize: 16, marginTop: 4 },
  progressLabel: { fontSize: 12, fontWeight: '700', color: '#4FC3F7' },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  stepsValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  stepsGoal: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  stepsEmoji: { fontSize: 20 },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  workoutValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  fireEmoji: { fontSize: 20 },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moodLambda: { fontSize: 18, color: Colors.textSecondary, fontWeight: '400' },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonActive: {
    backgroundColor: Colors.lavender,
    shadowColor: Colors.lavender,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  moodEmoji: { fontSize: 26 },
  insightCard: {
    backgroundColor: '#FFF0F6',
    borderWidth: 1,
    borderColor: '#FFD6E8',
  },
  insightContent: { flexDirection: 'row', alignItems: 'center' },
  insightLeft: { flex: 1, paddingRight: 8 },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryPink,
    marginBottom: 6,
  },
  insightText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  insightAvatar: { width: 70, height: 70, borderRadius: 35 },
  motivationCard: {
    backgroundColor: '#FFF5F9',
    borderWidth: 1,
    borderColor: '#FFD6E8',
  },
  motivationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  motivationLeft: { flex: 1 },
  motivationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryPink,
    marginBottom: 4,
  },
  motivationText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  motivationFlower: { fontSize: 48, opacity: 0.7 },
  streakRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streakFire: { fontSize: 22 },
  streakText: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  streakArrow: { fontSize: 22, color: Colors.textSecondary, fontWeight: '300' },
});
