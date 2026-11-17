import React, { useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Restaurant } from '../../types';
import { Icon } from '../../components/common/Icon';
import { RestaurantCard } from '../../components/ui/RestaurantCard';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const BATAM_INITIAL_REGION = {
  latitude: 1.1301,
  longitude: 104.0529,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export function RestaurantMap({
  restaurants,
  favorites,
  onToggleFavorite,
  onSelectRestaurant,
}: RestaurantMapProps) {
  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);
  const [selectedId, setSelectedId] = useState<string>(restaurants[0]?.id || '');

  function focusRestaurant(restaurant: Restaurant, index: number) {
    setSelectedId(restaurant.id);

    mapRef.current?.animateToRegion(
      {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      450,
    );

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }

  function handleMarkerPress(restaurant: Restaurant) {
    const idx = restaurants.findIndex((r) => r.id === restaurant.id);
    if (idx !== -1) {
      focusRestaurant(restaurant, idx);
    }
  }

  function recenterBatam() {
    mapRef.current?.animateToRegion(BATAM_INITIAL_REGION, 500);
  }

  return (
    <View style={styles.container}>
      {/* Map Canvas */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={BATAM_INITIAL_REGION}
        showsCompass={true}
        showsUserLocation={true}
      >
        {restaurants.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.name}
              description={`${item.category} · ${item.district}`}
              onPress={() => handleMarkerPress(item)}
            >
              <View style={[styles.customMarker, isSelected && styles.customMarkerSelected]}>
                <Icon
                  name={isSelected ? 'restaurant' : 'star'}
                  size={12}
                  color={isSelected ? colors.textWhite : colors.primary}
                />
                <Text style={[styles.markerRating, isSelected && styles.markerRatingSelected]}>
                  {item.rating.toFixed(1)}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Floating Recenter Action */}
      <Pressable
        accessibilityRole="button"
        onPress={recenterBatam}
        style={styles.recenterBtn}
      >
        <Icon name="locate" size={18} color={colors.primary} />
      </Pressable>

      {/* Horizontal Carousel of Synchronized Cards at Bottom of Map */}
      <View style={styles.bottomCarouselContainer}>
        <FlatList
          ref={flatListRef}
          data={restaurants}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          getItemLayout={(_data, index) => ({
            length: 264,
            offset: 264 * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <View style={[styles.cardItemWrap, selectedId === item.id && styles.cardActiveWrap]}>
              <RestaurantCard
                restaurant={item}
                isFavorite={favorites.includes(item.id)}
                variant="carousel"
                onPress={() => onSelectRestaurant(item)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 380,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  customMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: colors.primary,
    gap: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  customMarkerSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.card,
    transform: [{ scale: 1.15 }],
  },
  markerRating: {
    fontSize: 10,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  },
  markerRatingSelected: {
    color: colors.textWhite,
  },
  recenterBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomCarouselContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
  },
  carouselContent: {
    paddingHorizontal: 14,
  },
  cardItemWrap: {
    borderRadius: 16,
  },
  cardActiveWrap: {
    transform: [{ scale: 1.02 }],
  },
});

