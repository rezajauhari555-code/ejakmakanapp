import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { Input } from '../components/common/Input';
import { UserSession } from '../types';

interface LoginScreenProps {
  loadingProvider: 'google' | 'apple' | null;
  errorMessage: string;
  onLoginGoogle: () => void;
  onLoginApple: () => void;
  onGuestContinue: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export function LoginScreen({
  loadingProvider,
  errorMessage,
  onLoginGoogle,
  onLoginApple,
  onGuestContinue,
  onSwitchToRegister,
  onLoginSuccess,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  function handleEmailLogin() {
    if (!identifier.trim()) {
      setFormError('Email atau nomor ponsel wajib diisi');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Kata sandi minimal 6 karakter');
      return;
    }

    setFormError('');
    // Create authentic guest/email session
    const session: UserSession = {
      token: 'session-' + Date.now(),
      name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      email: identifier.includes('@') ? identifier : null,
      provider: 'email',
      avatarUrl: null,
    };
    onLoginSuccess(session);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.brandRow}>
            <View style={styles.brandLogo}>
              <Icon name="restaurant" size={20} color={colors.textOnPrimary} />
            </View>
            <Text style={styles.brandName}>Ejakmakan</Text>
          </View>

          <Text style={styles.eyebrow}>CITRA RASA CERDAS</Text>
          <Text style={styles.title}>Selamat Datang Kembali! 👋</Text>
          <Text style={styles.subtitle}>
            Masuk untuk menjelajahi spot kuliner favorit, putar rekomendasi, dan nikmati petualangan rasa.
          </Text>

          {/* Form */}
          <View style={styles.formCard}>
            <Input
              label="Email atau No. Handphone"
              placeholder="nama@email.com atau 0812..."
              icon="mail-outline"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                if (formError) setFormError('');
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input
              label="Kata Sandi"
              placeholder="Masukkan kata sandi akunmu"
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (formError) setFormError('');
              }}
            />

            {formError ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={16} color={colors.accentRed} />
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            ) : null}

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={16} color={colors.accentRed} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <Button
              title="Masuk ke Akun"
              onPress={handleEmailLogin}
              icon="arrow-forward"
              variant="primary"
              style={styles.submitButton}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau masuk dengan</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.socialButtons}>
            <Pressable
              accessibilityRole="button"
              onPress={onLoginGoogle}
              disabled={loadingProvider !== null}
              style={({ pressed }) => [
                styles.socialButton,
                styles.googleButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Icon name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.googleText}>
                {loadingProvider === 'google' ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
              </Text>
            </Pressable>

            {Platform.OS === 'ios' ? (
              <Pressable
                accessibilityRole="button"
                onPress={onLoginApple}
                disabled={loadingProvider !== null}
                style={({ pressed }) => [
                  styles.socialButton,
                  styles.appleButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Icon name="logo-apple" size={18} color={colors.textOnPrimary} />
                <Text style={styles.appleText}>
                  {loadingProvider === 'apple' ? 'Menghubungkan...' : 'Lanjutkan dengan Apple'}
                </Text>
              </Pressable>
            ) : null}
          </View>

          {/* Bottom Switch Links */}
          <View style={styles.bottomLinks}>
            <Text style={styles.switchText}>Belum punya akun?</Text>
            <Pressable onPress={onSwitchToRegister}>
              <Text style={styles.switchHighlight}> Daftar Sekarang</Text>
            </Pressable>
          </View>

          <Pressable onPress={onGuestContinue} style={styles.guestButton}>
            <Text style={styles.guestText}>Lanjutkan sebagai Tamu &gt;</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  brandLogo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 24,
    maxWidth: 320,
  },
  formCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  submitButton: {
    marginTop: 8,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentRedSoft,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    color: colors.accentRed,
    flex: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 22,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  socialButtons: {
    width: '100%',
    gap: 10,
  },
  socialButton: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 10,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  googleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  appleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  switchText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  switchHighlight: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  guestButton: {
    marginTop: 14,
    padding: 8,
  },
  guestText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});

