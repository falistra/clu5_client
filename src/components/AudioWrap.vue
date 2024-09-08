<template>
  <figure v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti">
    <q-badge color="orange" text-color="black" :label="`Ascolti rimanenti: ${audio.ascolti_rimanenti}`" />
    <figcaption></figcaption>
    <audio ref="player" :src="mySource" controls />
  </figure>

  <div v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti == 0">
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
import { ref, onMounted } from 'vue';
// import { useAVBars } from 'vue-audio-visual'

const player = ref(null)
// const canvas = ref(null)

defineOptions({
  name: 'AudioWrap',
});

interface Props {
  audio: Audio;
};

const props = defineProps<Props>()
// props.audio?.$.url ||

const fileEsiste = ref(true)
let ascolti_rimanenti = props.audio.ascolti_rimanenti

// const ascolti_rimanenti = defineModel<number | undefined>()

const emit = defineEmits(['update'])


const mySource = ref('/esempio.ogg') // props.audio?.$.url
// useAVBars(player, canvas, { src: mySource, canvHeight: 40, canvWidth: 200, barColor: 'lime' })

onMounted(() => {
  if (player.value) {
    (player.value as HTMLAudioElement).addEventListener('ended', () => {
      if (ascolti_rimanenti) {
        ascolti_rimanenti--
        emit('update', ascolti_rimanenti)
      }
    });

    (player.value as HTMLAudioElement).addEventListener('error', () => {
      console.log('Errore in caricamento')
      fileEsiste.value = false
    })
  }
})


</script>
