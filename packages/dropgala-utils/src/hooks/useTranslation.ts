import { ConfigType } from '@dropgala/types/config.type'

export default function useTranslation(
  language: ConfigType['language'],
  file: string
) {
  const translation = language?.translation[file]
  function injectValues(string: string, ...values: any[]) {
    let i = 0
    return string.replace(/%s/g, () => values[i++] ?? '')
  }
  function translateString(string: string) {
    return (translation && string && translation[string]) || string || ''
  }
  function getTranslatedStringWithInjectedValues(
    string: string,
    values: any[]
  ) {
    return injectValues(translateString(string), ...values)
  }
  function __(string: string, ...values: any[]) {
    return getTranslatedStringWithInjectedValues(string, values)
  }
  return { __ }
}
