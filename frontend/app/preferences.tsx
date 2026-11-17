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
import { colors } from '../src/theme/colors';
import { typography } from '../src/theme/typography';
import { Icon } from '../src/components/common/Icon';
import { useAppStore } from '../src/store/useAppStore';

interface PreferencesScreenProps {
  onSave?: () => void;
  onSkip?: () => void;
}

const CATEGORY_OPTIONS = [
  { id: 'Kopi & Cafe WFC', label: 'Kopi & Cafe WFC', icon: 'cafe-outline', desc: 'Suasana tenang & Wi-Fi kencang' },
  { id: 'Bakmi & Street Food', label: 'Bakmi & Street Food', icon: 'restaurant-outline', desc: 'Kuliner jalanan & mie autentik' },
  { id: 'Daging & Grill', label: 'Daging & Grill', icon: 'flame-outline', desc: 'Steak, BBQ & iga bakar cobek' },
  { id: 'Pastry & Bakery', label: 'Pastry & Bakery', icon: 'nutrition-outline', desc: 'Croissant hangat & artisan bread' },
  { id: 'Nusantara & Sunda', label: 'Nusantara & Sunda', icon: 'leaf-outline', desc: 'Sambal lalap & masakan khas daerah' },
  { id: 'Western & Dessert', label: 'Western & Dessert', icon: 'ice-cream-outline', desc: 'Pasta, gelato & hidangan manis' },
];

const BUDGET_OPTIONS: Array<{ id: '<30rb' | '30rb-75rb' | '>75rb'; label: string; desc: string }> = [
  { id: '<30rb', label: '< Rp 30.000', desc: 'Hemat & ramah kantong' },
  { id: '30rb-75rb', label: 'Rp 30rb - 75rb', desc: 'Standar kafe & resto' },
  { id: '>75rb', label: '> Rp 75.000', desc: 'Fine dining & premium' },
];

export default function PreferencesScreen({ onSave, onSkip }: PreferencesScreenProps) {
  const { preferences, setPreferences } = useAppStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preferences.selectedCategories || ['Kopi & Cafe WFC', 'Bakmi & Street Food']
  );
  const [budget, setBudget] = useState<'<30rb' | '30rb-75rb' | '>75rb'>(
    preferences.budget === 'Semua' ? '30rb-75rb' : (preferences.budget as any)
  );
  const [halalOnly, setHalalOnly] = useState<boolean>(preferences.halalOnly ?? true);
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(preferences.vegetarianOnly ?? false);

  function toggleCategory(catId: string) {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  }

  function handleSavePreferences() {
    setPreferences({
      selectedCategories,
      budget,
      halalOnly,
      vegetarianOnly,
      mood: preferences.mood || 'Nongkrong Santai',
    });
    if (onSave) {
      onSave();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>LANGKAH TERAKHIR</Text>
          </View>
          <Text style={styles.title}>Personalisasi Seleramu</Text>
          <Text style={styles.subtitle}>
            Bantu AI Ejakmakan merekomendasikan spot kuliner Bandung yang paling cocok dengan lidah dan gaya hidupmu.
          </Text>
        </View>

        {/* Section 1: Kategori Favorit */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Pilih Kategori Favorit</Text>
            <Text style={styles.sectionHint}>Pilih min. 1</Text>
          </View>

          <View style={styles.categoryGrid}>
            {CATEGORY_OPTIONS.map((item) => {
              const isSelected = selectedCategories.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  onPress={() => toggleCategory(item.id)}
                  style={({ pressed }) => [
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIconCircle,
                      isSelected && styles.categoryIconCircleSelected,
                    ]}
                  >
                    <Icon
                      name={item.icon as any}
                      size={20}
                      color={isSelected ? colors.white : colors.primary}
                    />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text
                      style={[
                        styles.categoryLabel,
                        isSelected && styles.categoryLabelSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={styles.categoryDesc}>{item.desc}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Icon name="checkmark" size={14} color={colors.white} />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Section 2: Preferensi Khusus & Pantangan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferensi Khusus & Diet</Text>

          <View style={styles.toggleCard}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconWrap}>
                <Icon name="shield-checkmark-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.toggleTextWrap}>
                <Text style={styles.toggleLabel}>Hanya Tempat Makan Halal</Text>
                <Text style={styles.toggleSub}>Prioritaskan sertifikasi & bebas bahan non-halal</Text>
              </View>
              <Switch
                value={halalOnly}
                onValueChange={setHalalOnly}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleIconWrap}>
                <Icon name="leaf-outline" size={20} color="#2E7D32" />
              </View>
              <View style={styles.toggleTextWrap}>
                <Text style={styles.toggleLabel}>Vegetarian / Bebas Daging</Text>
                <Text style={styles.toggleSub}>Tampilkan opsi ramah nabati & sayuran segar</Text>
              </View>
              <Switch
                value={vegetarianOnly}
                onValueChange={setVegetarianOnly}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        {/* Section 3: Rentang Budget Harian */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Rata-Rata Sekali Makan</Text>
          <View style={styles.budgetRow}>
            {BUDGET_OPTIONS.map((b) => {
              const isSelected = budget === b.id;
              return (
                <Pressable
                  key={b.id}
                  accessibilityRole="button"
                  onPress={() => setBudget(b.id)}
                  style={({ pressed }) => [
                    styles.budgetCard,
                    isSelected && styles.budgetCardSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.budgetLabel,
                      isSelected && styles.budgetLabelSelected,
                    ]}
                  >
                    {b.label}
                  </Text>
                  <Text
                    style={[
                      styles.budgetDesc,
                      isSelected && styles.budgetDescSelected,
                    ]}
                  >
                    {b.desc}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            onPress={handleSavePreferences}
            style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
          >
            <Text style={styles.submitBtnText}>Simpan Preferensi & Mulai Eksplorasi</Text>
            <Icon name="arrow-forward" size={18} color={colors.white} />
          </Pressable>

          {onSkip && (
            <Pressable
              accessibilityRole="button"
              onPress={onSkip}
              style={({ pressed }) => [styles.skipBtn, pressed && styles.pressed]}
            >
              <Text style={styles.skipBtnText}>Atur Nanti Saja</Text>
            </Pressable>
          )}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  stepBadgeText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionHint: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  categoryGrid: {
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainer,
  },
  categoryIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconCircleSelected: {
    backgroundColor: colors.primary,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryLabel: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  categoryLabelSelected: {
    color: colors.primary,
  },
  categoryDesc: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toggleTextWrap: {
    flex: 1,
  },
  toggleLabel: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  toggleSub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 4,
  },
  budgetRow: {
    flexDirection: 'row',
    gap: 10,
  },
  budgetCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    alignItems: 'center',
  },
  budgetCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainer,
  },
  budgetLabel: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
  budgetLabelSelected: {
    color: colors.primary,
  },
  budgetDesc: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  budgetDescSelected: {
    color: colors.primaryDark,
  },
  footer: {
    marginTop: 12,
    gap: 12,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  submitBtnText: {
    ...typography.labelLarge,
    color: colors.white,
    fontWeight: '700',
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipBtnText: {
    ...typography.bodyMedium,
    color: colors.textMuted,
  },
  pressed: {
    opacity: 0.85,
  },
});
