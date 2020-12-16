<template>
  <v-bottom-sheet v-if="$vuetify.breakpoint.xsOnly">
    <template #activator="slot">
      <slot
        name="activator"
        v-bind="slot"
      />
    </template>
    <group-info-card
      sheet
      :group="group"
      :day-index="dayIndex"
      :hour="hour"
    />
  </v-bottom-sheet>
  <v-dialog
    v-else
    max-width="600"
  >
    <template #activator="slot">
      <slot
        name="activator"
        v-bind="slot"
      />
    </template>
    <group-info-card
      :group="group"
      :day-index="dayIndex"
      :hour="hour"
    />
  </v-dialog>
</template>
<script>
  import GroupInfoCard from '@/components/group-info-card.vue';

  export default {
    components: { GroupInfoCard },
    props: {
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
  };
</script>
