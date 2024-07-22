<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-overline q-mb-sm" v-html="script.prologo"></div>
        <div class="text-subtitle1 q-mb-xs" v-html="script.testo"></div>
        <div class="text-overline q-mt-sm q-mb-xs">
          Numero massimo risposte possibili:
          <span>{{ script.$?.risposteCorrette }}</span>
        </div>
      </q-card-section>
      <q-separator />
      <audio controls>
        <source :src="script.audio?.$.url" type="audio/ogg">
      </audio>
      <q-card-section>
        <q-option-group class="scelta" v-model="scelta" dense :options="opzioni" type="checkbox" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaMultipla',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaSceltaMultipla } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaMultipla);

const opzioni = ref(
  script.value.risposte.risposta.map((item) => {
    return {
      label: item._,
      value: item._,
    };
  })
);
const scelta = ref([]);
</script>

<style lang="sass" scoped>
.my-card
  width: 98%
  border: 2px solid

.scelta
  text-align: left !important
  font-size: small
</style>
