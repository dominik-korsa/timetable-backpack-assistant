<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          class="grow"
          cols="12"
          sm="4"
          offset-sm="4"
        >
          <v-list class="elevation-2">
            <v-list-item
              v-for="item in classes"
              :key="item.value"
              ripple
              @click="select(item.value)"
            >
              <v-list-item-action>
                <v-icon
                  v-if="selection === item.value"
                  color="primary"
                >
                  $radioOn
                </v-icon>
                <v-icon v-else>
                  $radioOff
                </v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
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
    data () {
      return {
        selection: null,
        classes: [],
      };
    },
    watch: {
      value (value) {
        this.selection = value;
      },
      selection (value) {
        this.$emit('input', value);
      },
      url () {
        this.update();
      },
    },
    created () {
      this.update();
    },
    methods: {
      select (value) {
        this.selection = value;
        this.$emit('select', value);
      },
      async update () {
        if (!this.url) {
          this.classes = [];
          return;
        }

        try {
          const fullUrl = `https://cors-anywhere.herokuapp.com/${new URL('lista.html', this.url)}`;
          const response = await axios.get(fullUrl);
          const tableList = new TimetableList(response.data);
          this.classes = tableList.getList().classes;
        } catch (error) {
          console.warn(error);
        }
      },
    },
  };
</script>
