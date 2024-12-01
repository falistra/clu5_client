<template>
  <div v-if="audio && validAudio && audio.$.url && fileEsiste && audio.ascolti_rimanenti"
    class="self-center shadow-10 q-my-md  q-ml-md" style="max-height: 60; max-width: 350px;">
    <!-- <q-badge v-if="!(audio.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" color="orange"
        text-color="black" :label="`Ascolti rimanenti: ${audio.ascolti_rimanenti}`" /> -->

    <q-media-player ref="myAudio" type="audio" :source="mySource" disabled-seek @ended="onEnded" @error="onError">
      <template #volume>
        <div class="q-pa-sm">
          <q-btn size="sm" round color="primary" :icon="audioOnOff ? 'volume_up' : 'volume_off'"
            @click="setAudioOnOff" />
        </div>
      </template>

      <template #play>
        <div class="q-pa-sm">
          <q-btn :disable="inAscolto" size="sm" round color="primary" icon="play_arrow" @click="vai" />
        </div>
      </template>

      <template #positionSlider>
        <q-chip v-if="!(audio.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" dense color="primary"
          text-color="white">
          Ascolto/Listening {{ parseInt(audio.$.nrMaxRipetizioni) - audio.ascolti_rimanenti + 1 }}&deg; di/of {{
            audio.$.nrMaxRipetizioni
          }}
        </q-chip>
      </template>
    </q-media-player>
  </div>

  <div v-if="audio && audio.$.url && audio.$.url != 'nessuno' && !fileEsiste" class="q-mt-md">
    <q-banner inline-actions class=" text-white bg-red">
      <template #avatar>
        <q-icon name="volume_off" color="white" />
      </template>
      Audio {{ audio.$.url }} non disponibile
    </q-banner>
  </div>

  <div v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti == 0" class="q-mt-md">
    <q-banner inline-actions class="text-white bg-red">
      <template #avatar>
        <q-icon name="volume_off" color="white" />
      </template>
      Raggiunto il numero massimo di ascolti permessi.
    </q-banner>
  </div>
</template>

<script setup lang="ts">

import { Audio } from '../pages/models'
import { ref, computed, onBeforeUnmount } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'

defineOptions({ name: 'AudioWrap' })

const props = defineProps<{ audio: Audio; }>()

const validAudio = computed(() => !(typeof props.audio.$.url === 'undefined' || props.audio.$.url == '' || props.audio.$.url == 'nessuno'))

const fileEsiste = ref(true)
let ascolti_rimanenti = props.audio.ascolti_rimanenti

const emit = defineEmits(['update'])

const mySource = computed(() => {
  const fileName = `/media/${props.audio?.$.url}`
  const split = fileName?.split('.')
  const ext = split?.pop()?.toLowerCase()
  if (ext !== 'mp3') return split?.join('.') + '.mp3'
  else return fileName
})

// const mySource = ref(`/media/${props.audio?.$.url}`)

const myAudio = ref()
const playing = ref(false)
const inAscolto = ref(false)

const vai = () => {
  if (myAudio.value) {
    if (!playing.value) {
      myAudio.value.play()
      inAscolto.value = true
      playing.value = true
    }
    // else myAudio.value.pause()
    // playing.value = !playing.value
  }
}

const audioOnOff = ref(true)

const setAudioOnOff = () => {
  if (myAudio.value) { myAudio.value.toggleMuted() }
  audioOnOff.value = !audioOnOff.value
}

const onEnded = () => {
  playing.value = false
  inAscolto.value = false
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
