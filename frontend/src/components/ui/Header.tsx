import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../common/Icon';
import { DEMO_USER } from '../../services/mockData';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  onPressProfile?: () => void;
  // Strictly false by default for main and tab screens as per Figma clean design
  showBackButton?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  showLogo = false,
  onPressProfile,
  showBackButton = false,
  onBack,
  rightAction,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left Column: ONLY show back button if explicitly requested for sub-screens */}
      <View style={styles.left}>
        {showBackButton && onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Icon name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : showLogo ? (
          <View style={styles.logoRow}>
            <View style={styles.brandIconSquare}>
              <Icon name="restaurant" size={16} color={colors.textWhite} />
            </View>
            <View>
              <Text style={styles.brandTitle}>Ejakmakan</Text>
              <Text style={styles.brandSubtitle}>Kuliner Bandung</Text>
            </View>
          </View>
        ) : (
          <View style={styles.textLeft}>
            {title ? <Text style={styles.titleText}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
          </View>
        )}
      </View>

      {/* Right Column: Consistent Profile Avatar across screens */}
      <View style={styles.right}>
        {rightAction ? (
          rightAction
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buka Profil Dimas Pratama"
            onPress={onPressProfile}
            style={({ pressed }) => [styles.profilePill, pressed && styles.pressed]}
          >
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv.4</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>{DEMO_USER.avatarInitials}</Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.bgMain,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIconSquare: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  brandTitle: {
    fontSize: 16,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primaryDark,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 10,
    fontFamily: typography.fontFamily.body,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  textLeft: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 17,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textPrimary,
  },
  subtitleText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.body,
    color: colors.textSecondary,
    marginTop: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelBadge: {
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 9,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 11,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.textWhite,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
