<template>
  <div class="self-center" style="max-height: 400px; max-width: 500px;">
    <div v-if="video && validVideo && video.$.url && fileEsiste && video.ascolti_rimanenti">
      <!-- <q-badge v-if="!(video.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" color="orange"
        text-color="black" :label="`Ascolti rimanenti: ${video.ascolti_rimanenti}`" />
      <q-media-player type="video" :source="mySource" native-controls @ended="onEnded" @error="onError" /> -->

      <q-media-player ref="myVideo" type="video" :source="mySource" disabled-seek dense @ended="onEnded"
        @error="onError">
        <template #volume>
          <div>
            <q-btn square color="primary" :icon="audioOnOff ? 'volume_up' : 'volume_off'" @click="setAudioOnOff" />
          </div>
        </template>

        <template #play>
          <div>
            <q-btn square color="primary" icon="play_arrow" @click="vai" />
          </div>
        </template>

        <template #positionSlider>
          <q-chip dense color="primary" text-color="white">
            Ascolti rimenenti : {{ video.ascolti_rimanenti }}
          </q-chip>
        </template>
      </q-media-player>
    </div>

    <div v-if="video && video.$.url && video.$.url != 'nessuno' && !fileEsiste" class="q-mt-md">
      <q-banner inline-actions class=" text-white bg-red">
        <template #avatar>
          <q-icon name="play_disabled" color="white" />
        </template>
        Video {{ video.$.url }} non disponibile
      </q-banner>
    </div>

    <div v-if="video && video.$.url && fileEsiste && video.ascolti_rimanenti == 0" class="q-mt-md">
      <q-banner inline-actions class="text-white bg-red">
        <template #avatar>
          <q-icon name="play_disabled" color="white" />
        </template>
        Raggiunto il numero massimo di visioni permesse.
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Video } from '../pages/models'
import { ref, computed } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import '@quasar/quasar-ui-qmediaplayer/src/index.sass'

defineOptions({ name: 'VideoWrap' })

const props = defineProps<{ video: Video; }>()

const validVideo = computed(() => !(typeof props.video.$.url === 'undefined' || props.video.$.url == '' || props.video.$.url == 'nessuno'))

const fileEsiste = ref(true)
let ascolti_rimanenti = props.video.ascolti_rimanenti

const emit = defineEmits(['update'])
// const mySource = ref('http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4')

// const mySource = ref(`/media/${props.video?.$.url}`)

const mySource = computed(() => {
  const fileName = `/media/${props.video?.$.url}`
  const split = fileName?.split('.')
  const ext = split?.pop()?.toLowerCase()
  if (ext !== 'mp4') return split?.join('.') + '.mp4'
  else return fileName
})


const myVideo = ref()
const inAscolto = ref(false)

const vai = () => {
  if (myVideo.value) {
    // myVideo.value.disablePictureInPicture = false
    inAscolto.value = true
    myVideo.value.play()
  }
}

const audioOnOff = ref(true)

const setAudioOnOff = () => {
  if (myVideo.value) { myVideo.value.toggleMuted() }
  audioOnOff.value = !audioOnOff.value
}

const onEnded = () => {
  inAscolto.value = false
  if (ascolti_rimanenti) {
    ascolti_rimanenti--
    emit('update', ascolti_rimanenti)
  }
}

const onError = () => {
  fileEsiste.value = false
}

</script>
