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
      <div class="grid">
        <v-sheet
          v-for="(hour, index) in hours"
          :key="`${index}-hour-to`"
          outlined
          class="time hour-to text-subheading"
          :style="{
            'grid-row': index + 1
          }"
        >
          <div>{{ hour.timeTo }}</div>
        </v-sheet>
        <v-sheet
          v-for="(hour, index) in hours"
          :key="`${index}-hour-from`"
          outlined
          class="time hour-from text-subheading"
          :style="{
            'grid-row': index + 1
          }"
        >
          <div>{{ hour.timeFrom }}</div>
        </v-sheet>
        <v-sheet
          v-for="(hour, index) in hours"
          :key="`${index}-hour-number`"
          outlined
          class="time hour-number text-subheading stick-left"
          :style="{
            'grid-row': index + 1
          }"
        >
          <div>{{ hour.number }}</div>
        </v-sheet>
        <div
          v-for="(lesson, index) in lessonsArray"
          :key="`${index}-lesson`"
          class="lesson"
          :style="{
            'grid-row': lesson.hourIndex + 1,
            'grid-column': lesson.dayIndex + 4
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

  export default {
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
          const fullUrl = `https://cors-anywhere.herokuapp.com/${new URL(`plany/o${this.classValue}.html`, this.url)}`;

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
    },
  };
</script>

<style lang="scss">
  .grid {
    display: grid;
    overflow: auto;
    grid-template-columns: auto auto auto;
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    box-sizing: border-box;

    div {
      text-align: center;
    }
  }

  .hour-number {
    grid-column: 1;
  }

  .hour-from {
    grid-column: 2;
  }

  .hour-to {
    grid-column: 3;
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
