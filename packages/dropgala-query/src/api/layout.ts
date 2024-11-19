import { StoreLayoutType } from '@dropgala/types'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { apiURL, serializeNestedBuffers } from '@dropgala/utils/utils'
import layoutCacheStore from '@store/layout.store'

export const fetchPageLayout = async ({
  alias,
  templateId,
  languageId,
  isCustom,
  page
}: {
  alias: string
  templateId: string
  languageId: number
  isCustom: boolean
  page: string
}) => {
  let layout = {}
  // layout = await layoutCacheStore.getPageLayout(
  //   alias,
  //   templateId,
  //   languageId,
  //   page
  // )

  if (isEmpty(layout)) {
    const response = await fetch(`${apiURL}/resources/layout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        alias,
        templateId,
        languageId,
        isCustom,
        page
      })
    })
    if (!response.ok) {
      const error = await response.json()
      console.log('__________<< Language Error >>', error)
      throw { message: error.message }
    }
    const layoutResponse = await response.json()
    layout = layoutResponse?.layout
  }

  return serializeNestedBuffers(layout) as StoreLayoutType
}
