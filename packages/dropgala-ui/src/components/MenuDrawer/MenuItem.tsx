import {
  CategoryRefLevel2,
  CategoryRefLevel3,
  CategoryType
} from '@dropgala/types/category.type'
import cn from 'clsx'
import React, { useState } from 'react'

import PlusIcon from '@dropgala/assets/icons/plus-icon'
import { StoreProps, toggleMenu } from '@dropgala/store'
import Link from '../common/Link'

type MenuType = CategoryType | CategoryRefLevel2 | CategoryRefLevel3

interface Props {
  useAppDispatch: StoreProps['useAppDispatch']
  category: MenuType
  level?: number
}

const MenuItem: React.FC<Props> = ({ useAppDispatch, category, level = 2 }) => {
  const dispatch = useAppDispatch()

  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null)

  const { id, name, children = [] } = category

  const hasChildren = (children ?? [])?.length > 0

  const handleOpenSubMenu = () => {
    if (openSubMenuId) {
      setOpenSubMenuId(null)
      return
    }
    setOpenSubMenuId(id)
  }

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleOpenSubMenu()
    }
  }

  const handleMenu = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className="overflow-auto text-sm">
      {hasChildren ? (
        <div
          className="my-1 flex items-center justify-between"
          role={'button'}
          tabIndex={0}
          onClick={handleOpenSubMenu}
          onKeyDown={handleKeyEnter}
        >
          <div
            className={cn('px-3 py-2 font-semibold', {
              'text-gray-800 px-2 py-0': level === 3
            })}
          >
            {name}
          </div>
          <div className="p-3">
            <PlusIcon />
          </div>
        </div>
      ) : (
        <Link
          href={{
            pathname: '/category/[slug]',
            query: { slug: category.url }
          }}
          onClick={handleMenu}
          className="my-1 flex items-center justify-between"
        >
          <div
            className={cn('px-3 py-2 font-semibold', {
              'text-gray-800 font-normal px-2 py-0': level === 3
            })}
          >
            {name}
          </div>
        </Link>
      )}
      <div className="bg-gray-200 pl-4">
        {hasChildren && openSubMenuId === id && (
          <Link
            href={{
              pathname: '/category/[slug]',
              query: { slug: category.url }
            }}
            onClick={handleMenu}
          >
            <div
              className={cn('px-3 py-2 font-semibold', {
                'text-gray-800 font-normal px-2 py-0': level === 2
              })}
            >{`All ${name}`}</div>
          </Link>
        )}
        {hasChildren &&
          openSubMenuId === id &&
          children &&
          children?.map((subcategory: MenuType) => (
            <MenuItem
              key={subcategory.id}
              useAppDispatch={useAppDispatch}
              category={subcategory}
              level={level + 1}
            />
          ))}
      </div>
    </div>
  )
}

export default MenuItem
