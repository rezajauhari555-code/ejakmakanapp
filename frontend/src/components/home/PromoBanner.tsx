import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Icon } from '../common/Icon';

interface PromoBannerProps {
  onPressSpin: () => void;
}

export function PromoBanner({ onPressSpin }: PromoBannerProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPressSpin}
      style={({ pressed }) => [styles.banner, pressed && styles.bannerPressed]}
    >
      <View style={styles.content}>
        <View style={styles.pill}>
          <Icon name="sparkles" size={12} color={colors.primary} />
          <Text style={styles.pillText}>SPIN RODA RASA</Text>
        </View>

        <Text style={styles.title}>Bingung Mau{'\n'}Makan Apa Hari Ini?</Text>
        <Text style={styles.subtitle}>
          Putar roda rekomendasi dan temukan inspirasi kuliner terbaik di sekitarmu!
        </Text>

        <View style={styles.actionRow}>
          <Text style={styles.actionText}>Coba Sekarang</Text>
          <Icon name="arrow-forward" size={14} color={colors.textOnPrimary} />
        </View>
      </View>

      <View style={styles.visualContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
          }}
          style={styles.image}
        />
        <View style={styles.badgeOverlay}>
          <Icon name="dice" size={24} color={colors.textOnPrimary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primaryLight,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CBE2F8',
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 18,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  bannerPressed: {
    opacity: 0.95,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 6,
    marginTop: 10,
  },
  actionText: {
    color: colors.textOnPrimary,
    fontSize: 11,
    fontWeight: '800',
  },
  visualContainer: {
    width: 110,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentOrange,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
});

