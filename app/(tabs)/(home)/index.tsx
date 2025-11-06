
import React from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const paranormalNews = [
    {
      id: '1',
      title: 'Unexplained EMF Spike Detected',
      location: 'Abandoned Hospital, Floor 3',
      time: '2 hours ago',
      severity: 'high',
    },
    {
      id: '2',
      title: 'Temperature Anomaly Recorded',
      location: 'Old Cemetery, Section B',
      time: '5 hours ago',
      severity: 'medium',
    },
    {
      id: '3',
      title: 'EVP Captured on Audio',
      location: 'Historic Manor, East Wing',
      time: '1 day ago',
      severity: 'high',
    },
  ];

  const sensorTools = [
    {
      name: 'EMF Detector',
      route: '/emf',
      icon: 'bolt.fill',
      color: colors.primary,
      description: 'Detect electromagnetic fields',
    },
    {
      name: 'Audio Recorder',
      route: '/audio',
      icon: 'waveform',
      color: colors.secondary,
      description: 'Capture EVP evidence',
    },
    {
      name: 'Temperature',
      route: '/temperature',
      icon: 'thermometer',
      color: colors.accent,
      description: 'Monitor cold spots',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return colors.accent;
      case 'medium':
        return '#FFA726';
      case 'low':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const renderHeaderRight = () => (
    <Pressable style={styles.headerButtonContainer}>
      <IconSymbol name="chart.bar.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable style={styles.headerButtonContainer}>
      <IconSymbol name="gear" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Paranormal Research",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <LinearGradient
            colors={[colors.primary + '40', colors.secondary + '40', colors.accent + '40']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroSection}
          >
            <IconSymbol name="eye.fill" color={colors.text} size={48} />
            <Text style={styles.heroTitle}>AI-Powered Investigation</Text>
            <Text style={styles.heroSubtitle}>
              Advanced paranormal detection and analysis
            </Text>
          </LinearGradient>

          {/* Sensor Suite Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sensor Suite</Text>
            <View style={styles.toolsGrid}>
              {sensorTools.map((tool) => (
                <Link key={tool.name} href={tool.route as any} asChild>
                  <Pressable style={styles.toolCard}>
                    <View style={[styles.toolIconContainer, { backgroundColor: tool.color + '20' }]}>
                      <IconSymbol name={tool.icon as any} color={tool.color} size={32} />
                    </View>
                    <Text style={styles.toolName}>{tool.name}</Text>
                    <Text style={styles.toolDescription}>{tool.description}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          {/* Recent Activity Feed */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {paranormalNews.map((news) => (
              <View key={news.id} style={styles.newsCard}>
                <View style={styles.newsHeader}>
                  <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(news.severity) }]} />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{news.title}</Text>
                    <Text style={styles.newsLocation}>
                      <IconSymbol name="location.fill" color={colors.textSecondary} size={12} />
                      {' '}{news.location}
                    </Text>
                    <Text style={styles.newsTime}>{news.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* User Profile Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Investigator Profile</Text>
            <View style={styles.profileCard}>
              <View style={styles.profileIconContainer}>
                <IconSymbol name="person.fill" color={colors.primary} size={40} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Lead Investigator</Text>
                <Text style={styles.profileStats}>
                  <Text style={styles.profileStatValue}>47</Text> Investigations
                  {' • '}
                  <Text style={styles.profileStatValue}>23</Text> Anomalies Detected
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerButtonContainer: {
    padding: 8,
  },
  heroSection: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
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
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  toolIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  newsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  severityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  newsLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  newsTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  profileIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  profileStats: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  profileStatValue: {
    color: colors.primary,
    fontWeight: '600',
  },
});
