import { CategoryType } from '@dropgala/types/category.type'
import React from 'react'
import cn from 'clsx'
import MenuItem from './MenuItem'
import SearchSection from './SearchSection'
import {
  StoreProps,
  selectDrawer,
  selectMenu,
  toggleCart
} from '@dropgala/store'
import Overlay from '@components/common/Overlay'
import CloseIcon from '@dropgala/assets/icons/close'

interface Props extends StoreProps {
  menu: CategoryType[]
}

const MenuDrawerView: React.FC<Props> = ({
  useAppSelector,
  useAppDispatch
}) => {
  const { isOpen, isMenu } = useAppSelector(selectDrawer)

  const { menu } = useAppSelector(selectMenu)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(toggleCart())
  }

  const isMenuOpen = isOpen && isMenu

  return (
    <React.Fragment>
      <Overlay isOpen={isMenuOpen} onClose={handleClose} />
      <div className={cn('drawer drawer-menu', { open: isMenuOpen })}>
        <div className="flex justify-end">
          <button className="px-4 py-3 text-gray-800" onClick={handleClose}>
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <div className="h-full overflow-auto">
          <div className="pb-20">
            <SearchSection />
            <div className="mx-3 bg-gray-300 h-[1px] w-full my-4"></div>
            <div className="h-full">
              <div className="h-full">
                {menu?.map((category) => (
                  <MenuItem
                    key={category.id}
                    category={category}
                    useAppDispatch={useAppDispatch}
                    level={1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MenuDrawerView
