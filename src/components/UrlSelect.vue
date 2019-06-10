<template>
  <v-container>
      <v-form ref="form" v-model="valid" @submit="formSubmit">
        <v-layout column align-center>
          <v-flex class="small">
            <v-text-field
              full-width
              outline
              type="url"
              :rules="rules"
              label="URL planu"
              required
              v-model="url"
              :readonly="loading">
            </v-text-field>
          </v-flex>
          <v-flex>
            <v-btn
              color="primary"
              :disabled="buttonDisabled"
              @click="submit"
              :loading="loading">
              Połącz
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      loading: false,
      url: '',
      rules: [
        v => this.validateUrl(v) || !v || 'Podaj poprawny adres URL',
      ],
    };
  },
  computed: {
    buttonDisabled() {
      return !this.valid || !this.url;
    },
  },
  methods: {
    validateUrl(url) {
      const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i');
      return pattern.test(url);
    },
    formSubmit(e) {
      e.preventDefault();
      this.submit();
    },
    submit() {
      if (this.$refs.form.validate() && this.url) {
        this.loading = true;
        let fullUrl;
        try {
          fullUrl = `https://cors-anywhere.herokuapp.com/${new URL('lista.html', this.url)}`;
        } catch (error) {
          this.loading = false;
          console.warn(error);
          return;
        }
        axios.get(fullUrl)
          .then((resonse) => {
            this.loading = false;
            this.$emit('success', this.url);
          })
          .catch((error) => {
            this.loading = false;
            console.warn(error);
          });
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
