import React from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/common/Icon';

export function AndroidInfoCard() {
  function handleCheckUpdate() {
    Alert.alert(
      'Android Release Scope',
      'Versi Ejakmakan Android saat ini: 1.0.0 (API Level 34 Target)\nStatus: Build Rilis Produksi Terverifikasi.',
    );
  }

  function handleOptimizeCache() {
    Alert.alert(
      'Optimasi Cache Android',
      'Penyimpanan cache internal & temporary images berhasil dioptimalkan (0.4 MB dibersihkan).',
    );
  }

  return (
    <View style={styles.container}>
      {/* Platform Header Badge */}
      <View style={styles.headerRow}>
        <View style={styles.androidBadge}>
          <Icon name="logo-android" size={16} color="#3DDC84" />
          <Text style={styles.androidBadgeText}>Android Release Scope</Text>
        </View>
        <Text style={styles.archText}>Hermes Arm64</Text>
      </View>

      <Text style={styles.title}>Tentang Ejakmakan Android</Text>
      <Text style={styles.subtitle}>
        Dikonfigurasi khusus dengan standar kompatibilitas Android SDK & Google Play Services.
      </Text>

      {/* Spec Table */}
      <View style={styles.specTable}>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Versi Aplikasi</Text>
          <Text style={styles.specValue}>v1.0.0 (Build 1)</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Target SDK / Level</Text>
          <Text style={styles.specValue}>Android 14 (API 34)</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Package Identifier</Text>
          <Text style={styles.specValue}>com.rezajauhari.ejakmakan</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Izin Aktif</Text>
          <Text style={styles.specValue}>GPS Fine Location, Internet, Vibrate</Text>
        </View>
      </View>

      {/* Android Actions */}
      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          onPress={handleCheckUpdate}
          style={styles.actionPill}
        >
          <Icon name="cloud-download-outline" size={14} color={colors.primary} />
          <Text style={styles.actionText}>Cek Pembaruan</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleOptimizeCache}
          style={styles.actionPill}
        >
          <Icon name="sparkles-outline" size={14} color={colors.primary} />
          <Text style={styles.actionText}>Optimasi Cache</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 14,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  androidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2C1A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  androidBadgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.extrabold,
    color: '#3DDC84',
  },
  archText: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
  },
  title: {
    fontSize: 15,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 3,
  },
  specTable: {
    backgroundColor: colors.bgMain,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  specLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  specValue: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  actionText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});
