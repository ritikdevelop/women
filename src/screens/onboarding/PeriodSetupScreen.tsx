import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme/colors';
import CustomDatePicker from '../../components/CustomDatePicker';

const { width } = Dimensions.get('window');

interface PeriodSetupScreenProps {
  onNext: (data: {
    lastPeriodDate: string;
    cycleLength: number;
    periodLength: number;
  }) => void;
  initialData?: any;
}

const PeriodSetupScreen: React.FC<PeriodSetupScreenProps> = ({
  onNext,
  initialData,
}) => {
  const [lastPeriod, setLastPeriod] = useState(
    initialData?.lastPeriodDate || '',
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cycleLength, setCycleLength] = useState(
    initialData?.cycleLength?.toString() || '28',
  );
  const [periodLength, setPeriodLength] = useState(
    initialData?.periodLength?.toString() || '5',
  );

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (date: Date) => {
    setLastPeriod(formatDate(date));
  };

  const isValid =
    lastPeriod.length > 0 && cycleLength.length > 0 && periodLength.length > 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🩸</Text>
        <Text style={styles.title}>Period Setup</Text>
        <Text style={styles.subtitle}>
          Help us personalize your cycle tracking
        </Text>

        {/* Cycle Illustration */}
        <View style={styles.cycleIllustration}>
          <View style={styles.cyclePhase}>
            <View
              style={[styles.phaseDot, { backgroundColor: Colors.period }]}
            />
            <Text style={styles.phaseLabel}>Period</Text>
          </View>
          <View style={styles.cycleLine}>
            <LinearGradient
              colors={[
                Colors.period,
                Colors.fertility,
                Colors.ovulation,
                Colors.selfCare,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cycleLineFill}
            />
          </View>
          <View style={styles.cyclePhase}>
            <View
              style={[styles.phaseDot, { backgroundColor: Colors.ovulation }]}
            />
            <Text style={styles.phaseLabel}>Ovulation</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Last Period Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateInputText,
                  !lastPeriod && { color: Colors.textSecondary },
                ]}
              >
                {lastPeriod || 'Select Date'}
              </Text>
              {/* <View style={styles.calendarIcon}>
                <Text style={{ fontSize: 16 }}></Text>
              </View> */}
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.fieldLabel}>Cycle Length</Text>
              <View style={styles.stepperContainer}>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() =>
                    setCycleLength(
                      Math.max(
                        21,
                        parseInt(cycleLength || '28') - 1,
                      ).toString(),
                    )
                  }
                >
                  <Text style={styles.stepperText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{cycleLength} days</Text>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() =>
                    setCycleLength(
                      Math.min(
                        45,
                        parseInt(cycleLength || '28') + 1,
                      ).toString(),
                    )
                  }
                >
                  <Text style={styles.stepperText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.fieldLabel}>Period Length</Text>
              <View style={styles.stepperContainer}>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() =>
                    setPeriodLength(
                      Math.max(2, parseInt(periodLength || '5') - 1).toString(),
                    )
                  }
                >
                  <Text style={styles.stepperText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{periodLength} days</Text>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() =>
                    setPeriodLength(
                      Math.min(
                        10,
                        parseInt(periodLength || '5') + 1,
                      ).toString(),
                    )
                  }
                >
                  <Text style={styles.stepperText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === 3 && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={() =>
            isValid &&
            onNext({
              lastPeriodDate: lastPeriod,
              cycleLength: parseInt(cycleLength),
              periodLength: parseInt(periodLength),
            })
          }
          activeOpacity={0.8}
          disabled={!isValid}
        >
          <LinearGradient
            colors={isValid ? Colors.wellnessGradient : ['#D4D4D4', '#D4D4D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        initialDate={
          lastPeriod
            ? new Date(
                parseInt(lastPeriod.split('/')[2]),
                parseInt(lastPeriod.split('/')[1]) - 1,
                parseInt(lastPeriod.split('/')[0]),
              )
            : new Date()
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  content: {
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
    marginBottom: 32,
  },
  cycleIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 12,
  },
  cyclePhase: {
    alignItems: 'center',
    gap: 6,
  },
  phaseDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  phaseLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  cycleLine: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    maxWidth: 120,
  },
  cycleLineFill: {
    flex: 1,
    borderRadius: 3,
  },
  formContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateInput: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  dateInputText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  calendarIcon: {
    backgroundColor: Colors.nudeBeige,
    padding: 8,
    borderRadius: 10,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  stepperButton: {
    width: 44,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 170, 0.05)',
  },
  stepperText: {
    fontSize: 20,
    color: Colors.primaryPink,
    fontWeight: '700',
  },
  stepperValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bottomSection: {
    paddingVertical: 30,
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

export default PeriodSetupScreen;
