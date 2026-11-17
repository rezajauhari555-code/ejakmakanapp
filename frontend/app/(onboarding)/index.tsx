import React, { useState } from 'react';
import {
  Image,
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

interface OnboardingScreenProps {
  onStart: () => void;
  onSkip: () => void;
  onLogin: () => void;
}

const ONBOARDING_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900',
    tag: 'KULINER BANDUNG TERBAIK',
    title: 'Temukan Rasa Terbaik\ndi Sekitarmu',
    subtitle:
      'Jelajahi sentra kopi artisan Dipatiukur, bakmi legendaris Cihapit, hingga iga bakar cobek khas Kota Kembang.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900',
    tag: 'SPIN & DECIDE ROULETTE',
    title: 'Bingung Mau Makan?\nPutar Roda Rasa',
    subtitle:
      'Gunakan fitur roulette kuliner pintar untuk memilih santapan yang pas dengan suasana hati dan budget harianmu.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900',
    tag: 'NAVIGASI PETA PRESISI',
    title: 'Peta Interaktif &\nReservasi Mudah',
    subtitle:
      'Dapatkan rute langsung Apple Maps/Google Maps dan hubungi resto favoritmu lewat WhatsApp dalam satu ketukan.',
  },
];

export default function OnboardingScreen({
  onStart,
  onSkip,
  onLogin,
}: OnboardingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);

  function handleNext() {
    if (activeStep < ONBOARDING_SLIDES.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onStart();
    }
  }

  const slide = ONBOARDING_SLIDES[activeStep];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header: Clean Brand & Skip button ONLY (NO BACK BUTTON) */}
        <View style={styles.topHeader}>
          <View style={styles.brandBadge}>
            <View style={styles.brandIconBox}>
              <Icon name="restaurant" size={16} color={colors.textWhite} />
            </View>
            <Text style={styles.brandName}>Ejakmakan</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onSkip}
            hitSlop={10}
            style={({ pressed }) => [styles.skipBtn, pressed && styles.pressed]}
          >
            <Text style={styles.skipBtnText}>Lewati</Text>
          </Pressable>
        </View>

        {/* Clean Hero Visual Showcase */}
        <View style={styles.imageCard}>
          <Image source={{ uri: slide.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>{slide.tag}</Text>
          </View>
        </View>

        {/* Text Section (Single cleanly formatted copy without duplication) */}
        <View style={styles.contentSection}>
          <Text style={styles.headline}>{slide.title}</Text>
          <Text style={styles.description}>{slide.subtitle}</Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>
            {ONBOARDING_SLIDES.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, idx === activeStep && styles.dotActive]}
              />
            ))}
          </View>

          {/* CTA Primary Action */}
          <Pressable
            accessibilityRole="button"
            onPress={handleNext}
            style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}
          >
            <Text style={styles.ctaButtonText}>
              {activeStep === ONBOARDING_SLIDES.length - 1
                ? 'Mulai Petualangan Kuliner'
                : 'Lanjutkan'}
            </Text>
            <Icon name="arrow-forward" size={18} color={colors.textWhite} />
          </Pressable>

          {/* Login Option */}
          <Pressable onPress={onLogin} style={styles.loginOption}>
            <Text style={styles.loginOptionText}>
              Sudah memiliki akun? <Text style={styles.loginOptionBold}>Masuk di Sini</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 36,
    alignItems: 'center',
  },
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primaryDark,
    letterSpacing: -0.3,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skipBtnText: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
  },
  imageCard: {
    width: '100%',
    height: 290,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: 'rgba(0, 93, 167, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  imageBadgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: typography.fontWeight.extrabold,
    letterSpacing: 0.8,
  },
  contentSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 26,
  },
  headline: {
    fontSize: 27,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 320,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
    marginBottom: 26,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  ctaButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  loginOption: {
    marginTop: 18,
    paddingVertical: 6,
  },
  loginOptionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  loginOptionBold: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
