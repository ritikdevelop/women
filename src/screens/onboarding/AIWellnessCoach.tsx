import React, { useEffect } from 'react';
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
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const Petal = ({ style }: any) => <View style={[styles.petal, style]} />;

interface AIWellnessCoachProps {
  onNext: () => void;
  onBack: () => void;
}

const AIWellnessCoach: React.FC<AIWellnessCoachProps> = ({
  onNext,
  onBack,
}) => {
  // Animation shared values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const floatValue = useSharedValue(0);
  const bubbleScale = useSharedValue(0);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    // Fade in content
    opacity.value = withDelay(200, withSpring(1));
    translateY.value = withDelay(200, withSpring(0));

    // Speech bubble pop-in
    bubbleScale.value = withDelay(
      600,
      withSpring(1, { damping: 12, stiffness: 100 }),
    );

    // Fade in image
    imageOpacity.value = withDelay(400, withSpring(1));

    // Gentle floating for character
    floatValue.value = withRepeat(
      withSequence(
        withSpring(-8, { damping: 12, stiffness: 15 }),
        withSpring(0, { damping: 12, stiffness: 15 }),
      ),
      -1,
      true,
    );
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const characterAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ translateY: floatValue.value }],
  }));

  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }],
    opacity: bubbleScale.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.content}>
        {/* Header Title */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>Meet your AI{'\n'}Wellness Coach</Text>
        </Animated.View>

        {/* Chat Bubble + Character Section */}
        <View style={styles.centerSection}>
          {/* Speech Bubble */}
          <Animated.View style={[styles.speechBubble, bubbleAnimatedStyle]}>
            <Text style={styles.bubbleGreeting}>
              Hi, I'm <Text style={styles.mayaName}>Maya</Text>{' '}
              <Text style={styles.emoji}>🌸</Text>
            </Text>
            <Text style={styles.bubbleMessage}>
              I'll be with you at every{'\n'}step of your wellness{'\n'}journey.
            </Text>
            {/* Bubble Tail */}
            <View style={styles.bubbleTail} />
          </Animated.View>

          {/* Maya Character Image */}
          <Animated.View
            style={[styles.characterContainer, characterAnimatedStyle]}
          >
            {/* Dense Petal Background */}
            <Petal
              style={{
                top: '5%',
                left: '10%',
                transform: [{ rotate: '-15deg' }],
              }}
            />
            <Petal
              style={{
                top: '2%',
                right: '15%',
                transform: [{ rotate: '20deg' }],
              }}
            />
            <Petal
              style={{
                top: '25%',
                left: '0%',
                transform: [{ rotate: '-45deg' }],
              }}
            />
            <Petal
              style={{
                top: '20%',
                right: '5%',
                transform: [{ rotate: '35deg' }],
              }}
            />
            <Petal
              style={{
                top: '45%',
                left: '-5%',
                transform: [{ rotate: '-20deg' }],
              }}
            />
            <Petal
              style={{
                top: '50%',
                right: '-5%',
                transform: [{ rotate: '40deg' }],
              }}
            />
            <Petal
              style={{
                bottom: '25%',
                left: '5%',
                transform: [{ rotate: '10deg' }],
              }}
            />
            <Petal
              style={{
                bottom: '20%',
                right: '10%',
                transform: [{ rotate: '-30deg' }],
              }}
            />
            <Petal
              style={{
                bottom: '40%',
                right: '20%',
                transform: [{ rotate: '15deg' }, { scale: 0.8 }],
              }}
            />
            <Image
              source={require('../../assets/welcome.png')}
              style={styles.characterImage}
              resizeMode="contain"
              fadeDuration={0}
            />
          </Animated.View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onNext()}
            style={styles.buttonShadow}
          >
            <LinearGradient
              colors={['#FF8FB1', '#FF5F9E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start My Journey</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AIWellnessCoach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: height * 0.1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 38,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  petal: {
    position: 'absolute',
    width: 15,
    height: 25,
    backgroundColor: '#FFD1E1',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    opacity: 0.6,
  },
  // Speech Bubble
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: -5,
    zIndex: 2,
    maxWidth: width * 0.6,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: 30,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  bubbleGreeting: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600',
    marginBottom: 6,
  },
  mayaName: {
    color: '#FF5F9E',
    fontWeight: '700',
    fontSize: 17,
  },
  emoji: {
    fontSize: 16,
  },
  bubbleMessage: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
    fontWeight: '400',
  },
  // Character
  characterContainer: {
    width: width * 0.85,
    marginTop: 80,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  characterImage: {
    width: width * 1.2,
    height: height * 0.65,
    marginBottom: -40,
  },
  // Footer
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
