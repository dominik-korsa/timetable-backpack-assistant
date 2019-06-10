<template>
  <div>
    <v-progress-linear
      :indeterminate="true"
      class="loading"
      height="4"
      :active="days.length === 0">
    </v-progress-linear>
    <v-container>
      <div class="grid">
        <div
          class="time hour-to elevation-1 subheading"
          :style="{
            'grid-row': index + 1
          }"
          v-for="(hour, index) in hours"
          :key="`${index}-hour-to`">
          <div>{{ hour.timeTo }}</div>
        </div>
        <div
          class="time hour-from elevation-1 subheading"
          :style="{
            'grid-row': index + 1
          }"
          v-for="(hour, index) in hours"
          :key="`${index}-hour-from`">
          <div>{{ hour.timeFrom }}</div>
        </div>
        <div
          class="time hour-number elevation-1 subheading stick-left"
          :style="{
            'grid-row': index + 1
          }"
          v-for="(hour, index) in hours"
          :key="`${index}-hour-number`">
          <div>{{ hour.number }}</div>
        </div>
        <div
          class="lesson"
          :style="{
            'grid-row': lesson.hourIndex + 1,
            'grid-column': lesson.dayIndex + 4
          }"
          v-for="(lesson, index) in lessonsArray"
          :key="`${index}-lesson`">
          <div
            class="group elevation-1"
            :class="{
              new: isNew(lesson.dayIndex, group.subject),
              last: isLast(lesson.dayIndex, group.subject),
            }"
            v-for="(group, groupIndex) in lesson.groups"
            :key="`${index}-${groupIndex}-lesson-group`">
            <div class="body-2">
              {{ group.subject }}
            </div>
            <div>
              <span class="body-1">{{ group.room }}</span>
              <span class="body-1 font-weight-light"> {{ group.groupName }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
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
  computed: {
    lessonsArray() {
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
  created() {
    this.update();
  },
  data: () => ({
    hours: [],
    days: [],
  }),
  watch: {
    url() {
      this.update();
    },
    classValue() {
      this.update();
    },
  },
  methods: {
    update() {
      if (!this.url || !this.classValue) {
        this.hours = [];
        this.days = [];
        return;
      }
      let fullUrl;
      try {
        fullUrl = `https://cors-anywhere.herokuapp.com/${new URL(`plany/o${this.classValue}.html`, this.url)}`;
      } catch (error) {
        console.warn(error);
        return;
      }

      this.hours = [];
      this.days = [];

      axios.get(fullUrl)
        .then((resonse) => {
          const table = new Table(resonse.data);
          this.days = table.getDays();
          this.hours = Object.values(table.getHours());
        })
        .catch((error) => {
          console.warn(error);
        });
    },
    isNew(day, subject) {
      let isNew = true;
      this.days[(day + 4) % 5].forEach((lesson) => {
        if (lesson.findIndex(group => group.subject === subject) !== -1) {
          isNew = false;
        }
      });
      return isNew;
    },
    isLast(day, subject) {
      let isLast = true;
      this.days[(day + 1) % 5].forEach((lesson) => {
        if (lesson.findIndex(group => group.subject === subject) !== -1) {
          isLast = false;
        }
      });
      return isLast;
    },
  },
};
</script>

<style lang="scss">
  .loading {
    margin-top: 0;
  }

  .grid {
    display: grid;
    overflow: auto;
    grid-template-columns: auto auto auto;
    grid-auto-columns: minmax(auto, 1fr);
    grid-auto-rows: auto;
  }

  .stick-left {
    position: sticky;
    left: 8px;
  }

  .time {
    margin: 4px 8px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

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
  }

  .group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px 8px;
    min-height: 48px;
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #fff;

    &.new {
      border-left: 2px solid lawngreen;
    }

    &.last {
      border-right: 2px solid red;
    }
  }

  .spacer {
    flex-grow: 1;
  }
</style>
