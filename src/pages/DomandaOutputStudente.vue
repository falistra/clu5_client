<template>
  <q-page class="column  senza-scroll">
    <PrologoComponent class="col-auto" style="max-height: 60px" :prologo="script.prologo" />
    <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
      <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
    </div>
    <div v-if="script.video" class="col-auto q-mt-md">
      <video-wrap :video="script.video" @update="set_ascolti_video"></video-wrap>
    </div>
    <div class="col-auto">
      <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: calc(50vh)"
        class="text-subtitle2 q-my-sm q-mx-md">
        <div class="q-mb-xs q-mr-md testo-domanda">
          <div class="column justify-start">
            <div class="col" v-for="(riga, index) in righe" :key="index">
              <div class="row">
                <div class="col-5">
                  <div class="q-pr-sm  q-my-xs text-right testo">{{ riga[0] }}</div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="q-pl-sm q-my-xs testo">{{ riga[1] }}</div>
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
          <div class="col-5"></div>
          <div class="col-2">
            <q-input input-class="text-subtitle1 text-weight-bold" v-model="script.rispostaData" name="risposta"
              autofocus clearable rounded :label="t('Risposta')" @update:model-value="setRisposta" dense />
          </div>
          <div class="col-5"></div>
        </div>
      </div>
    </div>
    <div class="col-auto q-ml-md">
      <VirtualKeyboard class="..." @key-pressed="carattere">
        <div class="...">
          <KeyButton v-for="v of i18n.caratteri[sessione.lingua].split('')" :key="`key-${v}`" :value="v" />
        </div>
      </VirtualKeyboard>
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
const { t } = useI18n()

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaOutputStudente, IDomanda } from './models';
import { ref } from 'vue';
import PrologoComponent from '../components/PrologoComponent.vue';
import * as Common from './common';
import VideoWrap from '../components/VideoWrap.vue';
import AudioWrap from '../components/AudioWrap.vue';
import { setAudioPams, setVideoPams } from './common'

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaOutputStudente;

const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: ''
  }

if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)

const righe = ref(script.testo
  .replace(/&nbsp;/g, '').split('<br>')
  .map((el) => el.split(/_+/)))

import { useI18nStore } from 'stores/i18n';
const i18n = ref(useI18nStore());

const carattere = (key: string) => {
  const campi_input = document.getElementsByName('risposta')
  if (campi_input) {
    insertAtCaret(key, campi_input[0] as HTMLInputElement)
  }
};


const insertAtCaret = function (text: string, campo_input?: HTMLInputElement | null) {
  if (campo_input) {
    var strPos = campo_input.selectionStart || 0;
    const front = (campo_input.value).substring(0, strPos);
    const back = (campo_input.value).substring(strPos, campo_input.value.length);
    script.rispostaData = front + text + back;
    campo_input.focus();
    strPos = strPos + text.length;
    const scrollPos = campo_input.scrollTop;
    campo_input.selectionStart = strPos;
    campo_input.selectionEnd = strPos;
    campo_input.scrollTop = scrollPos;
  }
}

const setRisposta = () => {
  if (script.risposta2Server) script.risposta2Server.risposte = script.rispostaData
  script.logRisposta = script.rispostaData

}

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
  width: 98%
  border: 2px solid

.testo-domanda
  .column > .col > .row > div
    border: 1px solid black

.testo
    font-size: small
    font-weight : bold
    line-height: 90%

</style>
