import { Platform } from 'react-native';

const fontFamily = {
  heading: Platform.select({
    ios: 'Plus Jakarta Sans',
    android: 'sans-serif-medium',
    default: 'System',
  }),
  body: Platform.select({
    ios: 'Inter',
    android: 'sans-serif',
    default: 'System',
  }),
};

export const typography = {
  fontFamily,
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 15,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 34,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
  lineHeight: {
    tight: 18,
    normal: 22,
    relaxed: 26,
    loose: 32,
    heading: 38,
  },

  // Figma & Material 3 composite scales
  headlineLarge: {
    fontFamily: fontFamily.heading,
    fontSize: 28,
    fontWeight: '800' as const,
    lineHeight: 34,
  },
  headlineMedium: {
    fontFamily: fontFamily.heading,
    fontSize: 24,
    fontWeight: '800' as const,
    lineHeight: 30,
  },
  titleLarge: {
    fontFamily: fontFamily.heading,
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 26,
  },
  titleMedium: {
    fontFamily: fontFamily.heading,
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 22,
  },
  titleSmall: {
    fontFamily: fontFamily.heading,
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: fontFamily.heading,
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 18,
  },
  labelMedium: {
    fontFamily: fontFamily.heading,
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: fontFamily.heading,
    fontSize: 10,
    fontWeight: '600' as const,
    lineHeight: 14,
  },
};
