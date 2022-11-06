import { createI18n } from "vue-i18n";

import en from "@/langs/en.json";
import ru from "@/langs/ru.json";

const i18n = createI18n({
  locale: "ru",
  messages: {
    en,
    ru,
  },
  allowComposition: true,
  legacy: true,
  globalInjection: true,
});

export default i18n;
