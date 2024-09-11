<template>

  <figure v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti">
    <q-badge v-if="!(audio.$.nrMaxRipetizioni == Number.MAX_SAFE_INTEGER.toString())" color="orange" text-color="black"
      :label="`Ascolti rimanenti: ${audio.ascolti_rimanenti}`" />
    <figcaption></figcaption>
    <audio controls ref="player" id="my_audio" :src="mySource">
    </audio>
  </figure>

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
import { ref, onMounted } from 'vue';

defineOptions({ name: 'AudioWrap' });

const props = defineProps<{ audio: Audio; }>()

const player = ref(null)


const fileEsiste = ref(true)
let ascolti_rimanenti = props.audio.ascolti_rimanenti

const emit = defineEmits(['update'])

// const mySource = ref('/esempio.ogg') // ref(props.audio?.$.url) // props.audio?.$.url
const mySource = ref(props.audio?.$.url) // props.audio?.$.url

onMounted(() => {
  //  console.log(player.value)
  if (player.value) {
    (player.value as HTMLAudioElement).addEventListener('ended', () => {
      //      console.log(`${ascolti_rimanenti}`)
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
