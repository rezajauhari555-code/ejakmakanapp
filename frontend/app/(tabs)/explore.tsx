import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { Icon } from '../../src/components/common/Icon';
import { Header } from '../../src/components/ui/Header';
import { RestaurantCard } from '../../src/components/ui/RestaurantCard';
import { RestaurantMap } from '../../src/features/map/RestaurantMap';
import { BANDUNG_RESTAURANTS } from '../../src/services/mockData';
import { CulinaryCategory, Restaurant } from '../../src/types';
import { useAppStore } from '../../src/store/useAppStore';

interface ExploreScreenProps {
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  onNavigateToSpin?: () => void;
  onNavigateToProfile?: () => void;
}

const CATEGORIES: CulinaryCategory[] = [
  'Semua',
  'Kopi & Cafe WFC',
  'Bakmi & Street Food',
  'Daging & Grill',
  'Pastry & Bakery',
  'Nusantara & Sunda',
  'Western & Dessert',
];

export default function ExploreScreen({
  onSelectRestaurant,
  onNavigateToSpin,
  onNavigateToProfile,
}: ExploreScreenProps) {
  const {
    favorites,
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useAppStore();

  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const filteredRestaurants = useMemo(() => {
    return BANDUNG_RESTAURANTS.filter((r) => {
      const matchCategory =
        selectedCategory === 'Semua' || r.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        (r.editorChoiceMenu || []).some((m) => m.name.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Figma Header: Clean, No Back Button, Profile Avatar in Top-Right */}
      <Header
        showLogo
        onPressProfile={onNavigateToProfile}
        showBackButton={false}
      />

      {/* Search & Mode Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={18} color={colors.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Kopi Sapa, Bakmi, Iga Bakar..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
              <Icon name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Map / List toggle */}
        <Pressable
          accessibilityRole="button"
          onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          style={styles.toggleViewBtn}
        >
          <Icon
            name={viewMode === 'map' ? 'list-outline' : 'map-outline'}
            size={20}
            color={colors.primary}
          />
        </Pressable>
      </View>

      {/* Category Horizontal Chips */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                accessibilityRole="button"
                onPress={() => setSelectedCategory(cat)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content: Map View or Scrollable List */}
      {viewMode === 'map' ? (
        <View style={styles.mapWrapper}>
          <RestaurantMap
            restaurants={filteredRestaurants}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectRestaurant={(r) => {
              if (onSelectRestaurant) onSelectRestaurant(r);
            }}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.listWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Spin Promo Banner */}
          <Pressable
            accessibilityRole="button"
            onPress={onNavigateToSpin}
            style={({ pressed }) => [styles.rouletteBanner, pressed && styles.pressed]}
          >
            <View style={styles.rouletteBannerIcon}>
              <Icon name="sparkles" size={24} color={colors.white} />
            </View>
            <View style={styles.rouletteBannerContent}>
              <Text style={styles.rouletteBannerTitle}>Bingung Mau Makan Apa?</Text>
              <Text style={styles.rouletteBannerSub}>
                Coba Spin & Decide untuk memilih kuliner terbaik hari ini
              </Text>
            </View>
            <Icon name="arrow-forward" size={18} color={colors.primary} />
          </Pressable>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Rekomendasi di Bandung ({filteredRestaurants.length})
            </Text>
            <Text style={styles.sectionSub}>Berdasarkan rating & preferensimu</Text>
          </View>

          {/* Vertical List */}
          {filteredRestaurants.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Icon name="search-outline" size={44} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Tidak ada restoran ditemukan</Text>
              <Text style={styles.emptySub}>Coba cari dengan kata kunci lain atau pilih Semua kategori.</Text>
            </View>
          ) : (
            filteredRestaurants.map((resto) => (
              <RestaurantCard
                key={resto.id}
                restaurant={resto}
                variant="list"
                isFavorite={favorites.includes(resto.id)}
                onPress={() => onSelectRestaurant?.(resto)}
                onToggleFavorite={() => toggleFavorite(resto.id)}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 10,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  toggleViewBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryContainer: {
    paddingBottom: 8,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    ...typography.labelMedium,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  mapWrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 14,
  },
  rouletteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
  },
  rouletteBannerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteBannerContent: {
    flex: 1,
  },
  rouletteBannerTitle: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  rouletteBannerSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 6,
    marginBottom: 4,
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
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  emptySub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
