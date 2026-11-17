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
import { colors } from '../theme/colors';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900',
    eyebrow: 'TEMUKAN RASA TERBAIK',
    title: 'Eksplorasi Kuliner\nLegendaris & Hits',
    subtitle:
      'Jelajahi sentra kuliner terbaik di kotamu, dari hidangan jalanan legendaris hingga spot kafe modern terpopuler.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900',
    eyebrow: 'BINGUNG MAU MAKAN APA?',
    title: 'Putar Roda Rasa,\nPilih Tanpa Ragu',
    subtitle:
      'Gunakan fitur Roda Rekomendasi pintar dan Spin Helper untuk menentukan menu makan sesuai selera dan budgetmu.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900',
    eyebrow: 'NAVIGASI KULINER MUDAH',
    title: 'Peta Interaktif &\nSpot Favorit',
    subtitle:
      'Lihat lokasi kuliner akurat di peta nyata, simpan tempat favorit, dan dapatkan rute langsung ke tempat tujuan.',
  },
];

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  function handleNext() {
    if (currentStep < SLIDES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  }

  const slide = SLIDES[currentStep];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandLogo}>
              <Icon name="restaurant" size={16} color={colors.textOnPrimary} />
            </View>
            <Text style={styles.brandName}>Ejakmakan</Text>
          </View>
          <Pressable onPress={onFinish} hitSlop={10}>
            <Text style={styles.skipButton}>Lewati</Text>
          </Pressable>
        </View>

        {/* Hero Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: slide.image }} style={styles.image} resizeMode="cover" />
        </View>

        {/* Text Content */}
        <View style={styles.content}>
          <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Buttons */}
          <Button
            title={currentStep === SLIDES.length - 1 ? 'Mulai Eksplorasi' : 'Lanjutkan'}
            onPress={handleNext}
            icon="arrow-forward"
            variant="primary"
            style={styles.nextButton}
          />

          <Pressable onPress={onFinish} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Sudah punya akun? <Text style={styles.loginLinkBold}>Masuk di sini</Text>
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
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    letterSpacing: -0.3,
  },
  skipButton: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  imageWrapper: {
    width: '100%',
    height: 290,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
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
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 8,
  },
  subtitle: {
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
    marginTop: 22,
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
  nextButton: {
    width: '100%',
    marginTop: 26,
  },
  loginLink: {
    marginTop: 18,
    paddingVertical: 6,
  },
  loginLinkText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: '800',
  },
});

