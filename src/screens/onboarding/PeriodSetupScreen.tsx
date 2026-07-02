import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Colors from '../../theme/colors';
import CustomDatePicker from '../../components/CustomDatePicker';

const { width, height } = Dimensions.get('window');

interface PeriodSetupScreenProps {
  onNext: (data: {
    lastPeriodDate: string;
    cycleLength: number;
    periodLength: number;
  }) => void;
  initialData?: any;
}

// ─── Floating Orb ────────────────────────────────────────────────────────────
const FloatingOrb = ({
  color,
  size,
  style,
  delay,
}: {
  color: string;
  size: number;
  style: any;
  delay: number;
}) => {
  const float = useSharedValue(0);

  useEffect(() => {
    float.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-10, { duration: 2200 }),
          withTiming(0, { duration: 2200 }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: 0.18,
        },
        style,
        animStyle,
      ]}
    />
  );
};

// ─── Cycle Phase Pill ─────────────────────────────────────────────────────────
const CyclePhasePill = ({
  label,
  emoji,
  color,
  delay,
}: {
  label: string;
  emoji: string;
  color: string;
  delay: number;
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 14, stiffness: 90 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.phasePill, animStyle]}>
      <View style={[styles.phasePillDot, { backgroundColor: color }]} />
      <Text style={styles.phasePillEmoji}>{emoji}</Text>
      <Text style={styles.phasePillLabel}>{label}</Text>
    </Animated.View>
  );
};

// ─── Stepper ──────────────────────────────────────────────────────────────────
const Stepper = ({
  label,
  sublabel,
  value,
  unit,
  min,
  max,
  color,
  onDecrement,
  onIncrement,
  delay,
}: {
  label: string;
  sublabel: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  color: string;
  onDecrement: () => void;
  onIncrement: () => void;
  delay: number;
}) => {
  const slideY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const progress = (value - min) / (max - min);

  useEffect(() => {
    slideY.value = withDelay(delay, withSpring(0, { damping: 16, stiffness: 90 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideY.value }],
    opacity: opacity.value,
  }));

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <Animated.View style={[styles.stepperCard, animStyle]}>
      <View style={styles.stepperHeader}>
        <View>
          <Text style={styles.stepperLabel}>{label}</Text>
          <Text style={styles.stepperSublabel}>{sublabel}</Text>
        </View>
        <View style={[styles.stepperBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.stepperBadgeText, { color }]}>
            {value} {unit}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.stepperTrack}>
        <LinearGradient
          colors={[color + 'AA', color]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.stepperFill, { width: `${Math.round(progress * 100)}%` }]}
        />
      </View>

      {/* Controls */}
      <View style={styles.stepperControls}>
        <TouchableOpacity
          style={[
            styles.stepperBtn,
            !canDecrement && styles.stepperBtnDisabled,
          ]}
          onPress={onDecrement}
          disabled={!canDecrement}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.stepperBtnText,
              { color: canDecrement ? color : Colors.border },
            ]}
          >
            −
          </Text>
        </TouchableOpacity>

        <View style={styles.stepperDots}>
          {Array.from({ length: 5 }).map((_, i) => {
            const dotActive = i / 4 <= progress;
            return (
              <View
                key={i}
                style={[
                  styles.stepperDot,
                  dotActive
                    ? { backgroundColor: color, width: 8, height: 8 }
                    : { backgroundColor: Colors.border },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.stepperBtn,
            !canIncrement && styles.stepperBtnDisabled,
          ]}
          onPress={onIncrement}
          disabled={!canIncrement}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.stepperBtnText,
              { color: canIncrement ? color : Colors.border },
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PeriodSetupScreen: React.FC<PeriodSetupScreenProps> = ({
  onNext,
  initialData,
}) => {
  const [lastPeriod, setLastPeriod] = useState(initialData?.lastPeriodDate || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cycleLength, setCycleLength] = useState(
    initialData?.cycleLength || 28,
  );
  const [periodLength, setPeriodLength] = useState(
    initialData?.periodLength || 5,
  );

  // Entry animations
  const headerY = useSharedValue(-40);
  const headerOpacity = useSharedValue(0);
  const dateCardY = useSharedValue(40);
  const dateCardOpacity = useSharedValue(0);

  useEffect(() => {
    headerY.value = withDelay(100, withSpring(0, { damping: 18, stiffness: 80 }));
    headerOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
    dateCardY.value = withDelay(300, withSpring(0, { damping: 16, stiffness: 80 }));
    dateCardOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
  }, []);

  const headerAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }],
    opacity: headerOpacity.value,
  }));

  const dateCardAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: dateCardY.value }],
    opacity: dateCardOpacity.value,
  }));

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (date: Date) => {
    setLastPeriod(formatDate(date));
  };

  const isValid = lastPeriod.length > 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Background decorative orbs */}
      <FloatingOrb color={Colors.primaryPink} size={180} style={{ top: -50, right: -60 }} delay={0} />
      <FloatingOrb color={Colors.lavender} size={130} style={{ top: height * 0.35, left: -50 }} delay={400} />
      <FloatingOrb color={Colors.fertility} size={100} style={{ bottom: 80, right: -30 }} delay={700} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Animated.View style={[styles.header, headerAnim]}>
          <LinearGradient
            colors={['#FFE0EE', '#F5EDFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconBubble}
          >
            <Text style={styles.iconEmoji}>🌸</Text>
          </LinearGradient>
          <Text style={styles.title}>Cycle Setup</Text>
          <Text style={styles.subtitle}>
            Tell us about your cycle so we can{'\n'}give you personalized insights
          </Text>
        </Animated.View>

        {/* ── Cycle Phase Pills ── */}
        <View style={styles.phaseRow}>
          <CyclePhasePill label="Period" emoji="🩸" color={Colors.period} delay={250} />
          <View style={styles.phaseConnector}>
            <LinearGradient
              colors={[Colors.period, Colors.fertility, Colors.ovulation, Colors.selfCare]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.phaseConnectorLine}
            />
          </View>
          <CyclePhasePill label="Fertile" emoji="🌿" color={Colors.fertility} delay={400} />
          <View style={styles.phaseConnector}>
            <LinearGradient
              colors={[Colors.fertility, Colors.ovulation]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.phaseConnectorLine}
            />
          </View>
          <CyclePhasePill label="Ovulation" emoji="✨" color={Colors.ovulation} delay={550} />
        </View>

        {/* ── Last Period Date ── */}
        <Animated.View style={dateCardAnim}>
          <TouchableOpacity
            style={styles.dateCard}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={
                lastPeriod
                  ? ['#FFF0F6', '#F8F0FF']
                  : ['#FFFFFF', '#FFFFFF']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dateCardGradient}
            >
              <View style={styles.dateCardLeft}>
                <LinearGradient
                  colors={['#FF8FB1', '#FF5F9E']}
                  style={styles.dateIconWrap}
                >
                  <Text style={styles.dateIcon}>📅</Text>
                </LinearGradient>
                <View style={styles.dateCardText}>
                  <Text style={styles.dateCardLabel}>Last Period Date</Text>
                  <Text
                    style={[
                      styles.dateCardValue,
                      !lastPeriod && styles.dateCardPlaceholder,
                    ]}
                  >
                    {lastPeriod || 'Tap to select date'}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.dateCardChevron,
                  lastPeriod && styles.dateCardChevronActive,
                ]}
              >
                <Text
                  style={{
                    color: lastPeriod ? Colors.primaryPink : Colors.textSecondary,
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  {lastPeriod ? '✓' : '›'}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Cycle & Period Length Steppers ── */}
        <Stepper
          label="Cycle Length"
          sublabel="Average days between periods"
          value={cycleLength}
          unit="days"
          min={21}
          max={45}
          color={Colors.primaryPink}
          onDecrement={() => setCycleLength((v: number) => Math.max(21, v - 1))}
          onIncrement={() => setCycleLength((v: number) => Math.min(45, v + 1))}
          delay={500}
        />

        <Stepper
          label="Period Length"
          sublabel="Average days your period lasts"
          value={periodLength}
          unit="days"
          min={2}
          max={10}
          color={Colors.lavender}
          onDecrement={() => setPeriodLength((v: number) => Math.max(2, v - 1))}
          onIncrement={() => setPeriodLength((v: number) => Math.min(10, v + 1))}
          delay={650}
        />

        {/* ── Info Tip ── */}
        <View style={styles.tip}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            Not sure? The average cycle is 28 days with a 5-day period. You can always update this later.
          </Text>
        </View>

        {/* ── Pagination + Button ── */}
        <View style={styles.footer}>
          <View style={styles.pagination}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  i === 3 && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.ctaWrap, !isValid && styles.ctaWrapDisabled]}
            onPress={() =>
              isValid &&
              onNext({
                lastPeriodDate: lastPeriod,
                cycleLength,
                periodLength,
              })
            }
            activeOpacity={0.85}
            disabled={!isValid}
          >
            <LinearGradient
              colors={isValid ? ['#FF8FB1', '#C97EFF'] : ['#D8D8D8', '#C8C8C8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Continue</Text>
              <Text style={styles.ctaArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        initialDate={
          lastPeriod
            ? new Date(
                parseInt(lastPeriod.split('/')[2]),
                parseInt(lastPeriod.split('/')[1]) - 1,
                parseInt(lastPeriod.split('/')[0]),
              )
            : new Date()
        }
      />
    </View>
  );
};

export default PeriodSetupScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: height * 0.07,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconBubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  iconEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },

  // Phase row
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  phasePill: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 3,
  },
  phasePillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phasePillEmoji: {
    fontSize: 14,
  },
  phasePillLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  phaseConnector: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  phaseConnectorLine: {
    flex: 1,
    borderRadius: 2,
  },

  // Date card
  dateCard: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  dateCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  dateCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dateIcon: {
    fontSize: 20,
  },
  dateCardText: {
    flex: 1,
  },
  dateCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  dateCardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  dateCardPlaceholder: {
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  dateCardChevron: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardChevronActive: {
    backgroundColor: '#FFE0EE',
  },

  // Stepper card
  stepperCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepperLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  stepperSublabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  stepperBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stepperBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  stepperTrack: {
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  stepperFill: {
    height: '100%',
    borderRadius: 3,
    minWidth: 8,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepperBtnDisabled: {
    opacity: 0.4,
  },
  stepperBtnText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  stepperDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepperDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
  },

  // Tip
  tip: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEA',
    borderRadius: 16,
    padding: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: 10,
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 16,
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
    fontWeight: '400',
  },

  // Footer
  footer: {
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 24,
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  paginationDotActive: {
    width: 22,
    backgroundColor: Colors.primaryPink,
    borderRadius: 4,
  },
  ctaWrap: {
    width: width - 44,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaWrapDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  cta: {
    flexDirection: 'row',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  ctaArrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
});
