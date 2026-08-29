import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "ar" | "en";

export const translations = {
  ar: {
    tabs: { home: "الرئيسية", gallery: "المعرض", contact: "تواصل معنا" },
    home: {
      eyebrow: "وجهتكم الهادئة وسط الطبيعة",
      callNow: "اتصل الآن",
      whatsapp: "واتساب",
      location: "الموقع",
      introKicker: "أجمل الأوقات تبدأ من هنا",
      introTitle: "خصوصية، هدوء وطبيعة جميلة",
      introBody:
        "مزارع خاصة مجهزة للعائلات والأصدقاء والمناسبات، مع مسابح خاصة وجلسات مريحة ومساحات خضراء تمنحكم يومًا مختلفًا بعيدًا عن الضجيج.",
      whyChoose: "لماذا تختارون مزارعنا؟",
      whyHint: "خدمات بسيطة لراحة أكبر",
      galleryTitle: "لمحات من المزرعة",
      galleryHint: "اسحب للاطلاع",
      readyTitle: "جاهزون لاستقبال مناسباتكم",
      readyText: "للحجز والاستفسار تواصلوا معنا مباشرة عبر الهاتف أو واتساب.",
      languageToggle: "AR / EN",
      footer: "الراحة • الخصوصية • الفخامة",
      heroBadges: [
        { label: "حجز موثوق" },
        { label: "جو فخم" },
        { label: "طبيعة هادئة" },
      ],
    },
    gallery: {
      title: "معرض المزرعة",
      subtitle: "تعرّفوا على أجواء المسبح والجلسات والبساتين",
      badges: ["صور حية", "طبيعة", "هدوء"],
    },
    contact: {
      title: "تواصلوا معنا",
      subtitle: "للحجز والاستفسار عن المواعيد والخدمات",
      quickItems: ["اتصال", "واتساب", "الموقع"],
      welcome: "يسعدنا استقبالكم لقضاء أجمل الأوقات مع من تحبون.",
      directCall: "اتصال مباشر",
      whatsapp: "واتساب",
      locationTitle: "موقع المزرعة",
      directCallSubtitle: "راسلونا للحجز والاستفسار",
      whatsappSubtitle: "راسلونا للحجز والاستفسار",
      locationSubtitle: "فتح الموقع في خرائط Google",
      note: "يُفضّل التواصل مسبقًا لتنسيق الحجز وتجهيز المناسبة عند الحاجة.",
      footer: "الراحة • الخصوصية • الفخامة",
    },
    alert: {
      openLinkFailedTitle: "تعذر فتح الرابط",
      openLinkFailedBody: "يرجى المحاولة مرة أخرى أو التواصل هاتفيًا.",
      openLinkFailedBodySimple: "يرجى المحاولة مرة أخرى.",
    },
  },
  en: {
    tabs: { home: "Home", gallery: "Gallery", contact: "Contact" },
    home: {
      eyebrow: "Your peaceful retreat in nature",
      callNow: "Call now",
      whatsapp: "WhatsApp",
      location: "Location",
      introKicker: "The best moments begin here",
      introTitle: "Privacy, calm, and beautiful nature",
      introBody:
        "A private farm designed for families, friends, and special occasions, with private pools, comfortable seating, and green spaces that give you a refreshing break away from the noise.",
      whyChoose: "Why choose our farm?",
      whyHint: "Simple services for greater comfort",
      galleryTitle: "Moments from the farm",
      galleryHint: "Swipe to explore",
      readyTitle: "Ready to host your occasions",
      readyText: "For booking and inquiries, contact us directly by phone or WhatsApp.",
      languageToggle: "AR / EN",
      footer: "Comfort • Privacy • Luxury",
      heroBadges: [
        { label: "Reliable booking" },
        { label: "Luxury atmosphere" },
        { label: "Peaceful nature" },
      ],
    },
    gallery: {
      title: "Farm gallery",
      subtitle: "Discover the atmosphere of the pool, seating areas, and gardens",
      badges: ["Live photos", "Nature", "Calm"],
    },
    contact: {
      title: "Contact us",
      subtitle: "For bookings and inquiries about schedules and services",
      quickItems: ["Call", "WhatsApp", "Location"],
      welcome: "We are happy to welcome you for the most beautiful moments with the people you love.",
      directCall: "Direct call",
      whatsapp: "WhatsApp",
      locationTitle: "Farm location",
      directCallSubtitle: "Get in touch by phone",
      whatsappSubtitle: "Message us for booking and inquiries",
      locationSubtitle: "Open location in Google Maps",
      note: "It is recommended to contact in advance to coordinate the reservation and arrange the occasion when needed.",
      footer: "Comfort • Privacy • Luxury",
    },
    alert: {
      openLinkFailedTitle: "Unable to open the link",
      openLinkFailedBody: "Please try again or contact us by phone.",
      openLinkFailedBodySimple: "Please try again.",
    },
  },
} as const;

export type TranslationContent = (typeof translations)[Language];

const STORAGE_KEY = "hamza-saleh-farms-language";
const DEFAULT_LANGUAGE: Language = "ar";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  content: TranslationContent;
  isRTL: boolean;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!mounted) return;
        if (stored === "ar" || stored === "en") {
          setLanguageState(stored);
        }
        setReady(true);
      })
      .catch(() => {
        if (mounted) setReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, language).catch(() => undefined);
  }, [language, ready]);

  const setLanguage = (next: Language) => setLanguageState(next);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: translations[language],
      isRTL: language === "ar",
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
