
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface TempReading {
  temperature: number;
  timestamp: Date;
  anomaly: boolean;
}

export default function TemperatureScreen() {
  const router = useRouter();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(20.0);
  const [baselineTemp, setBaselineTemp] = useState(20.0);
  const [readings, setReadings] = useState<TempReading[]>([]);
  
  const thermometerHeight = useSharedValue(0.5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate temperature readings with occasional anomalies
        const variation = (Math.random() - 0.5) * 4;
        const anomaly = Math.random() < 0.1; // 10% chance of anomaly
        const newTemp = anomaly ? baselineTemp - (5 + Math.random() * 5) : baselineTemp + variation;
        
        setCurrentTemp(newTemp);
        thermometerHeight.value = withSpring(Math.max(0.1, Math.min(1, (newTemp + 10) / 50)));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, baselineTemp]);

  const startMonitoring = () => {
    console.log('Starting temperature monitoring');
    setIsMonitoring(true);
    setBaselineTemp(currentTemp);
  };

  const stopMonitoring = () => {
    console.log('Stopping temperature monitoring');
    setIsMonitoring(false);
  };

  const logReading = () => {
    const reading: TempReading = {
      temperature: currentTemp,
      timestamp: new Date(),
      anomaly: currentTemp < baselineTemp - 3,
    };
    setReadings([reading, ...readings]);
    console.log('Logged temperature reading:', reading);
  };

  const getTempStatus = () => {
    const diff = currentTemp - baselineTemp;
    if (diff < -5) return { status: 'Cold Spot Detected!', color: colors.accent };
    if (diff < -3) return { status: 'Temperature Drop', color: '#FFA726' };
    if (diff > 3) return { status: 'Temperature Rise', color: '#FFA726' };
    return { status: 'Normal', color: colors.primary };
  };

  const thermometerStyle = useAnimatedStyle(() => {
    return {
      height: `${thermometerHeight.value * 100}%`,
    };
  });

  const tempStatus = getTempStatus();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Temperature Monitor',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <IconSymbol name="chevron.left" color={colors.primary} size={24} />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Temperature Display */}
          <LinearGradient
            colors={[colors.accent + '20', colors.primary + '20']}
            style={styles.displayCard}
          >
            <View style={styles.thermometerContainer}>
              <View style={styles.thermometer}>
                <Animated.View style={[styles.thermometerFill, thermometerStyle, { backgroundColor: tempStatus.color }]} />
              </View>
              <View style={styles.bulbContainer}>
                <View style={[styles.bulb, { backgroundColor: tempStatus.color }]}>
                  <IconSymbol name="thermometer" color={colors.background} size={32} />
                </View>
              </View>
            </View>
            
            <Text style={styles.tempText}>
              {currentTemp.toFixed(1)}°C
            </Text>
            
            <Text style={[styles.statusText, { color: tempStatus.color }]}>
              {tempStatus.status}
            </Text>
          </LinearGradient>

          {/* Baseline Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Baseline Temperature:</Text>
              <Text style={styles.infoValue}>{baselineTemp.toFixed(1)}°C</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Temperature Difference:</Text>
              <Text style={[styles.infoValue, { color: tempStatus.color }]}>
                {(currentTemp - baselineTemp).toFixed(1)}°C
              </Text>
            </View>
          </View>

          {/* Cold Spot Info */}
          <View style={styles.tipCard}>
            <IconSymbol name="info.circle.fill" color={colors.accent} size={24} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Cold Spots</Text>
              <Text style={styles.tipText}>
                Sudden temperature drops of 5°C or more may indicate paranormal activity. 
                Cold spots are one of the most common signs of spiritual presence.
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Pressable
              style={[styles.controlButton, isMonitoring && styles.controlButtonActive]}
              onPress={isMonitoring ? stopMonitoring : startMonitoring}
            >
              <IconSymbol
                name={isMonitoring ? 'stop.fill' : 'play.fill'}
                color={colors.background}
                size={24}
              />
              <Text style={styles.controlButtonText}>
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </Text>
            </Pressable>

            {isMonitoring && (
              <Pressable style={styles.logButton} onPress={logReading}>
                <IconSymbol name="square.and.arrow.down.fill" color={colors.background} size={20} />
                <Text style={styles.logButtonText}>Log Reading</Text>
              </Pressable>
            )}
          </View>

          {/* AI Analysis Placeholder */}
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <IconSymbol name="brain" color={colors.secondary} size={24} />
              <Text style={styles.aiTitle}>AI Temperature Analysis</Text>
            </View>
            <Text style={styles.aiText}>
              {isMonitoring
                ? 'AI is analyzing temperature patterns and detecting anomalies that may indicate paranormal activity.'
                : 'Start monitoring to enable AI-powered temperature analysis and cold spot detection.'}
            </Text>
          </View>

          {/* Logged Readings */}
          {readings.length > 0 && (
            <View style={styles.logSection}>
              <Text style={styles.logTitle}>Logged Readings ({readings.length})</Text>
              {readings.slice(0, 5).map((reading, index) => (
                <View key={index} style={styles.logItem}>
                  <View style={styles.logItemHeader}>
                    <View style={styles.logItemLeft}>
                      {reading.anomaly && (
                        <IconSymbol name="exclamationmark.triangle.fill" color={colors.accent} size={16} />
                      )}
                      <Text style={[styles.logItemTemp, reading.anomaly && { color: colors.accent }]}>
                        {reading.temperature.toFixed(1)}°C
                      </Text>
                    </View>
                    <Text style={styles.logItemTime}>
                      {reading.timestamp.toLocaleTimeString()}
                    </Text>
                  </View>
                  {reading.anomaly && (
                    <Text style={styles.anomalyLabel}>Cold Spot Detected</Text>
                  )}
                </View>
              ))}
            </View>
          )}

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
    padding: 16,
  },
  headerButton: {
    padding: 8,
  },
  displayCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  thermometerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  thermometer: {
    width: 40,
    height: 200,
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  thermometerFill: {
    width: '100%',
    borderRadius: 18,
  },
  bulbContainer: {
    marginTop: -20,
  },
  bulb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  controlButtonActive: {
    backgroundColor: colors.accent,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
  },
  logButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
  aiCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondary + '40',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  aiText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  logSection: {
    marginBottom: 16,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  logItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  logItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logItemTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  logItemTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  anomalyLabel: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
    marginTop: 4,
  },
});
