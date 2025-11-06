
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React from "react";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const theme = useTheme();

  const stats = [
    { label: 'Investigations', value: '47', icon: 'magnifyingglass' },
    { label: 'Anomalies', value: '23', icon: 'exclamationmark.triangle.fill' },
    { label: 'EVP Captured', value: '12', icon: 'waveform' },
    { label: 'Cold Spots', value: '8', icon: 'thermometer' },
  ];

  const achievements = [
    { title: 'First Investigation', description: 'Complete your first paranormal investigation', unlocked: true },
    { title: 'EMF Expert', description: 'Log 50 EMF readings', unlocked: true },
    { title: 'EVP Hunter', description: 'Capture 10 audio recordings', unlocked: true },
    { title: 'Cold Spot Detective', description: 'Detect 5 temperature anomalies', unlocked: false },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <LinearGradient
          colors={[colors.primary + '40', colors.secondary + '40']}
          style={styles.headerCard}
        >
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.fill" color={colors.text} size={48} />
          </View>
          <Text style={styles.nameText}>Lead Investigator</Text>
          <Text style={styles.roleText}>Paranormal Researcher</Text>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <IconSymbol name={stat.icon as any} color={colors.primary} size={28} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, !achievement.unlocked && styles.achievementIconLocked]}>
                <IconSymbol
                  name={achievement.unlocked ? 'star.fill' : 'star'}
                  color={achievement.unlocked ? colors.primary : colors.textSecondary}
                  size={24}
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, !achievement.unlocked && styles.achievementTitleLocked]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment</Text>
          <View style={styles.equipmentCard}>
            <View style={styles.equipmentRow}>
              <IconSymbol name="bolt.fill" color={colors.primary} size={20} />
              <Text style={styles.equipmentText}>EMF Detector - Active</Text>
            </View>
            <View style={styles.equipmentRow}>
              <IconSymbol name="waveform" color={colors.secondary} size={20} />
              <Text style={styles.equipmentText}>Audio Recorder - Active</Text>
            </View>
            <View style={styles.equipmentRow}>
              <IconSymbol name="thermometer" color={colors.accent} size={20} />
              <Text style={styles.equipmentText}>Temperature Monitor - Active</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconLocked: {
    backgroundColor: colors.highlight,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  equipmentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
    gap: 12,
  },
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  equipmentText: {
    fontSize: 16,
    color: colors.text,
  },
});
