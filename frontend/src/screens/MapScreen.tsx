import React, { useEffect, useRef, useState } from 'react';
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
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { Button } from '../components/common/Button';
import { Header } from '../components/common/Header';
import { Icon } from '../components/common/Icon';
import { CATEGORIES } from '../services/culinaryData';
import { Category, CulinaryDestination } from '../types';

interface MapScreenProps {
  destinations: CulinaryDestination[];
  savedIds: string[];
  initialCategory?: string;
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: CulinaryDestination) => void;
  onBack: () => void;
}

const INITIAL_REGION = {
  latitude: 1.1301,
  longitude: 104.0529,
  latitudeDelta: 0.14,
  longitudeDelta: 0.14,
};

export function MapScreen({
  destinations,
  savedIds,
  initialCategory = 'Semua',
  onToggleSave,
  onSelectDestination,
  onBack,
}: MapScreenProps) {
  const mapRef = useRef<MapView>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSpot, setSelectedSpot] = useState<CulinaryDestination | null>(
    destinations[0] || null,
  );

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      const matches = destinations.filter(
        (d) => initialCategory === 'Semua' || d.category === initialCategory,
      );
      if (matches.length > 0) {
        setSelectedSpot(matches[0]);
      }
    }
  }, [initialCategory, destinations]);

  const filteredDestinations = destinations.filter((dest) => {
    if (selectedCategory === 'Semua') return true;
    return dest.category === selectedCategory;
  });

  function focusMarker(dest: CulinaryDestination) {
    setSelectedSpot(dest);
    mapRef.current?.animateToRegion(
      {
        latitude: dest.latitude,
        longitude: dest.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      500,
    );
  }

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    const matches = destinations.filter(
      (d) => category === 'Semua' || d.category === category,
    );
    if (matches.length > 0) {
      focusMarker(matches[0]);
    }
  }

  function handleOpenDirections(dest: CulinaryDestination) {
    const lat = dest.latitude;
    const lng = dest.longitude;
    const label = encodeURIComponent(dest.name);

    const url = Platform.select({
      ios: `maps://?q=${label}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    });

    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    });
  }

  function resetCamera() {
    mapRef.current?.animateToRegion(INITIAL_REGION, 600);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header
        title="Peta Kuliner Batam"
        subtitle="Jelajahi sentra rasa di Kota Batam"
        onBack={onBack}
        rightAction={{
          icon: 'locate',
          onPress: resetCamera,
        }}
      />

      <View style={styles.mapContainer}>
        {/* Interactive Map */}
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={INITIAL_REGION}
          showsUserLocation={true}
          showsCompass={true}
        >
          {filteredDestinations.map((spot) => {
            const isSelected = selectedSpot?.id === spot.id;
            return (
              <Marker
                key={spot.id}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                }}
                title={spot.name}
                description={`${spot.category} · ${spot.district}`}
                onPress={() => focusMarker(spot)}
              >
                <View style={[styles.customPin, isSelected && styles.customPinActive]}>
                  <Icon
                    name="restaurant"
                    size={14}
                    color={isSelected ? colors.textOnPrimary : colors.primary}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>

        {/* Floating Category Filter Chips */}
        <View style={styles.floatingFilters}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.label;
              return (
                <Pressable
                  key={cat.label}
                  accessibilityRole="button"
                  onPress={() => handleSelectCategory(cat.label)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Floating Reset Button */}
        <Pressable
          accessibilityRole="button"
          onPress={resetCamera}
          style={styles.recenterButton}
        >
          <Icon name="locate" size={20} color={colors.primary} />
        </Pressable>

        {/* Bottom Destination Sheet */}
        {selectedSpot ? (
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetContent}>
              <Image source={{ uri: selectedSpot.image }} style={styles.sheetImage} />

              <View style={styles.sheetInfo}>
                <View style={styles.sheetHeaderRow}>
                  <View style={styles.sheetBadge}>
                    <Text style={styles.sheetBadgeText}>{selectedSpot.category}</Text>
                  </View>
                  <Pressable
                    onPress={() => onToggleSave(selectedSpot.id)}
                    hitSlop={8}
                  >
                    <Icon
                      name={savedIds.includes(selectedSpot.id) ? 'bookmark' : 'bookmark-outline'}
                      size={20}
                      color={colors.primary}
                    />
                  </Pressable>
                </View>

                <Text style={styles.sheetTitle} numberOfLines={1}>
                  {selectedSpot.name}
                </Text>
                <Text style={styles.sheetAddress}>
                  {selectedSpot.district}, {selectedSpot.city}
                </Text>

                <View style={styles.metaRow}>
                  <Icon name="star" size={13} color={colors.accentYellow} />
                  <Text style={styles.ratingText}>{selectedSpot.rating}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.metaText}>{selectedSpot.openHours}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sheetActions}>
              <Button
                title="Buka Rute Maps"
                onPress={() => handleOpenDirections(selectedSpot)}
                icon="navigate"
                variant="primary"
                style={styles.directionsButton}
              />
              <Button
                title="Lihat Detail"
                onPress={() => onSelectDestination(selectedSpot)}
                variant="outline"
                style={styles.detailButton}
              />
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  floatingFilters: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.textOnPrimary,
  },
  recenterButton: {
    position: 'absolute',
    right: 16,
    top: 70,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  customPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  customPinActive: {
    backgroundColor: colors.primary,
    borderColor: colors.card,
    transform: [{ scale: 1.15 }],
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetContent: {
    flexDirection: 'row',
  },
  sheetImage: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  sheetInfo: {
    flex: 1,
    marginLeft: 14,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sheetBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  sheetAddress: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
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
  sheetActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  directionsButton: {
    flex: 1,
    height: 44,
  },
  detailButton: {
    flex: 1,
    height: 44,
  },
});
