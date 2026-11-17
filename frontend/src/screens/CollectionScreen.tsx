import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { EmptyState } from '../components/common/EmptyState';
import { Header } from '../components/common/Header';
import { DestinationCard } from '../components/home/DestinationCard';
import { CulinaryDestination } from '../types';

interface CollectionScreenProps {
  destinations: CulinaryDestination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: CulinaryDestination) => void;
  onExploreMore: () => void;
  onBack: () => void;
}

export function CollectionScreen({
  destinations,
  savedIds,
  onToggleSave,
  onSelectDestination,
  onExploreMore,
  onBack,
}: CollectionScreenProps) {
  const savedDestinations = destinations.filter((d) => savedIds.includes(d.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Koleksi Favorit" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>TEMPAT YANG KAMU SIMPAN</Text>
          <Text style={styles.title}>Spot Kuliner Tersimpan</Text>
          <Text style={styles.subtitle}>
            Daftar sentra kuliner pilihan yang kamu tandai untuk dikunjungi.
          </Text>
        </View>

        {savedDestinations.length === 0 ? (
          <EmptyState
            icon="bookmark-outline"
            title="Koleksi Masih Kosong"
            description="Kamu belum menyimpan sentra kuliner apapun. Jelajahi beranda atau peta kuliner dan tekan tombol simpan."
            actionTitle="Jelajahi Kuliner Sekarang"
            onAction={onExploreMore}
          />
        ) : (
          <View style={styles.list}>
            {savedDestinations.map((item) => (
              <DestinationCard
                key={item.id}
                destination={item}
                isSaved={true}
                onPress={() => onSelectDestination(item)}
                onToggleSave={() => onToggleSave(item.id)}
                variant="compact"
              />
            ))}
          </View>
        )}
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
  titleSection: {
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  list: {
    marginTop: 8,
  },
});

