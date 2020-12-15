<template>
  <v-app>
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
          to="/"
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
          v-if="classItems === null"
          class="body-1 px-4 py-2 text-center text--secondary"
        >
          Nie wybrałeś szkoły
        </div>
        <v-list-item
          v-for="item in classItems"
          :key="item.value"
          color="primary"
          :to="item.to"
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
    <school-picker-view
      v-if="classSelection == null || schoolLoading"
      :loading="schoolLoading"
    />
    <timetable-view v-else />
  </v-app>
</template>

<script>
  import ky from 'ky';
  import { Timetable, TimetableList } from '@wulkanowy/timetable-parser';
  import SchoolPickerView from '@/views/school-picker.vue';
  import TimetableView from '@/views/timetable.vue';

  export default {
    name: 'App',
    components: {
      SchoolPickerView,
      TimetableView,
    },
    data () {
      return {
        schoolLoading: false,
        navigationDrawerVisible: this.$vuetify.breakpoint.mdAndUp,
      };
    },
    computed: {
      timetableTitle () {
        if (this.classSelection === null || this.$store.state.classes === null) return 'Plan lekcji';
        return this.$store.state.classes.find((item) => item.value === this.classSelection).name;
      },
      classSelection () {
        return this.$route.params.class || null;
      },
      classItems () {
        if (this.$store.state.classes === null) return null;
        return this.$store.state.classes.map((item) => ({
          value: item.value,
          name: item.name,
          to: `/optivum/${encodeURIComponent(this.$route.params.url)}/class/${item.value}`,
        }));
      },
      redirect () {
        if (
          this.$route.params.url && !this.$route.params.class && this.$store.state.classes !== null
        ) return `/optivum/${encodeURIComponent(this.$route.params.url)}/class/${this.$store.state.classes[0].value}`;
        return null;
      },
    },
    watch: {
      '$store.state.storage.dark': {
        handler (value) {
          this.$vuetify.theme.dark = value;
        },
        immediate: true,
      },
      '$route.params.url': {
        async handler (value) {
          if (value) {
            await this.loadURL(value);
          } else {
            this.$store.commit('setClasses', null);
          }
        },
        immediate: true,
      },
      redirect: {
        async handler (value) {
          if (value === null) return;
          await this.$router.replace(value);
        },
      },
    },
    methods: {
      async loadURL (url) {
        this.schoolLoading = true;
        try {
          this.$store.commit('setClasses', null);
          const timetableResponse = await ky.get(`https://cors-anywhere.herokuapp.com/${url}`);
          const timetable = new Timetable(await timetableResponse.text());

          const fullUrl = `https://cors-anywhere.herokuapp.com/${new URL(timetable.getListPath(), url).toString()}`;
          const response = await ky.get(fullUrl);
          const tableList = new TimetableList(await response.text());
          const { classes } = tableList.getList();
          this.$store.commit('setClasses', classes);

          this.schoolLoading = false;

          await this.$store.dispatch('addHistoryEntry', { url, name: timetable.getTitle() });
        } catch (error) {
          await this.$router.push('/');
          this.schoolLoading = false;
          throw error;
        }
      },
      toggleTheme () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$store.commit('setDark', this.$vuetify.theme.dark);
      },
    },
  };
</script>

<style>
  html {
    overflow-y: auto;
  }

  .vertical-spacer--small {
    height: 64px;
  }
</style>
