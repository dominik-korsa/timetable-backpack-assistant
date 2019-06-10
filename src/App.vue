<template>
  <v-app>
    <v-tabs v-model="activeTab" centered>
      <v-tab ripple :key="0">Wybór szkoły</v-tab>
      <v-tab ripple :key="1" :disabled="!baseUrl">Wybór oddziału</v-tab>
      <v-tab ripple :key="2" :disabled="!classSelection">Plan lekcji</v-tab>
      <v-tab-item :key="0">
        <v-content>
          <UrlSelect @success="urlSelectSuccess"/>
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
  methods: {
    urlSelectSuccess(url) {
      this.baseUrl = url;
      this.activeTab = 1;
    },
    classSelect() {
      this.activeTab = 2;
    },
  },
};
</script>
