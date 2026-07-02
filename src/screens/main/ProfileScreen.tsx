import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
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

const GearIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle
      cx={12}
      cy={12}
      r={3}
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
    />
    <Path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={Colors.textPrimary}
      strokeWidth={1.8}
    />
  </Svg>
);

const CameraIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={13} r={4} stroke="#FFFFFF" strokeWidth={1.8} />
  </Svg>
);

interface HealthCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
}
const HealthCard: React.FC<HealthCardProps> = ({
  icon,
  iconBg,
  label,
  value,
}) => (
  <View style={styles.healthCard}>
    <View style={[styles.healthIconBg, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text style={styles.healthLabel}>{label}</Text>
    <Text style={styles.healthValue}>{value}</Text>
  </View>
);

interface StreakItemProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  days: string;
}
const StreakItem: React.FC<StreakItemProps> = ({
  icon,
  iconBg,
  label,
  days,
}) => (
  <View style={styles.streakItem}>
    <View style={[styles.streakIconBg, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text style={styles.streakLabel}>{label}</Text>
    <Text style={styles.streakDays}>{days}</Text>
  </View>
);

const HeartIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="#FF6BAA">
    <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </Svg>
);
const StepsIconSvg = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM5.5 18.5L7 13H4l2.5-6.5"
      stroke="#4CAF50"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM9.5 18.5L11 13H8l2.5-6.5M19 18.5L20.5 13H17l2.5-6.5"
      stroke="#4CAF50"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const WaterDropIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="#4FC3F7">
    <Path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
  </Svg>
);
const WorkoutIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={8} fill="#F6C667" />
    <Path
      d="M12 8v4l2 2"
      stroke="#FFF"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
const WaterStreakIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="#89B4F8">
    <Path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
  </Svg>
);
const DumbbellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11.5h2M3 12.5h2M5 9v6M7 10.5v3M7 12h10M17 10.5v3M19 9v6M19 11.5h2M19 12.5h2"
      stroke="#B89CFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
const MeditationIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="#B89CFF">
    <Path d="M12 3C9 3 7 6 7 9c0 2 1 4 3 5l2 1 2-1c2-1 3-3 3-5 0-3-2-6-5-6z" />
    <Path
      d="M4 20c0-3 4-5 8-5s8 2 8 5"
      stroke="#B89CFF"
      strokeWidth={1.5}
      fill="none"
    />
  </Svg>
);
const MoodIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke="#F6C667" strokeWidth={2} />
    <Path
      d="M9 14s1 2 3 2 3-2 3-2"
      stroke="#F6C667"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={9} cy={10} r={1} fill="#F6C667" />
    <Circle cx={15} cy={10} r={1} fill="#F6C667" />
  </Svg>
);
const CycleStreakIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FF6BAA">
    <Path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm0 4c.55 0 1 .45 1 1v4l3 1.73-.5.87L12 13V7z" />
  </Svg>
);

const ProfileScreen: React.FC = () => (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Profile</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
        >
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          accessibilityLabel="Settings"
          accessibilityRole="button"
        >
          <GearIcon />
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingRow}>
        <Text style={styles.greetingText}>Hello, Sarah! </Text>
        <Text style={styles.greetingFlower}>🌸</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <Image
              source={require('../../assets/welcome.png')}
              style={styles.avatar}
              resizeMode="cover"
              accessibilityRole="image"
              accessibilityLabel="Profile avatar"
            />
          </View>
          <TouchableOpacity
            style={styles.cameraBtn}
            activeOpacity={0.8}
            accessibilityLabel="Change profile photo"
            accessibilityRole="button"
          >
            <CameraIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileMeta}>24 Years • 5'4" • 58 kg</Text>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            accessibilityLabel="Edit Profile"
            accessibilityRole="button"
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Summary</Text>
      </View>
      <View style={styles.healthRow}>
        <HealthCard
          iconBg="#FFF0F6"
          icon={<HeartIcon />}
          label="Cycle"
          value="Day 12"
        />
        <HealthCard
          iconBg="#F0FFF4"
          icon={<StepsIconSvg />}
          label="Steps"
          value="7,834"
        />
        <HealthCard
          iconBg="#F0FAFF"
          icon={<WaterDropIcon />}
          label="Water"
          value="1.8 / 3 L"
        />
        <HealthCard
          iconBg="#FFFBF0"
          icon={<WorkoutIcon />}
          label="Workout"
          value="68%"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Current Streaks</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          accessibilityLabel="View all streaks"
          accessibilityRole="button"
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.streaksRow}>
        <StreakItem
          iconBg="#EEF4FF"
          icon={<WaterStreakIcon />}
          label="Water"
          days="12 Days"
        />
        <StreakItem
          iconBg="#F5F0FF"
          icon={<DumbbellIcon />}
          label="Workout"
          days="8 Days"
        />
        <StreakItem
          iconBg="#F5F0FF"
          icon={<MeditationIcon />}
          label="Meditation"
          days="6 Days"
        />
        <StreakItem
          iconBg="#FFFBF0"
          icon={<MoodIcon />}
          label="Mood"
          days="7 Days"
        />
        <StreakItem
          iconBg="#FFF0F6"
          icon={<CycleStreakIcon />}
          label="Cycle"
          days="12 Days"
        />
      </View>

      <LinearGradient
        colors={['#FF8DC7', '#FF6BAA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.insightCard}
      >
        <View style={styles.insightContent}>
          <View style={styles.insightLeft}>
            <Text style={styles.insightTitle}>Maya's Insight</Text>
            <Text style={styles.insightBody}>
              You're doing amazing, Sarah!{'\n'}Consistency is your superpower.
            </Text>
          </View>
          <Image
            source={require('../../assets/welcome.png')}
            style={styles.insightAvatar}
            resizeMode="cover"
          />
        </View>
        <View style={styles.insightDecorCircle1} />
        <View style={styles.insightDecorCircle2} />
      </LinearGradient>

      <View style={{ height: 110 }} />
    </ScrollView>
  </SafeAreaView>
);

export default ProfileScreen;

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
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerIcons: { flexDirection: 'row', gap: 8 },
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
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  greetingText: { fontSize: 17, fontWeight: '600', color: Colors.primaryPink },
  greetingFlower: { fontSize: 18 },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarContainer: { position: 'relative' },
  avatarRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFE4F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  avatar: { width: 76, height: 76, borderRadius: 38 },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primaryPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
    fontWeight: '400',
  },
  editBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: Colors.primaryPink,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  editBtnText: { color: Colors.primaryPink, fontSize: 13, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  viewAll: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  healthRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  healthCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  healthIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  healthValue: { fontSize: 12, fontWeight: '800', color: Colors.textPrimary },
  streaksRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  streakItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 4,
  },
  streakIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  streakDays: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  insightCard: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 110,
  },
  insightContent: { flexDirection: 'row', alignItems: 'center', zIndex: 2 },
  insightLeft: { flex: 1, paddingRight: 12 },
  insightTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  insightBody: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 20,
    fontWeight: '400',
  },
  insightAvatar: { width: 80, height: 90, borderRadius: 16 },
  insightDecorCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -40,
    right: 80,
  },
  insightDecorCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -20,
    left: 20,
  },
});
