import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { ScrollView, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { getFarmData, mapUrl, phoneNumbers } from "@/lib/farm-data";
import { useLanguage } from "@/lib/language-context";

async function openExternal(url: string, errorTitle: string, errorBody: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(errorTitle, errorBody);
  }
}

function ActionButton({ icon, label, color, onPress }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionButton, { backgroundColor: color }, pressed && styles.pressed]}>
      <MaterialIcons name={icon} size={21} color="#FFFFFF" />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { content, isRTL, language } = useLanguage();
  const farmData = getFarmData(language);
  const heroBadges = content.home.heroBadges.map((badge, index) => ({
    icon: ["verified", "favorite", "park"][index] as keyof typeof MaterialIcons.glyphMap,
    label: badge.label,
  }));

  return (
    <ScreenContainer containerClassName="bg-[#F7F3EA]" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Image source={farmData.farmImages[0].source} contentFit="cover" transition={300} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroCopy}>
            <View style={styles.eyebrow}><MaterialIcons name="eco" size={15} color="#D8F0C5" /><Text style={styles.eyebrowText}>{content.home.eyebrow}</Text></View>
            <Text style={styles.heroTitle}>{farmData.farmName}</Text>
            <Text style={styles.heroSubtitle}>{farmData.farmTagline}</Text>
          </View>
        </View>

        <View style={[styles.featurePills, isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }]}> 
          {heroBadges.map((badge) => (
            <View key={badge.label} style={styles.featurePill}>
              <MaterialIcons name={badge.icon} size={16} color="#173B29" />
              <Text style={styles.featurePillText}>{badge.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.actionRow, isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }]}> 
          <ActionButton icon="phone" label={content.home.callNow} color="#2B684A" onPress={() => openExternal(`tel:${phoneNumbers[0].replace(/\s/g, "")}`, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBody)} />
          <ActionButton icon="chat" label={content.home.whatsapp} color="#25A05A" onPress={() => openExternal(`https://wa.me/${phoneNumbers[0].replace(/[+\s]/g, "")}`, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBody)} />
          <ActionButton icon="location-on" label={content.home.location} color="#2D8AA0" onPress={() => openExternal(mapUrl, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBodySimple)} />
        </View>

        <View style={styles.introCard}>
          <Text style={styles.sectionKicker}>{content.home.introKicker}</Text>
          <Text style={styles.introTitle}>{content.home.introTitle}</Text>
          <Text style={styles.bodyText}>{content.home.introBody}</Text>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{content.home.whyChoose}</Text><Text style={styles.sectionHint}>{content.home.whyHint}</Text></View>
        <View style={styles.servicesGrid}>
          {farmData.services.slice(0, 6).map((service) => (
            <View key={service.title} style={styles.serviceCard}>
              <View style={styles.serviceIcon}><MaterialIcons name={service.icon as keyof typeof MaterialIcons.glyphMap} size={22} color="#2B684A" /></View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceText}>{service.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{content.home.galleryTitle}</Text><Text style={styles.sectionHint}>{content.home.galleryHint}</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRow}>
          {farmData.farmImages.slice(1, 6).map((image) => (
            <View key={image.title} style={styles.galleryCard}>
              <Image source={image.source} contentFit="cover" transition={200} style={styles.galleryImage} />
              <Text style={styles.galleryTitle}>{image.title}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.callout}>
          <MaterialIcons name="event-available" size={26} color="#D9A441" />
          <View style={styles.calloutCopy}><Text style={styles.calloutTitle}>{content.home.readyTitle}</Text><Text style={styles.calloutText}>{content.home.readyText}</Text></View>
        </View>

        <Text style={styles.footerPhrase}>{content.home.footer}</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 34, gap: 18 },
  heroCard: { height: 285, borderRadius: 28, overflow: "hidden", backgroundColor: "#173B29", position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(17,50,34,0.52)" },
  heroCopy: { position: "absolute", right: 20, left: 20, bottom: 22, alignItems: "flex-end" },
  eyebrow: { flexDirection: "row-reverse", alignItems: "center", gap: 6, marginBottom: 8 },
  eyebrowText: { color: "#D8F0C5", fontSize: 13, fontWeight: "700" },
  heroTitle: { color: "#FFFFFF", fontSize: 30, fontWeight: "800", textAlign: "right" },
  heroSubtitle: { color: "#E6F1DB", fontSize: 15, marginTop: 4, textAlign: "right" },
  featurePills: { flexDirection: "row-reverse", gap: 10, marginTop: -8, marginBottom: 4, zIndex: 2 },
  featurePill: { flexDirection: "row-reverse", alignItems: "center", gap: 6, backgroundColor: "#FFFDF8", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#E9E0D0", shadowColor: "#173B29", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  featurePillText: { color: "#173B29", fontSize: 12, fontWeight: "700" },
  actionRow: { flexDirection: "row-reverse", gap: 8 },
  actionButton: { flex: 1, minHeight: 50, borderRadius: 16, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 6 },
  actionLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  introCard: { backgroundColor: "#FFFDF8", borderRadius: 22, padding: 20, borderWidth: 1, borderColor: "#E9E0D0" },
  sectionKicker: { color: "#A26A23", fontSize: 13, fontWeight: "800", textAlign: "right", marginBottom: 5 },
  introTitle: { color: "#173B29", fontSize: 21, fontWeight: "800", textAlign: "right" },
  bodyText: { color: "#647066", fontSize: 14, lineHeight: 23, textAlign: "right", marginTop: 9 },
  sectionHeader: { flexDirection: "row-reverse", alignItems: "flex-end", justifyContent: "space-between" },
  sectionTitle: { color: "#173B29", fontSize: 20, fontWeight: "800", textAlign: "right" },
  sectionHint: { color: "#8B958D", fontSize: 12, textAlign: "right" },
  servicesGrid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 },
  serviceCard: { width: "48.5%", minHeight: 154, backgroundColor: "#FFFDF8", borderRadius: 18, padding: 13, borderWidth: 1, borderColor: "#E9E0D0", alignItems: "flex-end" },
  serviceIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#E9F2E4", alignItems: "center", justifyContent: "center", marginBottom: 9 },
  serviceTitle: { color: "#244B36", fontSize: 14, fontWeight: "800", textAlign: "right" },
  serviceText: { color: "#7D877E", fontSize: 11, lineHeight: 17, textAlign: "right", marginTop: 5 },
  galleryRow: { gap: 12, paddingRight: 2 },
  galleryCard: { width: 205, backgroundColor: "#FFFDF8", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "#E9E0D0" },
  galleryImage: { width: "100%", height: 126 },
  galleryTitle: { color: "#244B36", fontSize: 13, fontWeight: "700", textAlign: "right", padding: 11 },
  callout: { backgroundColor: "#173B29", borderRadius: 20, padding: 17, flexDirection: "row-reverse", alignItems: "center", gap: 12 },
  calloutCopy: { flex: 1, alignItems: "flex-end" },
  calloutTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", textAlign: "right" },
  calloutText: { color: "#D4E7D0", fontSize: 12, lineHeight: 19, marginTop: 4, textAlign: "right" },
  footerPhrase: { color: "#A26A23", fontSize: 16, fontWeight: "800", textAlign: "center", marginTop: 2 },
});
