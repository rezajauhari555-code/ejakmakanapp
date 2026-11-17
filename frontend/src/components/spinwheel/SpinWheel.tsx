import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { SpinWheelOption } from '../../types';
import { Icon } from '../common/Icon';

interface SpinWheelProps {
  options: SpinWheelOption[];
  onSpinEnd: (selected: SpinWheelOption) => void;
  disabled?: boolean;
}

const WHEEL_SIZE = 300;
const RADIUS = WHEEL_SIZE / 2;

export function SpinWheel({ options, onSpinEnd, disabled = false }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const currentAngle = useRef(0);

  const numSlices = options.length;
  const sliceAngle = 360 / Math.max(numSlices, 1);

  function spin() {
    if (spinning || disabled || numSlices === 0) return;

    setSpinning(true);

    // Pick random slice
    const randomIndex = Math.floor(Math.random() * numSlices);
    const selectedOption = options[randomIndex];

    // Calculate angle: Top pointer is at 0 deg (or 270 deg depending on coordinate).
    // Let's set slice 0 at the top. Target angle stops when slice center aligns with top pointer.
    const extraRotations = 5 + Math.floor(Math.random() * 3); // 5 to 7 full spins
    const targetSliceCenter = randomIndex * sliceAngle + sliceAngle / 2;
    // We want targetSliceCenter to end up at top (360 - targetSliceCenter)
    const targetRotation = currentAngle.current + extraRotations * 360 + (360 - (targetSliceCenter % 360));

    Animated.timing(spinValue, {
      toValue: targetRotation,
      duration: 3800,
      easing: Easing.bezier(0.2, 0.8, 0.25, 1),
      useNativeDriver: true,
    }).start(() => {
      currentAngle.current = targetRotation % 360;
      setSpinning(false);
      onSpinEnd(selectedOption);
    });
  }

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Top Pointer Indicator */}
      <View style={styles.pointerContainer}>
        <View style={styles.pointerTriangle} />
        <View style={styles.pointerCircle}>
          <Icon name="caret-down" size={24} color={colors.accentOrange} />
        </View>
      </View>

      {/* Wheel Body */}
      <View style={styles.outerRim}>
        <Animated.View
          style={[
            styles.wheel,
            {
              transform: [{ rotate: spinInterpolation }],
            },
          ]}
        >
          {options.map((option, index) => {
            const angle = index * sliceAngle;
            // Place badges radially around center
            const rad = ((angle + sliceAngle / 2) * Math.PI) / 180;
            const distance = RADIUS - 46;
            const x = Math.sin(rad) * distance;
            const y = -Math.cos(rad) * distance;

            return (
              <View
                key={option.id}
                style={[
                  styles.sliceBadge,
                  {
                    backgroundColor: option.color,
                    transform: [
                      { translateX: x },
                      { translateY: y },
                      { rotate: `${angle + sliceAngle / 2}deg` },
                    ],
                  },
                ]}
              >
                <Icon
                  name={option.icon as React.ComponentProps<typeof Icon>['name']}
                  size={16}
                  color={option.textColor}
                />
                <Text
                  style={[styles.sliceText, { color: option.textColor }]}
                  numberOfLines={1}
                >
                  {option.label}
                </Text>
              </View>
            );
          })}
        </Animated.View>

        {/* Center Spin Action Button */}
        <Pressable
          accessibilityRole="button"
          onPress={spin}
          disabled={spinning || disabled}
          style={({ pressed }) => [
            styles.centerButton,
            pressed && styles.centerButtonPressed,
            spinning && styles.centerButtonSpinning,
          ]}
        >
          <View style={styles.centerButtonInner}>
            <Icon
              name={spinning ? 'sync' : 'sparkles'}
              size={22}
              color={colors.textOnPrimary}
            />
            <Text style={styles.centerButtonText}>
              {spinning ? 'PUTAR...' : 'PUTAR'}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  pointerContainer: {
    alignItems: 'center',
    zIndex: 10,
    marginBottom: -16,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.accentOrange,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pointerCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    borderWidth: 2,
    borderColor: colors.accentOrange,
  },
  outerRim: {
    width: WHEEL_SIZE + 18,
    height: WHEEL_SIZE + 18,
    borderRadius: (WHEEL_SIZE + 18) / 2,
    backgroundColor: colors.primaryLight,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.border,
  },
  sliceBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    minWidth: 84,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  sliceText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  centerButton: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  centerButtonPressed: {
    transform: [{ scale: 0.94 }],
  },
  centerButtonSpinning: {
    backgroundColor: colors.accentOrange,
  },
  centerButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  centerButtonText: {
    color: colors.textOnPrimary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

