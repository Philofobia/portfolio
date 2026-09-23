/**
 * next-intl type augmentation.
 *
 * Declaring `Locale` and `Messages` here makes `useTranslations()` /
 * `getTranslations()` autocomplete their keys and turns a typo into a compile
 * error. `messages/en.json` is the reference tree: `ja.json` must mirror it.
 */
import type messages from "../messages/en.json";
import type { routing } from "./i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
