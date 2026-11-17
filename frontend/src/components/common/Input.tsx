import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Icon } from './Icon';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  icon,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        {icon ? (
          <View style={styles.iconContainer}>
            <Icon name={icon} size={18} color={error ? colors.accentRed : colors.textMuted} />
          </View>
        ) : null}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          {...props}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputWrapper: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: colors.accentRed,
    backgroundColor: colors.accentRedSoft,
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: 11,
    color: colors.accentRed,
    marginTop: 4,
  },
});

