import { CategoryType } from '@dropgala/types/category.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL } from '@dropgala/utils/utils'
import categoryCacheStore from '@store/category.store'

export const fetchStoreCategory = async ({
  slug,
  languageId,
  alias
}: {
  slug: string
  languageId: number
  alias: string
}) => {
  let category = {} as CategoryType

  // category = await categoryCacheStore.getCategory(slug, alias, languageId)

  if (isEmpty(category)) {
    const response = await fetch(`${apiURL}/resources/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug, alias, languageId })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Category Error >>', error)
      throw { message: error.message }
    }
    category = await response.json()
  }

  return category
}
