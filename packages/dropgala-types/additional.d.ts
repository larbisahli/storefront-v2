declare global {
  interface Window {
    dataCache?: Record<number, unknown>
    contentConfiguration?: ContentConfiguration
    prompt_event?: BeforeInstallPromptEvent
    website_code: string
    storeCurrency: string
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>

    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed'
      platform: string
    }>

    prompt(): Promise<void>
  }

  interface Navigator {
    userAgentData: NavigatorUAData
  }

  interface NavigatorUABrandVersion {
    brand: string
    version: string
  }

  interface UADataValues {
    brands?: NavigatorUABrandVersion[]
    mobile?: boolean
    platform?: string
    architecture?: string
    bitness?: string
    model?: string
    platformVersion?: string
    uaFullVersion?: string
  }

  interface UALowEntropyJSON {
    brands: NavigatorUABrandVersion[]
    mobile: boolean
    platform: string
  }

  interface NavigatorUAData extends UALowEntropyJSON {
    getHighEntropyValues(hints: string[]): Promise<UADataValues>
    toJSON(): UALowEntropyJSON
  }

  type EmptyObject = Record<string, never>
}
