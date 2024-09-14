<template>
  <q-page class="column items-center justify-center">
    <PrologoComponent class="col-1" :prologo="script.prologo" />
    <div class="col text-h6 q-mt-lg q-mx-md" v-html="common_api.sanitizeUnicode(testoDomanda)"></div>
    <img-wrap v-if="script.immagine" class="col" :src="script.immagine?.$?.url" size="150px" />
    <audio-wrap v-if="script.audio" class="col" :audio="script.audio" @update="set_ascolti"></audio-wrap>
    <div class="col q-mt-md">
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
import { T_DomandaSceltaSingola } from 'pages/models';
import { ref } from 'vue'; // , computed
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import ImgWrap from 'src/components/ImgWrap.vue';

import { common_api } from 'src/boot/common-utils'
import { setAudioPams } from 'pages/common'

// const sanitizeUnicode = (testo: string) => testo.replace(/\%u(\d+)/g, '&#x$1;')

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola);
if (script.value.audio && typeof script.value.audio.ascolti_rimanenti == 'undefined') {
  script.value.audio.ascolti_rimanenti = parseInt(script.value.audio.$.nrMaxRipetizioni)
}
if (script.value.audio) setAudioPams(script.value.audio)

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
      slot: index.toString(),
      style: { 'margin-right': '10px', border: '1px solid' },
      class: 'risposte',
    };
  })
);

const setRisposta = (risposta: string) => {
  if (!risposta)
    testoDomanda.value = script.value.testo.replace(
      /([_]+)/gi,
      '<span class="text-weight-bold">$1</span>'
    );
  else
    testoDomanda.value = ` ${script.value.testo.replace(
      /[_]+/gi,
      ` <span class="text-weight-bold">${common_api.sanitizeUnicode(risposta)} </span> `
    )} `;
};

const set_ascolti = (val: number) => {
  if (script.value.audio) {
    script.value.audio.ascolti_rimanenti = val
  }
}

</script>

<style lang="sass" scoped>
.risposta
  font-size: medium
  text-align: justify
  line-height: 85%
</style>
