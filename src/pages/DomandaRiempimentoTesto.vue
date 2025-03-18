<template>
  <q-page>
    <div class="flex flex-col">
      <PrologoComponent
        class="max-h-40 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />

      <img-wrap v-if="script.immagine" :src="script.immagine" />
      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />

      <div class="q-my-sm q-mx-md  my-2 mx-5 p-2 scroll-mr-6 overflow-auto" style="max-height: calc(47vh);">
        <div class="q-mt-sm q-mb-xs q-ml-sm q-mr-lg">
          <span v-for="item in tokens" :key="item.index">
            <span v-if="!item.isSlot" v-html="common_api.sanitizeUnicode(item.content)"></span>
            <span v-else-if="item.isSlot" class="hover:border-dotted pa-md drop-zone" @dragover.prevent
              @dragenter.prevent @drop="onDrop($event, item.slotIndex)" @dblclick="annulla(item)">
              <q-tooltip v-if="
                script.rispostaData && item.slotIndex in script.rispostaData
              " class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                <strong>{{ $t('Doppio_click') }}</strong>
              </q-tooltip>
              {{
                script.rispostaData && item.slotIndex in script.rispostaData
                  ? script.rispostaData[item.slotIndex]._
                  : '_'.repeat(item.l || 18)
              }}
            </span>
          </span>
        </div>
      </div>

      <q-scroll-area class="q-gutter-md q-mt-md q-mx-md" :visible="true" :thumb-style="thumbStyle" :bar-style="barStyle"
        style="height: calc(47vh)">
        <div class="row q-gutter-sm q-py-md" style="display: flex; flex-wrap: wrap;">
          <div v-for="risposta in lista_risposte_disponibili" :key="risposta.id">
            <div draggable="true" @dragstart="startDrag($event, risposta.testo)">
              <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                <strong>{{ $t('Trascina') }}</strong>
              </q-tooltip>
              <div
                class="q-px-sm text-wrap text-small bg-teal-1 rounded border-solid hover:border-dotted border-2 border-indigo-600"
                v-html="risposta.label"></div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTesto',
});
import { ref, computed, watch } from 'vue';

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiempimentoTesto, T_Token, IDomanda } from './models';
import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';
import { common_api } from '../boot/common-utils';

import * as Common from './common';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;
if (!script.rispostaData) script.rispostaData = {};
const domanda = sessione.domande[sessione.counter][2] as IDomanda;

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {},
  };

watch(script.rispostaData, (rispostaData) => {
  if (script.risposta2Server)
    script.risposta2Server.risposte = Object.fromEntries(
      Object.entries(rispostaData).map(([k, o]) => [k, o.hash])
    );
  script.logRisposta = Object.fromEntries(
    Object.entries(rispostaData).map(([k, o]) => [
      k,
      { testo: o._, value: o.hash },
    ])
  );
});

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);
console.log(script)
let testo = '';
if (typeof script.testo == 'string') testo = script.testo;
if (typeof script.testo == 'object') testo = script.testo._;
const tokens = ref(
  testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const l = slot ? slot[1].length + slot[3].length : 0
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    const risposta =
      script.rispostaData && slotIndex in script.rispostaData
        ? script.rispostaData[slotIndex]._
        : ' '.repeat(l);
    content = isSlot ? risposta : content // .replace(/\%u(.{4})/g, '&#x$1;');
    return { index, isSlot, slotIndex, content, l } as T_Token;
  })
);

const onDrop = function (evt: DragEvent, slotIndex: string) {
  if (evt.dataTransfer) {
    const item = tokens.value?.find(
      (item: T_Token) => item.slotIndex == slotIndex
    );
    if (item) {
      // se lo slot e' gia' occupato lo libera
      if (slotIndex in script.rispostaData) {
        const item = tokens.value?.find(
          (item: T_Token) => item.slotIndex == slotIndex
        );
        if (item) {
          const risposta = lista_risposte.value?.find(
            (value) => value.testo == item.content
          );
          if (risposta) {
            risposta.disponibile = true;
            delete script.rispostaData[item.slotIndex];
            item.content = '';
          }
        }
      }

      const risposta_data = evt.dataTransfer.getData('risposta');

      item.content = risposta_data;
      const risposta = lista_risposte_disponibili.value?.find(
        (value) => value.testo == risposta_data
      );

      if (risposta) {
        script.rispostaData[slotIndex] = {
          hash: risposta.id,
          _: risposta.testo,
        };
        risposta.disponibile = false;

        const script_risposta = script.risposte.risposta.find(
          (value) => value._ == risposta.testo
        );
        if (script_risposta) script_risposta.disponibile = false;
      }
    }
  }
};

const startDrag = (evt: DragEvent, item: string) => {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('risposta', item);
  }
};

interface IRisposta {
  id: string;
  testo: string;
  disponibile: boolean;
  label: string;
}
const lista_risposte = ref(
  script.risposte.risposta.map(
    (value) =>
      <IRisposta>{
        id: value.$.hash,
        testo: value._,
        disponibile: value?.disponibile || true,
        label: common_api.sanitizeUnicode(value._),
      }
  )
);

// const dimensioneListaRisposte = ref(lista_risposte.value.reduce((partialSum, a) => partialSum + a.testo.length, 0))


const lista_risposte_disponibili = computed(() =>
  lista_risposte.value.filter((value) => value.disponibile)
);

const annulla = (item: T_Token) => {
  const risposta = lista_risposte.value?.find(
    (value) => value.testo == item.content
  );
  if (risposta) {
    risposta.disponibile = true;
    const script_risposta = script.risposte.risposta.find(
      (value) => value._ == risposta.testo
    );
    if (script_risposta) script_risposta.disponibile = true;

    delete script.rispostaData[item.slotIndex];
    item.content = '';
  }
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
.my-card
  width: 100%
  border: 2px solid

.drop-zone
  font-weight: 900
  width: 100px
  min-width: 100px
  border: 1px dotted black
</style>
