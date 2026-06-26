import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
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
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onNext: () => void;
}

const Petal = ({ style }: any) => <View style={[styles.petal, style]} />;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const floatValue = useSharedValue(0);
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(300, withSpring(1));
    translateY.value = withDelay(300, withSpring(0));
    imageOpacity.value = withDelay(500, withSpring(1));

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

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ translateY: floatValue.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F8" />

      <View style={styles.content}>
        {/* Header Text Section */}
        <Animated.View style={[styles.header, animatedStyle]}>
          <Text style={styles.welcomeTitle}>Welcome to</Text>
          <Text style={styles.brandTitle}>My Women</Text>
          <Text style={styles.subtitle}>
            Your personal AI companion for{'\n'}a healthier, happier you.
          </Text>
        </Animated.View>

        {/* Character Illustration & Overlapping Button View */}
        <View style={styles.imageAndButtonContainer}>
          <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
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

          {/* Button is positioned absolutely to overlap the image */}
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onNext()}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={['#FF8FB1', '#FF5F9E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Let's Begin</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
  },
  header: {
    alignItems: 'flex-start',
    zIndex: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FF1E76',
    marginTop: 2,
    marginBottom: 12,
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
  subtitle: {
    fontSize: 18,
    color: '#4A4A4A',
    lineHeight: 26,
    fontWeight: '500',
    width: '80%',
  },
  imageAndButtonContainer: {
    flex: 1,
    marginTop: -20, // Pull up to meet the header
    justifyContent: 'flex-end',
    width: '100%',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  characterImage: {
    width: width * 1.2,
    height: height * 0.65,
    marginBottom: -40, // Pull image down so leggings are behind the button area
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF5F9E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFE0EB',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#FF5F9E',
  },
});
