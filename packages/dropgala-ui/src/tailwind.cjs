const plugin = require('tailwindcss/plugin')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgba(var(${variableName}))`
  }
}

function variable(variableName) {
  return ({ opacityValue }) => {
    return `var(${variableName})`
  }
}

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden'
    }
  })
})

module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      mobile: { min: '320px', max: '480px' },
      tablet: { min: '481px', max: '810px' },
      laptop: { min: '811px', max: '1024px' },
      desktop: { min: '1025px' }
    },
    boxShadow: {
      card: '0px 0px 6px rgba(79, 95, 120, 0.1)',
      badge: '0px 0px 4px rgba(79, 95, 90, 0.04)',
      cardHover: '1px 1px 20px rgba(79, 95, 120, 0.5)',
      cardHoverNoTop: '0px 6px 8px rgba(79, 95, 120, 0.2)',
      category: '0px 1px 6px rgba(79, 95, 120, 0.12)',
      categoryCard: '0 0 8px 0px rgba(0, 0, 0, 0.2)',
      navigation: '0 3px 6px rgba(115, 125, 144, 0.25)',
      counter: '0px 4px 10px rgba(79, 95, 120, 0.15)',
      featured: '0px 4px 8px rgba(70, 84, 111, 0.06)',
      cart: '0 3px 6px rgba(0,0,0,0.12)',
      switch: '0 2px 5px rgba(21,35,49,0.4)',
      dropDown: '0px 10px 40px rgba(41, 50, 68, 0.15)',
      carouselButton: '0px 2px 15px rgba(115, 125, 144, 0.25)',
      listProduct: '0 2px 4px rgba(0,0,0,.08)',
      navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
      header: '0 2px 3px rgba(0, 0, 0, 0.08)',
      subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
      bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
      cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)',
      contact: '0 1px 10px rgba(75, 90, 130, 0.1)',
      heroSearch: '0px 10px 20px rgba(96, 114, 140, 0.1)',
      footer: '3px 0 6px rgba(0,0,0,0.12)',
      'product-item': '0 3px 6px rgba(0,0,0,0.14)',
      float: '0 0 6px rgba(0,0,0,0.12)',
      floatingUp: '0 5px 10px rgba(0,0,0,0.16)',
      upside: '0 9px 7px -8px rgba(0,0,0,0.6)',
      mobile: '0 0px 2px rgba(0,0,0,0.12)',
      floatBig: '0 0 10px rgba(0,0,0,0.16)',
      imgFloat: '0 10px 10px rgba(0,0,0,0.16)'
    },
    container: {},
    // ********** Extend **********
    extend: {
      fontSize: {
        '10px': '.625rem',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '16px': '16px',
        '15px': '15px',
        '18px': '18px',
        '21px': '21px',
        '24px': '24px',
        '30px': '30px',
        '36px': '36px',
        base: '1rem',
        'text-lg': '1.125rem',
        'text-xl': '1.25rem',
        'text-2xl': '1.5rem'
      },
      textColor: {
        skin: {
          base: withOpacity('--text-color'),
          'primary-button': variable('--primary-button-text-color'),
          'primary-button-hover': variable('--primary-button-text-hover-color'),
          'secondary-button': variable('--secondary-button-text-color'),
          'secondary-button-hover': variable(
            '--secondary-button-text-hover-color'
          ),
          checkbox: variable('--checkbox-icon-color')
        }
      },
      backgroundColor: {
        skin: {
          background: variable('--background-color'),
          modal: variable('--modal-background-color'),
          alert: variable('--alert-background-color'),
          'primary-button': variable('--primary-button-background-color'),
          'primary-button-hover': variable(
            '--primary-button-background-hover-color'
          ),
          'secondary-button': variable('--secondary-button-background-color'),
          'secondary-button-hover': variable(
            '--secondary-button-background-hover-color'
          ),
          checkbox: variable('--checkbox-background-color'),
          'loading-bar': variable('--loading-bar-color'),
          'bar-light-half': variable('--bar-light-half-color'),
          'bar-dark-half': variable('--bar-dark-half-color'),
          'modal-loading': variable('--modal-loading-background-color')
        }
      },
      colors: {
        primary: variable('--primary-color'),
        'primary-hover': variable('--primary-hover-color'),
        error: '#ff5b60',
        overlay: 'rgba(0,0,0,0.7)',
        dark: '#212121',
        gray: {
          100: '#f9f9f9',
          200: '#f3f3f3', // Light BG
          300: '#e6e6e6', // Border
          400: '#D5D5D5', // Border Alt
          500: '#999999', // Light Text
          600: '#757575',
          700: '#5A5A5A', // Normal Text
          800: '#424242',
          900: '#212121' // Heavy Text
        }
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem'
      },
      scale: {
        80: '0.8',
        85: '0.85',
        300: '3',
        400: '4'
      },
      width: {
        'main-content': 'calc(100% - 360px)',
        sidebar: '360px',
        '35%': '35%',
        '45%': '45%'
      },
      maxWidth: {
        half: '50%',
        default: '1300px'
      },
      maxHeight: {
        '650px': '650px'
      },
      minHeight: {
        '480px': '480px'
      },
      height: {
        drawer: 'calc(100vh - 90px)'
      },
      gridColumnStart: {
        '40px': '40px'
      },
      spacing: {
        2: '0.5rem',
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        '3px': '3px',
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
        '-15px': '-15px',
        '18px': '18px',
        '20px': '20px',
        '-20px': '-20px',
        '25px': '25px',
        '30px': '30px',
        '35px': '35px',
        '45px': '45px',
        '40px': '40px',
        '50px': '50px',
        '55px': '55px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '95px': '95px',
        '100px': '100px',
        '105px': '105px',
        '110px': '110px',
        '120px': '120px',
        '140px': '140px',
        '160px': '160px',
        '320px': '320px',
        '360px': '360px',
        '400px': '400px',
        '480px': '480px',
        '500px': '500px',
        '650px': '650px',
        '690px': '690px',
        '1440px': '1440px'
      },
      inset: {
        8: '2rem',
        9: '2.25rem',
        14: '3.5rem',
        half: '50%',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
        '25px': '25px',
        '30px': '30px',
        '40px': '40px',
        '60px': '60px',
        '62px': '62px',
        '90px': '90px'
      },
      borderRadius: {
        default: '6px',
        '10px': '10px',
        '20px': '20px',
        '30px': '30px'
      },
      borderWidth: {
        '3px': '3px'
      },
      borderColor: (theme) => ({
        ...theme('colors'),
        default: theme('colors.gray.200', 'currentColor'),
        skin: {
          'primary-button': variable('--primary-button-border-color'),
          'primary-button-hover': variable(
            '--primary-button-border-hover-color'
          ),
          'secondary-button': variable('--secondary-button-border-color'),
          'secondary-button-hover': variable(
            '--secondary-button-border-hover-color'
          ),
          checkbox: variable('--checkbox-border-color')
        }
      }),
      transitionDuration: {
        250: '250ms',
        350: '350ms'
      },
      animation: {
        shake: 'shake 1s linear',
        'spin-slow-30': 'spin 30s linear infinite',
        'spin-slow-25': 'spin 25s linear infinite',
        'spin-slow-10': 'spin 10s linear infinite',
        'marquee-infinite': 'marquee 1s linear infinite',
        'marquee2-infinite': 'marquee2 1s linear infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-6px,0,0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(6px,0,0)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  // Variants
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    padding: ['responsive, odd, even']
  },
  plugins: [backfaceVisibility]
}
