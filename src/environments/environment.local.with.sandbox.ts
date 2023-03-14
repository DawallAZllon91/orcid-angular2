// TODO: Currently CORS-Anywhere does not support calls with credentials
// to make the local environment work with Sandbox an alternative needs to be use to avoid CORS errors
export const environment = {
  production: false,
  sessionDebugger: true,
  API_NEWS: 'https://www.mocky.io/v2/5dced45b3000007300931ce8',
  API_PUB: '//pub.localhost/v3.0',
  API_WEB: 'https://orcid.herokuapp.com/https://sandbox.orcid.org/',
  BASE_URL: 'https://orcid.org/',
  BLOG_NEWS: 'https://orcid.org/about/news',
  INFO_SITE: 'http://orcidaboutdev.wpengine.com/',
  GOOGLE_ANALYTICS_TESTING_MODE: true,
  GOOGLE_TAG_MANAGER: 'GTM-0000000',
  GOOGLE_RECAPTCHA: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  ZENDESK: null,
  HELP_HERO_ID: 'oYFQMrzFHA',
  SHOW_TEST_WARNING_BANNER: true,
  CAN_DISABLE_TEST_WARNING_BANNER: true,
  INSTITUTIONAL_AUTOCOMPLETE_DISPLAY_AMOUNT: 20,
  VERBOSE_SNACKBAR_ERRORS_REPORTS: true,
  LANGUAGE_MENU_OPTIONS: {
    ar: 'العربية',
    cs: 'Čeština',
    en: 'English',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    xx: '** xx',
    src: '** source',
    lr: '** lr',
    rl: '** rl',
    uk: '** Ukrainian',
    ca: '** Catalan',
  },
  proxyMode: false,

}
