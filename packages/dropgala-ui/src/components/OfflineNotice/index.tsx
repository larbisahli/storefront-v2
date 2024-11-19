import React, { useEffect } from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import { selectOffline, setOffline, setOnline } from '@dropgala/store/Offline'
import OfflineSvg from '@dropgala/assets/icons/offline'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {}

const OfflineNotice: React.FC<Props> = ({
  useAppSelector,
  useAppDispatch
}: Props) => {
  const { language } = useAppSelector(selectConfig)
  const { isOffline } = useAppSelector(selectOffline)
  const { __ } = useTranslation(language, 'exception')

  const dispatch = useAppDispatch()

  useEffect(() => {
    handleNetworkChange()
    window.addEventListener('online', handleNetworkChange.bind(this))
    window.addEventListener('offline', handleNetworkChange.bind(this))
  }, [])

  const handleNetworkChange = () => {
    if (navigator.onLine) {
      document.documentElement.classList.remove('offline')
      dispatch(setOnline())
    } else {
      document.documentElement.classList.add('offline')
      dispatch(setOffline())
    }
  }

  if (isOffline) {
    return (
      <div className="OfflineNotice z-50 p-2 flex justify-center items-center fixed bottom-0 left-0 right-0 bg-yellow-300">
        <div className="mx-3">
          <OfflineSvg />
        </div>
        <div className="text-black font-medium text-sm">
          {__('You are currently offline.')}
        </div>
      </div>
    )
  }

  return null
}

export default OfflineNotice
