import { CategoryType } from '@dropgala/types/category.type'
import { useMemo } from 'react'
import Link from '../../common/Link'

interface Props {
  menu: CategoryType[]
  selectedFirstLevelCategory: number | null
}

const MenuDropDownComponent = ({ menu, selectedFirstLevelCategory }: Props) => {
  const secondLevelCategories = useMemo(() => {
    return menu?.find((menu) => menu.id === selectedFirstLevelCategory)
      ?.children as CategoryType[]
  }, [selectedFirstLevelCategory, menu])

  if (!selectedFirstLevelCategory || secondLevelCategories?.length === 0) {
    return null
  }

  return (
    <div id="menu-drop" className="pt-3 pb-8">
      <div className="grid grid-cols-5 gap-3 px-2">
        {secondLevelCategories?.map(
          ({ id, name, children = [], urlKey: url2 }) => {
            return (
              <div key={id} className="text-black text-sm flex flex-col">
                <Link
                  href={{
                    pathname: '/category/[slug]',
                    query: { slug: url2 }
                  }}
                  className="font-semibold pb-1 hover:text-red-500 w-fit"
                >
                  {name}
                </Link>
                {(children as CategoryType[])?.map(
                  ({ id, name, urlKey: url3 }) => {
                    return (
                      <Link
                        href={{
                          pathname: '/category/[slug]',
                          query: { slug: url3 }
                        }}
                        key={id}
                        className="pb-1 hover:text-red-500 w-fit"
                      >
                        {name}
                      </Link>
                    )
                  }
                )}
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default MenuDropDownComponent
