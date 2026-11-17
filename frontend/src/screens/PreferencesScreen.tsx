import React from 'react';
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
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { CUISINES, MOODS } from '../services/culinaryData';

interface PreferencesScreenProps {
  selectedCuisines: string[];
  selectedMoods: string[];
  onToggleCuisine: (cuisine: string) => void;
  onToggleMood: (mood: string) => void;
  onFinish: () => void;
  onBack?: () => void;
}

export function PreferencesScreen({
  selectedCuisines,
  selectedMoods,
  onToggleCuisine,
  onToggleMood,
  onFinish,
  onBack,
}: PreferencesScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Preferensi Rasa" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeRow}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>LANGKAH PERSONALISASI</Text>
          </View>
        </View>

        <Text style={styles.title}>Ceritakan Selera Kulinermu 🍜</Text>
        <Text style={styles.subtitle}>
          Kami akan menggunakan preferensi ini untuk menyaring roda rekomendasi dan spot kuliner yang paling cocok untukmu.
        </Text>

        {/* Section 1: Cuisines */}
        <View style={styles.sectionHeader}>
          <Icon name="restaurant" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Kategori Makanan Favorit</Text>
        </View>

        <View style={styles.chipsContainer}>
          {CUISINES.map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <Pressable
                key={cuisine}
                accessibilityRole="button"
                onPress={() => onToggleCuisine(cuisine)}
                style={[styles.chip, isSelected && styles.chipActive]}
              >
                <Icon
                  name={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
                  size={16}
                  color={isSelected ? colors.primary : colors.textMuted}
                />
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                  {cuisine}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Section 2: Moods */}
        <View style={styles.sectionHeader}>
          <Icon name="happy" size={18} color={colors.accentOrange} />
          <Text style={styles.sectionTitle}>Suasana / Vibe yang Dicari</Text>
        </View>

        <View style={styles.chipsContainer}>
          {MOODS.map((mood) => {
            const isSelected = selectedMoods.includes(mood);
            return (
              <Pressable
                key={mood}
                accessibilityRole="button"
                onPress={() => onToggleMood(mood)}
                style={[styles.chip, isSelected && styles.chipActive]}
              >
                <Icon
                  name={isSelected ? 'checkmark-circle' : 'sparkles-outline'}
                  size={16}
                  color={isSelected ? colors.primary : colors.textMuted}
                />
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                  {mood}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Visual Inspirations */}
        <View style={styles.imageGrid}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' }}
            style={styles.gridImage}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600' }}
            style={styles.gridImage}
          />
        </View>

        {/* Action Button */}
        <Button
          title="Terapkan & Mulai Eksplorasi"
          onPress={onFinish}
          icon="arrow-forward"
          variant="primary"
          style={styles.finishButton}
        />
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
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  stepBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  chipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    marginBottom: 24,
  },
  gridImage: {
    flex: 1,
    height: 100,
    borderRadius: 14,
  },
  finishButton: {
    width: '100%',
  },
});

