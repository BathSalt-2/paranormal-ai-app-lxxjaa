
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface AudioLog {
  id: string;
  duration: number;
  timestamp: Date;
  analyzed: boolean;
}

export default function AudioScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<AudioLog[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const waveAnimation = useSharedValue(0);

  React.useEffect(() => {
    if (isRecording) {
      waveAnimation.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      waveAnimation.value = withTiming(0);
    }
  }, [isRecording]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      console.log('Requesting audio permissions...');
      const permission = await Audio.requestPermissionsAsync();
      
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Audio recording permission is required to use this feature.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting audio recording...');
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    console.log('Stopping audio recording...');
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at:', uri);
      
      const newLog: AudioLog = {
        id: Date.now().toString(),
        duration: recordingDuration,
        timestamp: new Date(),
        analyzed: false,
      };
      
      setRecordings([newLog, ...recordings]);
      setRecording(null);
      setIsRecording(false);
      setRecordingDuration(0);
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const waveStyle1 = useAnimatedStyle(() => {
    return {
      opacity: 0.3 + waveAnimation.value * 0.7,
      transform: [{ scale: 1 + waveAnimation.value * 0.3 }],
    };
  });

  const waveStyle2 = useAnimatedStyle(() => {
    return {
      opacity: 0.2 + waveAnimation.value * 0.5,
      transform: [{ scale: 1 + waveAnimation.value * 0.5 }],
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Audio Recorder',
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
          {/* Audio Visualizer */}
          <LinearGradient
            colors={[colors.secondary + '20', colors.accent + '20']}
            style={styles.displayCard}
          >
            <View style={styles.waveContainer}>
              <Animated.View style={[styles.wave, styles.wave1, waveStyle1]} />
              <Animated.View style={[styles.wave, styles.wave2, waveStyle2]} />
              <View style={styles.microphoneContainer}>
                <IconSymbol
                  name={isRecording ? 'waveform' : 'mic.fill'}
                  color={isRecording ? colors.accent : colors.secondary}
                  size={48}
                />
              </View>
            </View>
            
            <Text style={styles.durationText}>
              {formatDuration(recordingDuration)}
            </Text>
            
            <Text style={[styles.statusText, { color: isRecording ? colors.accent : colors.textSecondary }]}>
              {isRecording ? 'Recording EVP...' : 'Ready to Record'}
            </Text>
          </LinearGradient>

          {/* Recording Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>EVP Recording</Text>
            <Text style={styles.infoText}>
              Electronic Voice Phenomena (EVP) are sounds found on electronic recordings that resemble speech, 
              but are not the result of intentional recording or rendering.
            </Text>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Pressable
              style={[styles.controlButton, isRecording && styles.controlButtonActive]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <IconSymbol
                name={isRecording ? 'stop.circle.fill' : 'record.circle'}
                color={colors.background}
                size={24}
              />
              <Text style={styles.controlButtonText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </Pressable>
          </View>

          {/* AI Analysis Placeholder */}
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <IconSymbol name="brain" color={colors.secondary} size={24} />
              <Text style={styles.aiTitle}>AI Audio Analysis</Text>
            </View>
            <Text style={styles.aiText}>
              {isRecording
                ? 'AI is analyzing audio frequencies in real-time, filtering out background noise and detecting potential EVP patterns.'
                : 'Advanced AI algorithms will analyze your recordings for anomalous audio patterns and potential paranormal evidence.'}
            </Text>
          </View>

          {/* Recorded Sessions */}
          {recordings.length > 0 && (
            <View style={styles.logSection}>
              <Text style={styles.logTitle}>Recorded Sessions ({recordings.length})</Text>
              {recordings.map((log) => (
                <View key={log.id} style={styles.logItem}>
                  <View style={styles.logItemHeader}>
                    <IconSymbol name="waveform" color={colors.secondary} size={20} />
                    <View style={styles.logItemInfo}>
                      <Text style={styles.logItemDuration}>
                        Duration: {formatDuration(log.duration)}
                      </Text>
                      <Text style={styles.logItemTime}>
                        {log.timestamp.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.logItemFooter}>
                    <Text style={[styles.analysisStatus, { color: log.analyzed ? colors.primary : colors.textSecondary }]}>
                      {log.analyzed ? '✓ Analyzed' : 'Pending Analysis'}
                    </Text>
                  </View>
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
  waveContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  wave: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
  },
  wave1: {
    width: 160,
    height: 160,
    borderColor: colors.secondary,
  },
  wave2: {
    width: 200,
    height: 200,
    borderColor: colors.accent,
  },
  microphoneContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  durationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
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
  controlsContainer: {
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: colors.secondary,
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  logItemInfo: {
    flex: 1,
  },
  logItemDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  logItemTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logItemFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  analysisStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});
