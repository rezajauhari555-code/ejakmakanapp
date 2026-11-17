import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Restaurant } from '../../types';
import { Icon } from '../common/Icon';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  variant?: 'carousel' | 'list';
}

export function RestaurantCard({
  restaurant,
  isFavorite,
  onPress,
  onToggleFavorite,
  variant = 'list',
}: RestaurantCardProps) {
  const isCarousel = variant === 'carousel';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isCarousel ? styles.carouselContainer : styles.listContainer,
        pressed && styles.pressed,
      ]}
    >
      {/* Cover Image & Badges */}
      <View style={isCarousel ? styles.carouselImageWrapper : styles.listImageWrapper}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{restaurant.category}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onToggleFavorite}
          style={styles.favoriteButton}
          hitSlop={8}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? colors.danger : colors.textPrimary}
          />
        </Pressable>
      </View>

      {/* Card Info */}
      <View style={styles.infoWrapper}>
        <View style={styles.ratingLocationRow}>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={12} color={colors.gold} />
            <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.locationText} numberOfLines={1}>
            {restaurant.district}, Batam
          </Text>
        </View>

        <Text style={styles.nameText} numberOfLines={1}>
          {restaurant.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{restaurant.priceRange}</Text>
          {restaurant.isHalal && (
            <View style={styles.halalBadge}>
              <Text style={styles.halalText}>Halal</Text>
            </View>
          )}
        </View>

        {/* Editor's Choice Highlight Pill */}
        {restaurant.editorChoiceMenu && restaurant.editorChoiceMenu.length > 0 && (
          <View style={styles.editorMenuRow}>
            <Icon name="sparkles" size={11} color={colors.primary} />
            <Text style={styles.editorMenuText} numberOfLines={1}>
              {restaurant.editorChoiceMenu[0].name}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  carouselContainer: {
    width: 250,
    marginRight: 14,
  },
  listContainer: {
    width: '100%',
    marginBottom: 14,
  },
  carouselImageWrapper: {
    width: '100%',
    height: 130,
    position: 'relative',
  },
  listImageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(17, 28, 45, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoWrapper: {
    padding: 12,
  },
  ratingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.goldSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.extrabold,
    color: '#92400E',
  },
  locationText: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  halalBadge: {
    backgroundColor: colors.greenSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  halalText: {
    fontSize: 9,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.green,
  },
  editorMenuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 5,
    marginTop: 8,
  },
  editorMenuText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    flex: 1,
  },
  pressed: {
    opacity: 0.93,
    transform: [{ scale: 0.99 }],
  },
});
