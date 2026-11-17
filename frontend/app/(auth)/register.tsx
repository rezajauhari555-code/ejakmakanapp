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
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { Icon } from '../../src/components/common/Icon';
import { Input } from '../../src/components/common/Input';
import { UserProfile } from '../../src/types';

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onGoToLogin: () => void;
  onSkip?: () => void;
}

export default function RegisterScreen({
  onRegisterSuccess,
  onGoToLogin,
}: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculation
  const passwordLength = password.length;
  const hasNumber = /\d/.test(password);
  const isStrong = passwordLength >= 8 && hasNumber;
  const isMedium = passwordLength >= 6;

  function handleRegister() {
    if (name.trim().length < 2) {
      setErrorMsg('Nama lengkap minimal 2 karakter');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Masukkan alamat email yang valid');
      return;
    }
    if (phone.trim().length < 9) {
      setErrorMsg('Nomor HP/WhatsApp minimal 9 digit');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter');
      return;
    }
    if (!agreed) {
      setErrorMsg('Anda harus menyetujui Ketentuan Layanan');
      return;
    }

    setErrorMsg('');
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('');

    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      foodieLevel: 1,
      foodieTitle: 'Foodie Explorer',
      xpCurrent: 100,
      xpMax: 300,
      avatarInitials: initials || 'EP',
      reviewsCount: 0,
      photosCount: 0,
      collectionsCount: 0,
      provider: 'email',
    };

    onRegisterSuccess(newUser);
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

          <Text style={styles.eyebrow}>GABUNG KOMUNITAS FOODIE BANDUNG</Text>
          <Text style={styles.title}>Bikin Akun Baru</Text>
          <Text style={styles.subtitle}>
            Dapatkan kurasi kafe WFC, diskon reservasi, dan rekomendasi AI yang dibuat khusus untukmu.
          </Text>

          {/* Form */}
          <View style={styles.card}>
            <Input
              label="Nama Lengkap"
              placeholder="Contoh: Dimas Pratama"
              icon="person-outline"
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (errorMsg) setErrorMsg('');
              }}
            />

            <Input
              label="Alamat Email"
              placeholder="dimas@email.com"
              icon="mail-outline"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (errorMsg) setErrorMsg('');
              }}
            />

            <Input
              label="No. Handphone / WhatsApp"
              placeholder="0812-3456-7890"
              icon="call-outline"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                if (errorMsg) setErrorMsg('');
              }}
            />

            <Input
              label="Kata Sandi"
              placeholder="Minimal 8 karakter & angka"
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (errorMsg) setErrorMsg('');
              }}
            />

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthRow}>
                <View
                  style={[
                    styles.strengthBar,
                    isMedium ? styles.barMedium : styles.barWeak,
                  ]}
                />
                <View
                  style={[
                    styles.strengthBar,
                    isStrong ? styles.barStrong : styles.barDefault,
                  ]}
                />
                <Text style={styles.strengthText}>
                  {isStrong ? 'Kuat' : isMedium ? 'Sedang' : 'Lemah'}
                </Text>
              </View>
            )}

            <Input
              label="Kode Referral (Opsional)"
              placeholder="Ketik KULINERBDG untuk bonus poin"
              icon="gift-outline"
              value={referralCode}
              onChangeText={setReferralCode}
            />

            {/* Terms Agreement */}
            <Pressable
              accessibilityRole="checkbox"
              onPress={() => setAgreed(!agreed)}
              style={styles.termsRow}
            >
              <Icon
                name={agreed ? 'checkbox' : 'square-outline'}
                size={20}
                color={agreed ? colors.primary : colors.textMuted}
              />
              <Text style={styles.termsText}>
                Saya menyetujui <Text style={styles.termsLink}>Ketentuan Layanan</Text> &{' '}
                <Text style={styles.termsLink}>Kebijakan Privasi</Text> Ejakmakan.
              </Text>
            </Pressable>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={14} color={colors.danger} />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Submit */}
            <Pressable
              accessibilityRole="button"
              onPress={handleRegister}
              style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
            >
              <Text style={styles.submitBtnText}>Daftar & Atur Preferensi</Text>
              <Icon name="arrow-forward" size={16} color={colors.textWhite} />
            </Pressable>
          </View>

          {/* Switch to Login */}
          <View style={styles.loginPrompt}>
            <Text style={styles.promptText}>Sudah memiliki akun?</Text>
            <Pressable onPress={onGoToLogin}>
              <Text style={styles.promptLink}> Masuk di Sini</Text>
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
    marginBottom: 20,
    maxWidth: 320,
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
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    marginTop: -6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  barDefault: {
    backgroundColor: colors.border,
  },
  barWeak: {
    backgroundColor: colors.danger,
  },
  barMedium: {
    backgroundColor: colors.gold,
  },
  barStrong: {
    backgroundColor: colors.green,
  },
  strengthText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    width: 44,
    textAlign: 'right',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  submitBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
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
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    padding: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 6,
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
