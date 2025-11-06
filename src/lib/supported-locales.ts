import { TranslationService } from './types'
import {
  yandex as yandexSupportedLocales,
  deeplTo as deeplSupportedToLocales,
  deeplFrom as deeplSupportedFromLocales,
} from './supported-locales'

export function getSupportedToLocale(
  locale: string,
  translationService: TranslationService,
): string {
  const localeLower = locale.toLowerCase()
  const indexOfDash = localeLower.indexOf('-')
  const localeStart =
    indexOfDash > 0 ? localeLower.substring(0, indexOfDash) : localeLower

  switch (translationService) {
    case TranslationService.yandex: {
      return localeStart
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      switch (localeLower) {
        case 'en':
          return 'EN-US'
        case 'en-eu':
        case 'en-gb':
          return 'EN-GB'
        case 'en-ie':
          return 'EN-GB'
        case 'en-us':
          return 'EN-US'
        case 'pt':
          return 'PT-PT'
        case 'pt-br':
          return 'PT-BR'
        case 'pt-pt':
          return 'PT-PT'
        // Chinese mappings (CRITICAL for project requirements)
        case 'zh':
        case 'zh-cn':
        case 'zh-hans':
          return 'ZH-HANS' // Simplified Chinese
        case 'zh-tw':
        case 'zh-hk':
        case 'zh-hant':
          return 'ZH-HANT' // Traditional Chinese
        // Spanish Latin American
        case 'es-419':
        case 'es-mx':
        case 'es-ar':
          return 'ES-419'
        default:
          break
      }

      if (
        deeplSupportedToLocales
          .map((deeplLocale) => deeplLocale.toLowerCase())
          .includes(localeStart)
      ) {
        return localeStart.toUpperCase()
      }

      return locale.toUpperCase()
    }
  }

  return locale
}

export function getSupportedFromLocale(
  locale: string,
  translationService: TranslationService,
): string {
  const localeLower = locale.toLowerCase()
  const indexOfDash = localeLower.indexOf('-')
  const localeStart =
    indexOfDash > 0 ? localeLower.substring(0, indexOfDash) : localeLower

  switch (translationService) {
    case TranslationService.yandex: {
      if (yandexSupportedLocales.includes(localeStart)) {
        return localeStart
      }

      return ''
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      if (
        deeplSupportedFromLocales
          .map((deeplLocale) => deeplLocale.toLowerCase())
          .includes(localeStart)
      ) {
        return localeStart.toUpperCase()
      }

      return ''
    }
  }

  return locale
}

export const deeplTo = [
  'AR', // Arabic
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN', // English (unspecified variant for backward compatibility)
  'EN-GB',
  'EN-US',
  'ES',
  'ES-419', // Spanish (Latin American)
  'ET',
  'FI',
  'FR',
  'HE', // Hebrew (text translation via next-gen models only)
  'HU',
  'ID',
  'IT',
  'JA',
  'KO',
  'LT',
  'LV',
  'NB',
  'NL',
  'PL',
  'PT', // Portuguese (unspecified variant for backward compatibility)
  'PT-BR',
  'PT-PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'TH', // Thai (text translation via next-gen models only)
  'TR',
  'UK',
  'VI', // Vietnamese (text translation via next-gen models only)
  'ZH-HANS', // Chinese (simplified)
  'ZH-HANT', // Chinese (traditional)
]

export const deeplFrom = [
  'AR', // Arabic
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN',
  'ES',
  'ET',
  'FI',
  'FR',
  'HE', // Hebrew (text translation via next-gen models only)
  'HU',
  'ID',
  'IT',
  'JA',
  'KO',
  'LT',
  'LV',
  'NB',
  'NL',
  'PL',
  'PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'TH', // Thai (text translation via next-gen models only)
  'TR',
  'UK',
  'VI', // Vietnamese (text translation via next-gen models only)
  'ZH', // Chinese (all variants)
]

export const yandex = [
  'af',
  'am',
  'ar',
  'az',
  'ba',
  'be',
  'bg',
  'bn',
  'bs',
  'ca',
  'ceb',
  'cs',
  'cy',
  'da',
  'de',
  'el',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'fi',
  'fr',
  'ga',
  'gd',
  'gl',
  'gu',
  'he',
  'hi',
  'hr',
  'ht',
  'hu',
  'hy',
  'id',
  'is',
  'it',
  'ja',
  'jv',
  'ka',
  'kk',
  'km',
  'kn',
  'ko',
  'ky',
  'la',
  'lb',
  'lo',
  'lt',
  'lv',
  'mg',
  'mhr',
  'mi',
  'mk',
  'ml',
  'mn',
  'mr',
  'mrj',
  'ms',
  'mt',
  'my',
  'ne',
  'nl',
  'no',
  'pa',
  'pap',
  'pl',
  'pt',
  'ro',
  'ru',
  'si',
  'sk',
  'sl',
  'sq',
  'sr',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'tl',
  'tr',
  'tt',
  'udm',
  'uk',
  'ur',
  'uz',
  'vi',
  'xh',
  'yi',
  'zh',
]
