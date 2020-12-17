<template>
  <v-main
    :class="{
      'overflow-hidden': days === null
    }"
  >
    <div
      v-if="days === null"
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
        <v-sheet
          v-for="(lesson, index) in lessonsArray"
          :key="`${index}-lesson`"
          class="lesson d-flex flex-column"
          outlined
          :style="{
            'grid-row': lesson.hourIndex + 1,
            'grid-column': lesson.dayIndex + 2
          }"
        >
          <div
            v-for="(group, groupIndex) in lesson.groups"
            :key="`${index}-${groupIndex}-lesson-group`"
            class="d-flex flex-column grow text-center"
          >
            <v-divider v-if="groupIndex > 0" />
            <group-info
              :hour="hours[lesson.hourIndex]"
              :group="group"
              :day-index="lesson.dayIndex"
            >
              <template #activator="{ on }">
                <v-card
                  class="group"
                  :class="{
                    'first-item': groupIndex === 0,
                    'last-item': groupIndex === lesson.groups.length - 1,
                    new: group.new,
                    last: group.last,
                  }"
                  flat
                  v-on="on"
                >
                  <v-sheet
                    v-if="group.color && storage.subjectColors"
                    outlined
                    rounded
                    class="overflow-hidden"
                  >
                    <div
                      class="px-1 text-body-1 group__colored-subject"
                      :style="`--bg-color: ${group.color.bg}; --text-color: ${group.color.text}`"
                    >
                      {{ group.subject }}
                    </div>
                  </v-sheet>
                  <div
                    v-else
                    class="text-body-1"
                  >
                    {{ group.subject }}
                  </div>
                  <div>
                    <span
                      v-if="storage.showRoom && storage.showRoom"
                      class="text-body-2 mx-1"
                    >{{ group.room }}</span>
                    <span
                      v-if="storage.showGroupName && group.groupName"
                      class="text-body-2 font-weight-light mx-1"
                    >{{ group.groupName }}</span>
                    <br v-if="storage.showRoom && storage.showGroupName && storage.showTeacher && group.teacher">
                    <span
                      v-if="storage.showTeacher && group.teacher"
                      class="text-body-2 font-weight-light mx-1"
                    >{{ group.teacher }}</span>
                  </div>
                </v-card>
              </template>
            </group-info>
          </div>
        </v-sheet>
      </div>
    </v-container>
  </v-main>
</template>

<script>
  import ky from 'ky';
  import { Table } from '@wulkanowy/timetable-parser';
  import { Scroll } from 'vuetify/lib/directives';
  import _ from 'lodash';
  import { mapState } from 'vuex';
  import GroupInfo from '@/components/group-info.vue';

  const vLoHours = [
    { number: 0, timeFrom: '7:10', timeTo: '7:55' },
    { number: 1, timeFrom: '8:00', timeTo: '8:45' },
    { number: 2, timeFrom: '9:00', timeTo: '9:45' },
    { number: 3, timeFrom: '10:00', timeTo: '10:45' },
    { number: 4, timeFrom: '11:00', timeTo: '11:45' },
    { number: 5, timeFrom: '12:00', timeTo: '12:45' },
    { number: 6, timeFrom: '13:00', timeTo: '13:45' },
    { number: 7, timeFrom: '14:00', timeTo: '14:45' },
    { number: 8, timeFrom: '14:50', timeTo: '15:35' },
    { number: 9, timeFrom: '15:40', timeTo: '16:25' },
    { number: 10, timeFrom: '16:30', timeTo: '17:15' },
  ];

  export default {
    components: { GroupInfo },
    directives: {
      Scroll,
    },
    props: {
      selection: {
        type: Object,
      },
    },
    data: () => ({
      hours: null,
      days: null,
      gridOffsetLeft: 0,
    }),
    computed: {
      ...mapState({
        storage: 'storage',
      }),
      lessonsArray () {
        if (this.days === null) return null;

        const lessonsArray = [];

        this.days.forEach((day, dayIndex) => {
          day.forEach((groups, hourIndex) => {
            if (groups.length > 0) {
              lessonsArray.push({
                dayIndex,
                hourIndex,
                groups: groups.map((group) => {
                  const nextDayDistance = this.nextDayDistance(dayIndex, group.subject, group.groupName);
                  const prevDayDistance = this.prevDayDistance(dayIndex, group.subject, group.groupName);
                  return ({
                    nextDayDistance,
                    prevDayDistance,
                    new: prevDayDistance !== 1,
                    last: nextDayDistance !== 1,
                    ...group,
                  });
                }),
              });
            }
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
      selection: {
        immediate: true,
        handler (value) {
          if (value.type === 'optivum') this.updateOptivum(value);
          else if (value.type === 'v-lo') this.updateVLo(value);
        },
      },
    },
    methods: {
      async updateOptivum (selection) {
        this.hours = null;
        this.days = null;

        try {
          const classUrl = new URL(`plany/o${selection.class}.html`, selection.url).toString();
          const fullUrl = `https://cors-anywhere.herokuapp.com/${classUrl}`;
          const response = await ky.get(fullUrl);
          const body = await response.text();
          const table = new Table(body);
          this.days = table.getDays();
          this.hours = Object.values(table.getHours());
        } catch (error) {
          console.warn(error);
        }
      },
      async updateVLo (selection) {
        this.hours = null;
        this.days = null;

        try {
          const fullUrl = `https://sabat.dev/api/tta?c=${selection.class}`;
          const response = await ky.get(fullUrl);
          const data = await response.json();

          // TODO: Integrate API when ready
          // https://github.com/Cloud11665/sabat.dev/issues/5
          this.hours = vLoHours;
          this.days = data.resp.map(this.mapVLoDay);
        } catch (error) {
          console.warn(error);
        }
      },
      mapVLoDay (respDay) {
        const lessons = _.times(vLoHours.length, () => []);
        respDay.flat().forEach((respLesson) => {
          for (let i = 0; i < respLesson.duration; i += 1) {
            lessons[respLesson.time_index + i].push({
              room: respLesson.classroom,
              subject: respLesson.subject,
              teacher: respLesson.teacher,
              groupName: respLesson.group || undefined,
              color: {
                bg: respLesson.color,
                text: this.textColor(respLesson.color),
              },
            });
          }
        });
        return lessons;
      },
      nextDayDistance (day, subject, groupName) {
        for (let i = 1; i < this.days.length; i += 1) {
          let found = false;
          this.days[(day + i) % this.days.length].forEach((lesson) => {
            if (lesson.findIndex(
              (group) => group.subject === subject && (!group.groupName || !groupName || group.groupName === groupName),
            ) !== -1) found = true;
          });
          if (found) return i;
        }
        return 0;
      },
      prevDayDistance (day, subject, groupName) {
        for (let i = 1; i < this.days.length; i += 1) {
          let found = false;
          this.days[(day - i + this.days.length) % this.days.length].forEach((lesson) => {
            if (lesson.findIndex(
              (group) => group.subject === subject && (!group.groupName || !groupName || group.groupName === groupName),
            ) !== -1) found = true;
          });
          if (found) return i;
        }
        return 0;
      },
      onGridScroll (event) {
        this.gridOffsetLeft = event.target.scrollLeft;
      },
      textColor (bgColor) {
        const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        const r = parseInt(color.substring(0, 2), 16); // hexToR
        const g = parseInt(color.substring(2, 4), 16); // hexToG
        const b = parseInt(color.substring(4, 6), 16); // hexToB
        const uiColors = [r / 255, g / 255, b / 255];
        const c = uiColors.map((col) => {
          if (col <= 0.03928) return col / 12.92;
          return ((col + 0.055) / 1.055) ** 2.4;
        });
        const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? '#000' : '#fff';
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
    z-index: 1;

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
    box-sizing: border-box;
    margin: 4px;
    border-radius: 4px;
  }

  .group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 32px;
    padding: 4px 8px;
    box-sizing: border-box;
    border-radius: 0 !important;

    .group__colored-subject {
      background-color: var(--bg-color);
      color:  var(--text-color);
    }

    &.new {
      border-left: 2px solid #8bc34a;
    }

    &.last {
      border-right: 2px solid #f44336;
    }

    &.first-item {
      border-top-left-radius: 3px !important;
      border-top-right-radius: 3px !important;
    }

    &.last-item {
      border-bottom-left-radius: 3px !important;
      border-bottom-right-radius: 3px !important;
    }
  }

  .spacer {
    flex-grow: 1;
  }
</style>
