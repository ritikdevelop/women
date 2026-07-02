import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme/colors';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToSignUp: () => void;
  onNavigateToForgotPassword: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToSignUp,
  onNavigateToForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          <Text style={styles.greeting}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>

        <View style={styles.formSection}>
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

          <TouchableOpacity onPress={onNavigateToForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={onLogin}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={Colors.wellnessGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signInGradient}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>🔵</Text>
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.noAccount}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateToSignUp}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
    paddingTop: 60,
  },
  topSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  greeting: {
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
    gap: 16,
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
  forgotPassword: {
    color: Colors.primaryPink,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: Colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    paddingBottom: 30,
  },
  noAccount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: 14,
    color: Colors.primaryPink,
    fontWeight: '600',
  },
});

export default LoginScreen;
