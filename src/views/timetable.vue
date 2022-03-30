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
    <v-container
      v-else
      class="timetable-container"
    >
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
          v-for="(lesson, index) in lessonsArrayWithExpanded"
          :key="`${index}-lesson`"
          class="lesson d-flex flex-column"
          outlined
          :style="{
            'grid-row': lesson.hourIndex + 1,
            'grid-column': lesson.dayIndex + 2
          }"
        >
          <template v-for="(item, itemIndex) in lesson.items">
            <div
              v-if="item.groups.length > 1"
              :key="`${index}-${itemIndex}-lesson-group`"
              class="d-flex flex-column grow no-basis"
            >
              <v-divider v-if="itemIndex > 0" />
              <v-card
                flat
                class="combined-group overflow-hidden grow d-flex flex-column"
                :class="{
                  'first-item': itemIndex === 0,
                  'last-item': itemIndex === lesson.items.length - 1 && !item.expanded,
                  'new': item.newCount > 0,
                  'new--partial': item.newCount < item.groups.length,
                  'last': item.lastCount > 0,
                  'last--partial': item.lastCount < item.groups.length,
                }"
                @click="toggleExpanded(item.tempId)"
              >
                <div
                  v-if="storage.subjectColors && item.colors.length > 0"
                  class="d-flex pl-1 mt-1"
                >
                  <v-sheet
                    v-for="(color, i) in item.colors"
                    :key="i"
                    rounded
                    class="grow mr-1 overflow-hidden"
                    outlined
                    height="6"
                  >
                    <v-sheet
                      :color="color"
                      class="fill-height"
                    />
                  </v-sheet>
                </div>
                <v-spacer />
                <div
                  class="d-flex align-center"
                >
                  <v-sheet
                    rounded
                    outlined
                    class="mx-1 px-1"
                  >
                    {{ item.groups.length }}
                  </v-sheet>
                  <div
                    class="text-center mx-1 py-1 text-body-1 grow no-basis"
                  >
                    {{ item.subject }}
                  </div>
                  <v-icon
                    class="mx-1 rotating-icon"
                    :class="{
                      'rotating-icon--active': item.expanded,
                    }"
                  >
                    mdi-menu-down
                  </v-icon>
                </div>
                <v-spacer />
              </v-card>
              <v-expand-transition>
                <div v-show="item.expanded">
                  <div
                    v-for="(group, groupIndex) in item.groups"
                    :key="`${index}-${itemIndex}-${groupIndex}-lesson-group-item`"
                  >
                    <v-divider />
                    <group-info
                      :hour="hours[lesson.hourIndex]"
                      :group="group"
                      :day-index="lesson.dayIndex"
                    >
                      <template #activator="{ on }">
                        <nested-lesson-group
                          :on="on"
                          :group="group"
                          :last-item="itemIndex === lesson.items.length - 1 && groupIndex === item.groups.length - 1"
                        />
                      </template>
                    </group-info>
                  </div>
                </div>
              </v-expand-transition>
            </div>
            <div
              v-else
              :key="`${index}-${itemIndex}-lesson-group`"
              class="d-flex flex-column grow text-center"
            >
              <v-divider v-if="itemIndex > 0" />
              <group-info
                :hour="hours[lesson.hourIndex]"
                :group="item.groups[0]"
                :day-index="lesson.dayIndex"
              >
                <template #activator="{ on }">
                  <lesson-group
                    :on="on"
                    :group="item.groups[0]"
                    :first-item="itemIndex === 0"
                    :last-item="itemIndex === lesson.items.length - 1"
                  />
                </template>
              </group-info>
            </div>
          </template>
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
  import LessonGroup from '@/components/lesson-group.vue';
  import NestedLessonGroup from '@/components/nested-lesson-group.vue';

  export default {
    components: { GroupInfo, LessonGroup, NestedLessonGroup },
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
      expandedItems: {},
    }),
    computed: {
      ...mapState({
        storage: 'storage',
      }),
      // TODO
      // sameLessonDays () {
      //   if (this.days === null) return null;
      //   const lessons = {};
      //   this.days.forEach((dayLessons, dayIndex) => dayLessons.forEach((groups) => groups.forEach(({ subject, groupName }) => {
      //     if (!lessons[subject]) lessons[subject] = {};
      //     const groupFieldName = groupName || 'none';
      //     if (!lessons[subject][groupFieldName]) lessons[subject][groupFieldName] = new Set([]);
      //     lessons[subject][groupFieldName].add(dayIndex);
      //   })));
      //   return lessons;
      // },
      lessonsArrayWithExpanded () {
        console.log('Update lessons array with expanded');
        console.time('Update lessons array with expanded');
        if (this.lessonsArray === null) return null;
        const l = this.lessonsArray.map((lesson) => ({
          ...lesson,
          items: lesson.items.map((item) => ({
            ...item,
            expanded: this.expandedItems[item.tempId] === true,
          })),
        }));
        console.timeEnd('Update lessons array with expanded');
        return l;
      },
      lessonsArray () {
        console.log('Update lessons array');
        console.time('Update lessons array');
        if (this.days === null) return null;

        const lessonsArray = [];

        this.days.forEach((day, dayIndex) => {
          day.forEach((hourGroups, hourIndex) => {
            if (hourGroups.length > 0) {
              const groups = hourGroups
                .map((group) => {
                  const nextDayDistance = this.nextDayDistance(dayIndex, group.subject, group.groupName);
                  const prevDayDistance = this.prevDayDistance(dayIndex, group.subject, group.groupName);
                  return ({
                    nextDayDistance,
                    prevDayDistance,
                    new: prevDayDistance !== 1,
                    last: nextDayDistance !== 1,
                    ...group,
                  });
                });
              const items = [];
              const subjectItems = {};
              groups.forEach((group) => {
                let subjectItem = subjectItems[group.subject];
                if (!subjectItem) {
                  subjectItem = {
                    tempId: `${dayIndex}:${hourIndex}:${group.subject}`,
                    subject: group.subject,
                    newCount: 0,
                    lastCount: 0,
                    colors: [],
                    groups: [],
                  };
                  subjectItems[group.subject] = subjectItem;
                  items.push(subjectItem);
                }
                subjectItem.groups.push(group);
                if (group.color) subjectItem.colors.push(group.color.bg);
                if (group.new) subjectItem.newCount += 1;
                if (group.last) subjectItem.lastCount += 1;
              });
              lessonsArray.push({
                dayIndex,
                hourIndex,
                items,
              });
            }
          });
        });

        console.timeEnd('Update lessons array');
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
          const fullUrl = new URL(`/${classUrl}`, process.env.VUE_APP_PROXY_URL);
          const response = await ky.get(fullUrl);
          const body = await response.text();
          const table = new Table(body);
          this.expandedItems = {};
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
          const fullUrl = `https://api.cld.sh/vlo/ttdata/${selection.class}?offset=0`;
          const [timetableData, hoursData] = await Promise.all([
            ky.get(fullUrl).json(),
            ky.get('https://api.cld.sh/vlo/timestamps').json(),
          ]);

          this.expandedItems = {};
          this.hours = Object.entries(hoursData).map(([index, respHour]) => ({
            number: parseInt(index, 10),
            timeFrom: respHour.begin,
            timeTo: respHour.end,
          }));
          this.days = timetableData.map((day) => this.mapVLoDay(day, this.hours.length));
        } catch (error) {
          console.warn(error);
        }
      },
      mapVLoDay (respDay, number) {
        const lessons = _.times(number, () => []);
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
      toggleExpanded (tempId) {
        this.$set(this.expandedItems, tempId, !this.expandedItems[tempId]);
      },
    },
  };
</script>

<style lang="scss">
  .timetable-container {
    max-width: 1400px;
  }

#grid {
    display: grid;
    overflow: auto;
    grid-template-columns: auto;
    grid-auto-columns: minmax(auto, 1fr);
    grid-auto-rows: auto;
  }

  .no-basis {
    flex-basis: 0;
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

  .combined-group {
    border-radius: 0 !important;

    &.new {
      border-left: 2px solid #8bc34a !important;

      &.new--partial {
        border-left-style: dotted !important;
      }
    }

    &.last {
      border-right: 2px solid #f44336 !important;

      &.last--partial {
        border-right-style: dotted !important;
      }
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

  .rotating-icon {
    transition: transform 600ms;

    &.rotating-icon--active {
      transform: rotate(180deg);
    }
  }

  .spacer {
    flex-grow: 1;
  }
</style>
