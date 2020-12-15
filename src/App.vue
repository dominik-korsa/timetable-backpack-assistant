<template>
  <v-app>
    <v-main
      v-if="initialLoading"
      class="overflow-hidden fill-height"
    >
      <div
        class="fill-height d-flex align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          :size="96"
        />
      </div>
    </v-main>
    <template v-else>
      <v-navigation-drawer
        v-model="navigationDrawerVisible"
        app
        :permanent="false"
      >
        <v-list
          shaped
        >
          <v-list-item
            color="primary"
            :input-value="classSelection === null"
            @click="classSelection = null"
          >
            <v-list-item-icon>
              <v-icon>
                mdi-school
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                Wybierz szkołę
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>
            Oddział
          </v-subheader>
          <div
            v-if="classes === null"
            class="body-1 px-4 py-2 text-center text--secondary"
          >
            Nie wybrałeś szkoły
          </div>
          <v-list-item
            v-for="item in classes"
            :key="item.value"
            color="primary"
            :input-value="classSelection === item.value"
            @click="classSelection = item.value"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="vertical-spacer--small" />
      </v-navigation-drawer>
      <v-app-bar
        color="appbar"
        app
        elevate-on-scroll
      >
        <v-app-bar-nav-icon @click="navigationDrawerVisible = !navigationDrawerVisible" />
        <v-toolbar-title
          v-if="classSelection === null"
        >
          Wybierz szkołę
        </v-toolbar-title>
        <v-toolbar-title
          v-else
          v-text="timetableTitle"
        />
        <v-spacer />
        <v-btn
          icon
          @click="toggleTheme"
        >
          <v-icon>
            mdi-theme-light-dark
          </v-icon>
        </v-btn>
      </v-app-bar>
      <url-select
        v-if="classSelection == null"
        :value="baseUrl"
        :loading="classesLoading"
        @select="urlSelect"
      />
      <timetable
        v-else
        :class-value="classSelection"
        :url="baseUrl"
      />
    </template>
  </v-app>
</template>

<script>
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import { TimetableList } from '@wulkanowy/timetable-parser';
  import UrlSelect from './components/UrlSelect.vue';
  import Timetable from './components/Timetable.vue';

  export default {
    name: 'App',
    components: {
      UrlSelect,
      Timetable,
    },
    data () {
      return {
        navigationDrawerVisible: this.$vuetify.breakpoint.mdAndUp,
        baseUrl: null,
        classSelection: null,
        classes: null,
        classesLoading: false,
        initialLoading: false,
      };
    },
    computed: {
      timetableTitle () {
        if (this.classSelection === null || this.classes === null) return null;
        return this.classes.find((item) => item.value === this.classSelection).name;
      },
    },
    watch: {
      classSelection (value) {
        if (value) {
          Cookies.set('class-selection', value, { expires: 365 });
        } else {
          Cookies.remove('class-selection');
        }
      },
    },
    async created () {
      const schoolUrl = Cookies.get('school-url');
      const classSelection = Cookies.get('class-selection');

      this.initialLoading = true;

      if (schoolUrl) {
        try {
          await this.loadURL(schoolUrl);
          if (classSelection !== undefined) {
            this.classSelection = classSelection;
          } else {
            this.classSelection = null;
          }
        } catch (error) {
          console.warn(error);
        }
      }

      this.initialLoading = false;
    },
    methods: {
      async loadURL (url) {
        this.classesLoading = true;
        try {
          const fullUrl = `https://cors-anywhere.herokuapp.com/${new URL('lista.html', url).toString()}`;
          const response = await axios.get(fullUrl);
          const tableList = new TimetableList(response.data);
          this.classes = tableList.getList().classes;
          this.baseUrl = url;
          this.classesLoading = false;
        } catch (error) {
          this.classesLoading = false;
          throw error;
        }
      },
      async urlSelect (url) {
        try {
          await this.loadURL(url);
          this.classSelection = null;
          Cookies.set('school-url', url, { expires: 365 });
          this.navigationDrawerVisible = true;
        } catch (error) {
          console.warn(error);
        }
      },
      toggleTheme () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        Cookies.set('theme', this.$vuetify.theme.dark ? 'dark' : 'light', { expires: 365 });
      },
    },
  };
</script>

<style>
  .vertical-spacer--small {
    height: 64px;
  }
</style>
