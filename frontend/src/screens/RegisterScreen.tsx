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
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { Input } from '../components/common/Input';
import { UserSession } from '../types';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: (session: UserSession) => void;
  onSwitchToLogin: () => void;
}

export function RegisterScreen({
  onBack,
  onRegisterSuccess,
  onSwitchToLogin,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (fullName.trim().length < 2) {
      setError('Nama lengkap minimal 2 karakter');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Masukkan alamat email yang valid');
      return;
    }
    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    setError('');
    const newSession: UserSession = {
      token: 'session-' + Date.now(),
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      provider: 'email',
      avatarUrl: null,
    };
    onRegisterSuccess(newSession);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Daftar Akun Baru" onBack={onBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandRow}>
            <View style={styles.brandLogo}>
              <Icon name="restaurant" size={18} color={colors.textOnPrimary} />
            </View>
            <Text style={styles.brandName}>Ejakmakan</Text>
          </View>

          <Text style={styles.eyebrow}>BERGABUNG DENGAN KOMUNITAS</Text>
          <Text style={styles.title}>Bikin Setiap Momen{'\n'}Makan Lebih Berkesan</Text>
          <Text style={styles.subtitle}>
            Buat akun untuk menyimpan spot favorit, personalisasi rekomendasi rasa, dan jelajah kuliner tanpa bingung.
          </Text>

          <View style={styles.formCard}>
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkapmu"
              icon="person-outline"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (error) setError('');
              }}
            />

            <Input
              label="Alamat Email"
              placeholder="nama@email.com"
              icon="mail-outline"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
            />

            <Input
              label="Kata Sandi"
              placeholder="Minimal 8 karakter"
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) setError('');
              }}
            />

            <Input
              label="Konfirmasi Kata Sandi"
              placeholder="Ulangi kata sandi"
              icon="lock-closed-outline"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (error) setError('');
              }}
            />

            {error ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={16} color={colors.accentRed} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Button
              title="Buat Akun & Lanjutkan"
              onPress={handleSubmit}
              icon="arrow-forward"
              variant="primary"
              style={styles.submitButton}
            />
          </View>

          <Text style={styles.termsText}>
            Dengan mendaftar, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi Ejakmakan.
          </Text>

          <View style={styles.bottomLinks}>
            <Text style={styles.switchText}>Sudah memiliki akun?</Text>
            <Pressable onPress={onSwitchToLogin}>
              <Text style={styles.switchHighlight}> Masuk di Sini</Text>
            </Pressable>
          </View>
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
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
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
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 20,
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
  termsText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
    paddingHorizontal: 12,
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
});

