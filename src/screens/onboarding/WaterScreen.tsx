import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const WaterScreen = ({ navigation }: any) => {
  const [waterGoal, setWaterGoal] = useState(2.5);

  // Animation shared values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const floatValue = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(300, withSpring(1));
    translateY.value = withDelay(300, withSpring(0));

    // Floating animation for the bottle
    floatValue.value = withRepeat(
      withSequence(
        withSpring(-10, { damping: 10, stiffness: 20 }),
        withSpring(0, { damping: 10, stiffness: 20 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const bottleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatValue.value }, { scale: scale.value }],
  }));

  const incrementGoal = () => {
    setWaterGoal(prev => parseFloat((prev + 0.1).toFixed(1)));
    scale.value = withSequence(withSpring(1.05), withSpring(1));
  };

  const decrementGoal = () => {
    if (waterGoal > 0.5) {
      setWaterGoal(prev => parseFloat((prev - 0.1).toFixed(1)));
      scale.value = withSequence(withSpring(0.95), withSpring(1));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Header Text Selection */}
        <Animated.View style={[styles.header, animatedStyle]}>
          <Text style={styles.title}>Set your daily{'\n'}water goal</Text>
          <Text style={styles.subtitle}>
            How much water do you{'\n'}want to drink daily?
          </Text>
        </Animated.View>

        {/* Animation Container */}
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.bottleWrapper, bottleAnimatedStyle]}>
            <Image
              source={require('../../assets/water_bottle.png')}
              style={styles.bottleImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Goal Selector */}
        <View style={styles.goalSelectorContainer}>
          <View style={styles.selectorWrapper}>
            <TouchableOpacity
              style={styles.selectorButton}
              onPress={decrementGoal}
              activeOpacity={0.7}
            >
              <Text style={styles.selectorButtonText}>−</Text>
            </TouchableOpacity>

            <View style={styles.valueDisplay}>
              <Text style={styles.goalValue}>
                {waterGoal.toFixed(1)} Liters
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.selectorButton, styles.incrementBtnBg]}
              onPress={incrementGoal}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectorButtonText, { color: '#FF5F9E' }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('WellnessCoach')}
            style={styles.buttonShadow}
          >
            <LinearGradient
              colors={['#FF8FB1', '#FF5F9E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WaterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backArrow: {
    fontSize: 26,
    color: '#1A1A1A',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: height * 0.12,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    fontWeight: '500',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleWrapper: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleImage: {
    width: '100%',
    height: '100%',
  },
  goalSelectorContainer: {
    marginBottom: 40,
  },
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  selectorButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incrementBtnBg: {
    backgroundColor: '#FFF0F5',
  },
  selectorButtonText: {
    fontSize: 28,
    color: '#FF8FB1',
    fontWeight: '300',
  },
  valueDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  goalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  footer: {
    alignItems: 'center',
  },
  buttonShadow: {
    width: '100%',
    shadowColor: '#FF5F9E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFE0EB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#FF5F9E',
  },
});
