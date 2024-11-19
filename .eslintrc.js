module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-dropgala`
  extends: ['dropgala'],
  settings: {
    next: {
      rootDir: ['app']
    }
  }
}
