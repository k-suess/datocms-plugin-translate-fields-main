import {
  getSupportedFromLocale,
  getSupportedToLocale,
} from './supported-locales'
import { TranslationService } from './types'

describe('getSupportedFromLocale', () => {
  describe('deepl', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.deepl)).toBe(
        'EN',
      )
    })
    it('should return single locale if en', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.deepl)).toBe(
        'EN',
      )
    })
    it('should return single locale if pt-pt', () => {
      expect(getSupportedFromLocale('pt-pt', TranslationService.deepl)).toBe(
        'PT',
      )
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deepl)).toBe('')
    })
  })

  describe('deeplFree', () => {
    it('should return single locale if en-us', () => {
      expect(
        getSupportedFromLocale('en-us', TranslationService.deeplFree),
      ).toBe('EN')
    })
    it('should return single locale if en', () => {
      expect(
        getSupportedFromLocale('en-us', TranslationService.deeplFree),
      ).toBe('EN')
    })
    it('should return single locale if pt-pt', () => {
      expect(
        getSupportedFromLocale('pt-pt', TranslationService.deeplFree),
      ).toBe('PT')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deeplFree)).toBe(
        '',
      )
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.yandex)).toBe(
        'en',
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedFromLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('ab', TranslationService.deeplFree)).toBe(
        '',
      )
    })
  })
})

describe('getSupportedToLocale', () => {
  describe('deepl', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.deepl)).toBe('EN-US')
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.deepl)).toBe('PT-PT')
    })
    it('should return double locale if pt-pt', () => {
      expect(getSupportedToLocale('pt-pt', TranslationService.deepl)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deepl)).toBe(
        'PT-BR',
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.deepl)).toBe('NL')
    })
    it('should return single locale if nl-be', () => {
      expect(getSupportedToLocale('nl-be', TranslationService.deepl)).toBe('NL')
    })
    it('should return locale if locale does not exist', () => {
      expect(getSupportedToLocale('bla-bla', TranslationService.deepl)).toBe(
        'BLA-BLA',
      )
    })

    // Chinese language mappings (CRITICAL for project requirements)
    describe('Chinese mappings', () => {
      it('should map zh to ZH-HANS (simplified)', () => {
        expect(getSupportedToLocale('zh', TranslationService.deepl)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-Hans to ZH-HANS', () => {
        expect(getSupportedToLocale('zh-Hans', TranslationService.deepl)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-hans to ZH-HANS', () => {
        expect(getSupportedToLocale('zh-hans', TranslationService.deepl)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-CN to ZH-HANS', () => {
        expect(getSupportedToLocale('zh-CN', TranslationService.deepl)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-Hant to ZH-HANT (traditional)', () => {
        expect(getSupportedToLocale('zh-Hant', TranslationService.deepl)).toBe(
          'ZH-HANT',
        )
      })

      it('should map zh-hant to ZH-HANT', () => {
        expect(getSupportedToLocale('zh-hant', TranslationService.deepl)).toBe(
          'ZH-HANT',
        )
      })

      it('should map zh-TW to ZH-HANT', () => {
        expect(getSupportedToLocale('zh-TW', TranslationService.deepl)).toBe(
          'ZH-HANT',
        )
      })

      it('should map zh-HK to ZH-HANT', () => {
        expect(getSupportedToLocale('zh-HK', TranslationService.deepl)).toBe(
          'ZH-HANT',
        )
      })
    })

    // New language support tests
    describe('New languages', () => {
      it('should support Arabic (AR)', () => {
        expect(getSupportedToLocale('ar', TranslationService.deepl)).toBe('AR')
      })

      it('should support Spanish Latin American (ES-419)', () => {
        expect(getSupportedToLocale('es-419', TranslationService.deepl)).toBe(
          'ES-419',
        )
      })

      it('should support Hebrew (HE)', () => {
        expect(getSupportedToLocale('he', TranslationService.deepl)).toBe('HE')
      })

      it('should support Thai (TH)', () => {
        expect(getSupportedToLocale('th', TranslationService.deepl)).toBe('TH')
      })

      it('should support Vietnamese (VI)', () => {
        expect(getSupportedToLocale('vi', TranslationService.deepl)).toBe('VI')
      })
    })
  })

  describe('deeplFree', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.deeplFree)).toBe(
        'EN-US',
      )
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.deeplFree)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-pt', () => {
      expect(getSupportedToLocale('pt-pt', TranslationService.deeplFree)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deeplFree)).toBe(
        'PT-BR',
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.deeplFree)).toBe(
        'NL',
      )
    })
    it('should return single locale if nl-be', () => {
      expect(getSupportedToLocale('nl-be', TranslationService.deeplFree)).toBe(
        'NL',
      )
    })
    it('should return locale if locale does not exist', () => {
      expect(
        getSupportedToLocale('bla-bla', TranslationService.deeplFree),
      ).toBe('BLA-BLA')
    })

    // Chinese language mappings (CRITICAL for project requirements)
    describe('Chinese mappings', () => {
      it('should map zh to ZH-HANS (simplified)', () => {
        expect(getSupportedToLocale('zh', TranslationService.deeplFree)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-Hans to ZH-HANS', () => {
        expect(
          getSupportedToLocale('zh-Hans', TranslationService.deeplFree),
        ).toBe('ZH-HANS')
      })

      it('should map zh-hans to ZH-HANS', () => {
        expect(
          getSupportedToLocale('zh-hans', TranslationService.deeplFree),
        ).toBe('ZH-HANS')
      })

      it('should map zh-CN to ZH-HANS', () => {
        expect(getSupportedToLocale('zh-CN', TranslationService.deeplFree)).toBe(
          'ZH-HANS',
        )
      })

      it('should map zh-Hant to ZH-HANT (traditional)', () => {
        expect(
          getSupportedToLocale('zh-Hant', TranslationService.deeplFree),
        ).toBe('ZH-HANT')
      })

      it('should map zh-hant to ZH-HANT', () => {
        expect(
          getSupportedToLocale('zh-hant', TranslationService.deeplFree),
        ).toBe('ZH-HANT')
      })

      it('should map zh-TW to ZH-HANT', () => {
        expect(getSupportedToLocale('zh-TW', TranslationService.deeplFree)).toBe(
          'ZH-HANT',
        )
      })

      it('should map zh-HK to ZH-HANT', () => {
        expect(getSupportedToLocale('zh-HK', TranslationService.deeplFree)).toBe(
          'ZH-HANT',
        )
      })
    })

    // New language support tests
    describe('New languages', () => {
      it('should support Arabic (AR)', () => {
        expect(getSupportedToLocale('ar', TranslationService.deeplFree)).toBe(
          'AR',
        )
      })

      it('should support Spanish Latin American (ES-419)', () => {
        expect(
          getSupportedToLocale('es-419', TranslationService.deeplFree),
        ).toBe('ES-419')
      })

      it('should support Hebrew (HE)', () => {
        expect(getSupportedToLocale('he', TranslationService.deeplFree)).toBe(
          'HE',
        )
      })

      it('should support Thai (TH)', () => {
        expect(getSupportedToLocale('th', TranslationService.deeplFree)).toBe(
          'TH',
        )
      })

      it('should support Vietnamese (VI)', () => {
        expect(getSupportedToLocale('vi', TranslationService.deeplFree)).toBe(
          'VI',
        )
      })
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedToLocale('en-us', TranslationService.yandex)).toBe(
        'en',
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedToLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return locale if locale does not exist', () => {
      expect(getSupportedToLocale('ab', TranslationService.yandex)).toBe('ab')
    })
  })
})
