<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <PrologoComponent :prologo="script.prologo" />
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h5 q-mt-sm " v-html="common_api.sanitizeUnicode(script.testo)"></div>
          <div class="row justify-center" v-if="script.audio">
            <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
          </div>
        </q-card-section>
        <q-card-section>
          <draggable :list="list" :disabled="!enabled" item-key="_" class="list-group" ghost-class="ghost"
            :move="checkMove" @start="dragging = true" @end="dragging = false" draggable=".not-draggable">
            <template #item="{ element }">
              <div class="q-my-sm q-pa-sm list-group-item"
                :class="{ 'not-draggable': check_primoItem(element.ordine), 'primo-Item': !check_primoItem(element.ordine) }"
                v-html="element.label" />
            </template>
          </draggable>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiordino',
});
import draggable from 'vuedraggable';

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiordino } from 'pages/models';

import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import { common_api } from 'src/boot/common-utils'
import { setAudioPams } from 'pages/common'
import { ref } from 'vue';
//import { VNodeRef } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaRiordino;

if (typeof script.rispostaData == 'undefined') {
  script.rispostaData = JSON.parse(JSON.stringify(script.risposte))
}

if (script.audio) setAudioPams(script.audio)

script.rispostaData?.risposta.map((item, index) => {
  item.ordine = index
  item.label = common_api.sanitizeUnicode(item._)
})

// const testoDomanda = ref(script.Testo);
const list = ref(script.rispostaData?.risposta);

const dragging = ref(false);
const enabled = ref(true);
const checkMove = () => null;

const check_primoItem = (ordine: number) => {
  return (ordine == 0) ? false : true
}

const set_ascolti = (val: number) => {
  if (script.audio) {
    script.audio.ascolti_rimanenti = val
  }
}

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.buttons
    margin-top: 35px

.ghost
    opacity: 0.5
    background: #c8ebfb

.not-draggable
    cursor: no-drop

.list-group-item
    border-style: outset
    cursor: move

.primo-Item
  font-weight: bold
</style>
