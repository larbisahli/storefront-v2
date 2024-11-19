import { CategoryType } from '@dropgala/types/category.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL } from '@dropgala/utils/utils'
import menuCacheStore from '@store/menu.store'

export const fetchStoreMenu = async (languageId: number, alias: string) => {
  let configObject = { menu: [] } as { menu: CategoryType[] }

  // configObject = await menuCacheStore.getMenu(languageId, alias)

  if (isEmpty(configObject?.menu)) {
    const response = await fetch(`${apiURL}/resources/menu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias, languageId })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Menu Error >>', error)
      throw { message: error.message }
    }
    configObject = await response.json()
  }

  return configObject
}
