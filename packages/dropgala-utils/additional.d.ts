declare global {
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
