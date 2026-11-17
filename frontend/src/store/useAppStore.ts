import { useState, useEffect } from 'react';
import {
  CulinaryCategory,
  Review,
  UserPreferences,
  UserProfile,
} from '../types';
import { BANDUNG_RESTAURANTS, DEMO_USER, MOCK_REVIEWS } from '../services/mockData';

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  favorites: string[];
  wishlist: string[];
  visited: string[];
  userReviews: Review[];
  preferences: UserPreferences;
  selectedCategory: CulinaryCategory;
  searchQuery: string;
}

const defaultState: AppState = {
  user: DEMO_USER, // Demo ready by default or upon demo login
  isAuthenticated: true,
  favorites: ['kopi-sapa', 'bakmi-tiga-saudara', 'iga-bakar-si-jangkung'],
  wishlist: ['sejiwa-coffee', 'two-hands-full'],
  visited: ['kopi-sapa', 'bakmi-tiga-saudara', 'ibu-imas'],
  userReviews: MOCK_REVIEWS.filter((r) => r.authorName === 'Dimas Pratama'),
  preferences: {
    selectedCategories: ['Kopi & Cafe WFC', 'Bakmi & Street Food', 'Daging & Grill'],
    budget: '30rb-75rb',
    halalOnly: true,
    vegetarianOnly: false,
    mood: 'Nongkrong Santai',
  },
  selectedCategory: 'Semua',
  searchQuery: '',
};

let globalState = { ...defaultState };
const listeners = new Set<(state: AppState) => void>();

function notify() {
  listeners.forEach((listener) => listener({ ...globalState }));
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const actions = {
    loginDemo: () => {
      globalState = {
        ...globalState,
        user: DEMO_USER,
        isAuthenticated: true,
      };
      notify();
    },
    loginUser: (user: UserProfile) => {
      globalState = {
        ...globalState,
        user,
        isAuthenticated: true,
      };
      notify();
    },
    logout: () => {
      globalState = {
        ...globalState,
        user: null,
        isAuthenticated: false,
      };
      notify();
    },
    toggleFavorite: (restaurantId: string) => {
      const exists = globalState.favorites.includes(restaurantId);
      const nextFavorites = exists
        ? globalState.favorites.filter((id) => id !== restaurantId)
        : [...globalState.favorites, restaurantId];

      globalState = {
        ...globalState,
        favorites: nextFavorites,
      };
      notify();
    },
    toggleWishlist: (restaurantId: string) => {
      const exists = globalState.wishlist.includes(restaurantId);
      const nextWishlist = exists
        ? globalState.wishlist.filter((id) => id !== restaurantId)
        : [...globalState.wishlist, restaurantId];

      globalState = {
        ...globalState,
        wishlist: nextWishlist,
      };
      notify();
    },
    markVisited: (restaurantId: string) => {
      if (!globalState.visited.includes(restaurantId)) {
        globalState = {
          ...globalState,
          visited: [...globalState.visited, restaurantId],
        };
        notify();
      }
    },
    setPreferences: (preferences: UserPreferences) => {
      globalState = {
        ...globalState,
        preferences,
      };
      notify();
    },
    setSelectedCategory: (category: CulinaryCategory) => {
      globalState = {
        ...globalState,
        selectedCategory: category,
      };
      notify();
    },
    setSearchQuery: (query: string) => {
      globalState = {
        ...globalState,
        searchQuery: query,
      };
      notify();
    },
  };

  return {
    ...state,
    ...actions,
  };
}
