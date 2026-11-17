import React, { useState } from 'react';
import {
  Modal,
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
import { Header } from '../../src/components/ui/Header';
import { RestaurantCard } from '../../src/components/ui/RestaurantCard';
import { SpinRoulette } from '../../src/features/roulette/SpinRoulette';
import { BANDUNG_RESTAURANTS, ROULETTE_SPIN_OPTIONS } from '../../src/services/mockData';
import { Restaurant } from '../../src/types';
import { useAppStore } from '../../src/store/useAppStore';

interface RecommendationsScreenProps {
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  onNavigateToProfile?: () => void;
}

export default function RecommendationsScreen({
  onSelectRestaurant,
  onNavigateToProfile,
}: RecommendationsScreenProps) {
  const { preferences, setPreferences, favorites, toggleFavorite } = useAppStore();

  const [showHelperModal, setShowHelperModal] = useState(false);
  const [activeMood, setActiveMood] = useState(preferences.mood || 'Nongkrong Santai');
  const [activeBudget, setActiveBudget] = useState(preferences.budget || '30rb-75rb');
  const [halalOnly, setHalalOnly] = useState(preferences.halalOnly ?? true);

  const MOOD_OPTIONS = ['Nongkrong Santai', 'Makan Siang Cepat', 'Kencan Romantis', 'Makan Kenyang Keluarga'];
  const BUDGET_OPTIONS: Array<'Semua' | '<30rb' | '30rb-75rb' | '>75rb'> = ['Semua', '<30rb', '30rb-75rb', '>75rb'];

  // Top picks filtered by mood/preferences
  const topPicks = BANDUNG_RESTAURANTS.slice(0, 4);

  function handleSaveHelper() {
    setPreferences({
      ...preferences,
      mood: activeMood,
      budget: activeBudget,
      halalOnly,
    });
    setShowHelperModal(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header: Clean, No Back Button, Profile Avatar Top-Right */}
      <Header
        title="Spin & Rekomendasi"
        subtitle="Solusi AI saat bingung mau makan apa"
        onPressProfile={onNavigateToProfile}
        showBackButton={false}
        rightAction={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filter Spin Helper"
            onPress={() => setShowHelperModal(true)}
            style={({ pressed }) => [styles.helperFilterBtn, pressed && styles.pressed]}
          >
            <Icon name="options-outline" size={20} color={colors.primary} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Roulette Feature Box */}
        <View style={styles.rouletteBox}>
          <View style={styles.rouletteHeader}>
            <View style={styles.activePill}>
              <Icon name="compass-outline" size={14} color={colors.primary} />
              <Text style={styles.activePillText}>{activeMood}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowHelperModal(true)}
              style={styles.changeFilterBtn}
            >
              <Text style={styles.changeFilterText}>Ubah Kriteria</Text>
              <Icon name="chevron-forward" size={12} color={colors.primary} />
            </Pressable>
          </View>

          {/* Embedded Interactive Roulette */}
          <SpinRoulette
            options={ROULETTE_SPIN_OPTIONS}
            onOpenSpinHelper={() => setShowHelperModal(true)}
          />
        </View>

        {/* Section: Top Picks Hari Ini */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Top Picks Bandung Hari Ini</Text>
              <Text style={styles.sectionSub}>Sesuai tren kuliner & pilihan editor</Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{topPicks.length} Pilihan</Text>
            </View>
          </View>

          <View style={styles.cardList}>
            {topPicks.map((resto) => (
              <RestaurantCard
                key={resto.id}
                restaurant={resto}
                variant="list"
                isFavorite={favorites.includes(resto.id)}
                onPress={() => onSelectRestaurant?.(resto)}
                onToggleFavorite={() => toggleFavorite(resto.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Spin Helper Filter Modal */}
      <Modal
        visible={showHelperModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowHelperModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Spin Helper & Filter</Text>
                <Text style={styles.modalSub}>Sesuaikan putaran roda dengan kondisimu</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowHelperModal(false)}
                style={styles.modalCloseBtn}
              >
                <Icon name="close" size={20} color={colors.textPrimary} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
              {/* Mood Selector */}
              <Text style={styles.filterSectionTitle}>Suasana Hati (Mood)</Text>
              <View style={styles.chipRow}>
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = activeMood === mood;
                  return (
                    <Pressable
                      key={mood}
                      accessibilityRole="button"
                      onPress={() => setActiveMood(mood)}
                      style={[styles.filterChip, isSelected && styles.filterChipActive]}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          isSelected && styles.filterChipTextActive,
                        ]}
                      >
                        {mood}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Budget Selector */}
              <Text style={[styles.filterSectionTitle, { marginTop: 18 }]}>Rentang Budget</Text>
              <View style={styles.chipRow}>
                {BUDGET_OPTIONS.map((b) => {
                  const isSelected = activeBudget === b;
                  return (
                    <Pressable
                      key={b}
                      accessibilityRole="button"
                      onPress={() => setActiveBudget(b)}
                      style={[styles.filterChip, isSelected && styles.filterChipActive]}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          isSelected && styles.filterChipTextActive,
                        ]}
                      >
                        {b}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Halal Switch */}
              <View style={styles.halalRow}>
                <View style={styles.halalText}>
                  <Text style={styles.halalTitle}>Hanya Kuliner Halal</Text>
                  <Text style={styles.halalSub}>Hapus makanan non-halal dari putaran</Text>
                </View>
                <Switch
                  value={halalOnly}
                  onValueChange={setHalalOnly}
                  trackColor={{ false: colors.borderLight, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            </ScrollView>

            <Pressable
              accessibilityRole="button"
              onPress={handleSaveHelper}
              style={({ pressed }) => [styles.applyFilterBtn, pressed && styles.pressed]}
            >
              <Text style={styles.applyFilterText}>Terapkan Kriteria Spin</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 36,
  },
  helperFilterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  rouletteBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 16,
    marginBottom: 20,
  },
  rouletteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  activePillText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  changeFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeFilterText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  sectionSub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  badgeCount: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCountText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  cardList: {
    gap: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: {
    ...typography.titleLarge,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  modalSub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    ...typography.labelLarge,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  halalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  halalText: {
    flex: 1,
  },
  halalTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  halalSub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  applyFilterBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyFilterText: {
    ...typography.labelLarge,
    color: colors.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
