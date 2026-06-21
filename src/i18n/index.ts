// Lightweight i18n system - no external dependencies
const translations: Record<string, Record<string, string>> = {
  FR: {
    "nav.collection": "Collection",
    "nav.atelier": "Atelier",
    "nav.process": "Procédé",
    "nav.looks": "Looks",
    "nav.boutiques": "Boutiques",
    "nav.contact": "Contact",
    "nav.reserve": "Réserver",
    "hero.subtitle": "Paris, France",
    "hero.title": "MAISON",
    "hero.description": "Où la tradition rencontre l'avant-garde. Chaque pièce est sculptée à la main dans notre atelier parisien.",
    "hero.cta": "Découvrir",
    "hero.secondary_cta": "Voir la campagne",
  },
  EN: {
    "nav.collection": "Collection",
    "nav.atelier": "Atelier",
    "nav.process": "Process",
    "nav.looks": "Looks",
    "nav.boutiques": "Boutiques",
    "nav.contact": "Contact",
    "nav.reserve": "Reserve",
    "hero.subtitle": "Paris, France",
    "hero.title": "MAISON",
    "hero.description": "Where tradition meets the avant-garde. Each piece is sculpted by hand in our Parisian atelier.",
    "hero.cta": "Discover",
    "hero.secondary_cta": "View Campaign",
  },
  ES: {
    "nav.collection": "Colección",
    "nav.atelier": "Atelier",
    "nav.process": "Proceso",
    "nav.looks": "Looks",
    "nav.boutiques": "Boutiques",
    "nav.contact": "Contacto",
    "nav.reserve": "Reservar",
    "hero.subtitle": "París, Francia",
    "hero.title": "MAISON",
    "hero.description": "Donde la tradición se encuentra con la vanguardia. Cada pieza es esculpida a mano en nuestro atelier parisino.",
    "hero.cta": "Descubrir",
    "hero.secondary_cta": "Ver Campaña",
  },
  IT: {
    "nav.collection": "Collezione",
    "nav.atelier": "Atelier",
    "nav.process": "Processo",
    "nav.looks": "Looks",
    "nav.boutiques": "Boutique",
    "nav.contact": "Contatto",
    "nav.reserve": "Riservare",
    "hero.subtitle": "Parigi, Francia",
    "hero.title": "MAISON",
    "hero.description": "Dove la tradizione incontra l'avanguardia. Ogni pezzo è scolpito a mano nel nostro atelier parigino.",
    "hero.cta": "Scoprire",
    "hero.secondary_cta": "Vedi Campagna",
  },
  JP: {
    "nav.collection": "コレクション",
    "nav.atelier": "アトリエ",
    "nav.process": "プロセス",
    "nav.looks": "ルックス",
    "nav.boutiques": "ブティック",
    "nav.contact": "連絡先",
    "nav.reserve": "予約",
    "hero.subtitle": "パリ、フランス",
    "hero.title": "MAISON",
    "hero.description": "伝統と前衛が出会う場所。パリのアトリエで手作りされた一点物の作品。",
    "hero.cta": "発見する",
    "hero.secondary_cta": "キャンペーンを見る",
  },
};

let currentLang = "FR";
const listeners: Array<() => void> = [];

export function t(key: string): string {
  return translations[currentLang]?.[key] ?? translations["FR"]?.[key] ?? key;
}

export function setLanguage(lang: string) {
  if (translations[lang]) {
    currentLang = lang;
    listeners.forEach((fn) => fn());
  }
}

export function getCurrentLang() {
  return currentLang;
}

export function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

export const langs = Object.keys(translations);
