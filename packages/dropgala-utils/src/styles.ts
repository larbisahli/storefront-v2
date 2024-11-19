import { PageBuilderStyles, ThemeSettingsType } from '@dropgala/types'

const handleBorderWidth = (border: PageBuilderStyles['Border']) => {
  if (!border) return ''
  if (border?.border === 'all') {
    return `border: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'top') {
    return `border-top: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'left') {
    return `border-left: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'right') {
    return `border-right: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
  if (border?.border === 'bottom') {
    return `border-bottom: ${border?.borderWidth}px ${border?.borderStyle?.value} ${border?.borderColor};`
  }
}

export const handleBorderStyle = (border: PageBuilderStyles['Border']) => {
  if (!border) return ''
  return `border-radius: ${
    border?.borderRadius
  }px !important; ${handleBorderWidth(border)}`
}

export const handleOverlayStyle = (
  overlay: PageBuilderStyles['Overlay'],
  border?: PageBuilderStyles['Border']
) => {
  if (!overlay) return ''
  return `background-color: ${overlay?.overlayColor};opacity: ${
    Number(overlay?.overlayOpacity ?? 10) / 100
  };border-radius: ${
    border?.borderRadius ?? 0
  }px;position: absolute;right: 0;top: 0;left: 0;bottom: 0;z-index: 1;
    `
}

export const handleTypographyStyle = (
  typography: PageBuilderStyles['Typography']
) => {
  if (!typography) return ''
  const textAlign =
    typography?.textAlign && `text-align: ${typography?.textAlign};`
  return `
    font-family: var(${typography?.fontFamily?.value});
    font-size: ${typography?.fontSize}px;
    font-style: ${typography?.fontStyle};
    font-weight: ${typography?.fontWeight?.value};
    color: ${typography?.color};
    letter-spacing: ${typography?.letterSpacing}px;
    line-height: ${typography?.lineHeight}px;
    text-decoration: ${typography?.textDecoration};
    text-transform: ${typography?.textTransform};
    ${textAlign ?? ''}
  `.trim()
}

export const handleSpacingStyle = (spacing: PageBuilderStyles['Spacing']) => {
  if (!spacing) return ''
  return ``
}

export const handleThemeSettingsDefaults = (settings: ThemeSettingsType) => {
  if (!settings) return ''
  return `
  font-family: var(${settings?.fontFamily?.value});
  background: var(--background-color);
  `
}

export const handleThemeSettingsVariables = (settings: ThemeSettingsType) => {
  if (!settings) return ''
  return `
    --primary-color: ${settings.primaryColor};
    --primary-hover-color: ${settings.primaryHoverColor};
    --text-color: ${settings.textColor};
    --background-color: ${settings.background};
    --modal-background-color: ${settings.modalBackground};
    --alert-background-color: ${settings.alertBackground};
    --primary-button-text-color: ${settings.primaryButtonTextColor};
    --primary-button-text-hover-color: ${settings.primaryButtonTextHoverColor};
    --primary-button-background-color: ${settings.primaryButtonBackground};
    --primary-button-background-hover-color: ${settings.primaryButtonHoverBackground};
    --primary-button-border-color: ${settings.primaryButtonBorder};
    --primary-button-border-hover-color: ${settings.primaryButtonBorderHover};
    --secondary-button-text-color: ${settings.secondaryButtonTextColor};
    --secondary-button-text-hover-color: ${settings.secondaryButtonTextHoverColor};
    --secondary-button-background-color: ${settings.secondaryButtonBackground};
    --secondary-button-background-hover-color: ${settings.secondaryButtonHoverBackground};
    --secondary-button-border-color: ${settings.secondaryButtonBorder};
    --secondary-button-border-hover-color: ${settings.secondaryButtonBorderHover};
    --checkbox-icon-color: ${settings.checkboxIconColor};
    --checkbox-background-color: ${settings.checkboxBackground};
    --checkbox-border-color: ${settings.checkboxBorder};
    --loading-bar-color: ${settings.loadingBarColor};
    --bar-light-half-color: ${settings.barLightHalfColor};
    --bar-dark-half-color: ${settings.barDarkHalfColor};
    --modal-loading-background-color: ${settings.modalLoadingBackground};
  `.trim()
}
