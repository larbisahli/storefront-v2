import { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { apiURL } from '@dropgala/utils/utils'
import configCacheStore from '@store/config.store'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import languageCacheStore from '@store/language.store'

export const fetchStoreConfig = async (alias: string) => {
  let configObject = { config: {} } as { config: ConfigType }
  // configObject = await configCacheStore.getConfig(alias)

  if (isEmpty(configObject?.config)) {
    const response = await fetch(`${apiURL}/resources/config`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Config Error >>', error)
      throw { message: error.message }
    }
    configObject = await response.json()
  }

  return configObject?.config
}

export const fetchStoreLanguage = async (languageId: number, alias: string) => {
  let language = {}
  language = await languageCacheStore.getLanguage(languageId, alias)

  if (isEmpty(language)) {
    const response = await fetch(`${apiURL}/resources/language`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ languageId, alias })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Language Error >>', error)
      throw { message: error.message }
    }
    const languageResponse = await response.json()
    language = languageResponse?.language
  }

  return language as LanguageType
}
