<template>
  <q-page>
    <div class="flex flex-col ">
      <PrologoComponent
        class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <!-- <div
        class="max-h-40 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-200 shadow-lg shadow-slate-300/50"
        v-html="common_api.sanitizeUnicode(script.testo)" /> -->

      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />

      <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: calc(60vh)"
        class="col-auto text-subtitle2 q-my-sm q-mx-md">
        <draggable v-if="script.rispostaData" :list="script.rispostaData.risposta" :disabled="!enabled" item-key="_"
          class="q-mr-md list-group" ghost-class="ghost" :move="checkMove" draggable=".not-draggable"
          @start="dragging = true" @end="dragging = false">
          <template #item="{ element }">
            <div class="text-sm hover:text-base q-my-md q-pa-sm list-group-item border-dotted border-2" :class="{
              'not-draggable': check_primoItem(element.ordine),
              'primo-Item': !check_primoItem(element.ordine),
            }" v-html="element.label" />
          </template>
        </draggable>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiordino',
});
import draggable from 'vuedraggable';

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiordino, IDomanda } from './models';

import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import { common_api } from '../boot/common-utils';
import { ref, watch } from 'vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';
import * as Common from './common';

const sessione = useSessioneStore();

const script = sessione.domande[sessione.counter][1] as T_DomandaRiordino;
const domanda = sessione.domande[sessione.counter][2] as IDomanda;

if (typeof script.rispostaData === 'undefined') {
  script.rispostaData = JSON.parse(JSON.stringify(script.risposte));
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: script.rispostaData?.risposta.map((el) => el.$.hash) || [],
  };
}

if (typeof script.logRisposta === 'undefined') {
  script.logRisposta = [];
}

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);

script.rispostaData?.risposta.map((item, index) => {
  item.ordine = index;
  item.label = common_api.sanitizeUnicode(item._);
});

const dragging = ref(false);
const enabled = ref(true);
const checkMove = () => null;

if (script.rispostaData) {
  watch(script.rispostaData.risposta, (risposteOrdinate) => {
    if (script.risposta2Server) {
      script.risposta2Server.risposte = risposteOrdinate.map((r) => r.$.hash);
    }
  });
}

const check_primoItem = (ordine: number) => {
  return ordine != 0;
};

const set_ascolti = (val: number) => {
  if (script.audio) {
    script.audio.ascolti_rimanenti = val;
  }
};
const set_ascolti_video = (val: number) => {
  if (script.video) {
    script.video.ascolti_rimanenti = val;
  }
};

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle);
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle);
</script>
<style lang="sass" scoped>

.ghost
    opacity: 0.5
    background: #c8ebfb

.not-draggable
    cursor: no-drop

.list-group-item
    border-style: outset
    cursor: move
    text-align: justify


.primo-Item
  font-weight: bold
</style>
