import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pl from 'vuetify/es5/locale/pl';
import Cookies from 'js-cookie';

Vue.use(Vuetify);

const lastTheme = Cookies.get('theme');

const vuetify = new Vuetify({
  lang: {
    locales: [pl],
    current: 'pl',
  },
  theme: {
    dark: lastTheme === 'dark',
    themes: {
      options: {
        customProperties: true,
      },
      light: {
        appbar: '#fff',
      },
      dark: {
        appbar: '#121212',
      },
    },
  },
});

export default vuetify;
