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

const GOALS = [
  { id: 'weight_loss', icon: '⚖️', title: 'Weight Loss', desc: 'Reach your ideal weight' },
  { id: 'weight_gain', icon: '💪', title: 'Weight Gain', desc: 'Build healthy mass' },
  { id: 'strength', icon: '🏋️', title: 'Strength', desc: 'Build muscle & power' },
  { id: 'flexibility', icon: '🧘', title: 'Flexibility', desc: 'Improve mobility' },
  { id: 'general_wellness', icon: '🌿', title: 'General Wellness', desc: 'Stay healthy & balanced' },
  { id: 'post_pregnancy', icon: '👶', title: 'Post Pregnancy', desc: 'Recover & rebuild' },
];

interface FitnessGoalsScreenProps {
  onNext: (goals: string[]) => void;
  selectedGoals?: string[];
  step?: number;
}

const FitnessGoalsScreen: React.FC<FitnessGoalsScreenProps> = ({
  onNext,
  selectedGoals: initial = [],
  step = 2,
}) => {
  const [selected, setSelected] = useState<string[]>(initial);

  const toggleGoal = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.title}>What are your fitness goals?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        <View style={styles.grid}>
          {GOALS.map((goal) => {
            const isSelected = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleGoal(goal.id)}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.iconSelected,
                  ]}>
                  <Text style={styles.cardIcon}>{goal.icon}</Text>
                </View>
                <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                  {goal.title}
                </Text>
                <Text style={styles.cardDesc}>{goal.desc}</Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 1 && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
          onPress={() => selected.length > 0 && onNext(selected)}
          activeOpacity={0.8}
          disabled={selected.length === 0}>
          <LinearGradient
            colors={selected.length > 0 ? Colors.wellnessGradient : ['#D4D4D4', '#D4D4D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}>
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
  },
  emoji: {
    fontSize: 40,
    textAlign: 'center',
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
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: (width - 52) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
  },
  cardSelected: {
    borderColor: Colors.primaryPink,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconSelected: {
    backgroundColor: Colors.primaryPink + '15',
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardTitleSelected: {
    color: Colors.primaryPink,
  },
  cardDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 16,
    color: Colors.primaryPink,
    fontWeight: '700',
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
  buttonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
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

export default FitnessGoalsScreen;
