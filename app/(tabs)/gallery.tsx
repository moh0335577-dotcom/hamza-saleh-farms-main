import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { farmImages } from "@/lib/farm-data";

export default function GalleryScreen() {
  return (
    <ScreenContainer containerClassName="bg-[#F7F3EA]" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>معرض المزرعة</Text>
        <Text style={styles.subtitle}>تعرّفوا على أجواء المسبح والجلسات والبساتين</Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <MaterialIcons name="photo-library" size={18} color="#173B29" />
            <Text style={styles.badgeText}>صور حية</Text>
          </View>
          <View style={styles.badge}>
            <MaterialIcons name="park" size={18} color="#173B29" />
            <Text style={styles.badgeText}>طبيعة</Text>
          </View>
          <View style={styles.badge}>
            <MaterialIcons name="eco" size={18} color="#173B29" />
            <Text style={styles.badgeText}>هدوء</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {farmImages.map((image) => (
            <View key={image.title} style={styles.card}>
              <Image source={image.source} contentFit="cover" transition={250} style={styles.image} />
              <Text style={styles.caption}>{image.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 34 },
  title: { color: "#173B29", fontSize: 28, fontWeight: "800", textAlign: "right", marginTop: 8 },
  subtitle: { color: "#7D877E", fontSize: 14, textAlign: "right", marginTop: 6, marginBottom: 18 },
  badgeRow: { flexDirection: "row-reverse", gap: 10, marginBottom: 18 },
  badge: { flexDirection: "row-reverse", alignItems: "center", gap: 6, backgroundColor: "#FFFDF8", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#E9E0D0" },
  badgeText: { color: "#173B29", fontSize: 12, fontWeight: "700" },
  grid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 },
  card: { width: "48.5%", backgroundColor: "#FFFDF8", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "#E9E0D0" },
  image: { width: "100%", height: 128 },
  caption: { color: "#244B36", fontSize: 12, fontWeight: "700", textAlign: "right", padding: 10, minHeight: 40 },
});
