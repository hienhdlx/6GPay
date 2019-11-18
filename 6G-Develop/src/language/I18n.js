import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
    'vi': require('../language/vi'),
    'en': require('../language/en'),
};
export default I18n;