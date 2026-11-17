export type AppScreen =
  | 'onboarding'
  | 'login'
  | 'register'
  | 'preferences'
  | 'explore'
  | 'recommendations'
  | 'favorites'
  | 'profile'
  | 'restaurant-detail';

export type Screen =
  | AppScreen
  | 'home'
  | 'map'
  | 'collection'
  | 'settings'
  | 'spin-helper'
  | 'detail';

export type TabKey = 'explore' | 'recommendations' | 'favorites' | 'profile' | 'home' | 'map' | 'collection';

export type CulinaryCategory =
  | 'Semua'
  | 'Kopi & Cafe WFC'
  | 'Bakmi & Street Food'
  | 'Daging & Grill'
  | 'Nusantara & Sunda'
  | 'Pastry & Bakery'
  | 'Western & Dessert'
  | 'Street Food'
  | 'Kopi & Kafe'
  | 'Nusantara'
  | 'Western'
  | 'Dessert'
  | 'Bakmi'
  | 'Jepang & Asia'
  | (string & {});

export type Category = CulinaryCategory;

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  isEditorChoice?: boolean;
  image?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  authorName: string;
  authorInitials: string;
  authorLevel: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: CulinaryCategory;
  district: string;
  city: string;
  address?: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount?: number;
  reviewCountText: string;
  priceRange?: string;
  budgetCategory?: '<30rb' | '30rb-75rb' | '>75rb' | string;
  isHalal?: boolean;
  isVegetarianFriendly?: boolean;
  image: string;
  gallery?: string[];
  tags: string[];
  description: string;
  openHours: string;
  phoneWa?: string;
  phoneOrWa?: string;
  distanceEstimate?: string;
  popularHighlights?: string[];
  mapsUrl?: string;
  editorChoiceMenu?: MenuItem[];
}

export type CulinaryDestination = Restaurant;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  foodieLevel: number;
  foodieTitle: string;
  xpCurrent: number;
  xpMax: number;
  avatarInitials: string;
  reviewsCount: number;
  photosCount: number;
  collectionsCount: number;
  provider: 'google' | 'apple' | 'whatsapp' | 'email' | 'demo';
}

export interface UserSession {
  token: string;
  name: string;
  email: string | null;
  provider: 'google' | 'apple' | 'whatsapp' | 'email' | 'demo';
  avatarUrl: string | null;
}

export interface SpinOption {
  id: string;
  label: string;
  icon: string;
  category: CulinaryCategory;
  color: string;
  textColor: string;
  suggestedDish: string;
  description: string;
}

export type SpinWheelOption = SpinOption;

export interface SpinFilterConfig {
  budget: string;
  mood: string;
  radiusKm: number;
  halalOnly: boolean;
  activeOptions: SpinOption[];
}

export interface UserPreferences {
  selectedCategories: string[];
  budget: 'Semua' | '<30rb' | '30rb-75rb' | '>75rb';
  halalOnly: boolean;
  vegetarianOnly: boolean;
  mood: string;
}

export interface ThematicCollection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  restaurants: string[]; // Restaurant IDs
}
