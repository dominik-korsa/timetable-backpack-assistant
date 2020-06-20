<template>
  <v-main>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        @submit="formSubmit"
      >
        <div class="d-flex flex-column align-center py-10">
          <v-text-field
            v-model="url"
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
            @click="submit"
          >
            Połącz
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      value: {
        type: String,
      },
    },
    data () {
      return {
        valid: false,
        loading: false,
        url: this.value || '',
        rules: [
          (v) => this.validateUrl(v) || !v || 'Podaj poprawny adres URL',
        ],
      };
    },
    computed: {
      buttonDisabled () {
        return !this.valid || !this.url;
      },
    },
    watch: {
      value (value) {
        this.url = value;
      },
    },
    methods: {
      validateUrl (url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i');
        return pattern.test(url);
      },
      formSubmit (e) {
        e.preventDefault();
        this.submit();
      },
      async submit () {
        if (this.$refs.form.validate() && this.url) {
          this.loading = true;

          try {
            const fullUrl = `https://cors-anywhere.herokuapp.com/${new URL('lista.html', this.url)}`;
            await axios.get(fullUrl);
            this.$emit('success', this.url);
            this.$emit('input', this.url);
          } catch (error) {
            console.warn(error);
          }

          this.loading = false;
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
