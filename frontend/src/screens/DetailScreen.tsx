import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Button } from '../components/common/Button';
import { Icon } from '../components/common/Icon';
import { CulinaryDestination } from '../types';

interface DetailScreenProps {
  destination: CulinaryDestination;
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
}

export function DetailScreen({
  destination,
  isSaved,
  onToggleSave,
  onBack,
}: DetailScreenProps) {
  function handleWhatsApp() {
    const phone = destination.phoneOrWa || '6281234567890';
    const text = encodeURIComponent(
      `Halo Ejakmakan, saya ingin menanyakan informasi tentang ${destination.name}.`,
    );
    Linking.openURL(`https://wa.me/${phone}?text=${text}`);
  }

  function handleDirections() {
    const lat = destination.latitude;
    const lng = destination.longitude;
    const label = encodeURIComponent(destination.name);

    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });

    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero Image Container */}
      <View style={styles.heroWrapper}>
        <Image source={{ uri: destination.image }} style={styles.heroImage} />
        <View style={styles.overlayGradient} />

        {/* Floating Top Nav */}
        <SafeAreaView style={styles.topNavSafe}>
          <View style={styles.topNav}>
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              style={styles.navButton}
            >
              <Icon name="chevron-back" size={22} color={colors.textPrimary} />
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onToggleSave}
              style={styles.navButton}
            >
              <Icon
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={isSaved ? colors.primary : colors.textPrimary}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      {/* Details Scroll Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{destination.category}</Text>
            </View>
            <View style={styles.hoursBadge}>
              <Icon name="time-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.hoursBadgeText}>{destination.openHours}</Text>
            </View>
          </View>

          <Text style={styles.title}>{destination.name}</Text>
          <Text style={styles.districtText}>
            {destination.district}, {destination.city}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconCircle}>
                <Icon name="star" size={16} color={colors.accentYellow} />
              </View>
              <View>
                <Text style={styles.statValue}>{destination.rating}</Text>
                <Text style={styles.statLabel}>Rating Rasa</Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.statIconCircle}>
                <Icon name="compass-outline" size={16} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.statValue}>{destination.distanceEstimate}</Text>
                <Text style={styles.statLabel}>Estimasi Jarak</Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.statIconCircle}>
                <Icon name="ribbon-outline" size={16} color={colors.accentOrange} />
              </View>
              <View>
                <Text style={styles.statValue}>{destination.reviewCountText}</Text>
                <Text style={styles.statLabel}>Status</Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagWrap}>
            {destination.tags.map((tag) => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagPillText}>#{tag}</Text>
              </View>
            ))}
          </View>

          {/* Section: Description */}
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionHeading}>Tentang Sentra Kuliner Ini</Text>
          <Text style={styles.descriptionText}>{destination.description}</Text>

          {/* Section: Popular Highlights */}
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionHeading}>Hidangan Populer Wajib Coba</Text>
          <View style={styles.highlightsContainer}>
            {(destination.popularHighlights || []).map((dish: string, idx: number) => (
              <View key={dish} style={styles.dishRow}>
                <View style={styles.dishNumberBadge}>
                  <Text style={styles.dishNumberText}>0{idx + 1}</Text>
                </View>
                <View style={styles.dishTextCol}>
                  <Text style={styles.dishName}>{dish}</Text>
                  <Text style={styles.dishSub}>Menu favorit pengunjung</Text>
                </View>
                <Icon name="flame" size={16} color={colors.accentOrange} />
              </View>
            ))}
          </View>

          {/* Action Row */}
          <View style={styles.actionButtonsRow}>
            <Button
              title="WhatsApp Info"
              onPress={handleWhatsApp}
              icon="logo-whatsapp"
              variant="outline"
              style={styles.waButton}
            />
            <Button
              title="Rute Maps"
              onPress={handleDirections}
              icon="navigate"
              variant="primary"
              style={styles.mapsButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  topNavSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    padding: 22,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  hoursBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  hoursBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  districtText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 14,
  },
  tagPill: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 18,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  highlightsContainer: {
    gap: 10,
    marginTop: 6,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  dishNumberBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  dishTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  dishName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  dishSub: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 26,
  },
  waButton: {
    flex: 1,
  },
  mapsButton: {
    flex: 1,
  },
});
