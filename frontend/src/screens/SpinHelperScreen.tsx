import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Button } from '../components/common/Button';
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { DEFAULT_SPIN_OPTIONS, MOODS } from '../services/culinaryData';
import { SpinFilterConfig, SpinWheelOption } from '../types';

interface SpinHelperScreenProps {
  currentConfig: SpinFilterConfig;
  onApplyConfig: (config: SpinFilterConfig) => void;
  onBack: () => void;
}

const BUDGET_OPTIONS: SpinFilterConfig['budget'][] = [
  'Semua',
  'Hemat (< 25k)',
  'Sedang (25k - 60k)',
  'Puas (> 60k)',
];

export function SpinHelperScreen({
  currentConfig,
  onApplyConfig,
  onBack,
}: SpinHelperScreenProps) {
  const [budget, setBudget] = useState(currentConfig.budget);
  const [mood, setMood] = useState(currentConfig.mood);
  const [halalOnly, setHalalOnly] = useState(currentConfig.halalOnly);
  const [activeOptions, setActiveOptions] = useState<SpinWheelOption[]>(
    currentConfig.activeOptions,
  );

  function toggleOption(option: SpinWheelOption) {
    const exists = activeOptions.some((o) => o.id === option.id);
    if (exists) {
      if (activeOptions.length <= 2) {
        // Keep at least 2 options for a functional wheel
        return;
      }
      setActiveOptions(activeOptions.filter((o) => o.id !== option.id));
    } else {
      setActiveOptions([...activeOptions, option]);
    }
  }

  function applyPreset(presetType: 'hemat' | 'cafe' | 'dinner' | 'all') {
    if (presetType === 'hemat') {
      setBudget('Hemat (< 25k)');
      setMood('Makan Cepat');
      setActiveOptions(
        DEFAULT_SPIN_OPTIONS.filter((o) =>
          ['spin-1', 'spin-2', 'spin-4', 'spin-7'].includes(o.id),
        ),
      );
    } else if (presetType === 'cafe') {
      setBudget('Sedang (25k - 60k)');
      setMood('Nongkrong Santai');
      setActiveOptions(
        DEFAULT_SPIN_OPTIONS.filter((o) =>
          ['spin-3', 'spin-6', 'spin-8'].includes(o.id),
        ),
      );
    } else if (presetType === 'dinner') {
      setBudget('Puas (> 60k)');
      setMood('Date Night');
      setActiveOptions(
        DEFAULT_SPIN_OPTIONS.filter((o) =>
          ['spin-4', 'spin-5', 'spin-6', 'spin-7'].includes(o.id),
        ),
      );
    } else {
      setBudget('Semua');
      setMood('Nongkrong Santai');
      setActiveOptions(DEFAULT_SPIN_OPTIONS);
    }
  }

  function handleSave() {
    onApplyConfig({
      budget,
      mood,
      radiusKm: currentConfig.radiusKm,
      halalOnly,
      activeOptions,
    });
    onBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header
        title="Spin Helper"
        subtitle="Kustomisasi Roda Rekomendasi"
        onBack={onBack}
        rightAction={{
          icon: 'refresh-outline',
          onPress: () => applyPreset('all'),
        }}
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Preset Shortcuts */}
        <Text style={styles.sectionTitle}>Preset Cepat</Text>
        <Text style={styles.sectionSubtitle}>Pilih preset suasana untuk konfigurasi otomatis</Text>

        <View style={styles.presetGrid}>
          <Pressable
            accessibilityRole="button"
            onPress={() => applyPreset('hemat')}
            style={styles.presetCard}
          >
            <View style={[styles.presetIcon, { backgroundColor: colors.accentOrangeSoft }]}>
              <Icon name="cash" size={20} color={colors.accentOrange} />
            </View>
            <Text style={styles.presetTitle}>Makan Hemat</Text>
            <Text style={styles.presetDesc}>Nasi, Mie, Street Food</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => applyPreset('cafe')}
            style={styles.presetCard}
          >
            <View style={[styles.presetIcon, { backgroundColor: colors.primaryLight }]}>
              <Icon name="cafe" size={20} color={colors.primary} />
            </View>
            <Text style={styles.presetTitle}>Nongkrong & Kafe</Text>
            <Text style={styles.presetDesc}>Kopi, Burger, Dessert</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => applyPreset('dinner')}
            style={styles.presetCard}
          >
            <View style={[styles.presetIcon, { backgroundColor: colors.accentPurpleSoft }]}>
              <Icon name="wine" size={20} color={colors.accentPurple} />
            </View>
            <Text style={styles.presetTitle}>Spesial & Dinner</Text>
            <Text style={styles.presetDesc}>Ramen, Grill, Western</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => applyPreset('all')}
            style={styles.presetCard}
          >
            <View style={[styles.presetIcon, { backgroundColor: colors.accentGreenSoft }]}>
              <Icon name="sparkles" size={20} color={colors.accentGreen} />
            </View>
            <Text style={styles.presetTitle}>Semua Selera</Text>
            <Text style={styles.presetDesc}>8 Pilihan Lengkap</Text>
          </Pressable>
        </View>

        {/* Budget Filter */}
        <Text style={styles.sectionTitle}>Target Budget</Text>
        <View style={styles.pillRow}>
          {BUDGET_OPTIONS.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              onPress={() => setBudget(item)}
              style={[styles.filterPill, budget === item && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, budget === item && styles.filterPillTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Mood Filter */}
        <Text style={styles.sectionTitle}>Suasana / Vibe</Text>
        <View style={styles.pillRow}>
          {MOODS.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              onPress={() => setMood(item)}
              style={[styles.filterPill, mood === item && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, mood === item && styles.filterPillTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Halal Toggle */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <View style={styles.halalBadge}>
              <Icon name="shield-checkmark" size={16} color={colors.accentGreen} />
              <Text style={styles.halalBadgeText}>Kurasi Khusus</Text>
            </View>
            <Text style={styles.toggleTitle}>Prioritaskan Kuliner Halal</Text>
            <Text style={styles.toggleDesc}>Hanya sertakan menu dan spot kuliner bersertifikasi/bebas babi</Text>
          </View>
          <Switch
            value={halalOnly}
            onValueChange={setHalalOnly}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
          />
        </View>

        {/* Active Wheel Slices Manager */}
        <View style={styles.slicesHeader}>
          <Text style={styles.sectionTitle}>Kelola Segmen Roda Putar</Text>
          <View style={styles.sliceCountBadge}>
            <Text style={styles.sliceCountText}>{activeOptions.length} Aktif</Text>
          </View>
        </View>
        <Text style={styles.sectionSubtitle}>
          Aktifkan atau nonaktifkan kategori yang ingin dimasukkan ke dalam roda rekomendasi
        </Text>

        <View style={styles.slicesList}>
          {DEFAULT_SPIN_OPTIONS.map((opt) => {
            const isActive = activeOptions.some((o) => o.id === opt.id);
            return (
              <Pressable
                key={opt.id}
                accessibilityRole="button"
                onPress={() => toggleOption(opt)}
                style={[styles.sliceItem, isActive && styles.sliceItemActive]}
              >
                <View style={[styles.sliceColorSquare, { backgroundColor: opt.color }]}>
                  <Icon
                    name={opt.icon as React.ComponentProps<typeof Icon>['name']}
                    size={16}
                    color={opt.textColor}
                  />
                </View>
                <View style={styles.sliceItemInfo}>
                  <Text style={styles.sliceItemTitle}>{opt.label}</Text>
                  <Text style={styles.sliceItemDesc} numberOfLines={1}>
                    {opt.suggestedDish}
                  </Text>
                </View>
                <Icon
                  name={isActive ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={isActive ? colors.primary : colors.textMuted}
                />
              </Pressable>
            );
          })}
        </View>

        {/* Action Button */}
        <Button
          title="Terapkan ke Roda Rekomendasi"
          onPress={handleSave}
          icon="checkmark-circle"
          variant="primary"
          style={styles.applyButton}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 18,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  presetCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  presetIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  presetTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  presetDesc: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  filterPill: {
    backgroundColor: colors.card,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterPillTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: 20,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 10,
  },
  halalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  halalBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentGreen,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  toggleDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  slicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  sliceCountBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sliceCountText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  slicesList: {
    gap: 8,
    marginTop: 6,
  },
  sliceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
  },
  sliceItemActive: {
    borderColor: colors.primaryLight,
  },
  sliceColorSquare: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sliceItemInfo: {
    flex: 1,
  },
  sliceItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sliceItemDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  applyButton: {
    marginTop: 26,
  },
});

