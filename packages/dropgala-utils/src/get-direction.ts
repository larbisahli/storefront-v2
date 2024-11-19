export default function getDirection(locale: string | undefined) {
  if (!locale) return 'ltr'
  const rtlLanguages = [
    'ar',
    'ar-ae',
    'ar-bh',
    'ar-kw',
    'ar-ma',
    'ar-om',
    'ar-qa',
    'ar-sa',
    'he-il',
    'fa-ir'
  ]
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}

export function getIsRTL(locale: string | undefined) {
  if (!locale) return 'ltr'
  const rtlLanguages = [
    'ar',
    'ar-ae',
    'ar-bh',
    'ar-kw',
    'ar-ma',
    'ar-om',
    'ar-qa',
    'ar-sa',
    'he-il',
    'fa-ir'
  ]
  return rtlLanguages.includes(locale)
}

/** @namespace Util/CSS/isRtl */
export const isRtl = (): boolean =>
  document.documentElement.getAttribute('dir') === 'rtl'
