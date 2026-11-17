import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/common/Icon';
import { UserProfile } from '../../types';

interface WhatsAppOtpModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export function WhatsAppOtpModal({ visible, onClose, onSuccess }: WhatsAppOtpModalProps) {
  const [step, setStep] = useState<'input-phone' | 'input-otp'>('input-phone');
  const [phone, setPhone] = useState('081234567890');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 'input-otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  function handleSendOtp() {
    if (phone.trim().length < 9) {
      setErrorMsg('Masukkan nomor WhatsApp yang valid');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('input-otp');
      setTimer(30);
    }, 800);
  }

  function handleVerifyOtp() {
    if (otpCode !== '123456') {
      setErrorMsg('Kode OTP salah. Gunakan kode demo: 123456');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setLoading(false);
      const user: UserProfile = {
        id: 'user-wa-' + Date.now(),
        name: 'Dimas Pratama (WA User)',
        email: 'dimas.wa@ejakmakan.id',
        phone: phone.trim(),
        foodieLevel: 4,
        foodieTitle: 'Food Connoisseur',
        xpCurrent: 850,
        xpMax: 1000,
        avatarInitials: 'DP',
        reviewsCount: 32,
        photosCount: 124,
        collectionsCount: 18,
        provider: 'whatsapp',
      };
      onSuccess(user);
    }, 600);
  }

  function handleResend() {
    if (timer > 0) return;
    setTimer(30);
    setErrorMsg('');
    setOtpCode('');
  }

  function handleReset() {
    setStep('input-phone');
    setOtpCode('');
    setErrorMsg('');
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleReset}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Icon name="logo-whatsapp" size={30} color={colors.textWhite} />
          </View>

          <Text style={styles.title}>
            {step === 'input-phone' ? 'Masuk via WhatsApp' : 'Verifikasi Kode OTP'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 'input-phone'
              ? 'Kami akan mengirimkan 6 digit kode keamanan ke nomor WhatsApp Anda.'
              : `Kode telah dikirim ke ${phone}. (Kode Demo: 123456)`}
          </Text>

          {step === 'input-phone' ? (
            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.countryCode}>+62</Text>
                <TextInput
                  value={phone.startsWith('0') ? phone.slice(1) : phone}
                  onChangeText={(val) => {
                    setPhone('0' + val.replace(/\D/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  keyboardType="phone-pad"
                  placeholder="812-3456-7890"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                />
              </View>

              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

              <Pressable
                accessibilityRole="button"
                onPress={handleSendOtp}
                disabled={loading}
                style={styles.primaryBtn}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textWhite} size="small" />
                ) : (
                  <Text style={styles.primaryBtnText}>Kirim Kode OTP</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <TextInput
                value={otpCode}
                onChangeText={(val) => {
                  setOtpCode(val.trim());
                  if (errorMsg) setErrorMsg('');
                }}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="123456"
                placeholderTextColor={colors.textMuted}
                style={styles.otpInput}
                autoFocus
              />

              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

              <Pressable
                accessibilityRole="button"
                onPress={handleVerifyOtp}
                disabled={loading || otpCode.length < 6}
                style={[styles.primaryBtn, otpCode.length < 6 && styles.disabledBtn]}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textWhite} size="small" />
                ) : (
                  <Text style={styles.primaryBtnText}>Verifikasi & Masuk</Text>
                )}
              </Pressable>

              <Pressable
                onPress={handleResend}
                disabled={timer > 0}
                style={styles.resendBtn}
              >
                <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
                  {timer > 0 ? `Kirim ulang dalam ${timer}s` : 'Kirim Ulang Kode OTP'}
                </Text>
              </Pressable>
            </View>
          )}

          <Pressable onPress={handleReset} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Batal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
    borderWidth: 4,
    borderColor: colors.card,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textPrimary,
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    backgroundColor: colors.bgMain,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.textPrimary,
  },
  otpInput: {
    height: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceSoft,
    fontSize: 22,
    fontWeight: typography.fontWeight.extrabold,
    textAlign: 'center',
    letterSpacing: 10,
    color: colors.primaryDark,
  },
  primaryBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  resendBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  resendText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  resendTextDisabled: {
    color: colors.textMuted,
  },
  cancelBtn: {
    marginTop: 10,
    paddingVertical: 6,
  },
  cancelText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.semibold,
  },
  errorText: {
    fontSize: 11,
    color: colors.danger,
    textAlign: 'center',
  },
});

