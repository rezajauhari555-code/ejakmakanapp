import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { Icon } from '../../src/components/common/Icon';
import { BANDUNG_RESTAURANTS, MOCK_REVIEWS } from '../../src/services/mockData';
import { MenuItem, Restaurant } from '../../src/types';
import { useAppStore } from '../../src/store/useAppStore';

interface RestaurantDetailScreenProps {
  restaurantId?: string;
  onBack?: () => void;
}

export default function RestaurantDetailScreen({
  restaurantId = 'kopi-sapa',
  onBack,
}: RestaurantDetailScreenProps) {
  const { favorites, toggleFavorite, wishlist, toggleWishlist } = useAppStore();

  const restaurant: Restaurant =
    BANDUNG_RESTAURANTS.find((r) => r.id === restaurantId) || BANDUNG_RESTAURANTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isFav = favorites.includes(restaurant.id);
  const isWish = wishlist.includes(restaurant.id);

  const restaurantReviews = MOCK_REVIEWS.filter(
    (r) => r.restaurantId === restaurant.id
  );

  function handleShare() {
    Share.share({
      title: restaurant.name,
      message: `Yuk cobain ${restaurant.name} di ${restaurant.address}, Bandung! Rating: ${restaurant.rating} ⭐ dari Ejakmakan.`,
    });
  }

  function handleWhatsAppReservation() {
    const message = encodeURIComponent(
      `Halo ${restaurant.name}, saya ingin reservasi meja / tanya menu via aplikasi Ejakmakan.`
    );
    const url = `https://wa.me/${restaurant.phoneWa}?text=${message}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Gagal Membuka WhatsApp', 'Pastikan aplikasi WhatsApp terpasang di perangkatmu.');
    });
  }

  function handleOpenDirections() {
    const lat = restaurant.latitude;
    const lng = restaurant.longitude;
    const label = encodeURIComponent(restaurant.name);
    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });
    Linking.openURL(url).catch(() => {
      Alert.alert('Gagal Membuka Peta', 'Tidak dapat memuat aplikasi peta navigasi.');
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Floating Header */}
      <SafeAreaView style={styles.floatingHeaderSafeArea}>
        <View style={styles.floatingHeader}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            onPress={onBack}
            style={({ pressed }) => [styles.headerCircleBtn, pressed && styles.pressed]}
          >
            <Icon name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>

          <View style={styles.headerRightActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Bagikan Restoran"
              onPress={handleShare}
              style={({ pressed }) => [styles.headerCircleBtn, pressed && styles.pressed]}
            >
              <Icon name="share-outline" size={20} color={colors.textPrimary} />
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tambah ke Favorit"
              onPress={() => toggleFavorite(restaurant.id)}
              style={({ pressed }) => [styles.headerCircleBtn, pressed && styles.pressed]}
            >
              <Icon
                name={isFav ? 'heart' : 'heart-outline'}
                size={20}
                color={isFav ? colors.danger : colors.textPrimary}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cover Image Gallery */}
        <View style={styles.galleryWrapper}>
          <Image
            source={{ uri: restaurant.gallery?.[activeImageIndex] || restaurant.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.galleryDots}>
            {(restaurant.gallery || []).map((_, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveImageIndex(idx)}
                style={[
                  styles.dot,
                  idx === activeImageIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.body}>
          {/* Main Info */}
          <View style={styles.metaBadgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{restaurant.category}</Text>
            </View>
            {restaurant.isHalal && (
              <View style={styles.halalBadge}>
                <Icon name="shield-checkmark" size={12} color="#006C4C" />
                <Text style={styles.halalBadgeText}>100% Halal</Text>
              </View>
            )}
            <View style={styles.priceBadge}>
              <Text style={styles.priceBadgeText}>{restaurant.priceRange}</Text>
            </View>
          </View>

          <Text style={styles.restoTitle}>{restaurant.name}</Text>
          <Text style={styles.districtText}>
            {restaurant.district}, {restaurant.city}
          </Text>

          {/* Rating & Stats Strip */}
          <View style={styles.ratingStrip}>
            <View style={styles.ratingBox}>
              <Icon name="star" size={18} color="#F59E0B" />
              <Text style={styles.ratingScore}>{restaurant.rating}</Text>
              <Text style={styles.ratingTotal}>/ 5.0</Text>
            </View>
            <View style={styles.stripDivider} />
            <Text style={styles.reviewCountText}>{restaurant.reviewCountText}</Text>
            <View style={styles.stripDivider} />
            <View style={styles.openNowRow}>
              <View style={styles.greenPulse} />
              <Text style={styles.openNowText}>Buka Sekarang</Text>
            </View>
          </View>

          {/* Location & Contact Cards */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={18} color={colors.primary} />
              <Text style={styles.infoText}>{restaurant.address}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Icon name="time-outline" size={18} color={colors.primary} />
              <Text style={styles.infoText}>{restaurant.openHours}</Text>
            </View>
          </View>

          {/* Quick Action Navigation Buttons */}
          <View style={styles.actionButtonsRow}>
            <Pressable
              accessibilityRole="button"
              onPress={handleOpenDirections}
              style={({ pressed }) => [styles.routeBtn, pressed && styles.pressed]}
            >
              <Icon name="navigate-outline" size={18} color={colors.primary} />
              <Text style={styles.routeBtnText}>Petunjuk Arah (Peta)</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => toggleWishlist(restaurant.id)}
              style={({ pressed }) => [
                styles.wishlistBtn,
                isWish && styles.wishlistBtnActive,
                pressed && styles.pressed,
              ]}
            >
              <Icon
                name={isWish ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color={isWish ? colors.white : colors.textPrimary}
              />
              <Text
                style={[
                  styles.wishlistBtnText,
                  isWish && styles.wishlistBtnTextActive,
                ]}
              >
                {isWish ? 'Tersimpan' : 'Ingin Coba'}
              </Text>
            </Pressable>
          </View>

          {/* Description */}
          <View style={styles.sectionWrap}>
            <Text style={styles.sectionHeading}>Tentang Tempat Ini</Text>
            <Text style={styles.descriptionText}>{restaurant.description}</Text>
            <View style={styles.tagWrap}>
              {restaurant.tags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <Text style={styles.tagPillText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Editor's Choice Menu Section (Figma Aligned) */}
          <View style={styles.sectionWrap}>
            <View style={styles.editorHeadingRow}>
              <View>
                <Text style={styles.sectionHeading}>Menu Pilihan Editor</Text>
                <Text style={styles.sectionSub}>Wajib dicoba saat berkunjung</Text>
              </View>
              <View style={styles.editorBadge}>
                <Icon name="ribbon-outline" size={14} color={colors.primary} />
                <Text style={styles.editorBadgeText}>Editor's Pick</Text>
              </View>
            </View>

            <View style={styles.menuList}>
              {(restaurant.editorChoiceMenu || []).map((item: MenuItem) => (
                <View key={item.id} style={styles.menuItemCard}>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.menuItemImage}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.menuItemInfo}>
                    <View style={styles.menuItemTitleRow}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemPrice}>{item.priceFormatted}</Text>
                    </View>
                    <Text style={styles.menuItemDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Customer Reviews Section */}
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>
                Ulasan Pengunjung ({restaurantReviews.length})
              </Text>
            </View>

            <View style={styles.reviewList}>
              {restaurantReviews.map((rev) => (
                <View key={rev.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.authorAvatar}>
                      <Text style={styles.authorAvatarText}>{rev.authorInitials}</Text>
                    </View>
                    <View style={styles.authorMeta}>
                      <Text style={styles.authorName}>{rev.authorName}</Text>
                      <Text style={styles.authorLevel}>{rev.authorLevel}</Text>
                    </View>
                    <View style={styles.reviewScoreBadge}>
                      <Icon name="star" size={12} color="#F59E0B" />
                      <Text style={styles.reviewScoreText}>{rev.rating}.0</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{rev.comment}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Reservation Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Estimasi Rata-Rata</Text>
          <Text style={styles.bottomPriceValue}>{restaurant.priceRange}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleWhatsAppReservation}
          style={({ pressed }) => [styles.waReserveBtn, pressed && styles.pressed]}
        >
          <Icon name="logo-whatsapp" size={20} color={colors.white} />
          <Text style={styles.waReserveBtnText}>Reservasi WhatsApp</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  floatingHeaderSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  floatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 10,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  galleryWrapper: {
    position: 'relative',
    height: 290,
    backgroundColor: colors.surfaceContainer,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  galleryDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  halalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  halalBadgeText: {
    ...typography.labelSmall,
    color: '#006C4C',
    fontWeight: '700',
  },
  priceBadge: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priceBadgeText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  restoTitle: {
    ...typography.headlineMedium,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  districtText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },
  ratingStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
    marginBottom: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  ratingTotal: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  stripDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.borderLight,
  },
  reviewCountText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  openNowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
  },
  greenPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  openNowText: {
    ...typography.labelSmall,
    color: '#047857',
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 14,
    gap: 10,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoText: {
    flex: 1,
    ...typography.bodySmall,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  routeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  routeBtnText: {
    ...typography.labelMedium,
    color: colors.primary,
    fontWeight: '700',
  },
  wishlistBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  wishlistBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  wishlistBtnText: {
    ...typography.labelMedium,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  wishlistBtnTextActive: {
    color: colors.white,
  },
  sectionWrap: {
    marginBottom: 24,
  },
  sectionHeading: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  sectionSub: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  descriptionText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 8,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tagPill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagPillText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '600',
  },
  editorHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  editorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  editorBadgeText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  menuList: {
    gap: 12,
  },
  menuItemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
  menuItemImage: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  menuItemName: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  menuItemPrice: {
    ...typography.labelMedium,
    color: colors.primary,
    fontWeight: '700',
  },
  menuItemDesc: {
    ...typography.bodySmall,
    color: colors.textMuted,
    lineHeight: 16,
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  reviewList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 14,
    gap: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorAvatarText: {
    ...typography.labelMedium,
    color: colors.white,
    fontWeight: '700',
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    ...typography.labelLarge,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  authorLevel: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
  },
  reviewScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  reviewScoreText: {
    ...typography.labelSmall,
    color: '#92400E',
    fontWeight: '700',
  },
  reviewComment: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomPriceCol: {
    flex: 1,
  },
  bottomPriceLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
  },
  bottomPriceValue: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  waReserveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  waReserveBtnText: {
    ...typography.labelLarge,
    color: colors.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
