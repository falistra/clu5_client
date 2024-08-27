<template>
  <q-page class="padding items-center justify-evenly">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div class="text-overline" v-html="prologo"></div>
          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="barraStyle" style="height: 500px">
            <div class="text-subtitle q-ma-sm q-pb-sm q-pr-sm" v-html="testo_comprensione"></div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="barraStyle" style="height: 100%">
            <div class="q-ma-sm q-pb-sm q-pr-sm">
              <div class="domanda" v-for="domanda in domande" :key="domanda.testo">
                <div class="text-overline" v-html="domanda.prologo"></div>
                <div class="text-subtitle q-mt-sm q-mb-xs" v-html="domanda.testo"></div>
                <q-btn-toggle class="risposte q-mx-sm" v-model="domanda.rispostaData" spread no-caps dense push
                  toggle-color="primary" :options="domanda.risposte" clearable>
                  <template v-for="button in domanda.risposte" :key="button.value" v-slot:[button.slot]>
                    <div class="risposta q-px-sm">{{ button.testo }}</div>
                  </template>
                </q-btn-toggle>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaComprensioneTesto',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaComprensioneTesto } from 'pages/models';
import { ref, computed, watch, reactive } from 'vue';

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaComprensioneTesto
);

const prologo = computed(
  () => script.value.prologo.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

const testo_comprensione = computed(
  () => script.value.testo_comprensione.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

const domande = reactive(
  script.value.domande.domandasceltasingola.map((dss) => ({
    prologo: dss.prologo,
    testo: dss.testo,
    risposte: dss.risposte.risposta.map((item, index) => ({
      testo: item._,
      value: item._,
      slot: index.toString(),
      style: { 'margin-right': '5px', border: '1px solid' },
    })),
    rispostaData: dss.rispostaData,
  }))
);

watch(domande, async (risposte) => {
  risposte.forEach((item, index) => {
    script.value.domande.domandasceltasingola[index].rispostaData =
      item.rispostaData || undefined;
  });
});

const cursoreStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75',
});

const barraStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: '0.2',
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  min-height: 500px
  border: 2px solid

.risposte
  margin-bottom: 5px

.risposta
  font-size: small
  text-align: justify
  line-height: 85%

.domanda
  border-style: solid solid solid solid
  margin-bottom: 15px
</style>
