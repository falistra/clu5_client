<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <div
            class="text-subtitle q-mt-sm q-mb-xs"
            v-html="script.testo"
          ></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="testo" filled type="textarea" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaScritturaLibera',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaScritturaLibera } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaScritturaLibera;

const testo = ref('');
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
