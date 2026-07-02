import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme/colors';

const { width } = Dimensions.get('window');

interface WaterGoalScreenProps {
  onNext: (goal: number) => void;
  initialGoal?: number;
}

const WaterGoalScreen: React.FC<WaterGoalScreenProps> = ({
  onNext,
  initialGoal = 2000,
}) => {
  const [goal, setGoal] = useState(initialGoal);
  const options = [1000, 2000, 3000, 4000];

  const bottleFillPercent = goal / 4000;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>💧</Text>
        <Text style={styles.title}>Daily Water Goal</Text>
        <Text style={styles.subtitle}>
          How much water will you drink daily?
        </Text>

        {/* Animated Water Bottle */}
        <View style={styles.bottleWrapper}>
          <View style={styles.bottle}>
            <LinearGradient
              colors={['rgba(79, 195, 247, 0.3)', 'rgba(41, 182, 246, 0.6)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[
                styles.waterFill,
                { height: `${bottleFillPercent * 100}%` },
              ]}
            />
            <Text style={styles.bottleAmount}>{goal / 1000}L</Text>
          </View>
        </View>

        {/* Goal Selector */}
        <View style={styles.sliderContainer}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.option, goal === opt && styles.optionSelected]}
              onPress={() => setGoal(opt)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  goal === opt && styles.optionTextSelected,
                ]}
              >
                {opt / 1000}L
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 4 && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(goal)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={Colors.wellnessGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  bottleWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  bottle: {
    width: 100,
    height: 160,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: Colors.border,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
    backgroundColor: Colors.surface,
  },
  waterFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  bottleAmount: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sliderContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  option: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#4FC3F7',
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  optionTextSelected: {
    color: '#4FC3F7',
  },
  bottomSection: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: Colors.primaryPink,
    borderRadius: 4,
  },
  button: {
    width: width - 40,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
});

export default WaterGoalScreen;
