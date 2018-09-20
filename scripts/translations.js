const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'output/i18n/messages/src/',
  translationsDirectory: 'src/i18n/',
  whitelistsDirectory: 'src/i18n/whitelists/',
  languages: ['es', 'en'] // any language you need
});
