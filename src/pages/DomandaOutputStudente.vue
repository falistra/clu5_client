<template>
  <q-page>
    <div class="flex flex-col h-100">
      <PrologoComponent
        class="max-h-10 my-1 mx-5 p-1 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />
      <div class="col-auto">
        <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: calc(50vh)"
          class="text-subtitle2 q-my-sm q-mx-md">
          <div class="q-mb-xs q-mr-md testo-domanda">
            <div class="column justify-start">
              <div v-for="(riga, index) in righe" :key="index" class="col">
                <div class="border-4 border-solid my-3 row">
                  <div class="col-5 q-pr-sm q-my-xs text-right testo">
                    {{ riga[0] }}
                  </div>
                  <div class="col-2 border-2 border-dashed" />
                  <div class="col-5 q-pl-sm q-my-xs testo">
                    {{ riga[1] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <div class="col-auto q-mt-xs q-mb-sm risposta">
        <div class="column">
          <div class="row">
            <div class="col-5" />
            <div class="col-2">
              <q-input v-model="script.rispostaData" input-class="text-subtitle1 text-weight-bold"
                :name="`${domanda.id}-risposta`" autofocus clearable rounded :label="t('Risposta')" dense
                @update:model-value="setRisposta" />
            </div>
            <div class="col-5" />
          </div>
        </div>
      </div>
      <div class="col-auto q-ml-md">
        <VirtualKeyboard class="..." @key-pressed="carattere">
          <div class="...">
            <KeyButton v-for="v of i18n.caratteri[linguaDomanda].split('')" :key="`key-${v}`" :value="v" />
          </div>
        </VirtualKeyboard>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaOutputStudente',
});

import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaOutputStudente, IDomanda } from './models';
import { ref, computed } from 'vue';
import PrologoComponent from '../components/PrologoComponent.vue';
import * as Common from './common';
import VideoWrap from '../components/VideoWrap.vue';
import AudioWrap from '../components/AudioWrap.vue';
import { setAudioPams, setVideoPams } from './common';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaOutputStudente;

const domanda = sessione.domande[sessione.counter][2] as IDomanda;

if (typeof script.risposta2Server === 'undefined') {
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: '',
  };
}

if (typeof script.logRisposta === 'undefined') {
  script.logRisposta = null;
}

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);

const linguaDomanda = computed(() => domanda.lingua || sessione.lingua);

const righe = ref(
  script.testo
    .replace(/&nbsp;/g, '')
    .split('<br>')
    .filter(el => el.length > 1)
    .map((el) => el.split(/_+/))
);

import { useI18nStore } from '../stores/i18n';
const i18n = ref(useI18nStore());

const carattere = (key: string) => {
  const campi_input = document.getElementsByName(`${domanda.id}-risposta`);
  if (campi_input) {
    insertAtCaret(key, campi_input[0] as HTMLInputElement);
  }
};

const insertAtCaret = function (
  text: string,
  campo_input?: HTMLInputElement | null
) {
  if (campo_input) {
    let strPos = campo_input.selectionStart || 0;
    const front = campo_input.value.substring(0, strPos);
    const back = campo_input.value.substring(strPos, campo_input.value.length);
    script.rispostaData = front + text + back;
    campo_input.focus();
    strPos = strPos + text.length;
    const scrollPos = campo_input.scrollTop;
    campo_input.selectionStart = strPos;
    campo_input.selectionEnd = strPos;
    campo_input.scrollTop = scrollPos;
  }
};

const setRisposta = () => {
  if (script.risposta2Server)
    script.risposta2Server.risposte = script.rispostaData;
  script.logRisposta = script.rispostaData;
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

.testo
    font-size: small
</style>
