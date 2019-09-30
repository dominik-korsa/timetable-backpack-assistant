<template>
  <v-container>
    <v-layout row>
      <v-flex grow xs12 sm4 offset-sm4>
        <v-list class="elevation-2">
          <v-list-tile
            v-for="item in classes"
            :key="item.value"
            @click="select(item.value)"
            ripple
          >
            <v-list-tile-action>
              <v-icon
                color="primary"
                v-if="selection === item.value">
                {{$vuetify.icons.radioOn}}
              </v-icon>
              <v-icon v-else>
                {{$vuetify.icons.radioOff}}
              </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { TimetableList } from '@wulkanowy/timetable-parser';

export default {
  props: {
    url: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      selection: null,
      classes: [],
    };
  },
  created() {
    this.update();
  },
  methods: {
    select(value) {
      this.selection = value;
      this.$emit('select', value);
    },
    update() {
      if (!this.url) {
        this.classes = [];
        return;
      }
      let fullUrl;
      try {
        fullUrl = `https://cors-anywhere.herokuapp.com/${new URL('lista.html', this.url)}`;
      } catch (error) {
        console.warn(error);
        return;
      }

      axios.get(fullUrl)
        .then((resonse) => {
          const tableList = new TimetableList(resonse.data);
          this.classes = tableList.getList().classes;
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
  watch: {
    value: {
      handler(value) {
        this.selection = value;
      },
      immediate: true,
    },
    selection(value) {
      this.$emit('input', value);
    },
    url() {
      this.update();
    },
  },
};
</script>
