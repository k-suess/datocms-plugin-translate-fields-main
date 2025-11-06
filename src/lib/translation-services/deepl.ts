import {
  DeeplFormalityLevel,
  TranslationOptions,
  TranslationService,
} from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const params = new URLSearchParams()

  params.set('target_lang', options.toLocale)

  if (options.format === 'html') {
    params.set('tag_handling', 'html')
  } else if (!options.deeplOptions?.preserveFormatting) {
    params.set('tag_handling', 'xml')
  }

  params.set('text', string)

  if (options.fromLocale) {
    params.set('source_lang', options.fromLocale)
  }

  if (options.deeplOptions?.glossaryId) {
    params.set('glossary_id', options.deeplOptions.glossaryId)
  }

  if (options.deeplOptions?.preserveFormatting) {
    params.set('preserve_formatting', '1')
  }

  if (
    options.deeplOptions?.formality &&
    options.deeplOptions.formality !== DeeplFormalityLevel.default
  ) {
    params.set('formality', options.deeplOptions.formality)
  }

  const apiVersion =
    options.translationService === TranslationService.deeplFree
      ? 'api-free'
      : 'api'

  const deepLApiUrl = `https://${apiVersion}.deepl.com/v2/translate`

  // Detect if we're running on Netlify (check for netlify.app domain or netlify function)
  const isNetlify =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('netlify.app') ||
      window.location.hostname.includes('netlify.com'))

  // Use Netlify Function proxy if available, otherwise fallback to DatoCMS CORS proxy
  let proxyUrl: string
  let headers: HeadersInit

  if (isNetlify) {
    // Use Netlify Function as proxy
    const netlifyFunctionUrl = new URL(
      '/.netlify/functions/deepl-proxy',
      window.location.origin,
    )
    netlifyFunctionUrl.searchParams.set('version', apiVersion)
    proxyUrl = netlifyFunctionUrl.toString()
    headers = {
      Authorization: `DeepL-Auth-Key ${options.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  } else {
    // Use DatoCMS CORS proxy
    const corsProxyUrl = new URL('https://cors-proxy.datocms.com')
    corsProxyUrl.searchParams.set('url', deepLApiUrl)
    proxyUrl = corsProxyUrl.toString()
    headers = {
      Authorization: `DeepL-Auth-Key ${options.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  // Make the API request
  const request = await fetch(proxyUrl, {
    method: 'POST',
    headers: headers,
    body: params,
  })

  if (!request.ok) {
    const errorText = await request.text().catch(() => 'Unknown error')
    throw new Error(
      `DeepL API request failed (status ${request.status}): ${errorText}`,
    )
  }

  const response = await request.json()

  if (!response.translations || !Array.isArray(response.translations)) {
    throw new Error('Invalid response format from DeepL API')
  }

  return response.translations
    .map((translation: any) => translation.text)
    .join(' ')
}
