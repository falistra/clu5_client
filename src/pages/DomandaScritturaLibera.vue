<template>
  <q-page>

    <div class="flex flex-col">

      <PrologoComponent
        class="my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <div class="quesito my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded bg-slate-200 shadow-lg shadow-slate-300/50"
        v-html="testo" />
      <img-wrap class="my-1" v-if="script.immagine" :src="script.immagine" />
      <audio-wrap class="my-1" v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap class="col my-1" v-if="script.video" :video="script.video" @update="set_ascolti_video" />
      <div class="col q-mt-sm q-my-md">
        <div class="row items-center justify-center">
          <q-input v-model="script.rispostaData" class="col-7" autofocus outlined type="textarea"
            :name="`${domanda.id}-risposta`" bg-color="teal-1" input-class="text-body1 text-justify"
            @update:model-value="setRisposta">
            <q-badge v-if="script.rispostaData" color="primary" floating style="top: 4px">
              {{ $t('Numero_Parole') }}
              {{ script.rispostaData.trim().split(/\s+/).length }}
            </q-badge>
          </q-input>
        </div>
      </div>
      <TastieraVirtuale :linguaDomanda="linguaDomanda" @update="carattere" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// str.trim().split(/\s+/).length;
defineOptions({
  name: 'DomandaScritturaLibera',
});

import moment from 'moment';

import { useSessioneStore } from '../stores/sessione';
import { useLogStore } from '../stores/log';
import { T_DomandaScritturaLibera, IDomanda } from './models';

import { computed, onUnmounted } from 'vue'; // , computed
import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import { common_api } from '../boot/common-utils';
import VideoWrap from '../components/VideoWrap.vue';
import TastieraVirtuale from '../components/TastieraVirtuale.vue';
import { setAudioPams, setVideoPams } from './common';

const sessione = useSessioneStore();
const log = useLogStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaScritturaLibera;
const domanda = sessione.domande[sessione.counter][2] as IDomanda;

const testo = common_api.sanitizeUnicode(script.testo)
  .replace(/<div>\s+<\/div>/g, '<div><br/><\/div>')
  .replace(/<br>/g, '<br/>')
  .replace(/<\/p><p>/g, '</p><br/><p>')

// prova a recuperare dal log
const user = sessione.test?.ID_USER || 'Simulazione';

if (typeof script.risposta2Server === 'undefined') {
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: script.rispostaData || '',
  };
}

if (user in log.testiScritturaLibera) {
  // console.log('log.testiScritturaLibera', log.testiScritturaLibera[user]);
  if (domanda.id in log.testiScritturaLibera[user]) {
    // console.log('log.testiScritturaLibera[user][domanda.id]', log.testiScritturaLibera[user][domanda.id]);
    script.rispostaData = log.testiScritturaLibera[user][domanda.id].value || '';
    script.risposta2Server.risposte = script.rispostaData
    // console.log('script.risposta2Server', script.risposta2Server.risposte);
    script.logRisposta = script.rispostaData;
  }
}


if (typeof script.logRisposta === 'undefined') {
  script.logRisposta = null;
}

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);
const linguaDomanda = computed(() => domanda.lingua || sessione.lingua);

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

  if (!(user in log.testiScritturaLibera)) log.testiScritturaLibera[user] = {};
  if (!(domanda.id in log.testiScritturaLibera[user]))
    log.testiScritturaLibera[user][domanda.id] = {};

  log.testiScritturaLibera[user][domanda.id].value = script.rispostaData || '';
  log.testiScritturaLibera[user][domanda.id].date = moment();

  if (script.risposta2Server) {
    script.risposta2Server.risposte = script.rispostaData || '';
    // console.log('script.risposta2Server', script.risposta2Server.risposte);
    script.logRisposta = script.rispostaData || '';
  }
};

onUnmounted(() => {
  // console.log('onUnMounted');
  // console.log('script.rispostaData', script.rispostaData);
  // console.log('script.risposta2Server', script.risposta2Server);
  if (script.risposta2Server) {
    script.risposta2Server.risposte = script.rispostaData || '';
    // console.log('script.risposta2Server', script.risposta2Server);
    script.logRisposta = script.rispostaData || '';
  }
});



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

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid

.quesito
    font-family: sans-serif
    font-style: normal
    font-variant: normal
    font-weight: normal
    font-size: medium
    line-height: 150%
    word-spacing: normal
    letter-spacing: normal
    text-decoration: none
    text-transform: none
    text-align: left
    text-indent: 0ex
    padding:10px


</style>
