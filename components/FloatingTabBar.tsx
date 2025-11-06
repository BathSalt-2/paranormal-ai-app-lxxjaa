
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

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
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const activeIndex = useSharedValue(0);

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route);
  };

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(route);
  };

  // Update active index based on current route
  React.useEffect(() => {
    const index = tabs.findIndex((tab) => isActive(tab.route));
    if (index !== -1) {
      activeIndex.value = withSpring(index, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [pathname]);

  const indicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
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
      width: tabWidth,
    };
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
    >
      <View
        style={[
          styles.container,
          {
            width: containerWidth,
            borderRadius: borderRadius,
            backgroundColor: 'rgba(30, 30, 46, 0.95)',
            borderColor: colors.border,
            borderWidth: 1,
          },
        ]}
      >
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="dark" style={styles.blurView}>
            <TabContent
              tabs={tabs}
              isActive={isActive}
              handleTabPress={handleTabPress}
              indicatorStyle={indicatorStyle}
            />
          </BlurView>
        ) : (
          <TabContent
            tabs={tabs}
            isActive={isActive}
            handleTabPress={handleTabPress}
            indicatorStyle={indicatorStyle}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function TabContent({
  tabs,
  isActive,
  handleTabPress,
  indicatorStyle,
}: {
  tabs: TabBarItem[];
  isActive: (route: string) => boolean;
  handleTabPress: (route: string) => void;
  indicatorStyle: any;
}) {
  return (
    <View style={styles.tabContainer}>
      <Animated.View style={[styles.activeIndicator, indicatorStyle]} />
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab.route)}
            activeOpacity={0.7}
          >
            <IconSymbol
              name={tab.icon as any}
              size={24}
              color={active ? colors.primary : colors.textSecondary}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                {
                  color: active ? colors.primary : colors.textSecondary,
                  fontWeight: active ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  blurView: {
    flex: 1,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 4,
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
});
