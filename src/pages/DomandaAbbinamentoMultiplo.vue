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
                v-html="common_api.sanitizeUnicode(script.testo)"></div>
              <div v-if="script.audio" class="col-auto q-my-sm q-mx-md">
                <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
              </div>
              <div v-if="script.video" class="col-auto q-mt-md">
                <video-wrap :video="script.video" @update="set_ascolti_video"></video-wrap>
              </div>
            </div>
            <q-scroll-area class="col-auto" style="height: calc(60vh)" visible :thumb-style="thumbStyle"
              :bar-style="barStyle">
              <div class="q-pa-sm">
                <q-list dense separator>
                  <div class="column">
                    <q-item class="col-auto" v-for="partefissa in script.partiFisse.item" :key="partefissa.$.hash">
                      <q-item-section>
                        <div class="row q-my-xs">
                          <div class="col-6 parte-fissa text-caption">
                            <div class="q-ma-xs" v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'">
                              <ImgWrap :src="{ $: { url: partefissa._ } }" size="100px" />
                            </div>
                            <div v-else class="q-ma-sm item" v-html="partefissa.label"></div>
                          </div>
                          <div class="col-6 bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                            @drop="onDrop($event, partefissa)">
                            <div class="row">
                              <div class="col-auto" v-for="item in partefissa.rispostaData" :key="item.$.hash"
                                @dblclick="annulla(item, partefissa)">
                                <div class="text-subtitle q-ma-xs item">
                                  <span v-html="item.label"></span>
                                  <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle"
                                    :offset="[5, 5]">
                                    <strong>Doppio click per togliere</strong>
                                  </q-tooltip>
                                </div>
                              </div>
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
                <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                  <q-item-section side>
                    <div class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                      <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                        <strong>Trascina...</strong>
                      </q-tooltip>
                      <div class="bg-teal-1 q-pa-xs text-weight-medium" v-html="item.label"></div>
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


  <!-- <q-page class="column">
    <PrologoComponent class="col-auto" style="max-height: 100px" :prologo="script.prologo" />
    <q-card class="col-12">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div style="max-height: 50px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md"
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
                  <q-item class="col-auto" v-for="partefissa in script.partiFisse.item" :key="partefissa.$.hash">
                    <q-item-section>
                      <div class="row q-my-xs">
                        <div class="col-6 parte-fissa text-caption">
                          <div class="q-ma-xs" v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'">
                            <ImgWrap :src="{ $: { url: partefissa._ } }" size="100px" />
                          </div>
                          <div v-else class="q-ma-sm item" v-html="partefissa.label"></div>
                        </div>
                        <div class="col-6 bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                          @drop="onDrop($event, partefissa)">
                          <div class="row">
                            <div class="col-auto" v-for="item in partefissa.rispostaData" :key="item.$.hash"
                              @dblclick="annulla(item, partefissa)">
                              <div class="text-subtitle q-ma-xs item">
                                <span v-html="item.label"></span>
                                <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                                  <strong>Doppio click per togliere</strong>
                                </q-tooltip>
                              </div>
                            </div>
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
          <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 250px">
            <q-list dense class="q-mr-lg" bordered>
              <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                <q-item-section side>
                  <div class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                    <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                      <strong>Trascina...</strong>
                    </q-tooltip>
                    <div class="bg-teal-1 q-pa-xs text-weight-medium" v-html="item.label"></div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page> -->
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaAbbinamentoMultiplo',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaAbbinamentoMultiplo, IDomanda } from 'pages/models';
import { ref, computed, watch } from 'vue';
import * as Common from 'pages/common';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils';
import AudioWrap from 'src/components/AudioWrap.vue';
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoMultiplo
);

script.value.partiMobili.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))
script.value.partiFisse.item.forEach((item) => item.label = common_api.sanitizeUnicode(item._))

const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server == 'undefined')
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }

watch(script.value.partiFisse, (partiFisse) => {
  partiFisse.item.forEach((item) => {
    if (script.value.risposta2Server)
      if (item.rispostaData) {
        script.value.risposta2Server.risposte[item.$.hash] = item.rispostaData.map((r) => r.$.hash)
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
        return risposta_presente_ ? true : false
      }
      else return false
    }
  );
  item.disponibile = risposta_presente ? false : true;
});

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
  script.value.partiMobili.item.filter((value) => value.disponibile)
);

const onDrop = function (evt: DragEvent, partefissa: ParteFissa) {
  if (evt.dataTransfer) {
    const risposta_data_hash = evt.dataTransfer.getData('risposta');
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    );

    if (risposta_data) {
      if (!partefissa.rispostaData) partefissa.rispostaData = []
      risposta_data.disponibile = false;
      partefissa.rispostaData?.push(risposta_data);
    }
  }
};

const annulla = (item: Item, partefissa: ParteFissa) => {
  const item_ = script.value.partiMobili.item.find(
    (value) => value.$.hash == item.$.hash
  );
  if (item_) {
    item_.disponibile = true;
    partefissa.rispostaData = partefissa.rispostaData?.filter(function (el) { return el.$.hash != item_.$.hash });
  }
};

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
  line-height: 85%
  width: auto


.dragging
  background-color : $indigo-2
</style>
