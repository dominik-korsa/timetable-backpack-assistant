<template>
  <v-app>
    <v-tabs v-model="activeTab" centered>
      <v-tab ripple :key="0">Wybór szkoły</v-tab>
      <v-tab ripple :key="1" :disabled="!baseUrl">Wybór oddziału</v-tab>
      <v-tab ripple :key="2" :disabled="!classSelection">Plan lekcji</v-tab>
      <v-tab-item :key="0">
        <v-content>
          <UrlSelect @success="urlSelectSuccess" v-model="baseUrl"/>
        </v-content>
      </v-tab-item>
      <v-tab-item :key="1">
        <v-content>
          <ClassSelect :url="baseUrl" v-model="classSelection" @select="classSelect"></ClassSelect>
        </v-content>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-content>
          <Timetable :classValue="classSelection" :url="baseUrl"></Timetable>
        </v-content>
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
  data() {
    return {
      baseUrl: null,
      activeTab: 0,
      classSelection: null,
    };
  },
  created() {
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
  watch: {
    classSelection(value) {
      if (value) {
        Cookies.set('class-selection', value, { expires: 365 });
      } else {
        Cookies.remove('class-selection');
      }
    },
  },
  methods: {
    urlSelectSuccess(url) {
      this.activeTab = 1;
      Cookies.set('school-url', url, { expires: 365 });
      this.classSelection = null;
    },
    classSelect() {
      this.activeTab = 2;
    },
  },
};
</script>
