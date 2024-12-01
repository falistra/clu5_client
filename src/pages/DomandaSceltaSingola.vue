<template>
  <q-page>
    <div class="column" style="height: calc(100vh)">
      <PrologoComponent class="col-auto self-start q-mt-md q-mx-sm" :prologo="script.prologo" />
      <div style="max-height: calc(30vh); overflow:auto" class="col-auto scroll text-subtitle1 q-my-md q-mx-md"
        v-html="common_api.sanitizeUnicode(testoDomanda)" />
      <img-wrap v-if="script.immagine" class="col q-my-md q-mx-md" :src="script.immagine" />
      <audio-wrap v-if="script.audio" class="col q-my-md q-mx-md" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" class="col q-my-md q-mx-md" :video="script.video" @update="set_ascolti_video" />
      <div class="col-auto q-my-md q-mx-md ">
        <q-btn-toggle v-model="script.rispostaData" class="shadow-5" no-caps dense push toggle-color="primary"
          :options="opzioni" clearable @update:model-value="setRisposta">
          <template v-for="button in opzioni" :key="button.value" #[button.slot]>
            <div v-if="script.risposte.$ == undefined || script.risposte.$?.tipoopzioni == 'TESTO'" class="risposta"
              v-html="`${common_api.sanitizeUnicode(button.testo)}`" />
            <div v-if="script.risposte.$?.tipoopzioni == 'IMMAGINE'" class="risposta q-px-sm">
              <ImgWrap :src="{ $: { url: button.testo } }" size="70px" />
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

defineOptions({
  name: 'DomandaSceltaSingola'
})
import { useSessioneStore } from '../stores/sessione'
import { T_DomandaSceltaSingola, IDomanda } from './models'
import { ref } from 'vue' // , computed
import PrologoComponent from '../components/PrologoComponent.vue'
import AudioWrap from '../components/AudioWrap.vue'
import ImgWrap from '../components/ImgWrap.vue'
import { common_api } from '../boot/common-utils'
import VideoWrap from '../components/VideoWrap.vue'
import { setAudioPams, setVideoPams, sanitazeScript } from './common'

const sessione = useSessioneStore()
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola)
sanitazeScript(script.value)
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server === 'undefined') {
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: ''
  }
}

if (script.value.audio) setAudioPams(script.value.audio)
if (script.value.video) setVideoPams(script.value.video)

const testoDomanda = ref(
  !script.value.rispostaData
    ? script.value.testo.replace(/([_]+)/gi, '<span class="text-weight-bold">$1</span>')
    : script.value.testo.replace(
      /([_]+)/gi,
      `<span class="text-weight-bold"> ${script.value.rispostaData} </span>`
    )
)

const opzioni = ref(
  script.value.risposte.risposta.map((item, index, risposte) => {
    return {
      testo: item._,
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      // style diverso per l'ultimo elemento
      style: index < risposte.length - 1 ? { 'margin-right': '10px', border: '1px solid' } : { 'margin-right': '0px', border: '1px solid' },
      class: 'risposte'
    }
  })
)

const setRisposta = (risposta: string) => {
  if (!risposta) {
    testoDomanda.value = script.value.testo.replace(
      /([_]+)/gi,
      '<span class="text-weight-bold">$1</span>'
    )
    if (script.value.risposta2Server) { script.value.risposta2Server.risposte = '' }
    script.value.logRisposta = { testo: null, value: null }
  } else {
    testoDomanda.value = ` ${script.value.testo.replace(
      /[_]+/gi,
      ` <span class="text-weight-bold">${common_api.sanitizeUnicode(risposta)} </span> `
    )} `
    if (script.value.risposta2Server) {
      script.value.risposta2Server.risposte = opzioni.value.find((item) => item.testo == risposta)?.hash || ''
    }
    const rispostaData = opzioni.value.find((item) => item.testo == risposta)
    script.value.logRisposta = {
      testo: rispostaData?.testo || null, value: rispostaData?.hash || null
    }
  }
}

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

.risposta
  font-size: medium
  text-align: justify
  line-height: 85%

.risposta:last-child
  margin-right: 0px

</style>
