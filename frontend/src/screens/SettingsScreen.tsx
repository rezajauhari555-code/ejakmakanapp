import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';

interface SettingsScreenProps {
  onBack: () => void;
  onClearSession: () => void;
}

export function SettingsScreen({ onBack, onClearSession }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  function handleClearCache() {
    Alert.alert(
      'Bersihkan Data Sementara',
      'Apakah Anda yakin ingin membersihkan cache aplikasi dan sesi?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Bersihkan',
          style: 'destructive',
          onPress: () => {
            onClearSession();
            Alert.alert('Sukses', 'Data sesi dan cache berhasil dibersihkan.');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Pengaturan" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Preferensi Aplikasi</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                <Icon name="notifications-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.rowTitle}>Notifikasi Rekomendasi</Text>
                <Text style={styles.rowSub}>Inspirasi kuliner harian jam makan</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.accentOrangeSoft }]}>
                <Icon name="navigate-outline" size={18} color={colors.accentOrange} />
              </View>
              <View>
                <Text style={styles.rowTitle}>Akses Lokasi GPS</Text>
                <Text style={styles.rowSub}>Menemukan spot kuliner terdekat</Text>
              </View>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        <Text style={styles.sectionHeading}>Data & Privasi</Text>

        <View style={styles.card}>
          <Pressable style={styles.row} onPress={handleClearCache}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.accentRedSoft }]}>
                <Icon name="trash-outline" size={18} color={colors.accentRed} />
              </View>
              <View>
                <Text style={styles.rowTitle}>Bersihkan Cache & Sesi</Text>
                <Text style={styles.rowSub}>Hapus data login lokal dan temporary storage</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <Text style={styles.sectionHeading}>Tentang Ejakmakan</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versi Aplikasi</Text>
            <Text style={styles.infoValue}>1.0.0 (Build 1)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Framework</Text>
            <Text style={styles.infoValue}>React Native & Expo SDK 58</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backend API</Text>
            <Text style={styles.infoValue}>Node.js & Express 5</Text>
          </View>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textSecondary,
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  rowSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});

