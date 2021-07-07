module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {},
  reportNeedlessDisables: [
    false,
    {
      except: ['no-console'],
      severity: 'off',
    },
  ],
}
