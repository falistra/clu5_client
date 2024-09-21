<template>
  <q-page class="column ">
    <PrologoComponent class="col-auto" style="max-height: 100px" :prologo="script.prologo" />
    <div style="max-height: 250px" class="col-auto scroll text-subtitle1 q-my-sm q-mx-md"
      v-html="common_api.sanitizeUnicode(script.testo)"></div>
    <audio-wrap v-if="script.audio" class="col-auto q-my-sm q-mx-md" :audio="script.audio"
      @update="set_ascolti"></audio-wrap>
    <video-wrap class="col q-mt-md" v-if="script.video" :video="script.video" @update="set_ascolti_video"></video-wrap>
    <div style="max-height: 400px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md">
      <draggable :list="list" :disabled="!enabled" item-key="_" class="list-group" ghost-class="ghost" :move="checkMove"
        @start="dragging = true" @end="dragging = false" draggable=".not-draggable">
        <template #item="{ element }">
          <div class="q-my-xs q-pa-sm list-group-item"
            :class="{ 'not-draggable': check_primoItem(element.ordine), 'primo-Item': !check_primoItem(element.ordine) }"
            v-html="element.label" />
        </template>
      </draggable>
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
import { ref } from 'vue';
//import { VNodeRef } from 'vue';
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from 'pages/common'

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaRiordino;

if (typeof script.rispostaData == 'undefined') {
  script.rispostaData = JSON.parse(JSON.stringify(script.risposte))
}

if (script.audio && (typeof script.audio.$.url == 'undefined' || script.audio.$.url == '' || script.audio.$.url == 'nessuno'))
  delete script.audio

if (script.video && (typeof script.video.$.url == 'undefined' || script.video.$.url == '' || script.video.$.url == 'nessuno'))
  delete script.video


if (script.audio) setAudioPams(script.audio)
if (script.video) setVideoPams(script.video)

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
const set_ascolti_video = (val: number) => {
  if (script.video) {
    script.video.ascolti_rimanenti = val
  }
}

</script>
<style lang="sass" scoped>
.senza-scroll
  height: calc(100vh)

.ghost
    opacity: 0.5
    background: #c8ebfb

.not-draggable
    cursor: no-drop

.list-group-item
    border-style: outset
    cursor: move
    font-size: small
    text-align: justify
    line-height: 85%

.primo-Item
  font-weight: bold
</style>
