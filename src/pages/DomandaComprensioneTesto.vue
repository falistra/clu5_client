<template>
  <q-page class="padding items-center justify-evenly">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <PrologoComponent :prologo="script.prologo" />
          <ImgWrap :src="primaDomanda.immagine?.$?.url" size="150px" />
          <div class="row justify-center" v-if="primaDomanda.audio">
            <audio-wrap :audio="primaDomanda.audio" @update="set_ascolti"></audio-wrap>
          </div>

          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="barraStyle" style="height: 500px">
            <div class="text-subtitle q-ma-sm q-pb-sm q-pr-sm"
              v-html="common_api.sanitizeUnicode(script.testo_comprensione)"></div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="common_api.barStyle" style="height: 100%">
            <div class="q-ma-sm q-pb-sm q-pr-sm">
              <div class="domanda" v-for="domanda in domande" :key="domanda.testo">
                <div class="text-overline" v-html="domanda.prologo"></div>
                <div class="text-subtitle q-ml-md q-my-sm text-weight-bold"
                  v-html="common_api.sanitizeUnicode(domanda.testo)"></div>
                <q-option-group class="q-mx-sm q-mb-sm text-weight-medium" v-model="domanda.rispostaData"
                  :options="domanda.risposte" dense color="primary" />



                <!-- <q-btn-toggle class="risposte q-mx-sm" v-model="domanda.rispostaData" no-caps dense push
                  toggle-color="primary" :options="domanda.risposte" clearable>
                  <template v-for="button in domanda.risposte" :key="button.value" v-slot:[button.slot]>
                    <div class="risposta q-px-sm">{{ button.testo }}</div>
                  </template>
</q-btn-toggle> -->

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
import { T_DomandaComprensioneTesto, T_DomandaSceltaSingola } from 'pages/models';
import { ref, watch, reactive } from 'vue';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils'
import { setAudioPams } from 'pages/common'

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaComprensioneTesto
);

const primaDomanda: T_DomandaSceltaSingola = script.value.domande.domandasceltasingola[0]
if (primaDomanda.audio) setAudioPams(primaDomanda.audio)


const domande = reactive(
  script.value.domande.domandasceltasingola.map((dss) => ({
    prologo: dss.prologo,
    testo: dss.testo,
    risposte: dss.risposte.risposta.map((item, index) => ({
      testo: item._,
      label: item._,
      value: item._,
      slot: index.toString(),
      style: { 'line-height': '85%', 'font-size': 'small', 'margin-right': '5px', border: '1px solid' },
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

const set_ascolti = (val: number) => {
  console.log(`OK set: ${val}`)
  if (primaDomanda.audio) {
    primaDomanda.audio.ascolti_rimanenti = val
  }
}

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


.risposta
  font-size: small
  text-align: justify
  line-height: 85%

.domanda
  border-style: solid solid solid solid
  margin-bottom: 10px
</style>
