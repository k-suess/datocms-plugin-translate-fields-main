# DeepL Sprach-Update Plan

## Übersicht
Plan zur Implementierung korrekter DeepL Sprachunterstützung im datocms-plugin-translate-fields Plugin, insbesondere für chinesische Sprachen (ZH-HANS/ZH-HANT).

**Projekt-Sprachen:** DE, EN, EN-US, KO, JA, ZH, ZH-Hant

**Referenz:** [DeepL Supported Languages Documentation](https://developers.deepl.com/docs/getting-started/supported-languages)

---

## Problem
- Plugin verwendet veraltetes `ZH` statt `ZH-HANS` und `ZH-HANT`
- Fehlende Unterstützung für 11 neue DeepL-Sprachen
- Keine Unterscheidung zwischen Traditional und Simplified Chinese

---

## Phase 1: Analyse & Vergleich

### Aktuell im Plugin (`deeplTo`):
```
BG, CS, DA, DE, EL, EN-GB, EN-US, ES, ET, FI, FR, HU, ID, IT, JA, KO, LT, LV, NB, NL, PL, PT-BR, PT-PT, RO, RU, SK, SL, SV, TR, UK, ZH
```

### Laut DeepL Doku (Target Languages):
```
AR, BG, CS, DA, DE, EL, EN, EN-GB, EN-US, ES, ES-419, ET, FI, FR, HE, HU, ID, IT, JA, KO, LT, LV, NB, NL, PL, PT, PT-BR, PT-PT, RO, RU, SK, SL, SV, TH, TR, UK, VI, ZH, ZH-HANS, ZH-HANT
```

### Fehlende Sprachen im Plugin:
- ❌ `AR` - Arabic
- ❌ `EN` - English (unspecified variant, backward compatibility)
- ❌ `ES-419` - Spanish (Latin American)
- ❌ `HE` - Hebrew (text translation via next-gen models only)
- ❌ `PT` - Portuguese (unspecified variant, backward compatibility)
- ❌ `TH` - Thai (text translation via next-gen models only)
- ❌ `VI` - Vietnamese (text translation via next-gen models only)
- ❌ `ZH-HANS` - Chinese (simplified) ⚠️ **KRITISCH**
- ❌ `ZH-HANT` - Chinese (traditional) ⚠️ **KRITISCH**

---

## Phase 2: Änderungen an `src/lib/supported-locales.ts`

### Schritt 1: Update `deeplTo` Array

```typescript
export const deeplTo = [
  'AR',      // NEU - Arabic
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN',      // NEU - English (backward compatibility)
  'EN-GB',
  'EN-US',
  'ES',
  'ES-419',  // NEU - Spanish (Latin American)
  'ET',
  'FI',
  'FR',
  'HE',      // NEU - Hebrew (next-gen models only)
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
  'PT',      // NEU - Portuguese (backward compatibility)
  'PT-BR',
  'PT-PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'TH',      // NEU - Thai (next-gen models only)
  'TR',
  'UK',
  'VI',      // NEU - Vietnamese (next-gen models only)
  'ZH-HANS', // NEU - Chinese (simplified) ⚠️ KRITISCH
  'ZH-HANT', // NEU - Chinese (traditional) ⚠️ KRITISCH
]
```

### Schritt 2: Update `deeplFrom` Array

```typescript
export const deeplFrom = [
  'AR',   // NEU - Arabic
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
  'HE',   // NEU - Hebrew (next-gen models only)
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
  'TH',   // NEU - Thai (next-gen models only)
  'TR',
  'UK',
  'VI',   // NEU - Vietnamese (next-gen models only)
  'ZH',   // Bleibt ZH (DeepL erkennt alle Varianten automatisch)
]
```

### Schritt 3: Update `getSupportedToLocale()` Funktion

```typescript
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
    // ⚠️ KRITISCH: Chinesisch-Mappings
    case 'zh':
    case 'zh-cn':
    case 'zh-hans':
      return 'ZH-HANS'  // Simplified Chinese
    case 'zh-tw':
    case 'zh-hk':
    case 'zh-hant':
      return 'ZH-HANT'  // Traditional Chinese
    // Spanisch Latin American
    case 'es-419':
    case 'es-mx':
    case 'es-ar':
      return 'ES-419'
    default:
      break
  }

  // Prüfe ob die Sprache in der DeepL-Liste ist
  if (
    deeplSupportedToLocales
      .map((deeplLocale) => deeplLocale.toLowerCase())
      .includes(localeStart)
  ) {
    return localeStart.toUpperCase()
  }

  return locale.toUpperCase()
}
```

---

## Phase 3: Testing & Validierung

### Test-Szenarien für Chinesisch (⚠️ KRITISCH):

| DatoCMS Locale | Erwartetes DeepL Target | Beschreibung |
|----------------|------------------------|--------------|
| `zh` | `ZH-HANS` | Default zu Simplified |
| `zh-Hans` | `ZH-HANS` | Explizit Simplified |
| `zh-Hant` | `ZH-HANT` | Explizit Traditional |
| `zh-CN` | `ZH-HANS` | China = Simplified |
| `zh-TW` | `ZH-HANT` | Taiwan = Traditional |
| `zh-HK` | `ZH-HANT` | Hong Kong = Traditional |

### Test-Plan
1. ✅ Unit-Tests für `getSupportedToLocale()` mit allen Chinesisch-Varianten
2. ✅ Unit-Tests für `getSupportedFromLocale()`
3. ⚠️ Integration-Test mit echter DeepL API (optional)

---

## Phase 4: Test-Implementierung

Erstelle/erweitere Tests in `src/lib/supported-locales.test.ts`:

```typescript
describe('getSupportedToLocale for Chinese', () => {
  it('should map zh to ZH-HANS (simplified)', () => {
    expect(getSupportedToLocale('zh', TranslationService.deepl))
      .toBe('ZH-HANS')
  })

  it('should map zh-Hans to ZH-HANS', () => {
    expect(getSupportedToLocale('zh-Hans', TranslationService.deepl))
      .toBe('ZH-HANS')
  })

  it('should map zh-CN to ZH-HANS', () => {
    expect(getSupportedToLocale('zh-CN', TranslationService.deepl))
      .toBe('ZH-HANS')
  })

  it('should map zh-Hant to ZH-HANT (traditional)', () => {
    expect(getSupportedToLocale('zh-Hant', TranslationService.deepl))
      .toBe('ZH-HANT')
  })

  it('should map zh-TW to ZH-HANT', () => {
    expect(getSupportedToLocale('zh-TW', TranslationService.deepl))
      .toBe('ZH-HANT')
  })

  it('should map zh-HK to ZH-HANT', () => {
    expect(getSupportedToLocale('zh-HK', TranslationService.deepl))
      .toBe('ZH-HANT')
  })
})

describe('getSupportedToLocale for new languages', () => {
  it('should support Arabic (AR)', () => {
    expect(getSupportedToLocale('ar', TranslationService.deepl))
      .toBe('AR')
  })

  it('should support Spanish Latin American (ES-419)', () => {
    expect(getSupportedToLocale('es-419', TranslationService.deepl))
      .toBe('ES-419')
  })

  // ... weitere Tests für neue Sprachen
})
```

---

## Phase 5: Dokumentation

Update der `README.md` mit aktuellen unterstützten Sprachen.

---

## Zusammenfassung der Änderungen

### Dateien die geändert werden müssen:

1. ✏️ **src/lib/supported-locales.ts** (⚠️ KRITISCH)
   - `deeplTo` Array: +11 neue Sprachen
   - `deeplFrom` Array: +4 neue Sprachen
   - `getSupportedToLocale()`: Chinesisch-Mappings erweitern

2. ✏️ **src/lib/supported-locales.test.ts**
   - Tests für Chinesisch-Mappings hinzufügen
   - Tests für neue Sprachen hinzufügen

3. 📝 **README.md** (optional)
   - Dokumentation der unterstützten Sprachen aktualisieren

### Priorität für Projekt

🔴 **Kritisch:**
- `ZH-HANS` und `ZH-HANT` Mappings (betrifft direkt Projekt-Sprachen)

🟡 **Wichtig:**
- Übrige 9 Sprachen für vollständige DeepL API-Kompatibilität

🟢 **Nice-to-have:**
- Dokumentation und erweiterte Tests

---

## Nächste Schritte

1. ✅ In **Agent Mode** wechseln
2. Änderungen in `src/lib/supported-locales.ts` implementieren
3. Tests schreiben und ausführen
4. Dokumentation aktualisieren
5. Commit mit Message: `feat: add support for ZH-HANS/ZH-HANT and 9 additional DeepL languages`

---

**Erstellt am:** 2025-11-05  
**Status:** 📋 Geplant  
**Priorität:** 🔴 Hoch (wegen zh-Hant Anforderung)

