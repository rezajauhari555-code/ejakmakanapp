import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { CulinaryDestination } from '../../types';
import { Icon } from '../common/Icon';

interface DestinationCardProps {
  destination: CulinaryDestination;
  isSaved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
  variant?: 'card' | 'compact';
}

export function DestinationCard({
  destination,
  isSaved,
  onPress,
  onToggleSave,
  variant = 'card',
}: DestinationCardProps) {
  if (variant === 'compact') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.compactCard, pressed && styles.cardPressed]}
      >
        <Image source={{ uri: destination.image }} style={styles.compactImage} />
        <View style={styles.compactInfo}>
          <Text style={styles.compactCategory}>{destination.category} · {destination.district}</Text>
          <Text style={styles.compactName} numberOfLines={1}>
            {destination.name}
          </Text>
          <View style={styles.metaRow}>
            <Icon name="star" size={13} color={colors.accentYellow} />
            <Text style={styles.ratingText}>{destination.rating}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.metaText}>{destination.distanceEstimate}</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onToggleSave}
          style={styles.compactBookmark}
        >
          <Icon
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={isSaved ? colors.primary : colors.textMuted}
          />
        </Pressable>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{destination.category}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onToggleSave}
          style={styles.bookmarkButton}
        >
          <Icon
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={isSaved ? colors.primary : colors.textPrimary}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.districtText}>
          {destination.district}, {destination.city}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {destination.name}
        </Text>

        <View style={styles.metaRow}>
          <Icon name="star" size={14} color={colors.accentYellow} />
          <Text style={styles.ratingText}>{destination.rating}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{destination.reviewCountText}</Text>
        </View>

        <View style={styles.tagRow}>
          {destination.tags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginRight: 14,
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: '100%',
    height: 136,
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
    backgroundColor: 'rgba(25, 44, 62, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: colors.textOnPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    padding: 12,
  },
  districtText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  dot: {
    color: colors.textMuted,
  },
  metaText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 10,
  },
  compactImage: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  compactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  compactCategory: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
  },
  compactName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  compactBookmark: {
    padding: 8,
  },
});

