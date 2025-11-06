
import React from "react";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { Stack, Link } from "expo-router";

export default function HomeScreen() {
  const renderHeaderRight = () => (
    <Link href="/modal" asChild>
      <Pressable style={{ marginRight: 15 }}>
        <IconSymbol name="gear" size={24} color={colors.primary} />
      </Pressable>
    </Link>
  );

  const renderHeaderLeft = () => (
    <View style={{ marginLeft: 15 }}>
      <Image
        source={require('@/assets/images/0e869168-4039-4065-8048-5b01b4e36179.png')}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
    </View>
  );

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return colors.danger;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Paranormal Research",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Hero Section */}
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>AI-Powered Investigation</Text>
          <Text style={styles.heroSubtitle}>Advanced paranormal detection and analysis</Text>
        </LinearGradient>

        {/* Sensor Suite Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sensor Suite</Text>
          <View style={styles.sensorGrid}>
            <Link href="/(tabs)/emf" asChild>
              <Pressable style={styles.sensorCard}>
                <LinearGradient
                  colors={['rgba(0, 217, 255, 0.1)', 'rgba(0, 217, 255, 0.05)']}
                  style={styles.sensorGradient}
                >
                  <IconSymbol name="bolt.fill" size={40} color={colors.primary} />
                  <Text style={styles.sensorTitle}>EMF Detector</Text>
                  <Text style={styles.sensorDescription}>Detect electromagnetic fields</Text>
                </LinearGradient>
              </Pressable>
            </Link>

            <Link href="/(tabs)/audio" asChild>
              <Pressable style={styles.sensorCard}>
                <LinearGradient
                  colors={['rgba(123, 47, 255, 0.1)', 'rgba(123, 47, 255, 0.05)']}
                  style={styles.sensorGradient}
                >
                  <IconSymbol name="waveform" size={40} color={colors.secondary} />
                  <Text style={styles.sensorTitle}>Audio Recorder</Text>
                  <Text style={styles.sensorDescription}>Capture EVP evidence</Text>
                </LinearGradient>
              </Pressable>
            </Link>

            <Link href="/(tabs)/temperature" asChild>
              <Pressable style={styles.sensorCard}>
                <LinearGradient
                  colors={['rgba(255, 0, 110, 0.1)', 'rgba(255, 0, 110, 0.05)']}
                  style={styles.sensorGradient}
                >
                  <IconSymbol name="thermometer" size={40} color={colors.accent} />
                  <Text style={styles.sensorTitle}>Temperature</Text>
                  <Text style={styles.sensorDescription}>Monitor cold spots</Text>
                </LinearGradient>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor('high') }]}>
                <Text style={styles.severityText}>HIGH</Text>
              </View>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={styles.activityTitle}>Unexplained EMF Spike Detected</Text>
            <View style={styles.activityLocation}>
              <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.activityLocationText}>Abandoned Hospital, Floor 3</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor('medium') }]}>
                <Text style={styles.severityText}>MEDIUM</Text>
              </View>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
            <Text style={styles.activityTitle}>Temperature Anomaly Recorded</Text>
            <View style={styles.activityLocation}>
              <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.activityLocationText}>Old Cemetery, Section B</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor('low') }]}>
                <Text style={styles.severityText}>LOW</Text>
              </View>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <Text style={styles.activityTitle}>EVP Captured on Audio</Text>
            <View style={styles.activityLocation}>
              <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.activityLocationText}>Historic Manor, East Wing</Text>
            </View>
          </View>
        </View>

        {/* Investigator Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investigator Profile</Text>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.profileGradient}
            >
              <IconSymbol name="person.fill" size={60} color={colors.background} />
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Lead Investigator</Text>
              <Text style={styles.profileStats}>47 Investigations • 23 Anomalies Detected</Text>
            </View>
          </View>
        </View>

        {/* Powered By Section */}
        <View style={styles.poweredBySection}>
          <Text style={styles.poweredByText}>Powered by</Text>
          <Text style={styles.poweredByBrand}>Or4cl3 AI Solutions</Text>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </>
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
  heroCard: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  sensorCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sensorGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  sensorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  sensorDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.background,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  activityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityLocationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  profileStats: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  poweredBySection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  poweredByText: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  poweredByBrand: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
});
