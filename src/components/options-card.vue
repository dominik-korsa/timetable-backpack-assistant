<template>
  <v-card class="pb-6">
    <v-card-title>
      Opcje
    </v-card-title>
    <v-divider />
    <v-subheader>Motyw aplikacji</v-subheader>
    <v-btn-toggle
      v-model="dark"
      class="d-flex mx-4"
    >
      <v-btn
        class="grow"
        :value="false"
      >
        <v-icon left>
          mdi-white-balance-sunny
        </v-icon>
        Jasny
      </v-btn>
      <v-btn
        class="grow"
        :value="true"
      >
        <v-icon left>
          mdi-weather-night
        </v-icon>
        Ciemny
      </v-btn>
    </v-btn-toggle>
    <v-switch
      v-model="subjectColors"
      label="Kolory przedmiotów (tylko V LO)"
      hide-details
      class="mx-4"
    />
  </v-card>
</template>

<script>
  export default {
    computed: {
      dark: {
        get () {
          return this.$vuetify.theme.dark;
        },
        set (value) {
          this.$vuetify.theme.dark = value;
          this.$store.commit('setDark', value);
        },
      },
      subjectColors: {
        get () {
          return this.$store.state.storage.subjectColors;
        },
        set (value) {
          this.$store.commit('setSubjectColors', value);
        },
      },
    },
  };
</script>
