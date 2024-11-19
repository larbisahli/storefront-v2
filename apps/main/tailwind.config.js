module.exports = {
  presets: [require('@dropgala/ui/tailwind')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.tsx',
    './containers/**/*.tsx',
    // Add the external packages that are using Tailwind CSS
    '../../packages/dropgala-ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/dropgala-assets/src/**/*.{js,ts,jsx,tsx}',
  ]
}
