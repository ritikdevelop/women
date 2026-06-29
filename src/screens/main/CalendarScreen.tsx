import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Path,
  Circle,
  G,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import Colors from '../../theme/colors';

// ─── Types ────────────────────────────────────────────────────────────────────

type DayMark = 'period' | 'fertility' | 'ovulation' | 'pms' | 'selfcare' | 'today' | null;

interface DayData {
  day: number | null;
  mark: DayMark;
  isToday?: boolean;
  isOutside?: boolean;
}

// ─── Calendar Icon ────────────────────────────────────────────────────────────

const CalendarIconSvg = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
    />
    <Path
      d="M16 3v4M8 3v4M4 9h16"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M8 13h2M14 13h2M8 17h2"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

// ─── Period Tracker Icons ─────────────────────────────────────────────────────

const SymptomsIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
      fill={Colors.primaryPink}
    />
  </Svg>
);

const MoodIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={Colors.primaryPink} strokeWidth={1.8} fill="none" />
    <Path
      d="M8 14s1.5 2 4 2 4-2 4-2"
      stroke={Colors.primaryPink}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx="9" cy="10" r="1.2" fill={Colors.primaryPink} />
    <Circle cx="15" cy="10" r="1.2" fill={Colors.primaryPink} />
  </Svg>
);

const CrampIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 3.5L8 13 2 8.5h7.5z"
      stroke={Colors.primaryPink}
      strokeWidth={1.8}
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const NotesIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
      stroke={Colors.primaryPink}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      stroke={Colors.primaryPink}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path d="M9 12h6M9 16h4" stroke={Colors.primaryPink} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

// ─── Flower SVG ───────────────────────────────────────────────────────────────

const FlowerIcon = ({ size = 36 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <G>
      <Circle cx="30" cy="16" r="8" fill="#C19EFF" opacity="0.9" />
      <Circle cx="44" cy="23" r="8" fill="#C19EFF" opacity="0.9" />
      <Circle cx="44" cy="37" r="8" fill="#C19EFF" opacity="0.9" />
      <Circle cx="30" cy="44" r="8" fill="#C19EFF" opacity="0.9" />
      <Circle cx="16" cy="37" r="8" fill="#C19EFF" opacity="0.9" />
      <Circle cx="16" cy="23" r="8" fill="#C19EFF" opacity="0.9" />
    </G>
    <Circle cx="30" cy="30" r="9" fill="#F6A623" />
    <Circle cx="30" cy="30" r="5" fill="#F8C347" />
  </Svg>
);

// ─── Donut Progress Ring ──────────────────────────────────────────────────────

interface DonutRingProps {
  size: number;
  strokeWidth: number;
  progress: number;
}

const DonutRing: React.FC<DonutRingProps> = ({ size, strokeWidth, progress }) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Defs>
          <SvgLinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F87CAD" />
            <Stop offset="0.5" stopColor="#C99EFF" />
            <Stop offset="1" stopColor="#B89CFF" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx={cx} cy={cy} r={r} stroke="#F5E6F5" strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={cx} cy={cy} r={r}
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${cx}, ${cy}`}
        />
      </Svg>
      <FlowerIcon size={size * 0.52} />
    </View>
  );
};

// ─── Health Gauge ─────────────────────────────────────────────────────────────

interface GaugeProps {
  score: number;
  size: number;
}

const HealthGauge: React.FC<GaugeProps> = ({ score, size }) => {
  const strokeWidth = 9;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * r;
  const progress = score / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size / 2 + strokeWidth, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', top: 0 }}>
        <Defs>
          <SvgLinearGradient id="gaugeGrad" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor="#C5E87A" />
            <Stop offset="1" stopColor="#4CAF50" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          cx={cx} cy={cy} r={r}
          stroke="#E8F5E9" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={0}
          rotation={180} origin={`${cx}, ${cy}`}
        />
        <Circle
          cx={cx} cy={cy} r={r}
          stroke="url(#gaugeGrad)" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation={180} origin={`${cx}, ${cy}`}
        />
      </Svg>
    </View>
  );
};

// ─── Quick Action Button ──────────────────────────────────────────────────────

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.quickActionIcon}>{icon}</View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─── Phase Dot ────────────────────────────────────────────────────────────────

const PhaseDot = ({ color }: { color: string }) => (
  <View style={[styles.phaseDot, { backgroundColor: color }]} />
);

// ─── Calendar Data ────────────────────────────────────────────────────────────

const MAY_2024_WEEKS: DayData[][] = [
  [
    { day: 28, mark: null, isOutside: true },
    { day: 29, mark: null, isOutside: true },
    { day: 30, mark: null, isOutside: true },
    { day: 1,  mark: null },
    { day: 2,  mark: null },
    { day: 3,  mark: null },
    { day: 4,  mark: null },
  ],
  [
    { day: 5,  mark: null },
    { day: 6,  mark: null },
    { day: 7,  mark: 'fertility' },
    { day: 8,  mark: null },
    { day: 9,  mark: null },
    { day: 10, mark: null },
    { day: 11, mark: null },
  ],
  [
    { day: 12, mark: null },
    { day: 13, mark: null },
    { day: 14, mark: 'fertility' },
    { day: 15, mark: null },
    { day: 16, mark: null },
    { day: 17, mark: 'period' },
    { day: 18, mark: 'period' },
  ],
  [
    { day: 19, mark: null },
    { day: 20, mark: 'today', isToday: true },
    { day: 21, mark: null },
    { day: 22, mark: 'ovulation' },
    { day: 23, mark: null },
    { day: 24, mark: 'selfcare' },
    { day: 25, mark: null },
  ],
  [
    { day: 26, mark: 'period' },
    { day: 27, mark: null },
    { day: 28, mark: 'pms' },
    { day: 29, mark: null },
    { day: 30, mark: null },
    { day: 31, mark: null },
    { day: 1,  mark: null, isOutside: true },
  ],
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MARK_COLORS: Record<string, string> = {
  period:    Colors.primaryPink,
  fertility: Colors.lavender,
  ovulation: Colors.ovulation,
  pms:       Colors.wellnessEvent,
  selfcare:  Colors.selfCare,
  today:     Colors.primaryPink,
};

// ─── Day Cell ─────────────────────────────────────────────────────────────────

interface DayCellProps {
  data: DayData;
}

const DayCell: React.FC<DayCellProps> = ({ data }) => {
  if (data.day === null) return <View style={styles.dayCell} />;

  const isToday = data.isToday;
  const hasRing = data.mark === 'period' && !isToday;
  const hasBg = isToday;
  const isOvulation = data.mark === 'ovulation';
  const isPms = data.mark === 'pms';

  return (
    <View style={styles.dayCell}>
      <View
        style={[
          styles.dayCellInner,
          hasBg && { backgroundColor: Colors.primaryPink },
          hasRing && { borderWidth: 1.5, borderColor: Colors.primaryPink },
          isOvulation && { backgroundColor: Colors.lavender },
          isPms && { backgroundColor: Colors.wellnessEvent },
          data.mark === 'selfcare' && { borderWidth: 1.5, borderColor: Colors.selfCare },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            data.isOutside && styles.dayTextOutside,
            hasBg && styles.dayTextToday,
            (isOvulation || isPms) && { color: '#FFFFFF' },
          ]}
        >
          {data.day}
        </Text>
      </View>
    </View>
  );
};

// ─── CalendarScreen ───────────────────────────────────────────────────────────

const CalendarScreen: React.FC = () => {
  const [currentMonth] = useState('May 2024');
  const cardAnim = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 420,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 420,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <CalendarIconSvg />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Calendar Card ── */}
        <View style={styles.calendarCard}>
          <View style={styles.monthRow}>
            <TouchableOpacity style={styles.chevronBtn} activeOpacity={0.7}>
              <Text style={styles.chevron}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{currentMonth}</Text>
            <View style={styles.monthNavRight}>
              <TouchableOpacity style={styles.chevronBtn} activeOpacity={0.7}>
                <Text style={styles.chevron}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chevronBtn} activeOpacity={0.7}>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekRow}>
            {WEEK_DAYS.map(d => (
              <View key={d} style={styles.weekDayCell}>
                <Text style={styles.weekDayText}>{d}</Text>
              </View>
            ))}
          </View>

          {MAY_2024_WEEKS.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((day, di) => (
                <DayCell key={`${wi}-${di}`} data={day} />
              ))}
            </View>
          ))}
        </View>

        {/* ── Main Period Tracker Card ── */}
        <Animated.View
          style={[
            styles.mainCard,
            { opacity: cardAnim, transform: [{ translateY: cardSlide }] },
          ]}
        >
          {/* Phase Info + Donut Ring */}
          <View style={styles.phaseRow}>
            <View style={styles.phaseLeft}>
              <Text style={styles.currentPhaseLabel}>Current Phase</Text>
              <Text style={styles.phaseName}>Ovulation</Text>
              <View style={styles.cycleDayBadge}>
                <Text style={styles.cycleDayText}>Cycle Day 12</Text>
              </View>
            </View>
            <DonutRing size={110} strokeWidth={13} progress={0.45} />
          </View>

          <View style={styles.divider} />

          {/* Phase List */}
          <View style={styles.phaseList}>
            <View style={styles.phaseItem}>
              <PhaseDot color={Colors.primaryPink} />
              <Text style={styles.phaseItemLabel}>Period</Text>
              <Text style={styles.phaseItemDate}>May 10 – May 14</Text>
            </View>
            <View style={styles.phaseItem}>
              <PhaseDot color={Colors.lavender} />
              <Text style={styles.phaseItemLabel}>Fertility Window</Text>
              <Text style={styles.phaseItemDate}>May 18 – May 24</Text>
            </View>
            <View style={styles.phaseItem}>
              <PhaseDot color="#7CCF8A" />
              <Text style={styles.phaseItemLabel}>Ovulation</Text>
              <Text style={styles.phaseItemDate}>May 22</Text>
            </View>
            <View style={styles.phaseItem}>
              <PhaseDot color={Colors.warning} />
              <Text style={styles.phaseItemLabel}>PMS Window</Text>
              <Text style={styles.phaseItemDate}>May 28 – May 31</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            <QuickAction icon={<SymptomsIcon />} label="Symptoms" />
            <QuickAction icon={<MoodIcon />} label="Mood" />
            <QuickAction icon={<CrampIcon />} label="Cramp" />
            <QuickAction icon={<NotesIcon />} label="Notes" />
          </View>
        </Animated.View>

        {/* ── Cycle Health Score Card ── */}
        <Animated.View
          style={[
            styles.healthCard,
            { opacity: cardAnim, transform: [{ translateY: cardSlide }] },
          ]}
        >
          <View style={styles.healthLeft}>
            <Text style={styles.healthTitle}>Cycle Health Score</Text>
            <Text style={styles.healthScore}>Good</Text>
          </View>
          <View style={styles.gaugeWrapper}>
            <HealthGauge score={85} size={96} />
            <View style={styles.gaugeCenter}>
              <Text style={styles.gaugeNumber}>85</Text>
              <Text style={styles.gaugeTotal}>/100</Text>
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Header
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

  // Calendar card
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  // Month navigation
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginLeft: 4,
  },
  monthNavRight: {
    flexDirection: 'row',
    gap: 2,
  },
  chevronBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 22,
    color: Colors.textSecondary,
    fontWeight: '400',
    lineHeight: 26,
  },

  // Week days
  weekRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  weekDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // Day cells
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 3,
  },
  dayCellInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  dayTextOutside: {
    color: '#C4C4C4',
    fontWeight: '400',
  },
  dayTextToday: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Main period tracker card
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#FF6BAA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 16,
  },

  // Phase row
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  phaseLeft: {
    flex: 1,
    paddingRight: 12,
  },
  currentPhaseLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  phaseName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  cycleDayBadge: {
    backgroundColor: Colors.lavender,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  cycleDayText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#F0E6EB',
    marginVertical: 14,
  },

  // Phase list
  phaseList: {
    gap: 12,
  },
  phaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 10,
  },
  phaseItemLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  phaseItemDate: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '400',
  },

  // Quick actions
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    gap: 6,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Health score card
  healthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#FF6BAA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  healthLeft: {
    flex: 1,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  healthScore: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4CAF50',
  },
  gaugeWrapper: {
    width: 96,
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  gaugeCenter: {
    position: 'absolute',
    bottom: 4,
    alignItems: 'center',
  },
  gaugeNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  gaugeTotal: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    lineHeight: 14,
  },
});
