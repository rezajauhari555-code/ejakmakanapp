import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { Icon } from '../../src/components/common/Icon';
import { Header } from '../../src/components/ui/Header';
import { AndroidInfoCard } from '../../src/features/profile/AndroidInfoCard';
import { DEMO_USER, MOCK_REVIEWS } from '../../src/services/mockData';
import { useAppStore } from '../../src/store/useAppStore';

interface ProfileScreenProps {
  onLogout?: () => void;
  onNavigateToPreferences?: () => void;
}

export default function ProfileScreen({
  onLogout,
  onNavigateToPreferences,
}: ProfileScreenProps) {
  const { user, userReviews, logout } = useAppStore();
  const profile = user || DEMO_USER;

  const xpProgress = Math.min(profile.xpCurrent / profile.xpMax, 1);

  function handleLogout() {
    Alert.alert('Keluar Akun', 'Apakah kamu yakin ingin keluar dari Ejakmakan?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          logout();
          if (onLogout) onLogout();
        },
      },
    ]);
  }

  function handleHelpCenter() {
    Alert.alert(
      'Pusat Bantuan Ejakmakan',
      'Tim support kami siap membantu melalui WhatsApp di +62 821-2233-4455 atau email support@ejakmakan.id'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header: Clean, No Back Button */}
      <Header
        title="Profil Foodie"
        subtitle="Aktivitas, ulasan & pengaturan akun"
        showBackButton={false}
        rightAction={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Keluar Akun"
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutHeaderBtn, pressed && styles.pressed]}
          >
            <Icon name="log-out-outline" size={20} color={colors.danger} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userTopRow}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>{profile.avatarInitials}</Text>
              <View style={styles.badgeLevelDot}>
                <Text style={styles.badgeLevelDotText}>4</Text>
              </View>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{profile.name}</Text>
                <View style={styles.verifiedBadge}>
                  <Icon name="checkmark-circle" size={16} color={colors.primary} />
                </View>
              </View>
              <Text style={styles.userEmail}>{profile.email}</Text>
              <View style={styles.foodieBadge}>
                <Icon name="medal-outline" size={14} color={colors.primary} />
                <Text style={styles.foodieBadgeText}>{profile.foodieTitle}</Text>
              </View>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>Level 4 Progress</Text>
              <Text style={styles.xpValues}>
                {profile.xpCurrent} / {profile.xpMax} XP
              </Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${xpProgress * 100}%` }]} />
            </View>
            <Text style={styles.xpHope}>150 XP lagi untuk mencapai Foodie Master (Level 5)</Text>
          </View>

          {/* Stats Counters */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.reviewsCount}</Text>
              <Text style={styles.statLabel}>Ulasan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.photosCount}</Text>
              <Text style={styles.statLabel}>Foto</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.collectionsCount}</Text>
              <Text style={styles.statLabel}>Koleksi</Text>
            </View>
          </View>
        </View>

        {/* Quick Shortcuts */}
        <View style={styles.menuSection}>
          <Pressable
            accessibilityRole="button"
            onPress={onNavigateToPreferences}
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <Icon name="options-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Preferensi Selera Kuliner</Text>
              <Text style={styles.menuSubtitle}>Kategori favorit, halal, dan rentang budget</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            accessibilityRole="button"
            onPress={handleHelpCenter}
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <Icon name="help-buoy-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Pusat Bantuan & Tanya Jawab</Text>
              <Text style={styles.menuSubtitle}>Bantuan operasional & kontak WhatsApp support</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Reviews by Dimas Pratama */}
        <View style={styles.reviewsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ulasan Terakhir Saya</Text>
            <Text style={styles.sectionSub}>Bantu komunitas foodie menemukan rasa terbaik</Text>
          </View>

          <View style={styles.reviewList}>
            {userReviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <View style={styles.reviewRating}>
                    <Icon name="star" size={14} color="#F59E0B" />
                    <Text style={styles.reviewRatingText}>{rev.rating}.0</Text>
                  </View>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <Text style={styles.reviewText}>"{rev.comment}"</Text>
                <View style={styles.reviewMeta}>
                  <Icon name="restaurant-outline" size={14} color={colors.primary} />
                  <Text style={styles.reviewMetaText}>
                    {rev.restaurantId === 'kopi-sapa'
                      ? 'Kopi Sapa & Roastery'
                      : 'Bakmi Tiga Saudara'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Android Scope & Platform Compatibility Card */}
        <View style={styles.androidSection}>
          <AndroidInfoCard />
        </View>

        {/* App Version Info */}
        <View style={styles.footerNote}>
          <Text style={styles.footerAppText}>Ejakmakan Mobile • Bandung Culinary Guide</Text>
          <Text style={styles.footerBuildText}>Expo SDK 58 • React Native 0.88</Text>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  logoutHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  userCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 18,
    marginBottom: 16,
  },
  userTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrap: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.titleLarge,
    color: colors.white,
    fontWeight: '800',
  },
  badgeLevelDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#F59E0B',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  badgeLevelDotText: {
    ...typography.labelSmall,
    color: colors.white,
    fontWeight: '800',
    fontSize: 10,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  verifiedBadge: {},
  userEmail: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  foodieBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
    gap: 4,
  },
  foodieBadgeText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  xpSection: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  xpLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  xpValues: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  xpTrack: {
    height: 7,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  xpHope: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.titleLarge,
    color: colors.primary,
    fontWeight: '800',
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.borderLight,
  },
  menuSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  menuSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  reviewsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 10,
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
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 14,
    gap: 8,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewRatingText: {
    ...typography.labelSmall,
    color: '#92400E',
    fontWeight: '700',
  },
  reviewDate: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
  },
  reviewText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  reviewMetaText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '600',
  },
  androidSection: {
    marginBottom: 16,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  footerAppText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontWeight: '600',
  },
  footerBuildText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontSize: 11,
  },
  pressed: {
    opacity: 0.85,
  },
});
