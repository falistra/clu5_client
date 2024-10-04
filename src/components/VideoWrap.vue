<template>

  <div style="max-height: 400px; max-width: 500px;">
    <div v-if="video && validVideo && video.$.url && fileEsiste && video.ascolti_rimanenti">
      <!-- <q-badge v-if="!(video.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" color="orange"
        text-color="black" :label="`Ascolti rimanenti: ${video.ascolti_rimanenti}`" />
      <q-media-player type="video" :source="mySource" native-controls @ended="onEnded" @error="onError" /> -->

      <q-media-player type="video" :source="mySource" @ended="onEnded" @error="onError" disabled-seek dense
        ref="myVideo">
        <template #volume>
          <div>
            <q-btn square color="primary" :icon="audioOnOff ? 'volume_up' : 'volume_off'"
              @click="setAudioOnOff"></q-btn>
          </div>
        </template>

        <template #play>
          <div>
            <q-btn square color="primary" icon="play_arrow" @click="vai"></q-btn>
          </div>
        </template>

        <template #positionSlider>
          <q-chip dense color="primary" text-color="white">
            Ascolti rimenenti : {{ video.ascolti_rimanenti }}
          </q-chip>
        </template>

      </q-media-player>

    </div>

    <div class="q-mt-md" v-if="video && video.$.url && video.$.url != 'nessuno' && !fileEsiste">
      <q-banner inline-actions class=" text-white bg-red">
        <template v-slot:avatar>
          <q-icon name="play_disabled" color="white" />
        </template>
        Video {{ video.$.url }} non disponibile
      </q-banner>
    </div>

    <div class="q-mt-md" v-if="video && video.$.url && fileEsiste && video.ascolti_rimanenti == 0">
      <q-banner inline-actions class="text-white bg-red">
        <template v-slot:avatar>
          <q-icon name="play_disabled" color="white" />
        </template>
        Raggiunto il numero massimo di visioni permesse.
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Video } from 'pages/models';
import { ref, computed } from 'vue';
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import '@quasar/quasar-ui-qmediaplayer/src/index.sass'

defineOptions({ name: 'VideoWrap' });

const props = defineProps<{ video: Video; }>()

const validVideo = computed(() => !(typeof props.video.$.url == 'undefined' || props.video.$.url == '' || props.video.$.url == 'nessuno'))

const fileEsiste = ref(true)
let ascolti_rimanenti = props.video.ascolti_rimanenti

const emit = defineEmits(['update'])
// const mySource = ref('http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4')
const mySource = ref('/video.mp4') // ref(props.video?.$.url) // props.video?.$.url

const myVideo = ref()

const vai = () => {
  if (myVideo.value) {
    // myVideo.value.disablePictureInPicture = false
    myVideo.value.play()
  }
}

const audioOnOff = ref(true)

const setAudioOnOff = () => {
  if (myVideo.value) { myVideo.value.toggleMuted() }
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


</script>
