<template>
  <v-app>
    <v-tabs
      v-model="activeTab"
      centered
    >
      <v-tab
        :key="0"
        ripple
      >
        Wybór szkoły
      </v-tab>
      <v-tab
        :key="1"
        ripple
        :disabled="!baseUrl"
      >
        Wybór oddziału
      </v-tab>
      <v-tab
        :key="2"
        ripple
        :disabled="!classSelection"
      >
        Plan lekcji
      </v-tab>
      <v-tab-item :key="0">
        <url-select
          v-model="baseUrl"
          @success="urlSelectSuccess"
        />
      </v-tab-item>
      <v-tab-item :key="1">
        <class-select
          v-model="classSelection"
          :url="baseUrl"
          @select="classSelect"
        />
      </v-tab-item>
      <v-tab-item :key="2">
        <timetable
          :class-value="classSelection"
          :url="baseUrl"
        />
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
  import Cookies from 'js-cookie';
  import UrlSelect from './components/UrlSelect.vue';
  import ClassSelect from './components/ClassSelect.vue';
  import Timetable from './components/Timetable.vue';

  export default {
    name: 'App',
    components: {
      UrlSelect,
      ClassSelect,
      Timetable,
    },
    data () {
      return {
        baseUrl: null,
        activeTab: 0,
        classSelection: null,
      };
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
    created () {
      const schoolUrl = Cookies.get('school-url', { expires: 365 });
      const classSelection = Cookies.get('class-selection');

      if (schoolUrl) {
        this.baseUrl = schoolUrl;

        if (classSelection) {
          this.classSelection = classSelection;
          this.activeTab = 2;
        } else {
          this.classSelection = null;
          this.activeTab = 1;
        }
      }
    },
    methods: {
      urlSelectSuccess (url) {
        this.activeTab = 1;
        Cookies.set('school-url', url, { expires: 365 });
        this.classSelection = null;
      },
      classSelect () {
        this.activeTab = 2;
      },
    },
  };
</script>
