import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { SpinWheelOption } from '../../types';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface SpinResultModalProps {
  visible: boolean;
  result: SpinWheelOption | null;
  onClose: () => void;
  onExploreMap: (category: string) => void;
  onSpinAgain: () => void;
}

export function SpinResultModal({
  visible,
  result,
  onClose,
  onExploreMap,
  onSpinAgain,
}: SpinResultModalProps) {
  if (!result) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Confetti / Icon Badge */}
          <View style={[styles.badgeCircle, { backgroundColor: result.color }]}>
            <Icon
              name={result.icon as React.ComponentProps<typeof Icon>['name']}
              size={36}
              color={result.textColor}
            />
          </View>

          <Text style={styles.eyebrow}>HASIL PUTARAN RASA 🎉</Text>
          <Text style={styles.title}>{result.label}</Text>
          <Text style={styles.dishHeadline}>{result.suggestedDish}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.description}>{result.description}</Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Lihat Rekomendasi di Peta"
              onPress={() => {
                onClose();
                onExploreMap(result.category);
              }}
              icon="map"
              variant="primary"
            />
            <Button
              title="Putar Ulang Roda"
              onPress={() => {
                onClose();
                onSpinAgain();
              }}
              icon="refresh"
              variant="outline"
              style={styles.spinAgainButton}
            />
            <Pressable onPress={onClose} style={styles.closeTextButton}>
              <Text style={styles.closeText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  badgeCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -48,
    borderWidth: 4,
    borderColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
    marginTop: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 6,
    textAlign: 'center',
  },
  dishHeadline: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentOrange,
    marginTop: 4,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    width: '100%',
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  spinAgainButton: {
    borderColor: colors.border,
  },
  closeTextButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
});

