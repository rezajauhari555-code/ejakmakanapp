import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { Icon } from '../../src/components/common/Icon';
import { Input } from '../../src/components/common/Input';
import { WhatsAppOtpModal } from '../../src/features/auth/WhatsAppOtpModal';
import { UserProfile } from '../../src/types';
import { DEMO_USER } from '../../src/services/mockData';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onGoToRegister: () => void;
  onExploreAsGuest: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onGoToRegister,
  onExploreAsGuest,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState('dimas.pratama@ejakmakan.id');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showWaModal, setShowWaModal] = useState(false);

  function handleStandardLogin() {
    if (!identifier.trim()) {
      setErrorMessage('Email atau nomor ponsel wajib diisi');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter');
      return;
    }

    setErrorMessage('');
    onLoginSuccess({
      ...DEMO_USER,
      name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      email: identifier.includes('@') ? identifier : DEMO_USER.email,
      provider: 'email',
    });
  }

  function handleDemoLogin() {
    setErrorMessage('');
    onLoginSuccess(DEMO_USER);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.avoidView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand Mark */}
          <View style={styles.brandRow}>
            <View style={styles.brandBox}>
              <Icon name="restaurant" size={18} color={colors.textWhite} />
            </View>
            <Text style={styles.brandTitle}>Ejakmakan</Text>
          </View>

          {/* Heading */}
          <Text style={styles.eyebrow}>CITRA RASA CERDAS BANDUNG</Text>
          <Text style={styles.title}>Selamat Datang Kembali! 👋</Text>
          <Text style={styles.subtitle}>
            Masuk untuk menjelajahi spot kuliner favorit, reservasi meja, dan nikmati petualangan rasa.
          </Text>

          {/* Exclusive Table Promo Banner */}
          <View style={styles.promoBanner}>
            <View style={styles.promoIconSquare}>
              <Icon name="pricetag" size={16} color={colors.primary} />
            </View>
            <View style={styles.promoTextCol}>
              <Text style={styles.promoHeadline}>Diskon Reservasi Meja Eksklusif</Text>
              <Text style={styles.promoSub}>Hemat hingga 20% di resto pilihan wargi Bandung</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Input
              label="Email atau No. Handphone"
              placeholder="nama@email.com atau 0812..."
              icon="mail-outline"
              value={identifier}
              onChangeText={(t) => {
                setIdentifier(t);
                if (errorMessage) setErrorMessage('');
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
              onChangeText={(t) => {
                setPassword(t);
                if (errorMessage) setErrorMessage('');
              }}
            />

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberWrap}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.card}
                />
                <Text style={styles.rememberText}>Ingat Saya</Text>
              </View>
              <Pressable hitSlop={6}>
                <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
              </Pressable>
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={14} color={colors.danger} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Primary Submit */}
            <Pressable
              accessibilityRole="button"
              onPress={handleStandardLogin}
              style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
            >
              <Text style={styles.submitBtnText}>Masuk ke Akun</Text>
              <Icon name="arrow-forward" size={16} color={colors.textWhite} />
            </Pressable>
          </View>

          {/* Quick Demo Access (Dimas Pratama) */}
          <Pressable
            accessibilityRole="button"
            onPress={handleDemoLogin}
            style={({ pressed }) => [styles.demoBtn, pressed && styles.pressed]}
          >
            <View style={styles.demoAvatarCircle}>
              <Text style={styles.demoAvatarInitials}>DP</Text>
            </View>
            <View style={styles.demoTextWrap}>
              <Text style={styles.demoTitle}>Masuk Cepat sebagai Akun Demo</Text>
              <Text style={styles.demoSubtitle}>Dimas Pratama · Foodie Lv. 4 (Akses Penuh)</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.primary} />
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>atau masuk dengan</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social / Alternative Providers */}
          <View style={styles.providersWrap}>
            <Pressable
              accessibilityRole="button"
              onPress={handleDemoLogin}
              style={styles.providerBtn}
            >
              <Icon name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.providerBtnText}>Google</Text>
            </Pressable>

            {Platform.OS === 'ios' ? (
              <Pressable
                accessibilityRole="button"
                onPress={handleDemoLogin}
                style={[styles.providerBtn, styles.appleBtn]}
              >
                <Icon name="logo-apple" size={18} color={colors.textWhite} />
                <Text style={[styles.providerBtnText, styles.appleBtnText]}>Apple ID</Text>
              </Pressable>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={() => setShowWaModal(true)}
              style={[styles.providerBtn, styles.waBtn]}
            >
              <Icon name="logo-whatsapp" size={18} color={colors.textWhite} />
              <Text style={[styles.providerBtnText, styles.waBtnText]}>WhatsApp OTP</Text>
            </Pressable>
          </View>

          {/* Switch to Register */}
          <View style={styles.registerPrompt}>
            <Text style={styles.promptText}>Belum punya akun?</Text>
            <Pressable onPress={onGoToRegister}>
              <Text style={styles.promptLink}> Daftar Sekarang</Text>
            </Pressable>
          </View>

          <Pressable onPress={onExploreAsGuest} style={styles.guestLink}>
            <Text style={styles.guestLinkText}>Lanjutkan sebagai Tamu &gt;</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* WhatsApp OTP Simulation Modal */}
      <WhatsAppOtpModal
        visible={showWaModal}
        onClose={() => setShowWaModal(false)}
        onSuccess={(user) => {
          setShowWaModal(false);
          onLoginSuccess(user);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  avoidView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 22,
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
  brandBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primaryDark,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 24,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 16,
    maxWidth: 320,
  },
  promoBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CBE2F8',
    gap: 10,
  },
  promoIconSquare: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTextCol: {
    flex: 1,
  },
  promoHeadline: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryDark,
  },
  promoSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  submitBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  demoBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    padding: 12,
    marginTop: 14,
    gap: 10,
  },
  demoAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoAvatarInitials: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: typography.fontWeight.extrabold,
  },
  demoTextWrap: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryDark,
  },
  demoSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
  },
  providersWrap: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  providerBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  providerBtnText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  appleBtn: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  appleBtnText: {
    color: colors.textWhite,
  },
  waBtn: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  waBtnText: {
    color: colors.textWhite,
  },
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  promptText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  promptLink: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  guestLink: {
    marginTop: 12,
    padding: 6,
  },
  guestLinkText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    padding: 8,
    borderRadius: 8,
    gap: 6,
    marginTop: 8,
  },
  errorText: {
    fontSize: 11,
    color: colors.danger,
    flex: 1,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});
