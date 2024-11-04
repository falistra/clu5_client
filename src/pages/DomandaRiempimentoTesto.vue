<template>
  <q-page>
    <div class="column" style="height: calc(95vh)">
      <div class="col-auto scroll" style="max-height: 70px">
        <PrologoComponent :prologo="script.prologo" />
      </div>

      <div v-if="script.immagine" class="col-auto q-my-sm q-mx-md">
        <img-wrap :src="script.immagine" size="100px" />
      </div>
      <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
        <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
      </div>
      <div v-if="script.video" class="col-auto q-mt-md">
        <video-wrap :video="script.video" @update="set_ascolti_video"></video-wrap>
      </div>

      <div class="col-auto q-my-sm q-mx-md ">
        <q-scroll-area :visible="true" style="height: calc(55vh)" :thumb-style="thumbStyle" :bar-style="barStyle">
          <div class="text-subtitle q-mt-sm q-mb-xs q-ml-sm q-mr-lg">
            <span v-for="item in tokens" :key="item.index">
              <span v-if="!item.isSlot" v-html="item.content"></span>
              <span v-else-if="item.isSlot" class="drop-zone" @dragover.prevent @dragenter.prevent
                @drop="onDrop($event, item.slotIndex)" @dblclick="annulla(item)">
                <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                  <strong>{{ $t('Doppio_click') }}</strong>
                </q-tooltip>
                {{ (script.rispostaData && (item.slotIndex in script.rispostaData)) ?
                  script.rispostaData[item.slotIndex]._ : '_'.repeat(15) }}
              </span>
            </span>
          </div>
        </q-scroll-area>
      </div>

      <div class="col-auto q-my-sm q-mx-md ">
        <q-scroll-area :visible="true" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: calc(10vh)">

          <div class="row">
            <div class="col-auto" v-for="risposta in lista_risposte_disponibili" :key="risposta.id">
              <p class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, risposta.testo)">
                <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                  <strong>{{ $t('Trascina') }}</strong>
                </q-tooltip>
                <span class="bg-teal-1 q-pa-xs  text-weight-medium" v-html="risposta.label"></span>
              </p>
            </div>
          </div>

        </q-scroll-area>
      </div>
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

const script = sessione.domande[sessione.counter][1] as T_DomandaRiempimentoTesto;
if (!script.rispostaData) script.rispostaData = {}
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }

watch(script.rispostaData, (rispostaData) => {
  if (script.risposta2Server)
    script.risposta2Server.risposte = Object.fromEntries(Object.entries(rispostaData)
      .map(([k, o]) => [k, o.hash])
    );
  script.logRisposta = Object.fromEntries(Object.entries(rispostaData)
    .map(([k, o]) => [k, { testo: o._, value: o.hash }])
  );
})

if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)


const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    const risposta = (script.rispostaData && (slotIndex in script.rispostaData)) ? script.rispostaData[slotIndex]._ : '____________';
    console.log(risposta)
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    return { index, isSlot, slotIndex, content } as T_Token;
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
            delete script.rispostaData[item.slotIndex]
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
        }
        risposta.disponibile = false;

        const script_risposta = script.risposte.risposta.find(
          (value) => value._ == risposta.testo
        );
        if (script_risposta) script_risposta.disponibile = false
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
        label: common_api.sanitizeUnicode(value._)
      }
  )
);

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
    if (script_risposta) script_risposta.disponibile = true

    delete script.rispostaData[item.slotIndex]
    item.content = '';
  }
};

const set_ascolti = (val: number) => {
  if (script.audio) {
    script.audio.ascolti_rimanenti = val
  }
}

const set_ascolti_video = (val: number) => {
  if (script.video) {
    script.video.ascolti_rimanenti = val
  }
}

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  border: 2px solid

.drop-zone
  font-weight: 900
  width: 100px
  min-width: 100px
  /* border: 1px dotted black */

.risposta
  cursor: grab
  font-size: small
  font-weight: bold
  text-align: justify
  line-height: 85%
  width: auto

</style>
