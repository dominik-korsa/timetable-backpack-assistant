<template>
  <v-main
    :class="{
      'overflow-hidden': days.length === 0
    }"
  >
    <div
      v-if="days.length === 0"
      class="fill-height d-flex align-center justify-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        :size="96"
      />
    </div>
    <v-container v-else>
      <div
        id="grid"
        v-scroll:#grid="onGridScroll"
      >
        <v-sheet
          v-for="(hour, index) in hours"
          :key="`${index}-time`"
          outlined
          :elevation="timeElevation"
          class="time text-subheading stick-left"
          :style="{
            'grid-row': index + 1
          }"
        >
          <div class="time__part time__number">
            {{ hour.number }}
          </div>
          <v-divider
            vertical
            class="time__divider-1"
          />
          <div class="time__part time__from">
            {{ hour.timeFrom }}
          </div>
          <v-divider class="time__divider-2" />
          <div class="time__part time__to">
            {{ hour.timeTo }}
          </div>
        </v-sheet>
        <div
          v-for="(lesson, index) in lessonsArray"
          :key="`${index}-lesson`"
          class="lesson"
          :style="{
            'grid-row': lesson.hourIndex + 1,
            'grid-column': lesson.dayIndex + 2
          }"
        >
          <v-sheet
            v-for="(group, groupIndex) in lesson.groups"
            :key="`${index}-${groupIndex}-lesson-group`"
            class="group"
            outlined
            :class="{
              new: isNew(lesson.dayIndex, group.subject),
              last: isLast(lesson.dayIndex, group.subject),
            }"
          >
            <div class="text-body-1">
              {{ group.subject }}
            </div>
            <div>
              <span class="text-body-2">{{ group.room }}</span>
              <span class="text-body-2 font-weight-light"> {{ group.groupName }}</span>
            </div>
          </v-sheet>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
  import axios from 'axios';
  import { Table } from '@wulkanowy/timetable-parser';
  import { Scroll } from 'vuetify/lib/directives';
  import urlJoin from 'url-join';

  export default {
    directives: {
      Scroll,
    },
    props: {
      url: {
        type: String,
      },
      classValue: {
        type: String,
      },
    },
    data: () => ({
      hours: [],
      days: [],
      gridOffsetLeft: 0,
    }),
    computed: {
      lessonsArray () {
        const lessonsArray = [];

        this.days.forEach((day, dayIndex) => {
          day.forEach((groups, hourIndex) => {
            lessonsArray.push({
              dayIndex,
              hourIndex,
              groups,
            });
          });
        });

        return lessonsArray;
      },
      timeElevation () {
        if (this.gridOffsetLeft > 0) {
          return this.$vuetify.theme.dark ? 24 : 1;
        }
        return 0;
      },
    },
    watch: {
      url () {
        this.update();
      },
      classValue () {
        this.update();
      },
    },
    created () {
      this.update();
    },
    methods: {
      async update () {
        this.hours = [];
        this.days = [];

        if (!this.url || !this.classValue) {
          return;
        }

        try {
          const fullUrl = `https://cors-anywhere.herokuapp.com/${urlJoin(this.url, `plany/o${this.classValue}.html`)}`;

          const response = await axios.get(fullUrl);
          const table = new Table(response.data);
          this.days = table.getDays();
          this.hours = Object.values(table.getHours());
        } catch (error) {
          console.warn(error);
        }
      },
      isNew (day, subject) {
        let isNew = true;
        this.days[(day + 4) % 5].forEach((lesson) => {
          if (lesson.findIndex((group) => group.subject === subject) !== -1) {
            isNew = false;
          }
        });
        return isNew;
      },
      isLast (day, subject) {
        let isLast = true;
        this.days[(day + 1) % 5].forEach((lesson) => {
          if (lesson.findIndex((group) => group.subject === subject) !== -1) {
            isLast = false;
          }
        });
        return isLast;
      },
      onGridScroll (event) {
        this.gridOffsetLeft = event.target.scrollLeft;
      },
    },
  };
</script>

<style lang="scss">
  #grid {
    display: grid;
    overflow: auto;
    grid-template-columns: auto;
    grid-auto-columns: minmax(auto, 1fr);
    grid-auto-rows: auto;
  }

  .stick-left {
    position: sticky;
    left: 4px;
  }

  .time {
    margin: 4px;
    border-radius: 4px;
    display: grid;
    align-items: center;
    box-sizing: border-box;
    grid-column: 1;
    grid-template-columns: 1fr auto 2fr;
    grid-template-rows: 1fr auto 1fr;
    transition: box-shadow 300ms;

    &__part {
      padding: 0 6px;
      text-align: center;
    }

    &__number {
      grid-column: 1;
      grid-row: 1/4;
    }

    &__divider-1 {
      grid-column: 2;
      grid-row: 1/4;
    }

    &__divider-2 {
      grid-column: 3;
      grid-row: 2;
    }

    &__from {
      grid-column: 3;
      grid-row: 1;
    }

    &__to {
      grid-column: 3;
      grid-row: 3;
    }
  }

  .lesson {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px;
    min-height: 48px;
    border-radius: 4px;
    padding: 4px 8px;
    box-sizing: border-box;

    &.new {
      border-left: 2px solid #8bc34a;
    }

    &.last {
      border-right: 2px solid #f44336;
    }
  }

  .spacer {
    flex-grow: 1;
  }
</style>
