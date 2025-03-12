<template>
  <div v-if="
    audio &&
    validAudio &&
    audio.$.url &&
    fileEsiste &&
    audio.ascolti_rimanenti
  " class="max-w-80 self-center border-double border-4 border-indigo-600">
    <audio :src="mySource" ref="myAudio">
      <a :href="mySource"></a>
    </audio>
    <q-toolbar>
      <q-toolbar-title class="text-sm font-semibold">
        Ascolti rimanenti: {{ ascolti_rimanenti }} - {{ duration }}/{{
          elapsed
        }}
      </q-toolbar-title>
      <q-btn :disable="playing && sessione.IN_ASCOLTO" size="md" round color="primary" icon="play_arrow" @click="vai">
        <q-tooltip class="font-bold text-blue-600/100 bg-slate-100">
          {{ (playing && sessione.IN_ASCOLTO) ? 'In ascolto' : 'Click per ascoltare' }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
  </div>

  <div v-if="audio && audio.$.url && audio.$.url != 'nessuno' && !fileEsiste" class="self-center">
    <q-toolbar class="q-pa-sm text-white bg-red">
      <q-toolbar-title class="text-wrap"> Audio {{ mySource }} non disponibile </q-toolbar-title>
    </q-toolbar>
  </div>

  <div v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti == 0" class="self-center">
    <q-toolbar class="q-pa-sm text-white bg-red">
      <q-toolbar-title>
        Raggiunto il numero massimo di ascolti permessi.
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import { Audio } from '../pages/models';
import {
  ref,
  computed,
  onDeactivated,
  onMounted,
} from 'vue';

defineOptions({ name: 'AudioWrap' });

import { useSessioneStore } from '../stores/sessione';
const sessione = useSessioneStore();

const props = defineProps<{ audio: Audio }>();

const validAudio = computed(
  () =>
    !(
      typeof props.audio.$.url === 'undefined' ||
      props.audio.$.url == '' ||
      props.audio.$.url == 'nessuno'
    )
);

const fileEsiste = ref(true);
let ascolti_rimanenti = props.audio.ascolti_rimanenti || 2; // Number.MAX_SAFE_INTEGER
const emit = defineEmits(['update']);

const mySource = computed(() => {
  if (
    props.audio?.$.url.endsWith('.mp3') ||
    props.audio?.$.url.endsWith('.MP3')
  )
    return `/media/${props.audio?.$.url}`;
  const file_mp3 = props.audio?.$.url.replace(/\.\w+$/, '.mp3');
  return `/media/${file_mp3}`;
});

const myAudio = ref();
const playing = ref(false);
const duration = ref('');
const elapsed = ref('0:00');

const vai = () => {
  if (myAudio.value) {
    if (!playing.value) {
      myAudio.value.play();
      playing.value = true;
      sessione.IN_ASCOLTO = true;
      ascolti_rimanenti--;
    }
  }
};

onMounted(() => {
  if (myAudio.value) {
    (myAudio.value as HTMLMediaElement).onerror = () => {
      fileEsiste.value = false;
    };

    (myAudio.value as HTMLMediaElement).onended = () => {
      playing.value = false;
      sessione.IN_ASCOLTO = false;
      if (ascolti_rimanenti >= 0) {
        emit('update', ascolti_rimanenti);
      }
    };

    (myAudio.value as HTMLMediaElement).onloadedmetadata = () => {
      const d = (myAudio.value as HTMLMediaElement).duration;
      const s = Math.round(d % 60);
      const m = Math.round(d / 60);
      duration.value = `${m}:${s}`;
    };

    (myAudio.value as HTMLMediaElement).ontimeupdate = () => {
      // console.log((myAudio.value as HTMLMediaElement).currentTime)
      const d = (myAudio.value as HTMLMediaElement).currentTime;
      const s = Math.round(d % 60);
      const m = Math.round(d / 60);
      elapsed.value = `${m}:${s}`;
    };
  }
});

onDeactivated(() => {
  if (myAudio.value) myAudio.value.pause();
  if (ascolti_rimanenti >= 0) {
    emit('update', ascolti_rimanenti);
  }
});
</script>
