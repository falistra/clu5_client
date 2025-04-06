<template>
  <q-page class="column senza-scroll">

    <PrologoComponent
      class="my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
      :prologo="script.prologo" />
    <img-wrap class="max-h-60" v-if="script.immagine" :src="script.immagine" />
    <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
    <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />
    <div class="my-5 mx-5" v-html="testo_quesito"></div>
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]"> -->
    <TastieraVirtuale :linguaDomanda="linguaDomanda" @update="carattere" />
    <!-- </q-page-sticky> -->
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTestoLibero',
});

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiempimentoTestoLibero, IDomanda } from './models';
import { ref, computed, watch, onMounted } from 'vue';

import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import TastieraVirtuale from '../components/TastieraVirtuale.vue';
import { setAudioPams, setVideoPams } from './common';
import { common_api } from '../boot/common-utils';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTestoLibero;
if (!script.rispostaData) script.rispostaData = {};
const domanda = sessione.domande[sessione.counter][2] as IDomanda;

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
const linguaDomanda = computed(() => domanda.lingua || sessione.lingua);

watch(script.rispostaData, (rispostaData) => {
  if (script.risposta2Server) {
    if (rispostaData) {
      script.risposta2Server.risposte = rispostaData;
      script.logRisposta = rispostaData;
    }
  }
});

const currentSlot = ref<string>('');

const testo_quesito = ref(common_api.sanitizeUnicode(script.testo.replace(/(\_+)(\d+)(\_+)/g, `<INPUT CLASS='font-medium text-blue-600 placeholder:text-gray-500 m-2 px-2 rounded hover:rounded-lg bg-slate-200 border-solid hover:border-dotted slot-RTL-${domanda.id}' placeholder='__________________________'  ID='${domanda.id}-$2'></INPUT>`)))

const campiInput = () => {
  const inputs = document.querySelectorAll(`input.slot-RTL-${domanda.id}`)
  inputs.forEach((el, key) => {
    if (key == 0) { // primo elemento
      (el as HTMLInputElement).focus()
    }
    const campo_input = el as HTMLInputElement
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_id, slot] = campo_input.id.split('-')
    campo_input.value = script.rispostaData[slot] || ''

    function updateValue(e: Event) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_idDomanda_, idSlot] = (e.target as HTMLInputElement).id.split('-')
      const value = (e.target as HTMLInputElement).value
      if (value) script.rispostaData[idSlot] = value
      else delete script.rispostaData[idSlot]
    }
    (el as HTMLElement).addEventListener('change', updateValue)

    function setCurrentInput(e: Event) {
      currentSlot.value = (e.target as HTMLInputElement).id
    }
    (el as HTMLElement).addEventListener('focus', setCurrentInput)
  })
};

onMounted(campiInput);

const carattere = (key: string) => {
  const campo_input = document.getElementById(`${currentSlot.value}`);
  if (campo_input) {
    insertAtCaret(key, campo_input as HTMLInputElement);
  }
};

const insertAtCaret = function (
  text: string,
  campo_input?: HTMLInputElement | null
) {
  if (campo_input) {
    let strPos = campo_input.selectionStart || 0;
    const front = campo_input.value.substring(0, strPos);
    const back = campo_input.value.substring(
      strPos,
      campo_input.value.length
    );
    if (script.rispostaData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_idDomanda_, idSlot] = currentSlot.value.split('-')
      script.rispostaData[idSlot] = campo_input.value = front + text + back;
    }
    campo_input.focus();
    strPos = strPos + text.length;
    const scrollPos = campo_input.scrollTop;
    campo_input.selectionStart = strPos;
    campo_input.selectionEnd = strPos;
    campo_input.scrollTop = scrollPos;
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
</script>
