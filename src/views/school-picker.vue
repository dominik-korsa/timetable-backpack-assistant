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
          <v-divider />
          <template v-if="history.length > 0">
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
