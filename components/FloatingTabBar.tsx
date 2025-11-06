
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const activeIndex = useSharedValue(0);

  const handleTabPress = (route: string) => {
    const index = tabs.findIndex((tab) => tab.route === route);
    if (index !== -1) {
      activeIndex.value = withSpring(index);
    }
    router.push(route as any);
  };

  React.useEffect(() => {
    const index = tabs.findIndex((tab) => pathname.includes(tab.name));
    if (index !== -1) {
      activeIndex.value = withSpring(index);
    }
  }, [pathname]);

  const tabWidth = containerWidth / tabs.length;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            activeIndex.value,
            tabs.map((_, i) => i),
            tabs.map((_, i) => i * tabWidth)
          ),
        },
      ],
    };
  });

  const isActive = (route: string) => pathname.includes(route.split('/').pop() || '');

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
    >
      <View style={[styles.container, { width: containerWidth, borderRadius }]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="dark" style={styles.blurView}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: tabWidth,
                  borderRadius: borderRadius - 4,
                  backgroundColor: colors.primary + '30',
                },
                indicatorStyle,
              ]}
            />
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive(tab.route) ? colors.primary : colors.text}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isActive(tab.route) ? colors.primary : colors.text },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </BlurView>
        ) : (
          <View style={[styles.androidContainer, { backgroundColor: colors.card }]}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: tabWidth,
                  borderRadius: borderRadius - 4,
                  backgroundColor: colors.primary + '30',
                },
                indicatorStyle,
              ]}
            />
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive(tab.route) ? colors.primary : colors.text}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isActive(tab.route) ? colors.primary : colors.text },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(100, 255, 218, 0.3)',
    elevation: 8,
  },
  blurView: {
    flexDirection: 'row',
    paddingVertical: 8,
    position: 'relative',
  },
  androidContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
