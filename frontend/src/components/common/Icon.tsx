import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export interface IconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
}

export function Icon({ name, size = 20, color = colors.primary }: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

