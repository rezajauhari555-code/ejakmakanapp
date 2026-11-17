import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

import { BottomTabBar, MainTabKey } from './src/components/navigation/BottomTabBar';
import OnboardingScreen from './app/(onboarding)/index';
import LoginScreen from './app/(auth)/login';
import RegisterScreen from './app/(auth)/register';
import PreferencesScreen from './app/preferences';
import ExploreScreen from './app/(tabs)/explore';
import RecommendationsScreen from './app/(tabs)/recommendations';
import FavoritesScreen from './app/(tabs)/favorites';
import ProfileScreen from './app/(tabs)/profile';
import RestaurantDetailScreen from './app/restaurants/[id]';

import { getStoredSession, saveStoredSession, clearStoredSession } from './src/services/authService';
import { useAppStore } from './src/store/useAppStore';
import { AppScreen, Restaurant, UserProfile } from './src/types';
import { DEMO_USER } from './src/services/mockData';
import { colors } from './src/theme/colors';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || 'google-client-id-not-configured';
const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || 'google-client-id-not-configured';
const GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'google-client-id-not-configured';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('explore');
  const [activeTab, setActiveTab] = useState<MainTabKey>('explore');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('kopi-sapa');
  const [previousTab, setPreviousTab] = useState<MainTabKey>('explore');

  const { loginUser, logout: storeLogout } = useAppStore();

  // Google OAuth Hook
  const [googleRequest, googleResponse, promptGoogle] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    async function initSession() {
      try {
        const session = await getStoredSession();
        if (session) {
          loginUser({
            id: 'stored-user',
            name: session.name || 'Dimas Pratama',
            email: session.email || 'dimas.pratama@ejakmakan.id',
            phone: '+62 812-3456-7890',
            foodieLevel: 4,
            foodieTitle: 'Foodie Explorer',
            xpCurrent: 850,
            xpMax: 1000,
            avatarInitials: session.name ? session.name.substring(0, 2).toUpperCase() : 'DP',
            reviewsCount: 32,
            photosCount: 124,
            collectionsCount: 18,
            provider: session.provider as any,
          });
          setCurrentScreen('explore');
        } else {
          // Default to explore screen with demo user for smooth instant experience
          loginUser(DEMO_USER);
          setCurrentScreen('explore');
        }
      } catch (err) {
        console.warn('Session init warning:', err);
      }
    }
    initSession();
  }, []);

  function handleTabSelect(tab: MainTabKey) {
    setActiveTab(tab);
    setCurrentScreen(tab as AppScreen);
  }

  function handleSelectRestaurant(restaurant: Restaurant) {
    setSelectedRestaurantId(restaurant.id);
    setPreviousTab(activeTab);
    setCurrentScreen('restaurant-detail');
  }

  function handleBackFromDetail() {
    setCurrentScreen(previousTab as AppScreen);
  }

  function handleLoginSuccess(user: UserProfile) {
    loginUser(user);
    saveStoredSession({
      token: 'demo-jwt-token',
      name: user.name,
      email: user.email,
      provider: user.provider,
      avatarUrl: null,
    });
    setActiveTab('explore');
    setCurrentScreen('explore');
  }

  function handleLogout() {
    storeLogout();
    clearStoredSession();
    setCurrentScreen('login');
  }

  // Render main screen component based on currentScreen state
  function renderScreenContent() {
    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onStart={() => setCurrentScreen('register')}
            onSkip={() => {
              setActiveTab('explore');
              setCurrentScreen('explore');
            }}
            onLogin={() => setCurrentScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onGoToRegister={() => setCurrentScreen('register')}
            onExploreAsGuest={() => {
              setActiveTab('explore');
              setCurrentScreen('explore');
            }}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onRegisterSuccess={() => setCurrentScreen('preferences')}
            onGoToLogin={() => setCurrentScreen('login')}
            onSkip={() => {
              setActiveTab('explore');
              setCurrentScreen('explore');
            }}
          />
        );

      case 'preferences':
        return (
          <PreferencesScreen
            onSave={() => {
              setActiveTab('explore');
              setCurrentScreen('explore');
            }}
            onSkip={() => {
              setActiveTab('explore');
              setCurrentScreen('explore');
            }}
          />
        );

      case 'explore':
        return (
          <ExploreScreen
            onSelectRestaurant={handleSelectRestaurant}
            onNavigateToSpin={() => handleTabSelect('recommendations')}
            onNavigateToProfile={() => handleTabSelect('profile')}
          />
        );

      case 'recommendations':
        return (
          <RecommendationsScreen
            onSelectRestaurant={handleSelectRestaurant}
            onNavigateToProfile={() => handleTabSelect('profile')}
          />
        );

      case 'favorites':
        return (
          <FavoritesScreen
            onSelectRestaurant={handleSelectRestaurant}
            onNavigateToExplore={() => handleTabSelect('explore')}
            onNavigateToProfile={() => handleTabSelect('profile')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            onLogout={handleLogout}
            onNavigateToPreferences={() => setCurrentScreen('preferences')}
          />
        );

      case 'restaurant-detail':
        return (
          <RestaurantDetailScreen
            restaurantId={selectedRestaurantId}
            onBack={handleBackFromDetail}
          />
        );

      default:
        return (
          <ExploreScreen
            onSelectRestaurant={handleSelectRestaurant}
            onNavigateToSpin={() => handleTabSelect('recommendations')}
            onNavigateToProfile={() => handleTabSelect('profile')}
          />
        );
    }
  }

  const isMainTab = ['explore', 'recommendations', 'favorites', 'profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>{renderScreenContent()}</View>
      {isMainTab && (
        <BottomTabBar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
