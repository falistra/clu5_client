<template>
  <q-page class="column  senza-scroll">
    <PrologoComponent class="col-auto" style="max-height: 60px" :prologo="script.prologo" />
    <div style="max-height: 250px" class="col-auto scroll text-subtitle1 q-my-sm q-mx-md"
      v-html="common_api.sanitizeUnicode(testoDomanda)"></div>
    <img-wrap v-if="script.immagine" class="col q-my-sm q-mx-md" :src="script.immagine?.$?.url" size="100px" />
    <audio-wrap v-if="script.audio" class="col-auto q-my-sm q-mx-md" :audio="script.audio"
      @update="set_ascolti"></audio-wrap>
    <video-wrap class="col q-mt-md" v-if="script.video" :video="script.video" @update="set_ascolti_video"></video-wrap>

    <div class="col q-my-sm q-mx-md ">
      <q-btn-toggle v-model="script.rispostaData" no-caps dense push glossy toggle-color="primary" :options="opzioni"
        clearable @update:model-value="setRisposta">
        <template v-for="button in opzioni" :key="button.value" v-slot:[button.slot]>
          <div v-if="script.risposte.$ == undefined || script.risposte.$?.tipoopzioni == 'TESTO'"
            class="risposta q-px-sm" v-html="`${common_api.sanitizeUnicode(button.testo)}`">
          </div>
          <div v-if="script.risposte.$?.tipoopzioni == 'IMMAGINE'" class="risposta q-px-sm">
            <ImgWrap :src="button.testo" size="70px" />
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
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaSceltaSingola, IDomanda } from 'pages/models';
import { ref } from 'vue'; // , computed
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils'
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola);
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server == 'undefined')
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: ''
  }

if (script.value.audio && (typeof script.value.audio.$.url == 'undefined' || script.value.audio.$.url == '' || script.value.audio.$.url == 'nessuno'))
  delete script.value.audio

if (script.value.immagine && (typeof script.value.immagine.$.url == 'undefined' || script.value.immagine.$.url == '' || script.value.immagine.$.url == 'nessuno'))
  delete script.value.immagine



if (script.value.audio && typeof script.value.audio.ascolti_rimanenti == 'undefined') {
  script.value.audio.ascolti_rimanenti = parseInt(script.value.audio.$.nrMaxRipetizioni)
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
  script.value.risposte.risposta.map((item, index) => {
    return {
      testo: item._,
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      style: { 'margin-right': '10px', border: '1px solid' },
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
  }
  else {
    testoDomanda.value = ` ${script.value.testo.replace(
      /[_]+/gi,
      ` <span class="text-weight-bold">${common_api.sanitizeUnicode(risposta)} </span> `
    )} `;
    if (script.value.risposta2Server) {
      script.value.risposta2Server.risposte = opzioni.value.find((item) => item.testo == risposta)?.hash || ''
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
</style>
