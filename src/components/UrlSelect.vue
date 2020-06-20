<template>
  <v-main>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="submit"
      >
        <div class="d-flex flex-column align-center py-10">
          <v-text-field
            v-model="input"
            outlined
            type="url"
            :rules="rules"
            label="URL planu"
            required
            :readonly="loading"
            class="small"
          />
          <v-btn
            color="primary"
            :disabled="buttonDisabled"
            :loading="loading"
            type="submit"
          >
            Połącz
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
  import isUrl from 'is-url';

  export default {
    props: {
      value: {
        type: String,
        required: false,
        default: null,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        valid: false,
        input: this.value || '',
        rules: [
          (v) => isUrl(v) || !v || 'Podaj poprawny adres URL',
        ],
      };
    },
    computed: {
      buttonDisabled () {
        return !this.valid || !this.input;
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
          this.$emit('select', this.input);
        }
      },
    },
  };
</script>

<style>
  .small {
    width: 500px;
    max-width: 100%;
  }
</style>
