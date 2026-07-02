import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
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

const AICoachScreen: React.FC = () => (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

    <View style={styles.header}>
      <Text style={styles.headerTitle}>Maya</Text>
      <TouchableOpacity
        style={styles.iconBtn}
        activeOpacity={0.7}
        accessibilityLabel="Notifications"
        accessibilityRole="button"
      >
        <BellIcon />
      </TouchableOpacity>
    </View>

    <View style={styles.body}>
      <LinearGradient
        colors={Colors.wellnessGradient}
        style={styles.avatarRing}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarInner}>
          <Image
            source={require('../../assets/maya_avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
            accessibilityRole="image"
            accessibilityLabel="Maya AI coach avatar"
          />
        </View>
      </LinearGradient>

      <Text style={styles.subtitle}>Your AI Wellness Coach</Text>

      <View style={styles.bubbleCard}>
        <View style={styles.bubbleTail} />
        <Text style={styles.bubbleText}>
          {
            "Hi! I'm Maya, your personal wellness coach. Ask me anything about your health, fitness, or cycle."
          }
        </Text>
      </View>
    </View>

    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.85}
        accessibilityLabel="Start chatting with Maya"
        accessibilityRole="button"
      >
        <LinearGradient
          colors={Colors.wellnessGradient}
          style={styles.chatBtn}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.chatBtnText}>Start Chatting</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default AICoachScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatarRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 3,
  },
  avatarInner: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: { width: 124, height: 124, borderRadius: 62 },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 28,
    letterSpacing: 0.2,
  },
  bubbleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bubbleTail: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    borderRadius: 3,
  },
  bubbleText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  footer: { paddingHorizontal: 24, paddingBottom: 36 },
  chatBtn: {
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  chatBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
