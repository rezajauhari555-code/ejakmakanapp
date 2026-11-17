
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Icon } from '../common/Icon';

export type MainTabKey = 'explore' | 'recommendations' | 'favorites' | 'profile';

interface BottomTabBarProps {
  activeTab: MainTabKey | string;
  onSelectTab: (tab: MainTabKey) => void;
}

export function BottomTabBar({ activeTab, onSelectTab }: BottomTabBarProps) {
  const tabs: {
    key: MainTabKey;
    label: string;
    icon: React.ComponentProps<typeof Icon>['name'];
    activeIcon: React.ComponentProps<typeof Icon>['name'];
  }[] = [
    { key: 'explore', label: 'Jelajah', icon: 'compass-outline', activeIcon: 'compass' },
    { key: 'recommendations', label: 'Spin & Pilih', icon: 'sparkles-outline', activeIcon: 'sparkles' },
    { key: 'favorites', label: 'Koleksi', icon: 'bookmark-outline', activeIcon: 'bookmark' },
    { key: 'profile', label: 'Profil', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const isSpin = tab.key === 'recommendations';

          if (isSpin) {
            return (
              <Pressable
                key={tab.key}
                accessibilityRole="button"
                accessibilityLabel="Putar Roulette Kuliner"
                onPress={() => onSelectTab(tab.key)}
                style={styles.spinButtonWrapper}
              >
                <View style={[styles.spinButton, isActive && styles.spinButtonActive]}>
                  <Icon name="dice" size={22} color={colors.white} />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    styles.spinLabel,
                    isActive && styles.activeTabLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.key}
              accessibilityRole="button"
              accessibilityLabel={`Tab ${tab.label}`}
              onPress={() => onSelectTab(tab.key)}
              style={styles.tabItem}
            >
              <Icon
                name={isActive ? tab.activeIcon : tab.icon}
                size={22}
                color={isActive ? colors.primary : colors.textMuted}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 52,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '800',
  },
  spinButtonWrapper: {
    alignItems: 'center',
    flex: 1,
    marginTop: -16,
  },
  spinButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  spinButtonActive: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 1.05 }],
  },
  spinLabel: {
    marginTop: 4,
  },
});
