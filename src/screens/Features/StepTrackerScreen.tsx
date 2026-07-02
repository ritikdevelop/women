import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Rect,
  Line,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../theme/colors';
import type { MainStackParamList } from '../../navigation/AppNavigator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Period = 'Day' | 'Week' | 'Month';

const WEEK_DATA = [
  { day: 'M', steps: 5800 },
  { day: 'T', steps: 4900 },
  { day: 'W', steps: 4200 },
  { day: 'Th', steps: 5300 },
  { day: 'F', steps: 6100 },
  { day: 'S', steps: 7834, isToday: true },
  { day: 'Su', steps: 400 },
];

const DAY_DATA = [
  { day: '6am', steps: 1200 },
  { day: '9am', steps: 2800 },
  { day: '12pm', steps: 4100 },
  { day: '3pm', steps: 5600 },
  { day: '6pm', steps: 7200 },
  { day: '9pm', steps: 7834, isToday: true },
  { day: '12am', steps: 200 },
];

const MONTH_DATA = [
  { day: 'W1', steps: 38000 },
  { day: 'W2', steps: 42000 },
  { day: 'W3', steps: 35000 },
  { day: 'W4', steps: 47000, isToday: true },
  { day: 'W5', steps: 22000 },
  { day: '', steps: 0 },
  { day: '', steps: 0 },
];

const CHART_BY_PERIOD: Record<Period, typeof WEEK_DATA> = {
  Day: DAY_DATA,
  Week: WEEK_DATA,
  Month: MONTH_DATA,
};

const STATS_BY_PERIOD: Record<
  Period,
  { steps: number; km: number; kcal: number; min: number; date: string }
> = {
  Day: { steps: 7834, km: 5.6, kcal: 382, min: 56, date: 'May 26' },
  Week: { steps: 7834, km: 5.6, kcal: 382, min: 56, date: 'May 20 – May 26' },
  Month: { steps: 184000, km: 22.4, kcal: 1528, min: 224, date: 'May 2025' },
};

const BAR_CHART_HEIGHT = 140;
const BAR_CHART_PADDING_BOTTOM = 28;

interface BarChartProps {
  data: typeof WEEK_DATA;
}
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartW = SCREEN_WIDTH - 40 - 32;
  const maxSteps = Math.max(...data.map(d => d.steps), 1);
  const barCount = data.length;
  const totalBarAreaW = chartW - 32;
  const barW = Math.max((totalBarAreaW / barCount) * 0.45, 10);
  const gap = totalBarAreaW / barCount;
  const availableH = BAR_CHART_HEIGHT - BAR_CHART_PADDING_BOTTOM - 8;

  return (
    <View>
      <Text style={styles.yAxisLabel}>8K</Text>
      <Svg
        width={chartW}
        height={BAR_CHART_HEIGHT}
        style={{ overflow: 'visible' }}
      >
        <Defs>
          <SvgLinearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#B0B8E8" />
            <Stop offset="100%" stopColor="#D4D9F5" />
          </SvgLinearGradient>
          <SvgLinearGradient
            id="barGradActive"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <Stop offset="0%" stopColor={Colors.primaryPink} />
            <Stop offset="100%" stopColor="#FF9DC9" />
          </SvgLinearGradient>
        </Defs>
        {[0, 0.5, 1].map((frac, i) => {
          const y = 8 + availableH * (1 - frac);
          return (
            <Line
              key={i}
              x1={0}
              y1={y}
              x2={chartW}
              y2={y}
              stroke="#EBEBEB"
              strokeWidth={1}
              strokeDasharray={i === 2 ? '0' : '4,3'}
            />
          );
        })}
        {data.map((item, i) => {
          const barH =
            item.steps > 0
              ? Math.max((item.steps / maxSteps) * availableH, 4)
              : 0;
          const x = i * gap + gap / 2 - barW / 2;
          const y = 8 + availableH - barH;
          return (
            <Rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={barW / 2}
              fill={item.isToday ? 'url(#barGradActive)' : 'url(#barGrad)'}
            />
          );
        })}
      </Svg>
      <View style={[styles.dayLabelsRow, { width: chartW }]}>
        {data.map((item, i) => (
          <Text
            key={i}
            style={[
              styles.dayLabel,
              { width: gap },
              item.isToday && styles.dayLabelActive,
            ]}
          >
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

interface StatCardProps {
  value: string;
  unit: string;
  accessibilityLabel: string;
}
const StatCard: React.FC<StatCardProps> = ({
  value,
  unit,
  accessibilityLabel,
}) => (
  <View style={styles.statCard} accessibilityLabel={accessibilityLabel}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statUnit}>{unit}</Text>
  </View>
);

const GOAL_STEPS = 10000;

const StepTrackerScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [period, setPeriod] = useState<Period>('Week');
  const stats = STATS_BY_PERIOD[period];
  const chartData = CHART_BY_PERIOD[period];
  const goalPercent = Math.round(Math.min(stats.steps / GOAL_STEPS, 1) * 100);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF4F8" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Steps</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text style={styles.headerBack}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.periodRow}>
          {(['Day', 'Week', 'Month'] as Period[]).map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              style={[styles.periodBtn, period === p && styles.periodBtnActive]}
              activeOpacity={0.8}
              accessibilityLabel={`${p} view`}
              accessibilityRole="button"
              accessibilityState={{ selected: period === p }}
            >
              <Text
                style={[
                  styles.periodBtnText,
                  period === p && styles.periodBtnTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.stepsValue}>{stats.steps.toLocaleString()}</Text>
          <Text style={styles.stepsUnit}> Steps</Text>
        </View>
        <Text style={styles.dateRange}>{stats.date}</Text>

        <View style={styles.chartCard}>
          <BarChart data={chartData} />
        </View>

        <View style={styles.statRow}>
          <StatCard
            value={stats.km.toFixed(1)}
            unit="Km"
            accessibilityLabel={`${stats.km.toFixed(1)} kilometres`}
          />
          <StatCard
            value={stats.kcal.toString()}
            unit="Kcal"
            accessibilityLabel={`${stats.kcal} kilocalories burned`}
          />
          <StatCard
            value={stats.min.toString()}
            unit="Min"
            accessibilityLabel={`${stats.min} minutes active`}
          />
        </View>

        <View style={styles.goalSection}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Goal Progress</Text>
            <Text style={styles.goalPercent}>{goalPercent}%</Text>
          </View>
          <View
            style={styles.progressTrack}
            accessibilityLabel={`Goal progress ${goalPercent}%`}
          >
            <View style={[styles.progressFill, { width: `${goalPercent}%` }]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StepTrackerScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF4F8' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 48 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 18,
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  headerBack: {
    fontSize: 14,
    color: Colors.primaryPink,
    fontWeight: '600',
    width: 60,
    textAlign: 'right',
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  periodBtn: { paddingHorizontal: 28, paddingVertical: 9, borderRadius: 22 },
  periodBtnActive: { backgroundColor: Colors.primaryPink },
  periodBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  periodBtnTextActive: { color: '#FFFFFF' },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4 },
  stepsValue: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.primaryPink,
    letterSpacing: -1,
    lineHeight: 50,
  },
  stepsUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  dateRange: { fontSize: 13, color: Colors.textSecondary, marginBottom: 20 },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  yAxisLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginBottom: 2,
  },
  dayLabelsRow: { flexDirection: 'row', marginTop: 4 },
  dayLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  dayLabelActive: { color: Colors.primaryPink, fontWeight: '700' },
  statRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: '#FDF0E8',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    shadowColor: '#F4A55A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statUnit: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  goalSection: { width: '100%' },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  goalPercent: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: Colors.primaryPink,
  },
});
