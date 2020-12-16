<template>
  <v-card
    class="group-info-card"
    :tile="sheet"
    :outlined="$vuetify.theme.dark && !sheet"
  >
    <v-divider v-if="$vuetify.theme.dark && sheet" />
    <v-card-title>
      {{ group.subject }}
    </v-card-title>
    <v-card-subtitle>
      {{ weekday }}, {{ hour.timeFrom }}-{{ hour.timeTo }}
    </v-card-subtitle>
    <v-card
      outlined
      class="d-flex mx-3"
    >
      <div class="grow px-2 py-2 no-basis">
        <div class="text-body-2 text--secondary">
          Poprzednio w <span class="text--primary font-weight-medium">{{ prevWeekday }}</span>
        </div>
        <div
          v-if="group.new"
          class="green--text text-body-1"
        >
          Spakuj w tym dniu
        </div>
        <div
          v-else
          class="text--secondary text-body-1"
        >
          Nie musisz pakować w tym dniu
        </div>
      </div>
      <v-divider vertical />
      <div class="grow px-2 py-2 text-right no-basis">
        <div class="text-body-2 text--secondary">
          Następnie w <span class="text--primary font-weight-medium">{{ nextWeekday }}</span>
        </div>
        <div
          v-if="group.last"
          class="red--text text-body-1"
        >
          Możesz wypakować po tym dniu
        </div>
        <div
          v-else
          class="text--secondary text-body-1"
        >
          Nie wypakowywuj po tym dniu
        </div>
      </div>
    </v-card>
    <v-card-text>
      <div v-if="group.groupName">
        <div class="text-overline">
          Grupa
        </div>
        <div class="text-body-2 text--primary">
          {{ group.groupName }}
        </div>
      </div>
      <div v-if="group.teacher">
        <div class="text-overline">
          Nauczyciel
        </div>
        <div class="text-body-2 text--primary">
          {{ group.teacher }}
        </div>
      </div>
      <div v-if="group.room">
        <div class="text-overline">
          Sala
        </div>
        <div class="text-body-2 text--primary">
          {{ group.room }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  const weekdays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const relativeWeekdays = ['poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek'];
  const weekdaysPrevWeek = ['zeszły poniedziałek', 'zeszły wtorek', 'zeszłą środę', 'zeszły czwartek', 'zeszły piątek'];
  const weekdaysNextWeek = ['przyszły poniedziałek', 'przyszły wtorek', 'przyszłą środę', 'przyszły czwartek', 'przyszły piątek'];

  export default {
    props: {
      sheet: {
        type: Boolean,
        default: false,
      },
      group: {
        type: Object,
        required: true,
      },
      dayIndex: {
        type: Number,
        required: true,
      },
      hour: {
        type: Object,
        required: true,
      },
    },
    computed: {
      weekday () {
        return weekdays[this.dayIndex];
      },
      nextWeekday () {
        const nextDayIndex = (this.dayIndex + this.group.nextDayDistance) % 5;
        if (nextDayIndex <= this.dayIndex) return weekdaysNextWeek[nextDayIndex];
        return relativeWeekdays[nextDayIndex].toLocaleLowerCase();
      },
      prevWeekday () {
        const prevDayIndex = (this.dayIndex - this.group.prevDayDistance + 5) % 5;
        if (prevDayIndex >= this.dayIndex) return weekdaysPrevWeek[prevDayIndex];
        return relativeWeekdays[prevDayIndex].toLocaleLowerCase();
      },
    },
  };
</script>

<style lang="scss">
.group-info-card {
  .no-basis {
    flex-basis: 0;
  }
}
</style>
