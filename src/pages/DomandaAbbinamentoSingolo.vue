<template>
  <q-page>
    <div class="column" style="height: calc(90vh)">
      <div class="col-auto scroll" style="max-height: 70px">
        <PrologoComponent :prologo="script.prologo" />
      </div>
      <div class="col-auto q-mt-sm q-mx-sm q-shadow-10">
        <div class="row" style="height: calc(75vh)">
          <div class="col-6 ">
            <div class="column">
              <div style="max-height: 150px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md"
                v-html="common_api.sanitizeUnicode(script.testo)" />
              <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
                <audio-wrap :audio="script.audio" @update="set_ascolti" />
              </div>
              <div v-if="script.video" class="col-auto q-mt-md">
                <video-wrap :video="script.video" @update="set_ascolti_video" />
              </div>
            </div>
            <q-scroll-area class="col-auto" style="height: calc(60vh)" visible :thumb-style="thumbStyle"
              :bar-style="barStyle">
              <div class="q-pa-sm">
                <q-list dense separator>
                  <div class="column">
                    <q-item v-for="item in script.partiFisse.item" :key="item.$.hash" class="col-auto">
                      <q-item-section>
                        <div class="row">
                          <div class="col-6 parte-fissa text-caption">
                            <div v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'" class="q-ma-xs">
                              <ImgWrap :src="{ $: { url: item._ } }" size="200px" />
                            </div>
                            <div v-else class="q-ma-sm item" v-html="item.label" />
                          </div>
                          <div class="col-6 bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                            @drop="onDrop($event, item)" @dblclick="annulla(item)">
                            <div class="text-subtitle q-ma-sm item">
                              <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                                <strong>{{ $t('Doppio_click') }}</strong>
                              </q-tooltip>
                              <span v-html="item.rispostaData?.label" />
                            </div>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </div>
            </q-scroll-area>
          </div>
          <div class="col-6 ">
            <q-scroll-area style="height: calc(70vh)" visible :thumb-style="thumbStyle" :bar-style="barStyle">
              <q-list dense class="q-mr-lg">
                <q-item v-for="item in lista_risposte_disponibili" :key="item.$.hash" class="q-my-sm">
                  <q-item-section side>
                    <div class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                      <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                        <strong>{{ $t('Trascina') }}</strong>
                      </q-tooltip>
                      <span class="bg-teal-1 q-pa-xs  text-weight-medium" v-html="item.label" />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaAbbinamentoSingolo'
})
import { useSessioneStore } from '../stores/sessione'
import { T_DomandaAbbinamentoSingolo, IDomanda } from './models'
import { ref, reactive, computed, watch } from 'vue'
import * as Common from './common'
import PrologoComponent from '../components/PrologoComponent.vue'
import ImgWrap from '../components/ImgWrap.vue'
import { common_api } from '../boot/common-utils'
import AudioWrap from '../components/AudioWrap.vue'
import VideoWrap from '../components/VideoWrap.vue'
import { setAudioPams, setVideoPams } from './common'

const sessione = useSessioneStore()
const script = reactive(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoSingolo
)
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)

script.partiMobili.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))
script.partiFisse.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))

if (typeof script.risposta2Server === 'undefined') {
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }
}

watch(script.partiFisse, (partiFisse) => {
  partiFisse.item.forEach((item) => {
    if (script.risposta2Server) {
      if (item.rispostaData) {
        script.risposta2Server.risposte[item.$.hash] = item.rispostaData.$.hash
      }
    }
  })

  script.logRisposta = partiFisse.item
    .filter(item => item.rispostaData)
    .map((item) => {
      return {
        fisso: { testo: item._, value: item.$.hash },
        mobile: { testo: item.rispostaData?._, value: item.rispostaData?.$.hash }
      }
    })
})

script.partiMobili.item.forEach((item) => {
  const risposta_presente = script.partiFisse.item.find(
    (value) => {
      if (value.rispostaData && value.rispostaData.$.hash == item.$.hash) return true
      else return false
    }
  )
  item.disponibile = !risposta_presente
})

interface Item {
  $: { hash: string };
  _: string;
  rispostaData?: { $: { hash: string }; _: string };
}

const isDragging = ref(false)

const startDrag = (evt: DragEvent, item: Item) => {
  if (evt) { (((evt as Event).target) as Element).classList.add('dragging') }
  if (evt.dataTransfer) {
    isDragging.value = true
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.clearData()
    evt.dataTransfer.setData('risposta', item.$.hash)
  }
}

const lista_risposte_disponibili = computed(() =>
  script.partiMobili.item.filter((value) => value.disponibile)
)

const onDrop = function (evt: DragEvent, item: Item) {
  if (evt.dataTransfer) {
    if (item.rispostaData) {
      const item_ = script.partiMobili.item.find(
        (value) =>
          value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
      )
      item.rispostaData = undefined
      if (item_) item_.disponibile = true
    }

    const risposta_data_hash = evt.dataTransfer.getData('risposta')
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    )
    if (risposta_data) {
      risposta_data.disponibile = false
      item.rispostaData = risposta_data
    }
  }
}

const annulla = (item: Item) => {
  const item_ = script.partiMobili.item.find(
    (value) => value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
  )
  item.rispostaData = undefined
  if (item_) item_.disponibile = true
}

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)

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

.zona-ricevente
  border-top: 2px solid black
  border-bottom: 2px solid black
  min-height: 20px
  min-width: 150px

.parte-fissa
  border: 2px solid black
  /* min-height: 40px */

.item
  cursor: grab
  font-size: small
  font-weight: bold
  text-align: justify
  width: auto

.dragging
  background-color : $indigo-2
</style>
