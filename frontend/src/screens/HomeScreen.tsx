import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Icon } from '../components/common/Icon';
import { CategoryCard } from '../components/home/CategoryCard';
import { DestinationCard } from '../components/home/DestinationCard';
import { PromoBanner } from '../components/home/PromoBanner';
import { CATEGORIES } from '../services/culinaryData';
import { Category, CulinaryDestination, UserSession } from '../types';

interface HomeScreenProps {
  session: UserSession | null;
  destinations: CulinaryDestination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (destination: CulinaryDestination) => void;
  onOpenSpinwheel: () => void;
  onOpenMap: () => void;
  onOpenProfile: () => void;
  onOpenCollection: () => void;
}

export function HomeScreen({
  session,
  destinations,
  savedIds,
  onToggleSave,
  onSelectDestination,
  onOpenSpinwheel,
  onOpenMap,
  onOpenProfile,
  onOpenCollection,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchCategory =
        selectedCategory === 'Semua' || dest.category === selectedCategory;
      const text = `${dest.name} ${dest.district} ${dest.category} ${dest.tags.join(' ')}`.toLowerCase();
      const matchQuery = text.includes(searchQuery.toLowerCase().trim());
      return matchCategory && matchQuery;
    });
  }, [destinations, selectedCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Location Bar */}
        <View style={styles.topBar}>
          <Pressable style={styles.locationContainer} onPress={onOpenMap}>
            <Text style={styles.locationLabel}>LOKASI SAAT INI</Text>
            <View style={styles.locationValueRow}>
              <Icon name="location-sharp" size={16} color={colors.primary} />
              <Text style={styles.locationValue}>Batam, Indonesia</Text>
              <Icon name="chevron-down" size={14} color={colors.textSecondary} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onOpenProfile}
            style={styles.avatarButton}
          >
            <Text style={styles.avatarText}>
              {session?.name ? session.name.substring(0, 2).toUpperCase() : 'EJ'}
            </Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={18} color={colors.primary} />
          <TextInput
            placeholder="Cari spot kuliner, sate, kopi, ramen..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
              <Icon name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          ) : (
            <Pressable onPress={onOpenMap} hitSlop={10}>
              <Icon name="map-outline" size={18} color={colors.primary} />
            </Pressable>
          )}
        </View>

        {/* Greeting & Headline */}
        <View style={styles.headlineRow}>
          <View>
            <Text style={styles.greetingTitle}>Temukan Tempat</Text>
            <Text style={styles.greetingHighlight}>Kuliner Favoritmu.</Text>
          </View>
          <View style={styles.sparkleBadge}>
            <Icon name="restaurant" size={20} color={colors.accentOrange} />
          </View>
        </View>

        {/* Promo Banner: Roda Rekomendasi */}
        <PromoBanner onPressSpin={onOpenSpinwheel} />

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jelajah Kategori</Text>
          <Pressable onPress={() => setSelectedCategory('Semua')}>
            <Text style={styles.sectionLink}>Reset</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              selected={selectedCategory === cat.label}
              onSelect={() => setSelectedCategory(cat.label)}
            />
          ))}
        </ScrollView>

        {/* Featured Destinations Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sentra Kuliner Pilihan</Text>
          <Pressable onPress={onOpenMap}>
            <Text style={styles.sectionLink}>Lihat di Peta &gt;</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsScroll}
        >
          {filteredDestinations.slice(0, 4).map((item) => (
            <DestinationCard
              key={item.id}
              destination={item}
              isSaved={savedIds.includes(item.id)}
              onPress={() => onSelectDestination(item)}
              onToggleSave={() => onToggleSave(item.id)}
              variant="card"
            />
          ))}
        </ScrollView>

        {/* All Culinary Spots List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Semua Destinasi Kuliner</Text>
          <Pressable onPress={onOpenCollection}>
            <Text style={styles.sectionLink}>Koleksi ({savedIds.length})</Text>
          </Pressable>
        </View>

        <View style={styles.verticalList}>
          {filteredDestinations.map((item) => (
            <DestinationCard
              key={item.id}
              destination={item}
              isSaved={savedIds.includes(item.id)}
              onPress={() => onSelectDestination(item)}
              onToggleSave={() => onToggleSave(item.id)}
              variant="compact"
            />
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationContainer: {
    justifyContent: 'center',
  },
  locationLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  locationValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  headlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  greetingHighlight: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    lineHeight: 28,
  },
  sparkleBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentYellowSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE0B2',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  categoryScroll: {
    paddingBottom: 14,
  },
  destinationsScroll: {
    paddingBottom: 18,
  },
  verticalList: {
    marginTop: 4,
  },
});

