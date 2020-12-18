<template>
  <v-card
    class="group grow"
    :class="{
      'first-item': firstItem,
      'last-item': lastItem,
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
        v-if="storage.showRoom && group.room"
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
      firstItem: Boolean,
      lastItem: Boolean,
    },
    computed: {
      ...mapState({
        storage: 'storage',
      }),
    },
  };
</script>

<style lang="scss">
.group {
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
</style>
