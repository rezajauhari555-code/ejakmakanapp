import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { Category } from '../../types';
import { Icon } from '../common/Icon';

interface CategoryCardProps {
  label: Category;
  icon: string;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({ label, icon, selected, onSelect }: CategoryCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onSelect}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Icon
        name={icon as React.ComponentProps<typeof Icon>['name']}
        size={20}
        color={selected ? colors.primary : colors.textSecondary}
      />
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    gap: 6,
  },
  cardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  textSelected: {
    color: colors.primary,
    fontWeight: '800',
  },
});

