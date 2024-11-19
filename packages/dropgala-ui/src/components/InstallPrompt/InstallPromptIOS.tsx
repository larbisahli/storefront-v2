import useTranslation from '@dropgala/utils/hooks/useTranslation'

const InstallPromptIOS = ({ handleBannerClose, language }: any) => {
  const { __ } = useTranslation(language, 'exception')

  const renderCloseButton = () => {
    return <button onClick={handleBannerClose}>{__('Maybe later')}</button>
  }

  const renderContent = () => {
    return (
      <p>
        <span>{__('Tap:')}</span>
        {/* <span block="InstallPromptIOS" elem="Share" /> */}
        <span>{__(', then')}</span>
        {/* <span block="InstallPromptIOS" elem="Plus" /> */}
        <span>{__('Add to Home Screen')}</span>
      </p>
    )
  }

  const renderHeading = () => {
    return <p>{__('Browse website in full-screen:')}</p>
  }

  return (
    <div>
      {renderHeading()}
      {renderContent()}
      {renderCloseButton()}
    </div>
  )
}

export default InstallPromptIOS
