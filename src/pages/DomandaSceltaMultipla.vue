<template>
  <q-page class="column  senza-scroll">
    <PrologoComponent class="col-auto" style="max-height: 60px" :prologo="script.prologo" />
    <div style="max-height: 250px" class="col-auto scroll text-subtitle1 q-my-sm q-mx-md"
      v-html="common_api.sanitizeUnicode(script.testo)" />
    <div v-if="script.immagine" class="col q-my-sm q-mx-md">
      <img-wrap :src="script.immagine" size="200px" />
    </div>
    <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
      <audio-wrap :audio="script.audio" @update="set_ascolti" />
    </div>
    <div v-if="script.video" class="col q-mt-md">
      <video-wrap :video="script.video" @update="set_ascolti_video" />
    </div>
    <div class="col q-my-sm q-mx-md ">
      <q-option-group v-model="script.rispostaData" inline left-label :options="opzioni" type="checkbox"
        @update:model-value="setRispostaData">
        <template #label="opt">
          <div class="flex flex-left q-mt-sm">
            <span class="q-ml-md text-weight-bold text-left" v-html="opt.label" />
          </div>
        </template>
      </q-option-group>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaMultipla'
})
import { useSessioneStore } from '../stores/sessione'
import { T_DomandaSceltaMultipla, IDomanda } from './models'
import { ref } from 'vue' // , computed
import PrologoComponent from '../components/PrologoComponent.vue'
import AudioWrap from '../components/AudioWrap.vue'
import ImgWrap from '../components/ImgWrap.vue'
import { common_api } from '../boot/common-utils'
import VideoWrap from '../components/VideoWrap.vue'
import { setAudioPams, setVideoPams } from './common'

const sessione = useSessioneStore()
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaMultipla)
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server === 'undefined') {
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: []
  }
}

if (script.value.audio) setAudioPams(script.value.audio)
if (script.value.video) setVideoPams(script.value.video)

const opzioni = ref(
  script.value.risposte.risposta.map((item) => {
    return {
      // hash: item.$.hash,
      label: common_api.sanitizeUnicode(item._),
      value: item,
      disable: false
    }
  })
)
if (!script.value.rispostaData) script.value.rispostaData = []

const setRispostaData = (values: Array<{ $: { hash: string }; _: string }>) => {
  if (values.length == parseInt(script.value.$.risposteCorrette)) {
    if (script.value.rispostaData) {
      opzioni.value.forEach(x => {
        if (!script.value.rispostaData?.includes(x.value)) x.disable = true
        else x.disable = false
      })
    }
  } else opzioni.value.forEach(x => { x.disable = false })
  if (script.value.risposta2Server) {
    script.value.risposta2Server.risposte = values.map((r) => r.$.hash)
    script.value.logRisposta = values.map((r) => ({ testo: r._, value: r.$.hash }))
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
.scelta
  text-align: left !important
  font-size: small

</style>
