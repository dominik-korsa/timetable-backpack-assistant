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
        v-if="selection === null"
      >
        Wybierz szkołę
      </v-toolbar-title>
      <v-toolbar-title
        v-else
        v-text="timetableTitle"
      />
      <v-spacer />
      <v-dialog
        v-if="$vuetify.breakpoint.smAndDown"
        max-width="600"
      >
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <options-card />
      </v-dialog>
      <v-menu
        v-else
        min-width="350"
        offset-y
        nudge-bottom="12"
        :close-on-content-click="false"
      >
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <options-card />
      </v-menu>
    </v-app-bar>
    <school-picker-view
      v-if="selection === null || selection.class == null || schoolLoading"
      :loading="schoolLoading"
    />
    <timetable-view
      v-else
      :selection="selection"
    />
  </v-app>
</template>

<script>
  import ky from 'ky';
  import { Timetable, TimetableList } from '@wulkanowy/timetable-parser';
  import SchoolPickerView from '@/views/school-picker.vue';
  import TimetableView from '@/views/timetable.vue';
  import OptionsCard from '@/components/options-card.vue';

  export default {
    name: 'App',
    components: {
      SchoolPickerView,
      TimetableView,
      OptionsCard,
    },
    data () {
      return {
        schoolLoading: false,
        navigationDrawerVisible: this.$vuetify.breakpoint.mdAndUp,
      };
    },
    computed: {
      timetableTitle () {
        if (this.selection.class === null || this.$store.state.classes === null) return 'Plan lekcji';
        const classItem = this.$store.state.classes.find((item) => item.value === this.selection.class);
        if (classItem === undefined) return 'Nie znaleziono klasy';
        return classItem.name;
      },
      classItems () {
        if (this.$store.state.classes === null) return null;
        if (!this.selection) return null;
        if (this.selection.type === 'optivum') {
          return this.$store.state.classes.map((item) => ({
            value: item.value,
            name: item.name,
            to: `/optivum/${encodeURIComponent(this.selection.url)}/class/${item.value}`,
          }));
        } if (this.selection.type === 'v-lo') {
          return this.$store.state.classes.map((item) => ({
            value: item.value,
            name: item.name,
            to: `/v-lo/class/${item.value}`,
          }));
        }
        return null;
      },
      redirect () {
        if (this.selection !== null && this.selection.class === null && this.$store.state.classes !== null) {
          if (this.selection.type === 'optivum') return `/optivum/${encodeURIComponent(this.$route.params.url)}/class/${this.$store.state.classes[0].value}`;
          if (this.selection.type === 'v-lo') return `/v-lo/class/${this.$store.state.classes[0].value}`;
        }
        return null;
      },
      selection () {
        if (this.$route.matched.some((match) => match.meta.type === 'optivum')) {
          return {
            type: 'optivum',
            url: this.$route.params.url,
            class: this.$route.params.class || null,
          };
        }
        if (this.$route.matched.some((match) => match.meta.type === 'v-lo')) {
          return {
            type: 'v-lo',
            class: this.$route.params.class || null,
          };
        }
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
      selection: {
        async handler (value, oldValue) {
          try {
            if (value) {
              if (oldValue && (value.type === oldValue.type && value.url === oldValue.url)) return;
              if (value.type === 'optivum') await this.loadOptivum(value.url);
              else if (value.type === 'v-lo') await this.loadVLo();
            } else {
              this.$store.commit('setClasses', null);
            }
          } catch (error) {
            console.error(error);
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
      async loadOptivum (url) {
        this.schoolLoading = true;
        try {
          this.$store.commit('setClasses', null);
          const timetableResponse = await ky.get(new URL(`/${url}`, process.env.VUE_APP_PROXY_URL));
          const timetable = new Timetable(await timetableResponse.text());

          const response = await ky.get(new URL(`/${new URL(timetable.getListPath(), url).toString()}`, process.env.VUE_APP_PROXY_URL));
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
      async loadVLo () {
        this.schoolLoading = true;
        try {
          this.$store.commit('setClasses', null);

          const response = await ky.get('https://api.cld.sh/vlo/listclass');
          const data = await response.json();
          this.$store.commit('setClasses', data.map((value) => ({
            name: value,
            value,
          })));

          this.schoolLoading = false;
        } catch (error) {
          this.schoolLoading = false;
          throw error;
        }
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
