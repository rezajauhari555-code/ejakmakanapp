import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { SpinOption } from '../../types';
import { Icon } from '../../components/common/Icon';
import { ROULETTE_SPIN_OPTIONS } from '../../services/mockData';

interface SpinRouletteProps {
  options?: SpinOption[];
  onSelectCategory?: (category: string) => void;
  onOpenSpinHelper?: () => void;
}

const WHEEL_DIAMETER = 290;
const RADIUS = WHEEL_DIAMETER / 2;

export function SpinRoulette({
  options = ROULETTE_SPIN_OPTIONS,
  onSelectCategory,
  onOpenSpinHelper,
}: SpinRouletteProps) {
  const [spinState, setSpinState] = useState<'idle' | 'spinning' | 'result'>('idle');
  const [winningOption, setWinningOption] = useState<SpinOption | null>(null);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  const totalSlices = options.length;
  const sliceDegree = 360 / Math.max(totalSlices, 1);

  function triggerSpin() {
    if (spinState === 'spinning' || totalSlices === 0) return;

    setSpinState('spinning');

    // Pick random winner
    const winningIndex = Math.floor(Math.random() * totalSlices);
    const selected = options[winningIndex];

    // Compute stopping angle so winning slice lands at top pointer (0 deg)
    const extraRotations = 5 + Math.floor(Math.random() * 3);
    const targetSliceCenter = winningIndex * sliceDegree + sliceDegree / 2;
    const finalAngle =
      currentRotation.current + extraRotations * 360 + (360 - (targetSliceCenter % 360));

    Animated.timing(rotateAnim, {
      toValue: finalAngle,
      duration: 3800,
      easing: Easing.bezier(0.18, 0.85, 0.22, 1),
      useNativeDriver: true,
    }).start(() => {
      currentRotation.current = finalAngle % 360;
      setWinningOption(selected);
      setSpinState('result');
    });
  }

  const rotationInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Top Indicator Arrow */}
      <View style={styles.pointerWrap}>
        <View style={styles.pointerTriangle} />
        <View style={styles.pointerBadge}>
          <Icon name="caret-down" size={20} color={colors.gold} />
        </View>
      </View>

      {/* Wheel Rim & Body */}
      <View style={styles.wheelRim}>
        <Animated.View
          style={[
            styles.wheelBody,
            {
              transform: [{ rotate: rotationInterpolate }],
            },
          ]}
        >
          {options.map((opt, index) => {
            const angle = index * sliceDegree;
            const rad = ((angle + sliceDegree / 2) * Math.PI) / 180;
            const dist = RADIUS - 44;
            const x = Math.sin(rad) * dist;
            const y = -Math.cos(rad) * dist;

            return (
              <View
                key={opt.id}
                style={[
                  styles.sliceBadge,
                  {
                    backgroundColor: opt.color,
                    transform: [
                      { translateX: x },
                      { translateY: y },
                      { rotate: `${angle + sliceDegree / 2}deg` },
                    ],
                  },
                ]}
              >
                <Icon
                  name={opt.icon as React.ComponentProps<typeof Icon>['name']}
                  size={14}
                  color={opt.textColor}
                />
                <Text style={[styles.sliceText, { color: opt.textColor }]} numberOfLines={1}>
                  {opt.label}
                </Text>
              </View>
            );
          })}
        </Animated.View>

        {/* Center Spin Action */}
        <Pressable
          accessibilityRole="button"
          onPress={triggerSpin}
          disabled={spinState === 'spinning'}
          style={({ pressed }) => [
            styles.centerButton,
            pressed && styles.pressed,
            spinState === 'spinning' && styles.centerButtonSpinning,
          ]}
        >
          <View style={styles.centerIconWrapper}>
            <Icon
              name={spinState === 'spinning' ? 'sync' : 'sparkles'}
              size={20}
              color={colors.textWhite}
            />
            <Text style={styles.centerButtonText}>
              {spinState === 'spinning' ? 'MEMUTAR' : 'PUTAR'}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Spin Helper Link Button */}
      {onOpenSpinHelper && (
        <Pressable
          accessibilityRole="button"
          onPress={onOpenSpinHelper}
          style={({ pressed }) => [styles.helperLinkPill, pressed && styles.pressed]}
        >
          <Icon name="options-outline" size={16} color={colors.primary} />
          <Text style={styles.helperLinkText}>Sesuaikan Opsi di Spin Helper</Text>
        </Pressable>
      )}

      {/* Result Modal */}
      <Modal
        visible={spinState === 'result' && winningOption !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSpinState('idle')}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {winningOption && (
              <>
                <View style={[styles.modalIconBadge, { backgroundColor: winningOption.color }]}>
                  <Icon
                    name={winningOption.icon as React.ComponentProps<typeof Icon>['name']}
                    size={36}
                    color={winningOption.textColor}
                  />
                </View>

                <Text style={styles.modalEyebrow}>REKOMENDASI TERPILIH 🎉</Text>
                <Text style={styles.modalTitle}>{winningOption.label}</Text>
                <Text style={styles.modalDish}>{winningOption.suggestedDish}</Text>

                <View style={styles.modalDescBox}>
                  <Text style={styles.modalDescText}>{winningOption.description}</Text>
                </View>

                <View style={styles.modalActions}>
                  {onSelectCategory && (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => {
                        setSpinState('idle');
                        onSelectCategory(winningOption.category);
                      }}
                      style={styles.primaryModalBtn}
                    >
                      <Icon name="map" size={16} color={colors.textWhite} />
                      <Text style={styles.primaryModalBtnText}>Lihat Restoran di Peta</Text>
                    </Pressable>
                  )}

                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      setSpinState('idle');
                      triggerSpin();
                    }}
                    style={styles.secondaryModalBtn}
                  >
                    <Icon name="refresh" size={16} color={colors.primary} />
                    <Text style={styles.secondaryModalBtnText}>Putar Ulang Roda</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setSpinState('idle')}
                    style={styles.closeModalBtn}
                  >
                    <Text style={styles.closeModalBtnText}>Tutup</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  pointerWrap: {
    alignItems: 'center',
    zIndex: 10,
    marginBottom: -14,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.gold,
  },
  pointerBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  wheelRim: {
    width: WHEEL_DIAMETER + 18,
    height: WHEEL_DIAMETER + 18,
    borderRadius: (WHEEL_DIAMETER + 18) / 2,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  wheelBody: {
    width: WHEEL_DIAMETER,
    height: WHEEL_DIAMETER,
    borderRadius: WHEEL_DIAMETER / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sliceBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    minWidth: 78,
  },
  sliceText: {
    fontSize: 9,
    fontWeight: typography.fontWeight.extrabold,
  },
  centerButton: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  centerButtonSpinning: {
    backgroundColor: colors.gold,
  },
  centerIconWrapper: {
    alignItems: 'center',
    gap: 2,
  },
  centerButtonText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.black,
    color: colors.textWhite,
    letterSpacing: 0.8,
  },
  helperLinkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
    marginTop: 18,
  },
  helperLinkText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  modalIconBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -48,
    borderWidth: 4,
    borderColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  modalEyebrow: {
    fontSize: 11,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 14,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.fontWeight.black,
    color: colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  modalDish: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.gold,
    marginTop: 4,
    textAlign: 'center',
  },
  modalDescBox: {
    backgroundColor: colors.bgMain,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    width: '100%',
  },
  modalDescText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalActions: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  primaryModalBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryModalBtnText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
  },
  secondaryModalBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryModalBtnText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
  },
  closeModalBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  closeModalBtnText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.semibold,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});
