import { onMounted, ref, type Ref } from "vue";

export type Lang = "en" | "es";
type UseLangResult = {
  lang: Ref<Lang>;
  setLang: (next: Lang) => void;
};

const STORAGE_KEY = "contract-kit-lang";
const lang = ref<Lang>("en");

let initialized = false;

function detectInitialLang(): Lang {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") {
    return stored;
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function useLang(): UseLangResult {
  onMounted(() => {
    if (!initialized) {
      lang.value = detectInitialLang();
      initialized = true;
    }
  });

  const setLang = (next: Lang) => {
    lang.value = next;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return { lang, setLang };
}
