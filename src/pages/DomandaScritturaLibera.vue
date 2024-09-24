<template>
  <q-page class="column  senza-scroll">
    <PrologoComponent class="col-auto" style="max-height: 60px" :prologo="script.prologo" />
    <div style="max-height: 250px" class="col-auto scroll text-subtitle1 q-my-sm q-mx-md"
      v-html="common_api.sanitizeUnicode(script.testo)"></div>
    <img-wrap v-if="script.immagine" class="col q-my-sm q-mx-md" :src="script.immagine" size="100px" />
    <audio-wrap v-if="script.audio" class="col-auto q-my-sm q-mx-md" :audio="script.audio"
      @update="set_ascolti"></audio-wrap>
    <video-wrap class="col q-mt-md" v-if="script.video" :video="script.video" @update="set_ascolti_video"></video-wrap>
    <q-input class="col" v-model="script.rispostaData" filled type="textarea" name="risposta"
      @update:model-value="setRisposta" />
    <div class="col">
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
  name: 'DomandaScritturaLibera',
});

import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaScritturaLibera, IDomanda } from 'pages/models';

import { ref } from 'vue'; // , computed
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils'
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'


const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaScritturaLibera;
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: ''
  }

if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)

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
  console.log(script.risposta2Server)
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

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
