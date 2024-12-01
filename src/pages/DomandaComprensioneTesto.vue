<template>
  <q-page class="column"> <!--:style-fn="myTweak"-->
    <PrologoComponent class="col-auto" style="max-height: 70px" :prologo="script.prologo" />
    <q-card flat>
      <q-card-section horizontal>
        <q-card-section class="col-6 container">
          <q-scroll-area class="col-auto text-caption q-my-sm q-mx-md " visible :thumb-style="my_thumbStyle"
            :bar-style="my_barStyle" style="height: calc(70vh)"> <!--:style="HText"-->
            <div class="q-mr-md" v-html="common_api.sanitizeUnicode(script.testo_comprensione)" />
          </q-scroll-area>

          <div v-if="primaDomanda?.immagine" class="col">
            <img-wrap :src="primaDomanda.immagine" size="200px" />
          </div>
          <div v-if="primaDomanda?.audio" class="col q-mt-md">
            <audio-wrap :audio="primaDomanda.audio" @update="set_ascolti" />
          </div>
          <div v-if="primaDomanda?.video" class="col q-mt-md">
            <video-wrap :video="primaDomanda.video" @update="set_ascolti_video" />
          </div>
        </q-card-section>
        <q-card-section class="col-6">
          <q-scroll-area visible :thumb-style="my_thumbStyle" :bar-style="my_barStyle" style="height: calc(70vh)">
            <!--:style="{ height: `${H}px` }" -->
            <div v-for="domanda in domande" :key="domanda.testo" class="domanda q-mr-md">
              <div class="text-overline" v-html="domanda.prologo" />
              <div class="text-subtitle q-ml-md q-my-sm text-weight-bold"
                v-html="common_api.sanitizeUnicode(domanda.testo)" />
              <q-option-group v-model="domanda.rispostaData" class="q-mx-sm q-mb-sm text-weight-medium"
                :options="domanda.risposte" dense color="primary">
                <template #label="risposta">
                  <div class="q-my-sm" :class="{ active: isActive }" v-html="risposta.label" />
                </template>
              </q-option-group>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaComprensioneTesto'
})

import { useSessioneStore } from '../stores/sessione'
import { T_DomandaComprensioneTesto, T_DomandaSceltaSingola, IDomanda } from './models'
import { ref, watch, reactive /*, computed */ } from 'vue'
import PrologoComponent from '../components/PrologoComponent.vue'
import ImgWrap from '../components/ImgWrap.vue'
import { common_api } from '../boot/common-utils'
import AudioWrap from '../components/AudioWrap.vue'
import VideoWrap from '../components/VideoWrap.vue'
import { setAudioPams, setVideoPams, thumbStyle, barStyle } from './common'

const sessione = useSessioneStore()
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaComprensioneTesto
)
const domanda = sessione.domande[sessione.counter][2] as IDomanda

const domande = reactive(
  script.value.domande.domandasceltasingola.map((dss) => ({
    prologo: dss.prologo,
    testo: dss.testo,
    hash: dss.$.hash || '',
    risposte: dss.risposte.risposta.map((item, index) => ({
      testo: item._,
      label: common_api.sanitizeUnicode(item._),
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      style: { 'line-height': '85%', 'font-size': 'small', 'margin-right': '5px', border: '1px solid' }
    })),
    rispostaData: dss.rispostaData
  }))
)

if (typeof script.value.risposta2Server === 'undefined') {
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: domande.reduce((a, v) => ({ ...a, [v.hash]: null }), {})
  }
}

const primaDomanda: T_DomandaSceltaSingola | undefined = script.value.domande.domandasceltasingola.find(
  (domanda) => domanda.audio && domanda.audio.$.url && domanda.audio.$.url != '')

if (primaDomanda) {
  if (primaDomanda.audio) setAudioPams(primaDomanda.audio)
  if (primaDomanda.video) setVideoPams(primaDomanda.video)
}

// const heightText = computed(() => {
//   // console.log(window.innerHeight)
//   const dim = Math.round(script.value.testo_comprensione.length * 0.3 + 50)
//   return dim
// })
// const HText = ref()

watch(domande, (risposte) => {
  risposte.forEach((item, index) => {
    script.value.domande.domandasceltasingola[index].rispostaData =
      item.rispostaData || undefined
    const key = script.value.domande.domandasceltasingola[index].$.hash
    const risposta = item.risposte.find((e) => e.testo == item.rispostaData)
    if (script.value.risposta2Server && key && risposta) {
      script.value.risposta2Server.risposte[key] = risposta?.hash
    } else {
      if (script.value.risposta2Server && key) { script.value.risposta2Server.risposte[key] = '' }
    }
  })
  script.value.logRisposta = risposte.map((item) => {
    const risposta = item.risposte.find((e) => e.testo == item.rispostaData)
    return {
      testo: item.testo,
      risposta: {
        testo: risposta?.testo || null,
        value: risposta?.hash || null
      }
    }
  }
  )
})

const isActive = ref(false)

const set_ascolti = (val: number) => {
  if (primaDomanda && primaDomanda.audio) { primaDomanda.audio.ascolti_rimanenti = val }
}

const set_ascolti_video = (val: number) => {
  if (primaDomanda && primaDomanda.video) {
    primaDomanda.video.ascolti_rimanenti = val
  }
}

const my_thumbStyle = ref<Partial<CSSStyleDeclaration>>(thumbStyle)
const my_barStyle = ref<Partial<CSSStyleDeclaration>>(barStyle)
// const H = ref()
// const myTweak = (offset: number) => {
//   // "offset" is a Number (pixels) that refers to the total
//   // height of header + footer that occupies on screen,
//   // based on the QLayout "view" prop configuration

//   // this is actually what the default style-fn does in Quasar
//   // window.innerHeight
//   H.value = Math.trunc(window.screen.availHeight * 0.50)
//   if (heightText.value < 200) { HText.value = { maxHeight: '360px', height: `${heightText.value}px` } } else { HText.value = { maxHeight: `${H.value}px`, height: `${H.value}px` } }
//   const style = { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
//   return style
// }

</script>

<style lang="sass" scoped>
.senza-scroll
  height: calc(75vh)

.risposta
  font-size: small
  text-align: justify
  line-height: 85%

.domanda
  border-style: solid solid solid solid
  margin-bottom: 10px

.active
  border-style: dotted

</style>
