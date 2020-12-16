<template>
  <v-main>
    <v-container class="school-picker__container">
      <v-card outlined>
        <v-card-title>
          Plan lekcji OPTIVUM
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submit"
        >
          <v-card-text>
            <v-text-field
              v-model="input"
              class="small"
              outlined
              type="url"
              :rules="rules"
              label="URL planu"
              required
              :readonly="loading"
            />
            <div class="d-flex justify-center">
              <v-btn
                color="primary"
                :disabled="buttonDisabled"
                :loading="loading"
                type="submit"
              >
                Połącz
              </v-btn>
            </div>
          </v-card-text>
          <template v-if="history.length > 0">
            <v-divider />
            <v-subheader>
              Ostatnie połączenia
            </v-subheader>
            <v-list subheader>
              <v-list-item
                v-for="entry in history"
                :key="entry.url"
                :to="entry.to"
                :disabled="loading"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ entry.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ entry.url }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-form>
      </v-card>
      <v-menu
        open-on-hover
        :open-on-click="false"
        :close-on-content-click="false"
        bottom
        offset-y
        :nudge-bottom="10"
        :nudge-left="50"
        :open-delay="100"
        :close-delay="100"
      >
        <template #activator="{ on }">
          <v-card
            color="#852439"
            outlined
            to="/v-lo"
            class="mt-8 mx-auto"
            :max-width="$vuetify.breakpoint.xsOnly ? 200 : 250"
            dark
            v-on="on"
          >
            <v-card-title class="pb-0 mb-0">
              V LO w Krakowie
            </v-card-title>
            <v-img src="@/assets/v-lo.png" />
          </v-card>
        </template>
        <v-card
          :max-width="$vuetify.breakpoint.xsOnly ? 300 : 350"
          :outlined="$vuetify.theme.dark"
        >
          <v-card-text>
            <p>Plan V Liceum Ogólnokształcącego im. Augusta Witkowskiego w Krakowie</p>
            <a href="https://github.com/Cloud11665/sabat.dev">API rozkładu zajęć</a>
            by <a href="https://github.com/Cloud11665">Cloud11665</a>
          </v-card-text>
        </v-card>
      </v-menu>
      <div class="d-flex align-center flex-column">
        <v-btn
          outlined
          rounded
          class="mt-10"
          href="https://github.com/dominik-korsa/timetable-backpack-assistant"
          :small="$vuetify.breakpoint.xsOnly"
        >
          <v-icon left>
            mdi-github
          </v-icon>
          <span>Source code</span>
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script>
  import isUrl from 'is-url';

  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        valid: false,
        input: '',
        rules: [
          (v) => isUrl(v) || !v || 'Podaj poprawny adres URL',
        ],
      };
    },
    computed: {
      buttonDisabled () {
        return !this.valid || !this.input;
      },
      history () {
        return this.$store.state.storage.history.map((entry) => ({
          url: entry.url,
          name: entry.name,
          to: `/optivum/${encodeURIComponent(entry.url)}`,
        }));
      },
    },
    watch: {
      value (value) {
        this.input = value;
      },
    },
    methods: {
      submit () {
        if (this.$refs.form.validate() && this.input && !this.loading) {
          this.$router.push(`/optivum/${encodeURIComponent(this.input)}`);
        }
      },
    },
  };
</script>

<style>
.school-picker__container {
  max-width: 600px;
}
</style>
