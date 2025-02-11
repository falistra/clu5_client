<template>
  <q-page>

    <div class="flex flex-col h-100">

      <PrologoComponent
        class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <div
        class="max-h-60 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-200 shadow-lg shadow-slate-300/50"
        v-html="common_api.sanitizeUnicode(script.testo)" />
      <img-wrap class="max-h-60" v-if="script.immagine" :src="script.immagine" />
      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />
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

import { computed } from 'vue'; // , computed
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

// prova a recuperare dal log
const user = sessione.test?.ID_USER || 'Simulazione';
if (!script.rispostaData) {
  if (user in log.testiScritturaLibera)
    try {
      script.rispostaData =
        log.testiScritturaLibera[user][domanda.id].value || '';
    } catch (error) {
    } { }
}

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
  log.testiScritturaLibera[user][domanda.id].value =
    script.rispostaData as string;
  log.testiScritturaLibera[user][domanda.id].date = moment();
  if (script.risposta2Server) {
    script.risposta2Server.risposte = script.rispostaData;
    script.logRisposta = script.rispostaData;
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

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
