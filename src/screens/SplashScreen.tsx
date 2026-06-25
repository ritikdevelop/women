import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const logoScale = useSharedValue(0.9);
  const logoOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animations
    logoOpacity.value = withTiming(1, { duration: 1500 });
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 1200 }));

    // Soft breathing scale animation
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 3000,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        withTiming(0.95, {
          duration: 3000,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ),
      -1,
      true,
    );

    // Prevent Jest tests from keeping open timers / triggering async state updates after the test ends.
    // Jest provides a global `jest` object in the test environment.
    const isTest = typeof jest !== 'undefined';
    const timeoutMs = isTest ? 0 : 5000;
    const timer = setTimeout(onFinish, timeoutMs);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [
      { translateY: interpolate(contentOpacity.value, [0, 1], [30, 0]) },
    ],
  }));

  return (
    <LinearGradient
      colors={['#FF758C', '#FF7EB3', '#9D50BB']}
      style={styles.container}
    >
      <View style={styles.center}>
        <Animated.View style={[styles.logoWrapper, logoStyle]}>
          <Svg width={width * 0.7} height={width * 0.7} viewBox="0 0 100 100">
            {/* Hand-crafted Woman Profile Silhouette with Floral headpiece */}
            <Path
              d="M35,30 C35,20 45,15 55,15 C65,15 75,25 75,40 C75,55 60,65 50,75 C40,65 25,55 25,40 C25,25 35,30 35,30 M45,15 C45,10 55,10 55,15 M65,20 C70,10 80,15 75,25 M35,20 C30,10 20,15 25,25"
              fill="white"
            />
            <Path
              d="M50,85 C25,70 20,50 20,40 C20,20 40,10 50,10 C60,10 80,20 80,40 C80,50 75,70 50,85"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={[styles.textWrapper, contentStyle]}>
          <Text style={styles.title}>My Women</Text>
          <Text style={styles.subtitle}>AI Wellness Companion</Text>
        </Animated.View>

        <Animated.View style={[styles.heartIcon, contentStyle]}>
          <Svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </Svg>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logoWrapper: {
    marginBottom: 20,
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
    letterSpacing: 1,
  },
  heartIcon: {
    marginTop: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    opacity: 0.7,
    letterSpacing: 1.5,
    fontSize: 12,
  },
});

export default SplashScreen;
