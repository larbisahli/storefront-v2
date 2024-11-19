import useTranslation from '@dropgala/utils/hooks/useTranslation'
import CloseIcon from '@dropgala/assets/icons/close'

const InstallPromptAndroid = ({
  handleAppInstall,
  handleBannerClose,
  language
}: any) => {
  const { __ } = useTranslation(language, 'exception')
  const renderCloseButton = () => {
    return (
      <button
        className="w-full flex justify-end mb-2"
        onClick={handleBannerClose}
        aria-label={__('Close')}
      >
        <CloseIcon width={12} height={12} />
      </button>
    )
  }

  const renderContent = () => {
    return (
      <p className="text-base text-center">
        {__(
          'Add website to your home screen for the full-screen browsing experience!'
        )}
      </p>
    )
  }

  const renderInstallButton = () => {
    return (
      <div className="mt-3 w-full flex justify-center">
        <button
          className="px-3 py-2 bg-black text-white text-sm font-manrope bolder-gray-300 shadow"
          onClick={handleAppInstall}
        >
          {__('Add to home screen')}
        </button>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-200 p-2 mb-2 shadow border shadow border-solid border-gray-300">
      {renderCloseButton()}
      {renderContent()}
      {renderInstallButton()}
    </div>
  )
}

export default InstallPromptAndroid
