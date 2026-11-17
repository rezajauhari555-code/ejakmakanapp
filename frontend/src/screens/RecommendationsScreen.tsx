import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { DestinationCard } from '../components/home/DestinationCard';
import { SpinResultModal } from '../components/spinwheel/SpinResultModal';
import { SpinWheel } from '../components/spinwheel/SpinWheel';
import {
  CulinaryDestination,
  SpinFilterConfig,
  SpinWheelOption,
} from '../types';

interface RecommendationsScreenProps {
  destinations: CulinaryDestination[];
  savedIds: string[];
  filterConfig: SpinFilterConfig;
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: CulinaryDestination) => void;
  onOpenSpinHelper: () => void;
  onExploreMapCategory: (category: string) => void;
  onBack: () => void;
}

export function RecommendationsScreen({
  destinations,
  savedIds,
  filterConfig,
  onToggleSave,
  onSelectDestination,
  onOpenSpinHelper,
  onExploreMapCategory,
  onBack,
}: RecommendationsScreenProps) {
  const [lastResult, setLastResult] = useState<SpinWheelOption | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSpinEnd(selected: SpinWheelOption) {
    setLastResult(selected);
    setModalVisible(true);
  }

  // Related culinary spots matching the last spin result (or top destinations)
  const relatedDestinations = destinations.filter((dest) => {
    if (!lastResult) return true;
    return (
      dest.category === lastResult.category ||
      dest.tags.some((t) => t.toLowerCase().includes(lastResult.label.toLowerCase()))
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header
        title="Roda Rekomendasi Rasa"
        onBack={onBack}
        rightAction={{
          icon: 'options-outline',
          onPress: onOpenSpinHelper,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Helper Top Bar Alert / Banner */}
        <Pressable
          accessibilityRole="button"
          onPress={onOpenSpinHelper}
          style={({ pressed }) => [styles.helperBanner, pressed && styles.helperBannerPressed]}
        >
          <View style={styles.helperIconCircle}>
            <Icon name="options" size={18} color={colors.primary} />
          </View>
          <View style={styles.helperTextContainer}>
            <Text style={styles.helperTitle}>Spin Helper Aktif</Text>
            <Text style={styles.helperSubtitle}>
              {filterConfig.activeOptions.length} Opsi Roda · Mood: {filterConfig.mood} · {filterConfig.budget}
            </Text>
          </View>
          <View style={styles.helperArrow}>
            <Text style={styles.helperActionText}>Atur</Text>
            <Icon name="chevron-forward" size={16} color={colors.primary} />
          </View>
        </Pressable>

        {/* Title & Microcopy */}
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>PUTAR UNTUK REKOMENDASI INSTAN</Text>
          <Text style={styles.title}>Bingung Mau Makan Apa?</Text>
          <Text style={styles.subtitle}>
            Tekan tombol PUTAR di tengah roda dan biarkan roda keberuntungan menentukan santapan lezatmu hari ini!
          </Text>
        </View>

        {/* The Animated SpinWheel */}
        <SpinWheel
          options={filterConfig.activeOptions}
          onSpinEnd={handleSpinEnd}
        />

        {/* Results Banner if already spun */}
        {lastResult ? (
          <View style={styles.currentResultCard}>
            <View style={styles.currentResultHeader}>
              <View style={[styles.resultPill, { backgroundColor: lastResult.color }]}>
                <Icon
                  name={lastResult.icon as React.ComponentProps<typeof Icon>['name']}
                  size={14}
                  color={lastResult.textColor}
                />
                <Text style={styles.resultPillText}>{lastResult.label}</Text>
              </View>
              <Pressable
                onPress={() => onExploreMapCategory(lastResult.category)}
                style={styles.openMapPill}
              >
                <Text style={styles.openMapPillText}>Cari di Peta</Text>
                <Icon name="arrow-forward" size={12} color={colors.primary} />
              </Pressable>
            </View>

            <Text style={styles.resultDishTitle}>{lastResult.suggestedDish}</Text>
            <Text style={styles.resultDescription}>{lastResult.description}</Text>
          </View>
        ) : null}

        {/* Curated Culinary Spots for Inspiration */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {lastResult ? `Spot Relevan: ${lastResult.label}` : 'Destinasi Kuliner Rekomendasi'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              Pilihan sentra kuliner terbaik yang siap kamu kunjungi
            </Text>
          </View>
        </View>

        <View style={styles.destinationsList}>
          {relatedDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSaved={savedIds.includes(dest.id)}
              onPress={() => onSelectDestination(dest)}
              onToggleSave={() => onToggleSave(dest.id)}
              variant="compact"
            />
          ))}
        </View>
      </ScrollView>

      {/* Result Modal */}
      <SpinResultModal
        visible={modalVisible}
        result={lastResult}
        onClose={() => setModalVisible(false)}
        onExploreMap={onExploreMapCategory}
        onSpinAgain={() => {
          setModalVisible(false);
        }}
      />
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
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  helperBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  helperBannerPressed: {
    opacity: 0.9,
  },
  helperIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  helperTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  helperSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  helperArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  helperActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 6,
  },
  eyebrow: {
    fontSize: 10,
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
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
    maxWidth: 320,
  },
  currentResultCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  currentResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  resultPillText: {
    color: colors.textOnPrimary,
    fontSize: 11,
    fontWeight: '800',
  },
  openMapPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  openMapPillText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  resultDishTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  resultDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  sectionHeader: {
    width: '100%',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  destinationsList: {
    width: '100%',
  },
});

