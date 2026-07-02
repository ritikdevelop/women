import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme/colors';


interface SignUpScreenProps {
  onSignUp: (name: string, email: string) => void;
  onNavigateToLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onNavigateToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isValid =
    name.length > 0 &&
    email.length > 0 &&
    password.length >= 6 &&
    acceptedTerms;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your wellness journey</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={Colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              activeOpacity={0.7}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}
            >
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I accept the Terms of Service and Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUpButton, !isValid && styles.buttonDisabled]}
            onPress={() => isValid && onSignUp(name, email)}
            activeOpacity={0.8}
            disabled={!isValid}
          >
            <LinearGradient
              colors={
                isValid ? Colors.wellnessGradient : ['#D4D4D4', '#D4D4D4']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signUpGradient}
            >
              <Text style={styles.signUpText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.hasAccount}>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  topSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  formSection: {
    gap: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primaryPink,
    borderColor: Colors.primaryPink,
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  signUpButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signUpGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    paddingBottom: 30,
  },
  hasAccount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    color: Colors.primaryPink,
    fontWeight: '600',
  },
});

export default SignUpScreen;
