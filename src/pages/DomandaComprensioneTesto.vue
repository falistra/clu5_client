<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section style="width: 50%">
            <div class="text-overline" v-html="script.prologo"></div>
            <q-scroll-area style="height: 100%">
              <div
                class="text-subtitle q-ma-sm q-pb-sm q-pr-sm"
                v-html="testo_comprensione"
              ></div>
            </q-scroll-area>
          </q-card-section>
          <q-separator vertical />

          <q-card-section>
            <div
              class="domanda"
              v-for="(domanda, index) in domande"
              :key="domanda.testo"
            >
              <div class="text-overline" v-html="domanda.prologo"></div>
              <div
                class="text-subtitle q-mt-sm q-mb-xs"
                v-html="domanda.testo"
              ></div>
              <q-btn-toggle
                class="risposte q-mx-sm"
                v-model="scelta[index]"
                spread
                no-caps
                padding="sm"
                dense
                push
                toggle-color="primary"
                :options="domanda.risposte"
              >
                <template
                  v-for="button in domanda.risposte"
                  :key="button.value"
                  v-slot:[button.slot]
                >
                  <div class="risposta">{{ button.testo }}</div>
                </template>
              </q-btn-toggle>
            </div>
          </q-card-section>
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
import { ref, computed } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaComprensioneTesto;
const scelta = ref([]);

const testo_comprensione = computed(
  () => script.testo_comprensione.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

const domande = script.domande.domandasceltasingola.map((dss) => ({
  prologo: dss.prologo,
  testo: dss.testo,
  risposte: dss.risposte.risposta.map((item, index) => ({
    testo: item._,
    value: item._,
    slot: index.toString(),
  })),
}));

// const thumbStyle = ref({
//   right: '4px',
//   borderRadius: '5px',
//   backgroundColor: '#027be3',
//   width: '5px',
//   opacity: 0.75,
// });

// const barStyle = ref({
//   right: '2px',
//   borderRadius: '9px',
//   backgroundColor: '#027be3',
//   width: '9px',
//   opacity: 0.2,
// });
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.q-btn-item
  margin-left: 5px
  border: 1px solid

.risposte
  margin-bottom: 5px

.risposta
  font-size: small
  text-align: justify

.domanda
  border-style: solid solid solid solid
  margin-bottom: 15px
</style>
