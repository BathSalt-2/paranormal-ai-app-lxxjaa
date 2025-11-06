
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Magnetometer } from 'expo-sensors';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface EMFReading {
  x: number;
  y: number;
  z: number;
  magnitude: number;
  timestamp: Date;
}

export default function EMFScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [currentReading, setCurrentReading] = useState<EMFReading | null>(null);
  const [readings, setReadings] = useState<EMFReading[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [sensorAvailable, setSensorAvailable] = useState<boolean | null>(null);
  
  const pulseScale = useSharedValue(1);

  // Check sensor availability on mount
  useEffect(() => {
    checkSensorAvailability();
  }, []);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  const checkSensorAvailability = async () => {
    try {
      const available = await Magnetometer.isAvailableAsync();
      console.log('Magnetometer available:', available);
      setSensorAvailable(available);
      
      if (!available) {
        console.log('Magnetometer not available on this device');
      }
    } catch (error) {
      console.error('Error checking magnetometer availability:', error);
      setSensorAvailable(false);
    }
  };

  const calculateMagnitude = (x: number, y: number, z: number) => {
    return Math.sqrt(x * x + y * y + z * z);
  };

  const startRecording = async () => {
    console.log('Starting EMF recording');
    
    // Check if sensor is available
    if (sensorAvailable === false) {
      Alert.alert(
        'Sensor Not Available',
        'The magnetometer sensor is not available on this device. EMF detection requires a device with a magnetometer sensor.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (sensorAvailable === null) {
      Alert.alert(
        'Checking Sensor',
        'Please wait while we check sensor availability...',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      // Request permissions
      const { status } = await Magnetometer.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Magnetometer permission is required to detect electromagnetic fields.',
          [{ text: 'OK' }]
        );
        return;
      }

      setIsRecording(true);
      
      // Add listener
      const sub = Magnetometer.addListener((data) => {
        const magnitude = calculateMagnitude(data.x, data.y, data.z);
        const reading: EMFReading = {
          x: data.x,
          y: data.y,
          z: data.z,
          magnitude,
          timestamp: new Date(),
        };
        
        setCurrentReading(reading);
        
        // Pulse animation based on magnitude
        pulseScale.value = withSpring(1 + (magnitude / 100));
      });
      
      Magnetometer.setUpdateInterval(100);
      setSubscription(sub);
      
      console.log('EMF recording started successfully');
    } catch (error) {
      console.error('Error starting EMF recording:', error);
      Alert.alert(
        'Error',
        'Failed to start EMF recording. Please try again.',
        [{ text: 'OK' }]
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    console.log('Stopping EMF recording');
    setIsRecording(false);
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    pulseScale.value = withSpring(1);
  };

  const logData = () => {
    if (currentReading) {
      setReadings([currentReading, ...readings]);
      console.log('Logged EMF reading:', currentReading);
    }
  };

  const getEMFLevel = (magnitude: number) => {
    if (magnitude < 50) return { level: 'Normal', color: colors.primary };
    if (magnitude < 100) return { level: 'Elevated', color: '#FFA726' };
    return { level: 'High Activity', color: colors.accent };
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
    };
  });

  const emfLevel = currentReading ? getEMFLevel(currentReading.magnitude) : { level: 'Inactive', color: colors.textSecondary };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'EMF Detector',
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
          {/* Sensor Status Warning */}
          {sensorAvailable === false && (
            <View style={styles.warningCard}>
              <IconSymbol name="exclamationmark.triangle.fill" color={colors.accent} size={24} />
              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>Sensor Not Available</Text>
                <Text style={styles.warningText}>
                  This device does not have a magnetometer sensor. EMF detection requires a physical magnetometer sensor which is typically found on mobile devices but not on web browsers.
                </Text>
              </View>
            </View>
          )}

          {/* EMF Display */}
          <LinearGradient
            colors={[colors.primary + '20', colors.secondary + '20']}
            style={styles.displayCard}
          >
            <Animated.View style={[styles.emfCircle, animatedStyle, { borderColor: emfLevel.color }]}>
              <IconSymbol name="bolt.fill" color={emfLevel.color} size={48} />
              <Text style={[styles.magnitudeText, { color: emfLevel.color }]}>
                {currentReading ? currentReading.magnitude.toFixed(1) : '0.0'}
              </Text>
              <Text style={styles.unitText}>µT</Text>
            </Animated.View>
            
            <Text style={[styles.levelText, { color: emfLevel.color }]}>
              {emfLevel.level}
            </Text>
          </LinearGradient>

          {/* Current Reading Details */}
          {currentReading && (
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Current Reading</Text>
              <View style={styles.axisContainer}>
                <View style={styles.axisRow}>
                  <Text style={styles.axisLabel}>X-Axis:</Text>
                  <Text style={styles.axisValue}>{currentReading.x.toFixed(2)} µT</Text>
                </View>
                <View style={styles.axisRow}>
                  <Text style={styles.axisLabel}>Y-Axis:</Text>
                  <Text style={styles.axisValue}>{currentReading.y.toFixed(2)} µT</Text>
                </View>
                <View style={styles.axisRow}>
                  <Text style={styles.axisLabel}>Z-Axis:</Text>
                  <Text style={styles.axisValue}>{currentReading.z.toFixed(2)} µT</Text>
                </View>
              </View>
            </View>
          )}

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Pressable
              style={[
                styles.controlButton, 
                isRecording && styles.controlButtonActive,
                sensorAvailable === false && styles.controlButtonDisabled
              ]}
              onPress={isRecording ? stopRecording : startRecording}
              disabled={sensorAvailable === false}
            >
              <IconSymbol
                name={isRecording ? 'stop.fill' : 'play.fill'}
                color={sensorAvailable === false ? colors.textSecondary : colors.background}
                size={24}
              />
              <Text style={[
                styles.controlButtonText,
                sensorAvailable === false && styles.controlButtonTextDisabled
              ]}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </Pressable>

            {isRecording && (
              <Pressable style={styles.logButton} onPress={logData}>
                <IconSymbol name="square.and.arrow.down.fill" color={colors.background} size={20} />
                <Text style={styles.logButtonText}>Log Data</Text>
              </Pressable>
            )}
          </View>

          {/* EMF Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About EMF Detection</Text>
            <Text style={styles.infoText}>
              Electromagnetic Field (EMF) detection uses your device&apos;s magnetometer to measure magnetic field strength in microteslas (µT). 
              Paranormal investigators believe that spirits can manipulate electromagnetic fields, making EMF spikes potential indicators of paranormal activity.
            </Text>
          </View>

          {/* AI Analysis Placeholder */}
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <IconSymbol name="brain" color={colors.secondary} size={24} />
              <Text style={styles.aiTitle}>AI Analysis</Text>
            </View>
            <Text style={styles.aiText}>
              {isRecording
                ? 'Analyzing electromagnetic field patterns... AI detection algorithms are monitoring for anomalies and unusual fluctuations that may indicate paranormal activity.'
                : 'Start recording to enable AI-powered analysis of EMF patterns and anomaly detection. The AI will learn baseline readings and alert you to significant deviations.'}
            </Text>
          </View>

          {/* Logged Readings */}
          {readings.length > 0 && (
            <View style={styles.logSection}>
              <Text style={styles.logTitle}>Logged Readings ({readings.length})</Text>
              {readings.slice(0, 5).map((reading, index) => (
                <View key={index} style={styles.logItem}>
                  <View style={styles.logItemHeader}>
                    <Text style={styles.logItemMagnitude}>
                      {reading.magnitude.toFixed(1)} µT
                    </Text>
                    <Text style={styles.logItemTime}>
                      {reading.timestamp.toLocaleTimeString()}
                    </Text>
                  </View>
                  <Text style={styles.logItemDetails}>
                    X: {reading.x.toFixed(2)} | Y: {reading.y.toFixed(2)} | Z: {reading.z.toFixed(2)}
                  </Text>
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
  warningCard: {
    backgroundColor: colors.accent + '20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  displayCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  emfCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  magnitudeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 8,
  },
  unitText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  levelText: {
    fontSize: 24,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  axisContainer: {
    gap: 8,
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  axisLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  axisValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: colors.primary,
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
  controlButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.5,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
  },
  controlButtonTextDisabled: {
    color: colors.textSecondary,
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
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
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
    marginBottom: 4,
  },
  logItemMagnitude: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  logItemTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logItemDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
