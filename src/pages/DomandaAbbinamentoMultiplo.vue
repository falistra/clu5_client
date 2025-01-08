<template>
  <q-page>
    <div class="column" style="height: calc(95vh)">
      <PrologoComponent
        class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />
      <div class="col-auto q-mt-sm q-mx-sm q-shadow-10">
        <div class="row" style="height: calc(70vh)">
          <div class="col-6">
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
                <div class="row q-my-xs" v-for="partefissa in script.partiFisse.item" :key="partefissa.$.hash">
                  <div class="col-6 parte-fissa">
                    <ImgWrap v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'" :src="{ $: { url: partefissa._ } }" />
                    <div v-else class="q-ma-sm text-wrap overflow-auto" v-html="partefissa.label"
                      style="max-height: 200px" />
                  </div>
                  <div class="col-6 bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                    @drop="onDrop($event, partefissa)">
                    <div class="column">
                      <div v-for="item in partefissa.rispostaData" :key="item.$.hash" class="col-auto"
                        @dblclick="annulla(item, partefissa)">
                        <div class="col text-subtitle q-ma-xs item">
                          <div v-html="item.label" />
                          <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                            <strong>{{ $t('Doppio_click') }} </strong>
                          </q-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </div>
          <div class="col-5 ">
            <q-scroll-area style="height: calc(70vh)" visible :thumb-style="thumbStyle" :bar-style="barStyle">
              <q-list dense class="q-mr-lg">
                <q-item v-for="item in lista_risposte_disponibili" :key="item.$.hash" class="q-my-sm">
                  <q-item-section side>
                    <div class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                      <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                        <strong>{{ $t('Trascina') }}</strong>
                      </q-tooltip>
                      <span class="bg-teal-1 q-pa-xs text-weight-medium" v-html="item.label" />
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
  name: 'DomandaAbbinamentoMultiplo'
})
import { useSessioneStore } from '../stores/sessione'
import { T_DomandaAbbinamentoMultiplo, IDomanda } from './models'
import { ref, computed, watch } from 'vue'
import * as Common from './common'
import PrologoComponent from '../components/PrologoComponent.vue'
import ImgWrap from '../components/ImgWrap.vue'
import { common_api } from '../boot/common-utils'
import AudioWrap from '../components/AudioWrap.vue'
import VideoWrap from '../components/VideoWrap.vue'
import { setAudioPams, setVideoPams } from './common'

const sessione = useSessioneStore()
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoMultiplo
)

script.value.partiMobili.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))
script.value.partiFisse.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))

const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server === 'undefined') {
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }
}

watch(script.value.partiFisse, (partiFisse) => {
  partiFisse.item.forEach((item) => {
    if (script.value.risposta2Server) {
      if (item.rispostaData) {
        script.value.risposta2Server.risposte[item.$.hash] = item.rispostaData.map((r) => r.$.hash)
      }
    }
  })
  script.value.logRisposta = partiFisse.item.map((item) => {
    const rispostaData = item.rispostaData || []
    return {
      fisso: { testo: item._, value: item.$.hash },
      mobile: rispostaData.map((r) => ({ testo: r._, value: r.$.hash }))
    }
  })
})

if (script.value.audio) setAudioPams(script.value.audio)
if (script.value.video) setVideoPams(script.value.video)

script.value.partiMobili.item.forEach((item) => {
  const risposta_presente = script.value.partiFisse.item.find(
    (value) => {
      if (value.rispostaData) {
        const risposta_presente_ = value.rispostaData.find((risposta) => risposta.$.hash == item.$.hash)
        return !!risposta_presente_
      } else return false
    }
  )
  item.disponibile = !risposta_presente
})

interface Item {
  $: { hash: string };
  _: string;
}

interface ParteFissa {
  $: { hash: string };
  _: string;
  rispostaData?: Array<{ $: { hash: string }; _: string }>;
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
  script.value.partiMobili.item.filter((value) => value.disponibile)
)

const onDrop = function (evt: DragEvent, partefissa: ParteFissa) {
  if (evt.dataTransfer) {
    const risposta_data_hash = evt.dataTransfer.getData('risposta')
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    )

    if (risposta_data) {
      if (!partefissa.rispostaData) partefissa.rispostaData = []
      risposta_data.disponibile = false
      partefissa.rispostaData?.push(risposta_data)
    }
  }
}

const annulla = (item: Item, partefissa: ParteFissa) => {
  const item_ = script.value.partiMobili.item.find(
    (value) => value.$.hash == item.$.hash
  )
  if (item_) {
    item_.disponibile = true
    partefissa.rispostaData = partefissa.rispostaData?.filter(function (el) { return el.$.hash != item_.$.hash })
  }
}

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)

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

.zona-ricevente
  border-top: 2px solid black
  border-bottom: 2px solid black
  min-height: 100px
  min-width: 250px
  overflow: auto
  max-height: 350px

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
