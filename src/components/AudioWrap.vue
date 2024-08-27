<template>
  <div style=“display:none”>
    <audio id="audio-player">
      <source :src="src" type="audio/ogg">
    </audio>
  </div>
  <q-btn :disable='btn_disabilitato' class="q-ml-md q-mt-sm btn-audio" align="between" color="primary"
    :label="label_btn_audio" :icon="icona_btn_audio" outline rounded @click="ascolta" />
</template>

<script setup lang="ts">

import { ref } from 'vue';

defineOptions({
  name: 'AudioWrap',
});

interface Props {
  src: string;
  nrMaxRipetizioni?: number;
};

const props = withDefaults(defineProps<Props>(), {
  nrMaxRipetizioni: Number.MAX_VALUE
});


const ascolti = ref(0)
const label_btn_audio = ref(`Numero massimo ascolti permessi : ${props.nrMaxRipetizioni}`)
const icona_btn_audio = ref('volume_up')
const btn_disabilitato = ref(false)
const ascolti_rimanenti = ref(Number.MAX_VALUE)

const ascolta = () => {
  if (ascolti_rimanenti.value == 0) {
    label_btn_audio.value = `Raggiunto il Numero massimo di ascolti permessi : ${props.nrMaxRipetizioni}`
    icona_btn_audio.value = 'volume_off'
    btn_disabilitato.value = true
  } else {
    ascolti.value = ascolti.value + 1
    ascolti_rimanenti.value = props.nrMaxRipetizioni - ascolti.value
    label_btn_audio.value = `Numero ascolti ancora permessi : ${ascolti_rimanenti.value}`
    const audio = document.getElementById('audio-player') as HTMLMediaElement;
    if (audio) {
      audio.play();
      audio.addEventListener('pause', () => {
        btn_disabilitato.value = false
      });
      audio.addEventListener('play', () => {
        btn_disabilitato.value = true
      });
    }
  }
}

</script>
