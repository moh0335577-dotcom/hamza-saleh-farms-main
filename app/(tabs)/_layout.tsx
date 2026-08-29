import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { HapticTab } from "@/components/haptic-tab";
import { useColors } from "@/hooks/use-colors";
import { useLanguage } from "@/lib/language-context";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { content } = useLanguage();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: "#8B958D",
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontFamily: "System", fontSize: 11, fontWeight: "700" },
        tabBarStyle: { paddingTop: 7, paddingBottom: bottomPadding, height: tabBarHeight, backgroundColor: "#FFFDF8", borderTopColor: "#E9E0D0", borderTopWidth: 0.6 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: content.tabs.home, tabBarIcon: ({ color }) => <MaterialIcons name="home" size={25} color={color} /> }} />
      <Tabs.Screen name="gallery" options={{ title: content.tabs.gallery, tabBarIcon: ({ color }) => <MaterialIcons name="photo-library" size={24} color={color} /> }} />
      <Tabs.Screen name="contact" options={{ title: content.tabs.contact, tabBarIcon: ({ color }) => <MaterialIcons name="call" size={24} color={color} /> }} />
    </Tabs>
  );
}
