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

const PREFERENCES = [
  { id: 'menstrual', icon: '🩸', title: 'Menstrual Health', emoji: '🩸' },
  { id: 'hydration', icon: '💧', title: 'Hydration', emoji: '💧' },
  { id: 'meditation', icon: '🧘', title: 'Meditation', emoji: '🧘' },
  { id: 'sleep', icon: '😴', title: 'Sleep', emoji: '😴' },
  { id: 'fitness', icon: '🏃', title: 'Fitness', emoji: '🏃' },
  { id: 'stress', icon: '🧠', title: 'Stress Management', emoji: '🧠' },
];

interface WellnessPreferencesScreenProps {
  onNext: (prefs: string[]) => void;
  selectedPrefs?: string[];
}

const WellnessPreferencesScreen: React.FC<WellnessPreferencesScreenProps> = ({
  onNext,
  selectedPrefs: initial = [],
}) => {
  const [selected, setSelected] = useState<string[]>(initial);

  const togglePref = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🌿</Text>
        <Text style={styles.title}>Wellness Preferences</Text>
        <Text style={styles.subtitle}>Choose what matters to you</Text>

        <View style={styles.grid}>
          {PREFERENCES.map((pref) => {
            const isSelected = selected.includes(pref.id);
            return (
              <TouchableOpacity
                key={pref.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => togglePref(pref.id)}
                activeOpacity={0.7}>
                <Text style={styles.cardEmoji}>{pref.emoji}</Text>
                <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                  {pref.title}
                </Text>
                {isSelected && <View style={styles.selectedRing} />}
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
                i === 2 && styles.paginationDotActive,
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
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    position: 'relative',
  },
  cardSelected: {
    borderColor: Colors.primaryPink,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  cardTitleSelected: {
    color: Colors.primaryPink,
  },
  selectedRing: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryPink,
    justifyContent: 'center',
    alignItems: 'center',
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

export default WellnessPreferencesScreen;
