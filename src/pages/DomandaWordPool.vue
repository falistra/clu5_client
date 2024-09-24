<template>
  <q-page class="column">
    <PrologoComponent class="col-auto" style="max-height: 70px" :prologo="script.prologo" />
    <q-card class="col-12">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div style="max-height: 150px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md"
            v-html="common_api.sanitizeUnicode(script.testo)"></div>
          <audio-wrap v-if="script.audio" class="col-auto q-my-sm q-mx-md" :audio="script.audio"
            @update="set_ascolti"></audio-wrap>
          <video-wrap class="col q-mt-md" v-if="script.video" :video="script.video"
            @update="set_ascolti_video"></video-wrap>
          <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 250px">
            <div class="q-pa-sm">
              <q-card class="zona-ricevente q-ma-sm" @dragover.prevent @dragenter.prevent @drop="onDrop($event, pool)"
                v-for="pool in script.pools.pool" :key="pool.$.hash">
                <q-badge class="q-ml-sm q-mt-sm text-subtitle1" color="primary" rounded>{{ pool._ }}</q-badge>
                <div class="row">
                  <div class="col-auto" v-for="item in pool.rispostaData" :key="item.$.hash"
                    @dblclick="annulla(item, pool)">
                    <div class="text-subtitle q-ma-sm item">
                      <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                        <strong>Doppio click per togliere</strong>
                      </q-tooltip>
                      <span class="q-ma-md text-weight-medium" v-html="item.label" />
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area visible :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 250px">
            <q-list dense class="q-mr-md" bordered separator>
              <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                <q-item-section side>
                  <p class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                    <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                      <strong>Trascina...</strong>
                    </q-tooltip>
                    <span v-html="item.label" />
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
  name: 'DomandaWordPool',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaWordPool, IDomanda } from 'pages/models';
import { ref, computed, watch } from 'vue';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import { common_api } from 'src/boot/common-utils';
import * as Common from 'pages/common';
import VideoWrap from 'src/components/VideoWrap.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'


const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaWordPool
);

const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server == 'undefined')
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }

script.value.pools.pool.forEach((item) => { item.label = common_api.sanitizeUnicode(item._) })

//   if (script.value.risposta2Server && item.rispostaData) {
//     script.value.risposta2Server.risposte[item.$.hash] = item.rispostaData.map((r) => r.$.hash)

//     watch(item.rispostaData, (risposta) => {
//       if (script.value.risposta2Server)
//         script.value.risposta2Server.risposte[item.$.hash] = risposta.map((r) => r.$.hash)
//     })
//   }
// })


watch(script.value.pools, (pools) => {
  pools.pool.forEach((item) => {
    if (script.value.risposta2Server)
      if (item.rispostaData) {
        script.value.risposta2Server.risposte[item.$.hash] = item.rispostaData.map((r) => r.$.hash)
      }
  })
})

if (script.value.audio) setAudioPams(script.value.audio)
if (script.value.video) setVideoPams(script.value.video)

script.value.words.word.forEach((item) => item.label = common_api.sanitizeUnicode(item._))

script.value.words.word.forEach((item) => {
  const risposta_presente = script.value.pools.pool.find(
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

interface Pool {
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

// const endDrag = () => { //(evt: DragEvent, item: Item) => {
//   isDragging.value = false
// }


const lista_risposte_disponibili = computed(() =>
  script.value.words.word.filter((value) => value.disponibile)
);

const onDrop = function (evt: DragEvent, pool: Pool) {
  if (evt.dataTransfer) {
    const risposta_data_hash = evt.dataTransfer.getData('risposta');
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    );

    if (risposta_data) {
      if (!pool.rispostaData) pool.rispostaData = []
      risposta_data.disponibile = false;
      pool.rispostaData?.push(risposta_data);
    }
  }
};

const annulla = (item: Item, pool: Pool) => {
  const item_ = script.value.words.word.find(
    (value) => value.$.hash == item.$.hash
  );
  if (item_) {
    item_.disponibile = true;
    pool.rispostaData = pool.rispostaData?.filter(function (el) { return el.$.hash != item_.$.hash });
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
.my-card
  width: 98%
  border: 2px solid

.zona-ricevente
  border: 2px solid black
  min-height: 100px
  min-width: 250px
  overflow: auto
  max-height: 350px

.parte-fissa
  border: 2px solid black
  min-height: 40px

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
