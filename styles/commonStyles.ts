
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Paranormal Investigation App Colors
export const colors = {
  background: '#121212',      // Dark, mysterious
  text: '#FFFFFF',            // Bright, readable
  textSecondary: '#A0A0A0',   // Subtle, for less important text
  primary: '#64FFDA',         // Teal, for highlights and interactive elements
  secondary: '#BB86FC',       // Purple, for accents
  accent: '#FF4081',          // Pink, for warnings or special indicators
  card: '#1E1E1E',            // Slightly lighter than background, for card-like elements
  highlight: '#292929',       // Even lighter, for selected items
  backgroundAlt: '#1A1A1A',   // Alternative background
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(100, 255, 218, 0.2)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
