<template>
  <q-page>
    <div class="flex flex-col h-100">
      <PrologoComponent style="max-height: calc(40vh)"
        class="my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <div
        class="max-h-40 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-200 shadow-lg shadow-slate-300/50"
        v-html="common_api.sanitizeUnicode(script.testo)" />
      <img-wrap class="max-h-60" v-if="script.immagine" :src="script.immagine" />
      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />

      <q-badge color="red" class="ml-2 w-40">
        <q-icon name="warning" color="white" class="q-ml-xs" />
        Risposte corrette: {{ script.$.risposteCorrette }}
      </q-badge>
      <div style="max-height: calc(40vh)">
        <q-scroll-area visible :thumb-style="my_thumbStyle" :bar-style="my_barStyle" style="height: calc(40vh)"
          class="mr-5">
          <div class="mt-3 mx-3 grid p-2 place-content-center">
            <q-option-group v-model="script.rispostaData" :options="opzioni" dense type="checkbox"
              @update:model-value="setRispostaData">
              <template #label="opt">
                <div class="flex flex-left q-mt-sm">
                  <span class="q-ml-md text-weight-bold text-left" v-html="opt.label" />
                </div>
              </template>
            </q-option-group>
          </div>
        </q-scroll-area>
      </div>
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
import { setAudioPams, setVideoPams, thumbStyle, barStyle } from './common'
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

if (typeof script.value.logRisposta === 'undefined') {
  script.value.logRisposta = null
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

const my_thumbStyle = ref<Partial<CSSStyleDeclaration>>(thumbStyle)
const my_barStyle = ref<Partial<CSSStyleDeclaration>>(barStyle)

</script>

<style lang="sass" scoped>
.scelta
  text-align: left !important
  font-size: small

</style>
