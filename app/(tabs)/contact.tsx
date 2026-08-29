import * as Linking from "expo-linking";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { farmName, mapUrl, phoneNumbers } from "@/lib/farm-data";
import { useLanguage } from "@/lib/language-context";

async function openExternal(url: string, errorTitle: string, errorBody: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(errorTitle, errorBody);
  }
}

function ContactCard({ icon, title, subtitle, onPress, color }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; subtitle: string; onPress: () => void; color: string }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: color }]}><MaterialIcons name={icon} size={24} color="#FFFFFF" /></View>
      <View style={styles.cardCopy}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardSubtitle}>{subtitle}</Text></View>
      <MaterialIcons name="chevron-left" size={24} color="#A26A23" />
    </Pressable>
  );
}

export default function ContactScreen() {
  const { content, isRTL } = useLanguage();

  return (
    <ScreenContainer containerClassName="bg-[#F7F3EA]" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{content.contact.title}</Text>
        <Text style={styles.subtitle}>{content.contact.subtitle}</Text>

        <View style={[styles.quickIcons, isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }]}> 
          <View style={styles.quickItem}><MaterialIcons name="phone" size={22} color="#2B684A" /><Text style={styles.quickText}>{content.contact.quickItems[0]}</Text></View>
          <View style={styles.quickItem}><MaterialIcons name="chat" size={22} color="#25A05A" /><Text style={styles.quickText}>{content.contact.quickItems[1]}</Text></View>
          <View style={styles.quickItem}><MaterialIcons name="location-on" size={22} color="#2D8AA0" /><Text style={styles.quickText}>{content.contact.quickItems[2]}</Text></View>
        </View>

        <View style={styles.brandCard}><MaterialIcons name="eco" size={28} color="#D9A441" /><Text style={styles.brandName}>{farmName}</Text><Text style={styles.brandText}>{content.contact.welcome}</Text></View>
        <ContactCard icon="phone" title={content.contact.directCall} subtitle={phoneNumbers.join("  •  ")} color="#2B684A" onPress={() => openExternal(`tel:${phoneNumbers[0].replace(/\s/g, "")}`, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBody)} />
        <ContactCard icon="chat" title={content.contact.whatsapp} subtitle={content.contact.whatsappSubtitle} color="#25A05A" onPress={() => openExternal(`https://wa.me/${phoneNumbers[0].replace(/[+\s]/g, "")}`, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBody)} />
        <ContactCard icon="location-on" title={content.contact.locationTitle} subtitle={content.contact.locationSubtitle} color="#2D8AA0" onPress={() => openExternal(mapUrl, content.alert.openLinkFailedTitle, content.alert.openLinkFailedBodySimple)} />
        <View style={styles.note}><MaterialIcons name="info-outline" size={21} color="#A26A23" /><Text style={styles.noteText}>{content.contact.note}</Text></View>
        <Text style={styles.footer}>{content.contact.footer}</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 34, gap: 13 },
  title: { color: "#173B29", fontSize: 28, fontWeight: "800", textAlign: "right", marginTop: 8 },
  subtitle: { color: "#7D877E", fontSize: 14, textAlign: "right", marginBottom: 9 },
  quickIcons: { flexDirection: "row-reverse", justifyContent: "space-between", gap: 8 },
  quickItem: { flex: 1, backgroundColor: "#FFFDF8", borderRadius: 16, paddingVertical: 10, alignItems: "center", borderWidth: 1, borderColor: "#E9E0D0" },
  quickText: { color: "#244B36", fontSize: 12, fontWeight: "700", marginTop: 4 },
  brandCard: { backgroundColor: "#173B29", borderRadius: 22, padding: 22, alignItems: "flex-end" },
  brandName: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", marginTop: 9, textAlign: "right" },
  brandText: { color: "#D4E7D0", fontSize: 13, lineHeight: 20, marginTop: 6, textAlign: "right" },
  card: { backgroundColor: "#FFFDF8", borderRadius: 19, padding: 14, flexDirection: "row-reverse", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#E9E0D0" },
  iconWrap: { width: 46, height: 46, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  cardCopy: { flex: 1, alignItems: "flex-end" },
  cardTitle: { color: "#244B36", fontSize: 16, fontWeight: "800", textAlign: "right" },
  cardSubtitle: { color: "#7D877E", fontSize: 12, marginTop: 4, textAlign: "right" },
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
  note: { marginTop: 8, backgroundColor: "#F4E8D1", borderRadius: 16, padding: 14, flexDirection: "row-reverse", alignItems: "center", gap: 9 },
  noteText: { flex: 1, color: "#72552A", fontSize: 12, lineHeight: 18, textAlign: "right" },
  footer: { color: "#A26A23", fontSize: 16, fontWeight: "800", textAlign: "center", marginTop: 12 },
});
