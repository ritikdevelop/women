import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../theme/colors';
import type { MainStackParamList } from '../../navigation/AppNavigator';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface RingProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
}
const RingProgress: React.FC<RingProgressProps> = ({
  size,
  strokeWidth,
  progress,
}) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <Svg width={size} height={size}>
      <Defs>
        <SvgLinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#5BB8F5" />
          <Stop offset="100%" stopColor="#A8C8FF" />
        </SvgLinearGradient>
      </Defs>
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="#DCE9FB"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircle
        cx={cx}
        cy={cy}
        r={r}
        stroke="url(#ringGrad)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeLinecap="round"
        transform={`rotate(-90, ${cx}, ${cy})`}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};

const WaveSVG: React.FC = () => (
  <Svg width="100%" height={48} viewBox="0 0 260 48" preserveAspectRatio="none">
    <Defs>
      <SvgLinearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#A8D8F8" stopOpacity="0.7" />
        <Stop offset="100%" stopColor="#D0ECFF" stopOpacity="0.3" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M0 28 C40 16, 80 40, 130 26 C180 12, 220 36, 260 22 L260 48 L0 48 Z"
      fill="#BDD9F5"
      opacity={0.45}
    />
    <Path
      d="M0 34 C50 22, 90 44, 140 30 C190 16, 230 38, 260 28 L260 48 L0 48 Z"
      fill="url(#waveGrad)"
    />
  </Svg>
);

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={Colors.textPrimary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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

interface QuickAddButtonProps {
  label: string;
  ml: number;
  onPress: () => void;
}
const QuickAddButton: React.FC<QuickAddButtonProps> = ({
  label,
  ml,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.93, { damping: 8, stiffness: 300 }),
      withSpring(1.0, { damping: 10, stiffness: 300 }),
    );
    onPress();
  };
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityLabel={`Add ${label}`}
      accessibilityRole="button"
    >
      <Animated.View style={[styles.quickAddBtn, animStyle]}>
        <Text style={styles.quickAddText}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const GOAL_L = 3;
const QUICK_AMOUNTS = [
  { label: '+100ml', ml: 100 },
  { label: '+250ml', ml: 250 },
  { label: '+500ml', ml: 500 },
  { label: '+1L', ml: 1000 },
];

const WaterTrackerScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [intakeMl, setIntakeMl] = useState(1800);
  const goalMl = GOAL_L * 1000;
  const progress = Math.min(intakeMl / goalMl, 1);
  const intakeL = (intakeMl / 1000).toFixed(1);
  const percent = Math.round(progress * 100);
  const handleAdd = (ml: number) =>
    setIntakeMl(prev => Math.min(prev + ml, goalMl));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8FF" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIconBtn}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Today</Text>
          <TouchableOpacity
            style={styles.headerIconBtn}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <BellIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.ringContainer}>
          <RingProgress size={230} strokeWidth={18} progress={progress} />
          <View style={styles.ringInner}>
            <View style={styles.percentRow}>
              <Text style={styles.percentValue}>{percent}</Text>
              <Text style={styles.percentSign}>%</Text>
            </View>
            <Text style={styles.intakeText}>
              {intakeL} / {GOAL_L} L
            </Text>
            <Text style={styles.intakeLabel}>Water Intake</Text>
            <View style={styles.waveContainer}>
              <WaveSVG />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <View style={styles.quickAddRow}>
            {QUICK_AMOUNTS.map(item => (
              <QuickAddButton
                key={item.label}
                label={item.label}
                ml={item.ml}
                onPress={() => handleAdd(item.ml)}
              />
            ))}
          </View>
        </View>

        <View style={styles.reminderRow}>
          <View>
            <Text style={styles.reminderTitle}>Reminder</Text>
            <Text style={styles.reminderSubtitle}>Every 1 Hour</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            accessibilityLabel="Edit reminder"
            accessibilityRole="button"
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WaterTrackerScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F8FF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 20,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  ringContainer: {
    width: 230,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  ringInner: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#EEF5FF',
  },
  percentRow: { flexDirection: 'row', alignItems: 'flex-start' },
  percentValue: {
    fontSize: 52,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 58,
    letterSpacing: -2,
  },
  percentSign: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 12,
    marginLeft: 2,
  },
  intakeText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  intakeLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 4,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
  },
  section: { width: '100%', marginBottom: 28 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  quickAddRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: '#DDE9F8',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6EB0F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  quickAddText: { fontSize: 13, fontWeight: '600', color: '#4A90D9' },
  reminderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#6EB0F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  reminderSubtitle: { fontSize: 13, color: Colors.textSecondary },
  editBtn: {
    backgroundColor: '#DDE9F8',
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  editBtnText: { fontSize: 14, fontWeight: '700', color: '#4A90D9' },
});
