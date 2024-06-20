<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <div
            class="text-subtitle q-mt-sm q-mb-xs"
            v-html="script.testo_comprensione"
          ></div>
        </q-card-section>
        <q-separator />

        <q-card-section
          v-for="(domanda, index) in script.domande.domandasceltasingola"
          :key="domanda.testo"
        >
          <div class="text-overline" v-html="domanda.prologo"></div>
          <div
            class="text-subtitle q-mt-sm q-mb-xs"
            v-html="domanda.testo"
          ></div>
          <q-btn-toggle
            class="scelta"
            v-model="scelta[index]"
            spread
            no-caps
            padding="sm"
            dense
            toggle-color="primary"
            :options="opzioni[index]"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaComprensioneTesto',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaComprensioneTesto } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaComprensioneTesto;
const scelta = ref([]);

const opzioni = ref(
  script.domande.domandasceltasingola.map((dss) =>
    dss.risposte.risposta.map((item) => {
      return {
        label: item._,
        value: item._,
      };
    })
  )
);
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
.scelta
  text-align: left !important
  font-size: small
</style>
