const getMobileDetect = (userAgent: NavigatorID['userAgent'] | undefined) => {
  if (!userAgent) {
    return {
      userAgent: null,
      isSafari: false,
      isMobile: false,
      isDesktop: true,
      isAndroid: false,
      isIos: false,
      isSSR: false
    }
  }
  const isAndroid = Boolean(userAgent.match(/Android/i))
  const isBlackBerry = Boolean(userAgent.match(/blackberry/i))
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isSafari =
    Boolean(userAgent.match(/safari/i)) &&
    !Boolean(userAgent.match(/chrome/i)) &&
    !Boolean(userAgent.match(/CriOS/i)) &&
    !Boolean(userAgent.match(/FxiOS/i))
  const isOpera = Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = Boolean(userAgent.match(/IEMobile/i))
  const isSSR = Boolean(userAgent.match(/SSR/i))
  const isMobile = Boolean(
    isAndroid || isIos || isOpera || isWindows || isBlackBerry
  )
  const isDesktop = Boolean(!isMobile && !isSSR)
  return {
    userAgent,
    isSafari,
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR
  }
}

export const standaloneMode = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(display-mode: standalone)').matches
  }
  return false
}

export const useMobileDetect = () => {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  return getMobileDetect(userAgent)
}

export default getMobileDetect
