<template>
  <q-page class="column">
    <!-- :style-fn="myTweak"> -->
    <PrologoComponent class="col-auto" style="max-height: 100px" :prologo="script.prologo" />
    <q-card class="col-12">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div style="max-height: 150px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md"
            v-html="common_api.sanitizeUnicode(script.testo)"></div>
          <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
            <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
          </div>
          <div v-if="script.video" class="col q-mt-md">
            <video-wrap :video="script.video" @update="set_ascolti_video"></video-wrap>
          </div>
          <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 250px">
            <div class="q-pa-sm">
              <q-list dense bordered separator>
                <div class="column">
                  <q-item class="col-auto" v-for="item in script.partiFisse.item" :key="item.$.hash">
                    <q-item-section>
                      <div class="row">
                        <div class="col-6 parte-fissa text-caption">
                          <div class="q-ma-xs" v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'">
                            <ImgWrap :src="{ $: { url: item._ } }" size="100px" />
                            <!-- <q-img :src="item._" error-src="~assets/ImmagineNonDisponibile.jpeg" height="170px">
                            </q-img> -->
                          </div>
                          <div v-else class="q-ma-sm item" v-html="item.label" />
                        </div>
                        <div class="col-6 bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                          @drop="onDrop($event, item)" @dblclick="annulla(item)">
                          <div class="text-subtitle q-ma-sm item">
                            <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                              <strong>Doppio click per togliere</strong>
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
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 350px">
            <q-list dense class="q-mr-lg" bordered>
              <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                <q-item-section side>
                  <p class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                    <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                      <strong>Trascina...</strong>
                    </q-tooltip>
                    <span class="bg-teal-1 q-pa-xs  text-weight-medium" v-html="item.label"></span>
                    <!-- {{ item.label }} -->
                  </p>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaAbbinamentoSingolo',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaAbbinamentoSingolo, IDomanda } from 'pages/models';
import { ref, reactive, computed, watch } from 'vue';
import * as Common from 'pages/common';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils';
import AudioWrap from 'src/components/AudioWrap.vue';
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'


const sessione = useSessioneStore();
const script = reactive(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoSingolo
);
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)

script.partiMobili.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))
script.partiFisse.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }

watch(script.partiFisse, (partiFisse) => {
  partiFisse.item.forEach((item) => {
    if (script.risposta2Server)
      if (item.rispostaData) {
        script.risposta2Server.risposte[item.$.hash] = item.rispostaData.$.hash
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
  );
  item.disponibile = risposta_presente ? false : true;
});

interface Item {
  $: { hash: string };
  _: string;
  rispostaData?: { $: { hash: string }; _: string };
}


const isDragging = ref(false)

const startDrag = (evt: DragEvent, item: Item) => {
  if (evt)
    (((evt as Event).target) as Element).classList.add('dragging')
  if (evt.dataTransfer) {
    isDragging.value = true
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.clearData()
    evt.dataTransfer.setData('risposta', item.$.hash);
  }
};

const lista_risposte_disponibili = computed(() =>
  script.partiMobili.item.filter((value) => value.disponibile)
);

const onDrop = function (evt: DragEvent, item: Item) {
  if (evt.dataTransfer) {
    if (item.rispostaData) {
      const item_ = script.partiMobili.item.find(
        (value) =>
          value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
      );
      item.rispostaData = undefined;
      if (item_) item_.disponibile = true;
    }

    const risposta_data_hash = evt.dataTransfer.getData('risposta');
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    );
    if (risposta_data) {
      risposta_data.disponibile = false;
      item.rispostaData = risposta_data;
    }
  }
};

const annulla = (item: Item) => {
  const item_ = script.partiMobili.item.find(
    (value) => value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
  );
  item.rispostaData = undefined;
  if (item_) item_.disponibile = true;
};

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

// const myTweak = (offset: number) => { // offset: number
//   // "offset" is a Number (pixels) that refers to the total
//   // height of header + footer that occupies on screen,
//   // based on the QLayout "view" prop configuration

//   // this is actually what the default style-fn does in Quasar
//   return {
//     minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh',
//     // height: `calc(100vh - ${offset}px)`
//   }
// }

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
  line-height: 85%
  width: auto

.dragging
  background-color : $indigo-2
</style>
