import React, { useState } from 'react';
import { Image, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Restaurant, ThematicCollection } from '../../types';
import { Icon } from '../../components/common/Icon';
import { RestaurantCard } from '../../components/ui/RestaurantCard';

interface CollectionTabsProps {
  thematicCollections: ThematicCollection[];
  restaurants: Restaurant[];
  favoriteIds: string[];
  wishlistIds: string[];
  visitedIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onExploreMore: () => void;
}

export function CollectionTabs({
  thematicCollections,
  restaurants,
  favoriteIds,
  wishlistIds,
  visitedIds,
  onToggleFavorite,
  onSelectRestaurant,
  onExploreMore,
}: CollectionTabsProps) {
  const [activeTab, setActiveTab] = useState<'koleksi' | 'ingin_coba' | 'kunjungan'>('koleksi');

  const wishlistRestaurants = restaurants.filter((r) => wishlistIds.includes(r.id));
  const visitedRestaurants = restaurants.filter((r) => visitedIds.includes(r.id));

  function openRouteMaps(lat: number, lng: number, label: string) {
    const url = Platform.select({
      ios: `maps://?q=${encodeURIComponent(label)}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });
    Linking.openURL(url).catch(() => {});
  }

  return (
    <View style={styles.container}>
      {/* 3 Tab Navigation Header */}
      <View style={styles.tabNav}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveTab('koleksi')}
          style={[styles.tabBtn, activeTab === 'koleksi' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'koleksi' && styles.tabBtnTextActive]}>
            Koleksi ({thematicCollections.length})
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveTab('ingin_coba')}
          style={[styles.tabBtn, activeTab === 'ingin_coba' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'ingin_coba' && styles.tabBtnTextActive]}>
            Ingin Coba ({wishlistRestaurants.length})
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveTab('kunjungan')}
          style={[styles.tabBtn, activeTab === 'kunjungan' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'kunjungan' && styles.tabBtnTextActive]}>
            Kunjungan ({visitedRestaurants.length})
          </Text>
        </Pressable>
      </View>

      {/* Tab 1: Koleksi Tematik */}
      {activeTab === 'koleksi' && (
        <View style={styles.sectionWrap}>
          <Text style={styles.tabSubtitle}>Koleksi tematik pilihan kurator Ejakmakan Bandung</Text>
          {thematicCollections.map((col) => (
            <View key={col.id} style={styles.thematicCard}>
              <Image source={{ uri: col.coverImage }} style={styles.thematicImage} />
              <View style={styles.thematicOverlay} />
              <View style={styles.thematicContent}>
                <View style={styles.itemCountBadge}>
                  <Icon name="bookmark" size={11} color={colors.textWhite} />
                  <Text style={styles.itemCountText}>{col.itemCount} Tempat Kuliner</Text>
                </View>
                <Text style={styles.thematicTitle}>{col.title}</Text>
                <Text style={styles.thematicDesc}>{col.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Tab 2: Ingin Coba (Wishlist) */}
      {activeTab === 'ingin_coba' && (
        <View style={styles.sectionWrap}>
          {wishlistRestaurants.length === 0 ? (
            <View style={styles.emptyCard}>
              <Icon name="bookmark-outline" size={32} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Belum Ada Restoran Ditandai</Text>
              <Text style={styles.emptySubtitle}>
                Tandai tempat makan yang ingin kamu coba saat menjelajahi beranda atau peta Bandung.
              </Text>
              <Pressable onPress={onExploreMore} style={styles.exploreBtn}>
                <Text style={styles.exploreBtnText}>Jelajah Restoran Sekarang</Text>
              </Pressable>
            </View>
          ) : (
            wishlistRestaurants.map((item) => (
              <View key={item.id} style={styles.savedCardWrap}>
                <RestaurantCard
                  restaurant={item}
                  isFavorite={favoriteIds.includes(item.id)}
                  variant="list"
                  onPress={() => onSelectRestaurant(item)}
                  onToggleFavorite={() => onToggleFavorite(item.id)}
                />
                <View style={styles.cardActionsRow}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => openRouteMaps(item.latitude, item.longitude, item.name)}
                    style={styles.actionBtn}
                  >
                    <Icon name="navigate-outline" size={14} color={colors.primary} />
                    <Text style={styles.actionBtnText}>Petunjuk Arah</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => onSelectRestaurant(item)}
                    style={[styles.actionBtn, styles.actionBtnPrimary]}
                  >
                    <Icon name="restaurant-outline" size={14} color={colors.textWhite} />
                    <Text style={[styles.actionBtnText, styles.actionBtnTextWhite]}>Lihat Menu</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* Tab 3: Kunjungan (Visited / History) */}
      {activeTab === 'kunjungan' && (
        <View style={styles.sectionWrap}>
          {visitedRestaurants.length === 0 ? (
            <View style={styles.emptyCard}>
              <Icon name="checkmark-done-circle-outline" size={32} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Belum Ada Riwayat Kunjungan</Text>
              <Text style={styles.emptySubtitle}>
                Restoran yang pernah kamu datangi dan beri ulasan akan tercatat rapi di sini.
              </Text>
            </View>
          ) : (
            visitedRestaurants.map((item) => (
              <View key={item.id} style={styles.visitedCard}>
                <View style={styles.visitedHeader}>
                  <View style={styles.visitedBadge}>
                    <Icon name="checkmark-circle" size={14} color={colors.green} />
                    <Text style={styles.visitedBadgeText}>Pernah Dikunjungi</Text>
                  </View>
                  <Text style={styles.visitedTime}>Bulan ini</Text>
                </View>

                <Text style={styles.visitedName}>{item.name}</Text>
                <Text style={styles.visitedAddress}>{item.address}</Text>

                <View style={styles.cardActionsRow}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => onSelectRestaurant(item)}
                    style={styles.actionBtn}
                  >
                    <Icon name="create-outline" size={14} color={colors.primary} />
                    <Text style={styles.actionBtnText}>Tulis Ulasan Baru</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => onSelectRestaurant(item)}
                    style={[styles.actionBtn, styles.actionBtnPrimary]}
                  >
                    <Text style={[styles.actionBtnText, styles.actionBtnTextWhite]}>Detail Menu</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabNav: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  tabBtnTextActive: {
    color: colors.textWhite,
    fontWeight: typography.fontWeight.extrabold,
  },
  sectionWrap: {
    gap: 14,
  },
  tabSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  thematicCard: {
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.border,
  },
  thematicImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  thematicOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(17, 28, 45, 0.55)',
  },
  thematicContent: {
    padding: 14,
  },
  itemCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
    marginBottom: 6,
  },
  itemCountText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  thematicTitle: {
    fontSize: 16,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textWhite,
  },
  thematicDesc: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  savedCardWrap: {
    marginBottom: 12,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -4,
    marginBottom: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  actionBtnPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  actionBtnTextWhite: {
    color: colors.textWhite,
  },
  visitedCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  visitedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  visitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  visitedBadgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.green,
  },
  visitedTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  visitedName: {
    fontSize: 15,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  visitedAddress: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
    maxWidth: 260,
  },
  exploreBtn: {
    marginTop: 16,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exploreBtnText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});

