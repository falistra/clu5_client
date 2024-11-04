<template>
  <q-page class="column  senza-scroll">
    <PrologoComponent class="col-auto" style="max-height: 60px" :prologo="script.prologo" />
    <div style="max-height: 250px" class="col-auto scroll text-subtitle1 q-my-sm q-mx-md"
      v-html="common_api.sanitizeUnicode(testoDomanda)"></div>
    <div v-if="script.immagine" class="col q-my-sm q-mx-md">
      <img-wrap :src="script.immagine" size="100px" />
    </div>
    <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
      <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
    </div>
    <div v-if="script.video" class="col q-mt-md">
      <video-wrap :video="script.video" @update="set_ascolti_video"></video-wrap>
    </div>
    <div class="col q-my-sm q-mx-md ">
      <q-btn-toggle class="shadow-5" v-model="script.rispostaData" no-caps dense push toggle-color="primary"
        :options="opzioni" clearable @update:model-value="setRisposta">
        <template v-for="button in opzioni" :key="button.value" v-slot:[button.slot]>
          <div v-if="script.risposte.$ == undefined || script.risposte.$?.tipoopzioni == 'TESTO'" class="risposta"
            v-html="`${common_api.sanitizeUnicode(button.testo)}`">
          </div>
          <div v-if="script.risposte.$?.tipoopzioni == 'IMMAGINE'" class="risposta q-px-sm">
            <ImgWrap :src="{ $: { url: button.testo } }" size="70px" />
          </div>
        </template>
      </q-btn-toggle>
    </div>
  </q-page>
</template>

<script setup lang="ts">

defineOptions({
  name: 'DomandaSceltaSingola',
});
import { useSessioneStore } from '../stores/sessione';
import { T_DomandaSceltaSingola, IDomanda } from './models';
import { ref } from 'vue'; // , computed
import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import { common_api } from '../boot/common-utils'
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams, sanitazeScript } from './common'

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola);
sanitazeScript(script.value)
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server == 'undefined')
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: ''
  }

if (script.value.audio) setAudioPams(script.value.audio)
if (script.value.video) setVideoPams(script.value.video)

let testoDomanda = ref(
  !script.value.rispostaData
    ? script.value.testo.replace(/([_]+)/gi, '<span class="text-weight-bold">$1</span>')
    : script.value.testo.replace(
      /([_]+)/gi,
      `<span class="text-weight-bold"> ${script.value.rispostaData} </span>`
    )
);

const opzioni = ref(
  script.value.risposte.risposta.map((item, index, risposte) => {
    return {
      testo: item._,
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      // style diverso per l'ultimo elemento
      style: index < risposte.length - 1 ? { 'margin-right': '10px', border: '1px solid' } : { 'margin-right': '0px', border: '1px solid' },
      class: 'risposte',
    };
  })
);

const setRisposta = (risposta: string) => {
  if (!risposta) {
    testoDomanda.value = script.value.testo.replace(
      /([_]+)/gi,
      '<span class="text-weight-bold">$1</span>'
    );
    if (script.value.risposta2Server)
      script.value.risposta2Server.risposte = ''
    script.value.logRisposta = { testo: null, value: null }
  }
  else {
    testoDomanda.value = ` ${script.value.testo.replace(
      /[_]+/gi,
      ` <span class="text-weight-bold">${common_api.sanitizeUnicode(risposta)} </span> `
    )} `;
    if (script.value.risposta2Server) {
      script.value.risposta2Server.risposte = opzioni.value.find((item) => item.testo == risposta)?.hash || ''
    }
    const rispostaData = opzioni.value.find((item) => item.testo == risposta)
    script.value.logRisposta = {
      testo: rispostaData?.testo || null, value: rispostaData?.hash || null
    }
  }
};

const set_ascolti = (val: number) => {
  if (script.value.audio) {
    script.value.audio.ascolti_rimanenti = val
  }
}

const set_ascolti_video = (val: number) => {
  if (script.value.video) {
    script.value.video.ascolti_rimanenti = val
  }
}

</script>


<style lang="sass" scoped>
.senza-scroll
  height: calc(75vh)

.risposta
  font-size: medium
  text-align: justify
  line-height: 85%

.risposta:last-child
  margin-right: 0px

</style>
