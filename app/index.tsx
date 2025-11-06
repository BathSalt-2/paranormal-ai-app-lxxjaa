
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  
  // Animation values
  const glowOpacity = useSharedValue(0.3);
  const pulseScale = useSharedValue(1);
  const logoRotate = useSharedValue(0);

  useEffect(() => {
    // Glow animation
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleGetStarted = () => {
    setShowLoading(true);
    
    // Simulate loading and transition to main app
    setTimeout(() => {
      router.replace('/(tabs)/(home)/');
    }, 3000);
  };

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0A0F', '#1A0B2E', '#16213E', '#0F3460']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated background particles */}
        <View style={styles.particlesContainer}>
          {[...Array(20)].map((_, i) => (
            <Animated.View
              key={i}
              entering={FadeIn.delay(i * 100).duration(1000)}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.content}>
          {/* Logo Section */}
          <Animated.View style={[styles.logoContainer, pulseStyle]}>
            <Image
              source={require('../assets/images/0e869168-4039-4065-8048-5b01b4e36179.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Animated.View style={[styles.logoGlow, glowStyle]} />
          </Animated.View>

          {/* Title Section */}
          <Animated.View 
            entering={FadeIn.delay(300).duration(1000)}
            style={styles.titleContainer}
          >
            <Text style={styles.title}>Paranormal Investigation</Text>
            <Text style={styles.subtitle}>AI-Powered Research Platform</Text>
          </Animated.View>

          {/* Features Section */}
          <Animated.View 
            entering={FadeIn.delay(600).duration(1000)}
            style={styles.featuresContainer}
          >
            <FeatureItem icon="📡" text="Advanced EMF Detection" />
            <FeatureItem icon="🎙️" text="EVP Audio Analysis" />
            <FeatureItem icon="🌡️" text="Temperature Anomalies" />
            <FeatureItem icon="🤖" text="AI-Powered Insights" />
          </Animated.View>

          {/* CTA Button */}
          <Animated.View 
            entering={FadeIn.delay(900).duration(1000)}
            style={styles.ctaContainer}
          >
            <Pressable
              onPress={handleGetStarted}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.ctaButtonPressed,
              ]}
            >
              <LinearGradient
                colors={['#00D9FF', '#7B2FFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Start Investigating</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>

          {/* Powered By Section */}
          <Animated.View 
            entering={FadeIn.delay(1200).duration(1000)}
            style={styles.poweredByContainer}
          >
            <Text style={styles.poweredByText}>Powered by</Text>
            <Text style={styles.brandText}>Or4cl3 AI Solutions</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

function LoadingScreen() {
  const spinValue = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    // Rotation animation
    spinValue.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );

    // Progress animation
    progressValue.value = withTiming(100, { 
      duration: 2800, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });

    // Glow animation
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.loadingContainer}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0A0F', '#1A0B2E', '#16213E', '#0F3460']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.loadingContent}>
          {/* Animated Logo */}
          <Animated.View style={[styles.loadingLogoContainer, spinStyle]}>
            <Image
              source={require('../assets/images/0e869168-4039-4065-8048-5b01b4e36179.png')}
              style={styles.loadingLogo}
              resizeMode="contain"
            />
            <Animated.View style={[styles.loadingGlow, glowStyle]} />
          </Animated.View>

          {/* Loading Text */}
          <Text style={styles.loadingTitle}>Initializing Systems</Text>
          <Text style={styles.loadingSubtitle}>Calibrating sensors...</Text>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]}>
              <LinearGradient
                colors={['#00D9FF', '#7B2FFF', '#FF006E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>

          {/* Loading Steps */}
          <View style={styles.loadingSteps}>
            <LoadingStep text="Loading EMF sensors" delay={0} />
            <LoadingStep text="Initializing audio recorder" delay={500} />
            <LoadingStep text="Calibrating temperature monitor" delay={1000} />
            <LoadingStep text="Activating AI analysis" delay={1500} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { 
      duration: 500, 
      easing: Easing.inOut(Easing.ease) 
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      entering={FadeIn.delay(delay).duration(500)}
      style={styles.loadingStep}
    >
      <View style={styles.loadingStepDot} />
      <Text style={styles.loadingStepText}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#00D9FF',
    borderRadius: 50,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  logoGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#00D9FF',
    opacity: 0.3,
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#00D9FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A0A0FF',
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.2)',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  ctaButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  poweredByContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  poweredByText: {
    fontSize: 12,
    color: '#808080',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00D9FF',
    letterSpacing: 1,
  },
  // Loading Screen Styles
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  loadingLogoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogo: {
    width: 120,
    height: 120,
  },
  loadingGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#7B2FFF',
    opacity: 0.5,
    shadowColor: '#7B2FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 15,
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#A0A0FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    maxWidth: 400,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 40,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingSteps: {
    width: '100%',
    maxWidth: 400,
  },
  loadingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingStepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D9FF',
    marginRight: 12,
  },
  loadingStepText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
