<template>
  <q-page :style-fn="myTweak">
    <PrologoComponent
      class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
      :prologo="script.prologo" />
    <q-card flat>
      <q-card-section horizontal>
        <q-card-section class="col-6 scroll-mr-6 overflow-auto">
          <!-- <q-scroll-area visible style="height: calc(60vh); max-height: calc(60vh)" :thumb-style="my_thumbStyle"
          :bar-style="my_barStyle"> -->
          <div v-if="
            common_api.sanitizeUnicode(script.testo_comprensione) !== ''
          " class="col pr-6 scroll overflow-auto max-h-80" v-html="testo_comprensione">
          </div>
          <!-- </q-scroll-area> -->
          <div v-if="primaDomanda?.immagine" class="col">
            <img-wrap :src="primaDomanda.immagine" />
          </div><BR />
          <div v-if="primaDomanda?.audio" class="col q-mt-md">
            <audio-wrap :audio="primaDomanda.audio" @update="set_ascolti" />
          </div>
          <div v-if="primaDomanda?.video" class="col q-mt-md">
            <video-wrap :video="primaDomanda.video" width="350" height="280" @update="set_ascolti_video" />
          </div>

        </q-card-section>
        <q-card-section class="col-6">
          <q-scroll-area visible :thumb-style="my_thumbStyle" :bar-style="my_barStyle" style="height: calc(60vh)">
            <!--:style="{ height: `${H}px` }" -->
            <div v-for="domanda in domande" :key="domanda.testo" class="domanda q-mr-md ">
              <div class="text-overline" v-html="domanda.prologo" />
              <div class="text-subtitle q-ml-md text-weight-bold" v-html="common_api.sanitizeUnicode(domanda.testo)" />
              <q-option-group v-model="domanda.rispostaData" class="q-mx-sm q-mb-sm text-weight-medium"
                :options="domanda.risposte" dense color="primary">
                <template #label="risposta">
                  <div :class="{ active: isActive }" v-html="risposta.label" />
                </template>
              </q-option-group>

            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaComprensioneTesto',
});

import { useSessioneStore } from '../stores/sessione';
import {
  T_DomandaComprensioneTesto,
  T_DomandaSceltaSingola,
  IDomanda,
  Audio,
} from './models';
import { ref, watch, reactive /*, computed */ } from 'vue';
import PrologoComponent from '../components/PrologoComponent.vue';
import ImgWrap from '../components/ImgWrap.vue';
import { common_api } from '../boot/common-utils';
import AudioWrap from '../components/AudioWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import {
  setAudioPams,
  setVideoPams,
  sanitazeScript,
  thumbStyle,
  barStyle,
} from './common';

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaComprensioneTesto
);

const testoMalformato = script.value.domande.domandasceltasingola[0].testo;
if (testoMalformato.toString() === '[object Object]') {
  const patch = testoMalformato as unknown as { _: string; audio: Audio };
  script.value.domande.domandasceltasingola[0].audio = patch.audio;
  script.value.domande.domandasceltasingola[0].testo = patch._;
} // else { console.log('REGOLARE!') }

const domanda = sessione.domande[sessione.counter][2] as IDomanda;

const testo_comprensione = common_api.sanitizeUnicode(script.value.testo_comprensione)

const domande = reactive(
  script.value.domande.domandasceltasingola.map((dss) => ({
    prologo: dss.prologo,
    testo: dss.testo,
    hash: dss.$.hash || '',
    risposte: dss.risposte.risposta.map((item, index) => ({
      testo: item._,
      label: common_api.sanitizeUnicode(item._),
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      style: {
        'line-height': '85%',
        'font-size': 'small',
        'margin-right': '5px',
        border: '1px solid',
      },
    })),
    rispostaData: dss.rispostaData,
  }))
);

if (typeof script.value.risposta2Server === 'undefined') {
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: domande.reduce((a, v) => ({ ...a, [v.hash]: '' }), {}),
  };
}

if (typeof script.value.logRisposta === 'undefined') {
  script.value.logRisposta = script.value.domande.domandasceltasingola.map(
    (d) => {
      return {
        testo: d.testo,
        risposta: { testo: null, value: null },
      };
    }
  );
}

const primaDomanda: T_DomandaSceltaSingola | undefined =
  script.value.domande.domandasceltasingola.find(
    (domanda) =>
      domanda.audio && domanda.audio.$.url && domanda.audio.$.url != '' && domanda.audio.$.url != 'undefined' && domanda.audio.$.url != 'null'
  ) ||
  script.value.domande.domandasceltasingola.find(
    (domanda) =>
      domanda.video && domanda.video.$.url && domanda.video.$.url != '' && domanda.video.$.url != 'undefined' && domanda.video.$.url != 'null'
  );

if (primaDomanda) {
  sanitazeScript(primaDomanda);
  if (primaDomanda.audio) setAudioPams(primaDomanda.audio);
  if (primaDomanda.video) setVideoPams(primaDomanda.video);
}

// const heightText = computed(() => {
//   // console.log(window.innerHeight)
//   const dim = Math.round(script.value.testo_comprensione.length * 0.3 + 50)
//   return dim
// })
// const HText = ref()

watch(domande, (risposte) => {
  risposte.forEach((item, index) => {
    script.value.domande.domandasceltasingola[index].rispostaData =
      item.rispostaData || undefined;
    const key = script.value.domande.domandasceltasingola[index].$.hash;
    const risposta = item.risposte.find((e) => e.testo == item.rispostaData);
    if (script.value.risposta2Server && key && risposta) {
      script.value.risposta2Server.risposte[key] = risposta?.hash;
    } else {
      if (script.value.risposta2Server && key) {
        script.value.risposta2Server.risposte[key] = '';
      }
    }
  });
  script.value.logRisposta = risposte.map((item) => {
    const risposta = item.risposte.find((e) => e.testo == item.rispostaData);
    return {
      testo: item.testo,
      risposta: {
        testo: risposta?.testo || null,
        value: risposta?.hash || null,
      },
    };
  });
});

const isActive = ref(false);

const set_ascolti = (val: number) => {
  if (primaDomanda && primaDomanda.audio) {
    primaDomanda.audio.ascolti_rimanenti = val;
  }
};

const set_ascolti_video = (val: number) => {
  if (primaDomanda && primaDomanda.video) {
    primaDomanda.video.ascolti_rimanenti = val;
  }
};

const my_thumbStyle = ref<Partial<CSSStyleDeclaration>>(thumbStyle);
const my_barStyle = ref<Partial<CSSStyleDeclaration>>(barStyle);


const myTweak = (offset: number) => {
  // "offset" is a Number (pixels) that refers to the total
  // height of header + footer that occupies on screen,
  // based on the QLayout "view" prop configuration

  // this is actually what the default style-fn does in Quasar
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
}

</script>

<style lang="sass" scoped>
.risposta
  font-size: small
  text-align: justify
  line-height: 85%

.domanda
  border-style: solid solid solid solid
  margin-bottom: 30px

.active
  border-style: dotted
</style>
