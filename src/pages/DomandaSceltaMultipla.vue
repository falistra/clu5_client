<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <div class="text-h5 q-mt-sm q-mb-xs" v-html="script.testo"></div>
          <div class="text-overline q-mt-sm q-mb-xs">
            Numero massimo risposte possibili:
            <span>{{ script.$?.maxrisposte }}</span>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-option-group
            class="scelta"
            v-model="scelta"
            dense
            :options="opzioni"
            type="checkbox"
          />
        </q-card-section>
      </q-card>
    </div>
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
const script = sessione.domande[sessione.counter][1] as T_DomandaSceltaMultipla;

const opzioni = ref(
  script.risposte.risposta.map((item) => {
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
  width: 100%
  max-width: auto
.scelta
  text-align: left !important
  font-size: small
</style>
