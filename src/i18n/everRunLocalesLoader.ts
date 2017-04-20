import { Locale } from "./locale";
import { en } from "./locales/en";
import { de } from "./locales/de";
import { zh_CN } from "./locales/zh_CN";
import { ja } from "./locales/ja";

export class everRunLocalesLoader {
    load(availableLocales: { [name: string]: Locale }) {
        availableLocales["en"] = new en();
        availableLocales["de"] = new de();
        availableLocales["zh_CN"] = new zh_CN();
        availableLocales["ja"] = new ja();
    }
}