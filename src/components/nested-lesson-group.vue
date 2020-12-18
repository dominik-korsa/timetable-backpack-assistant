<template>
  <v-card
    class="nested-group grow pa-1 d-flex"
    :class="{
      'last-item': lastItem,
      new: group.new,
      last: group.last,
    }"
    flat
    v-on="on"
  >
    <v-sheet
      v-if="group.color && storage.subjectColors"
      rounded
      class="overflow-hidden align-self-stretch"
      outlined
      width="6"
    >
      <v-sheet
        :color="group.color.bg"
        class="fill-height"
      />
    </v-sheet>
    <div class="text-center grow">
      <span
        v-if="storage.showRoom && group.room"
        class="text-body-2 mx-1"
      >{{ group.room }}</span>
      <span
        v-if="group.groupName"
        class="text-body-2 font-weight-light mx-1"
      >{{ group.groupName }}</span>
      <br v-if="storage.showRoom && storage.showTeacher && group.teacher">
      <span
        v-if="storage.showTeacher && group.teacher"
        class="text-body-2 font-weight-light mx-1"
      >{{ group.teacher }}</span>
    </div>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: {
      on: {
        type: Object,
        required: true,
      },
      group: {
        type: Object,
        required: true,
      },
      lastItem: Boolean,
      nested: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState({
        storage: 'storage',
      }),
    },
  };
</script>

<style lang="scss">
.nested-group {
  border-radius: 0 !important;

  &.new {
    border-left: 2px solid #8bc34a;
  }

  &.last {
    border-right: 2px solid #f44336;
  }

  &.last-item {
    border-bottom-left-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
  }
}
</style>
