<template>
  <div class="shadow-10 q-my-md  q-ml-md" style="max-height: 60; max-width: 350px;"
    v-if="audio && validAudio && audio.$.url && fileEsiste && audio.ascolti_rimanenti">
    <!-- <q-badge v-if="!(audio.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" color="orange"
        text-color="black" :label="`Ascolti rimanenti: ${audio.ascolti_rimanenti}`" /> -->

    <q-media-player type="audio" :source="mySource" disabled-seek @ended="onEnded" @error="onError" ref="myAudio">

      <template #volume>
        <div class="q-pa-sm">
          <q-btn size="sm" round color="primary" :icon="audioOnOff ? 'volume_up' : 'volume_off'" @click="setAudioOnOff">
          </q-btn>
        </div>
      </template>

      <template #play>
        <div class="q-pa-sm">
          <q-btn size="sm" round color="primary" :icon="playing ? 'pause' : 'play_arrow'" @click="vai"></q-btn>
        </div>
      </template>

      <template #positionSlider>
        <q-chip v-if="!(audio.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" dense color="primary"
          text-color="white">
          Ascolti rimenenti : {{ audio.ascolti_rimanenti }}
        </q-chip>
      </template>
    </q-media-player>
  </div>

  <div class="q-mt-md" v-if="audio && audio.$.url && audio.$.url != 'nessuno' && !fileEsiste">
    <q-banner inline-actions class=" text-white bg-red">
      <template v-slot:avatar>
        <q-icon name="volume_off" color="white" />
      </template>
      Audio {{ audio.$.url }} non disponibile
    </q-banner>
  </div>

  <div class="q-mt-md" v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti == 0">
    <q-banner inline-actions class="text-white bg-red">
      <template v-slot:avatar>
        <q-icon name="volume_off" color="white" />
      </template>
      Raggiunto il numero massimo di ascolti permessi.
    </q-banner>
  </div>
</template>

<script setup lang="ts">

import { Audio } from 'pages/models';
import { ref, computed, onBeforeUnmount } from 'vue';
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'


defineOptions({ name: 'AudioWrap' });

const props = defineProps<{ audio: Audio; }>()

const validAudio = computed(() => !(typeof props.audio.$.url == 'undefined' || props.audio.$.url == '' || props.audio.$.url == 'nessuno'))

const fileEsiste = ref(true)
let ascolti_rimanenti = props.audio.ascolti_rimanenti

const emit = defineEmits(['update'])

const mySource = ref('/media/esempio.ogg') // ref(props.audio?.$.url) // props.audio?.$.url

const myAudio = ref()
const playing = ref(false)

const vai = () => {
  if (myAudio.value) {
    if (!playing.value) myAudio.value.play()
    else myAudio.value.pause()
    playing.value = !playing.value
  }
}

const audioOnOff = ref(true)

const setAudioOnOff = () => {
  if (myAudio.value) { myAudio.value.toggleMuted() }
  audioOnOff.value = !audioOnOff.value
}


const onEnded = () => {
  if (ascolti_rimanenti) {
    ascolti_rimanenti--
    emit('update', ascolti_rimanenti)
  }
}

const onError = () => {
  fileEsiste.value = false
}

onBeforeUnmount(() => {
  if (myAudio.value) myAudio.value.pause()
  // if (ascolti_rimanenti) {
  //   ascolti_rimanenti--
  //   emit('update', ascolti_rimanenti)
  // }
})

</script>
