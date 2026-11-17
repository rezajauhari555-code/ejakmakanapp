import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../src/theme/colors';
import { Header } from '../../src/components/ui/Header';
import { CollectionTabs } from '../../src/features/collection/CollectionTabs';
import {
  BANDUNG_RESTAURANTS,
  THEMATIC_COLLECTIONS,
} from '../../src/services/mockData';
import { Restaurant } from '../../src/types';
import { useAppStore } from '../../src/store/useAppStore';

interface FavoritesScreenProps {
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  onNavigateToExplore?: () => void;
  onNavigateToProfile?: () => void;
}

export default function FavoritesScreen({
  onSelectRestaurant,
  onNavigateToExplore,
  onNavigateToProfile,
}: FavoritesScreenProps) {
  const { favorites, wishlist, visited, toggleFavorite } = useAppStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header: Clean, No Back Button, Profile Avatar Top-Right */}
      <Header
        title="Koleksi & Favorit"
        subtitle="Daftar kuliner tersimpan & rencana kunjungan"
        onPressProfile={onNavigateToProfile}
        showBackButton={false}
      />

      {/* Collection Tabs Component */}
      <CollectionTabs
        thematicCollections={THEMATIC_COLLECTIONS}
        restaurants={BANDUNG_RESTAURANTS}
        favoriteIds={favorites}
        wishlistIds={wishlist}
        visitedIds={visited}
        onToggleFavorite={toggleFavorite}
        onSelectRestaurant={(resto) => onSelectRestaurant?.(resto)}
        onExploreMore={() => onNavigateToExplore?.()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
