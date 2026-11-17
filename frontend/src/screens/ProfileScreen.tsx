import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { UserSession } from '../types';

interface ProfileScreenProps {
  session: UserSession | null;
  selectedCuisines: string[];
  selectedMoods: string[];
  savedCount: number;
  onOpenPreferences: () => void;
  onOpenSettings: () => void;
  onOpenCollection: () => void;
  onLogout: () => void;
  onBack: () => void;
}

export function ProfileScreen({
  session,
  selectedCuisines,
  selectedMoods,
  savedCount,
  onOpenPreferences,
  onOpenSettings,
  onOpenCollection,
  onLogout,
  onBack,
}: ProfileScreenProps) {
  const name = session?.name || 'Tamu Pecinta Kuliner';
  const email = session?.email || 'Sesi Eksplorasi Tamu';
  const initial = name.substring(0, 2).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Profil Saya" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>

          <View style={styles.providerBadge}>
            <Icon
              name={
                session?.provider === 'google'
                  ? 'logo-google'
                  : session?.provider === 'apple'
                  ? 'logo-apple'
                  : 'person'
              }
              size={12}
              color={colors.primary}
            />
            <Text style={styles.providerBadgeText}>
              {session?.provider
                ? `Akun ${session.provider.toUpperCase()}`
                : 'Mode Eksplorasi'}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <Pressable style={styles.statCol} onPress={onOpenCollection}>
            <Text style={styles.statNumber}>{savedCount}</Text>
            <Text style={styles.statLabel}>Tempat Disimpan</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.statCol} onPress={onOpenPreferences}>
            <Text style={styles.statNumber}>{selectedCuisines.length}</Text>
            <Text style={styles.statLabel}>Selera Dipilih</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.statCol} onPress={onOpenPreferences}>
            <Text style={styles.statNumber}>{selectedMoods.length}</Text>
            <Text style={styles.statLabel}>Vibe Favorit</Text>
          </Pressable>
        </View>

        {/* Preferences Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Preferensi Selera Saat Ini</Text>
            <Pressable onPress={onOpenPreferences}>
              <Text style={styles.editLink}>Ubah</Text>
            </Pressable>
          </View>

          <Text style={styles.preferenceLabel}>Kategori Favorit:</Text>
          <Text style={styles.preferenceValue}>
            {selectedCuisines.length > 0 ? selectedCuisines.join(', ') : 'Belum diatur'}
          </Text>

          <Text style={styles.preferenceLabel}>Suasana / Vibe:</Text>
          <Text style={styles.preferenceValue}>
            {selectedMoods.length > 0 ? selectedMoods.join(', ') : 'Belum diatur'}
          </Text>
        </View>

        {/* Action Menu */}
        <View style={styles.menuGroup}>
          <Pressable
            accessibilityRole="button"
            onPress={onOpenPreferences}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: colors.primaryLight }]}>
                <Icon name="color-palette-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuTitle}>Ubah Preferensi Rasa</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onOpenSettings}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: colors.accentOrangeSoft }]}>
                <Icon name="settings-outline" size={18} color={colors.accentOrange} />
              </View>
              <Text style={styles.menuTitle}>Pengaturan Aplikasi</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable
          accessibilityRole="button"
          onPress={onLogout}
          style={styles.logoutButton}
        >
          <Icon name="log-out-outline" size={18} color={colors.accentRed} />
          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </Pressable>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBE2F8',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  avatarText: {
    color: colors.textOnPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  userName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 10,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  providerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: 14,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 14,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  editLink: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  preferenceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 6,
  },
  preferenceValue: {
    fontSize: 12,
    color: colors.textPrimary,
    marginTop: 2,
    fontWeight: '600',
  },
  menuGroup: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 14,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 14,
    gap: 8,
    borderRadius: 12,
    backgroundColor: colors.accentRedSoft,
    borderWidth: 1,
    borderColor: '#F9D5D3',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accentRed,
  },
});

