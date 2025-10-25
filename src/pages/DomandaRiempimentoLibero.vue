<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-page class="column senza-scroll">
    <PrologoComponent
      class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
      :prologo="script.prologo" />
    <img-wrap v-if="script.immagine" :src="script.immagine" />
    <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
    <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />
    <div :id='domanda.id' class="col-auto q-mt-sm q-mx-md" v-html='testo_quesito'></div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <TastieraVirtuale :linguaDomanda="linguaDomanda" @update="carattere" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoLibero',
});

import TastieraVirtuale from '../components/TastieraVirtuale.vue';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiempimentoLibero, IDomanda } from './models';
import { ref, computed, watch, onMounted } from 'vue';

import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';

// import * as Common from './common';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoLibero;

if (!script.rispostaData) script.rispostaData = {};
const domanda = sessione.domande[sessione.counter][2] as IDomanda;
sessione.log_STAZIONI[sessione.id_stazione_corrente].idsDomandeVisualizzate?.push(domanda.id);

const linguaDomanda = computed(() => domanda.lingua || sessione.lingua);

if (typeof script.risposta2Server === 'undefined') {
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {},
  };
}

if (typeof script.logRisposta === 'undefined') {
  script.logRisposta = {};
}

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);


watch(script.rispostaData, (rispostaData) => {
  if (script.risposta2Server) {
    if (rispostaData) {
      script.risposta2Server.risposte = rispostaData;
      script.logRisposta = rispostaData;
    }
  }
});

const testo_quesito = ref(script.testo.replace(/(\_+)(\d+)(\_+)/g, `<INPUT CLASS='slot-RL italic font-medium text-blue-600 placeholder:text-gray-500 m-2 px-2 rounded hover:rounded-lg bg-slate-200 border-solid hover:border-dotted' TYPE='TEXT' ID='${domanda.id}_$2'></INPUT>`))
testo_quesito.value = testo_quesito.value.replace(/%u(....)/g, '&#x$1;')

let inputElementCorrente: HTMLInputElement;

onMounted(() => {
  const slots = document.getElementById(`${domanda.id}`)?.getElementsByClassName('slot-RL')
  Array.from(slots || []).forEach((slot, index) => {
    const inputElement = slot as HTMLInputElement;
    const slotIndex = inputElement.id.split('_')[1]
    if (script.rispostaData[slotIndex])
      inputElement.value = script.rispostaData[slotIndex]

    inputElement.addEventListener('focus', (e: Event) => {
      const inputEvent = e as InputEvent
      inputElementCorrente = inputEvent.target as HTMLInputElement
    });

    if (index === 0) {
      inputElement.focus()
    }

    inputElement.addEventListener('change', (e: Event) => {
      const inputEvent = e as InputEvent
      const inputElement = inputEvent.target as HTMLInputElement
      const slotIndex = inputElement.id.split('_')[1]
      script.rispostaData[slotIndex] = inputElement.value
    });
  })

})

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

// const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle);
// const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle);

const carattere = (key: string) => {
  insertAtCaret(key, inputElementCorrente);
};

const insertAtCaret = function (
  text: string,
  campo_input?: HTMLInputElement | null
) {
  if (campo_input) {
    const slotIndex = campo_input.id.split('_')[1]
    let strPos = campo_input.selectionStart || 0;
    const front = campo_input.value.substring(0, strPos);
    const back = campo_input.value.substring(
      strPos,
      campo_input.value.length
    );
    campo_input.value = front + text + back;
    if (script.rispostaData)
      script.rispostaData[slotIndex] = front + text + back;
    campo_input.focus();
    strPos = strPos + text.length;
    const scrollPos = campo_input.scrollTop;
    campo_input.selectionStart = strPos;
    campo_input.selectionEnd = strPos;
    campo_input.scrollTop = scrollPos;
  }
};
</script>
