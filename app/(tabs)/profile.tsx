
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Image, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.avatarGradient}
        >
          <IconSymbol name="person.fill" size={60} color={colors.background} />
        </LinearGradient>
        <Text style={styles.name}>Lead Investigator</Text>
        <Text style={styles.role}>Paranormal Researcher</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>47</Text>
          <Text style={styles.statLabel}>Investigations</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>Anomalies</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Hours</Text>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        
        <View style={styles.achievementCard}>
          <LinearGradient
            colors={['rgba(0, 217, 255, 0.2)', 'rgba(0, 217, 255, 0.05)']}
            style={styles.achievementGradient}
          >
            <IconSymbol name="star.fill" size={32} color={colors.primary} />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>First Contact</Text>
              <Text style={styles.achievementDescription}>Captured your first EVP</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.achievementCard}>
          <LinearGradient
            colors={['rgba(123, 47, 255, 0.2)', 'rgba(123, 47, 255, 0.05)']}
            style={styles.achievementGradient}
          >
            <IconSymbol name="bolt.fill" size={32} color={colors.secondary} />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>EMF Master</Text>
              <Text style={styles.achievementDescription}>Detected 50 EMF anomalies</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.achievementCard}>
          <LinearGradient
            colors={['rgba(255, 0, 110, 0.2)', 'rgba(255, 0, 110, 0.05)']}
            style={styles.achievementGradient}
          >
            <IconSymbol name="thermometer" size={32} color={colors.accent} />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>Cold Spot Hunter</Text>
              <Text style={styles.achievementDescription}>Found 25 temperature anomalies</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Equipment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment</Text>
        
        <View style={styles.equipmentCard}>
          <IconSymbol name="bolt.fill" size={24} color={colors.primary} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.equipmentName}>EMF Detector Pro</Text>
            <Text style={styles.equipmentStatus}>Active</Text>
          </View>
        </View>

        <View style={styles.equipmentCard}>
          <IconSymbol name="waveform" size={24} color={colors.secondary} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.equipmentName}>Digital Audio Recorder</Text>
            <Text style={styles.equipmentStatus}>Active</Text>
          </View>
        </View>

        <View style={styles.equipmentCard}>
          <IconSymbol name="thermometer" size={24} color={colors.accent} />
          <View style={styles.equipmentInfo}>
            <Text style={styles.equipmentName}>Thermal Scanner</Text>
            <Text style={styles.equipmentStatus}>Active</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <Pressable style={styles.settingItem}>
          <IconSymbol name="bell.fill" size={24} color={colors.text} />
          <Text style={styles.settingText}>Notifications</Text>
          <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.settingItem}>
          <IconSymbol name="gear" size={24} color={colors.text} />
          <Text style={styles.settingText}>Preferences</Text>
          <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.settingItem}>
          <IconSymbol name="info.circle" size={24} color={colors.text} />
          <Text style={styles.settingText}>About</Text>
          <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* Branding Section */}
      <View style={styles.brandingSection}>
        <Image
          source={require('@/assets/images/0e869168-4039-4065-8048-5b01b4e36179.png')}
          style={styles.brandLogo}
          resizeMode="contain"
        />
        <Text style={styles.brandText}>Or4cl3 AI Solutions</Text>
        <Text style={styles.brandTagline}>Advanced Paranormal Research Technology</Text>
      </View>

      {/* Bottom padding for tab bar */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  achievementCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  equipmentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  equipmentStatus: {
    fontSize: 14,
    color: colors.success,
  },
  settingItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  brandingSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandLogo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
