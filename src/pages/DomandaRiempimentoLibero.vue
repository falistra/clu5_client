<template>
  <q-page class="column">
    <PrologoComponent
      class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
      :prologo="script.prologo" />
    <img-wrap class="max-h-60" v-if="script.immagine" :src="script.immagine" />
    <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
    <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />
    <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle"
      style="height: calc(100vh); max-height: calc(100vh)" class="col-auto text-subtitle2 q-my-sm q-mx-md">
      <div class="text-subtitle q-mr-lg">
        <span v-for="item in tokens" :key="item.index">
          <span v-if="!item.isSlot" v-html="item.content" />
          <span v-else-if="item.isSlot">
            <input class="m-2 px-2 rounded hover:rounded-lg bg-slate-200 border-solid hover:border-dotted"
              :id="`campo_input_${item.index}`" v-model="script.rispostaData[item.slotIndex]"
              :name="`slot_${item.slotIndex}`" @focus="() => {
                currentSlot = item.slotIndex;
              }
                " />
          </span>
        </span>
      </div>
    </q-scroll-area>
    <div class="col">
      <VirtualKeyboard class="..." @key-pressed="carattere">
        <div class="...">
          <KeyButton v-for="v of i18n.caratteri[linguaDomanda].split('')" :key="`key-${v}`" :value="v" />
        </div>
      </VirtualKeyboard>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoLibero',
});

import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiempimentoLibero, T_Token, IDomanda } from './models';
import { ref, computed, watch, onMounted } from 'vue';

import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';

import * as Common from './common';

const sessione = useSessioneStore();
import { useI18nStore } from '../stores/i18n';

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoLibero;

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

const i18n = ref(useI18nStore());

let primo_campo_input_indice = -1;
const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = !!slot;
    const risposta = script.rispostaData ? script.rispostaData[slotIndex] : '';
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    if (primo_campo_input_indice == -1 && isSlot)
      primo_campo_input_indice = index;
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const focusInput = () => {
  const primo_campo_input = document.getElementById(
    `campo_input_${primo_campo_input_indice}`
  ) as HTMLInputElement;
  if (primo_campo_input) {
    primo_campo_input.focus();
  }
};

onMounted(focusInput);

const currentSlot = ref<string>('');

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

const carattere = (key: string) => {
  const campi_input = document.getElementsByName(`slot_${currentSlot.value}`);
  if (campi_input) {
    insertAtCaret(key, campi_input[0] as HTMLInputElement);
  }
};

const insertAtCaret = function (
  text: string,
  campo_input?: HTMLInputElement | null
) {
  if (campo_input) {
    const token = tokens.value?.find(
      (item) => item.slotIndex == currentSlot.value
    );
    if (token) {
      let strPos = campo_input.selectionStart || 0;
      const front = campo_input.value.substring(0, strPos);
      const back = campo_input.value.substring(
        strPos,
        campo_input.value.length
      );
      token.content = front + text + back;
      if (script.rispostaData)
        script.rispostaData[currentSlot.value] = front + text + back;
      campo_input.focus();
      strPos = strPos + text.length;
      const scrollPos = campo_input.scrollTop;
      campo_input.selectionStart = strPos;
      campo_input.selectionEnd = strPos;
      campo_input.scrollTop = scrollPos;
    }
  }
};
</script>
