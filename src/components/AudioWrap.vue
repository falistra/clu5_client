<template>
  <div v-if="
    audio &&
    validAudio &&
    audio.$.url &&
    fileEsiste
  " class="self-center border-double border-4 border-indigo-600">
    <q-toolbar>
      <q-toolbar-title class="text-sm font-semibold">
        {{ $t('Ascolti_rimanenti') }} : {{ audio.ascolti_rimanenti }} - {{ $t('durata') }} : {{
          durata }} / {{ elapsed }}
      </q-toolbar-title>
      <q-btn :disable="sessione.IN_ASCOLTO || audio.ascolti_rimanenti === 0" size="md" round color="primary"
        :icon="play_arrow" @click="vai">
        <q-tooltip class="font-bold text-blue-600/100 bg-slate-100">
          {{ (sessione.IN_ASCOLTO) ? $t('In_ascolto') : (audio.ascolti_rimanenti === 0) ? $t('No_Ascolti') :
            $t('Click_Ascolto') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-item>
      <q-item-section side>
        <q-icon name="volume_down" />
      </q-item-section>
      <q-item-section>
        <q-slider class="q-px-md" v-model="volume" :min="0" :max="1" :step="0.1" @change="volumeChange" />
      </q-item-section>
      <q-item-section side>
        <q-icon name="volume_up" />
      </q-item-section>
    </q-item>

  </div>

  <div v-if="audio && audio.$.url && audio.$.url != 'nessuno' && !fileEsiste" class="self-center">
    <q-toolbar class="q-pa-sm text-white bg-red">
      <q-toolbar-title class="text-wrap"> Audio {{ mySource }} non disponibile </q-toolbar-title>
    </q-toolbar>
  </div>

  <!-- <div v-if="audio && audio.$.url && fileEsiste && audio.ascolti_rimanenti == 0"
    class="self-center border-double border-4 border-indigo-600">
    <q-toolbar>
      <q-toolbar-title class="text-sm font-semibold text-white bg-red">
        Raggiunto il numero massimo di ascolti permessi. {{ $t('durata') }} : {{
          durata }} / {{ elapsed }}
      </q-toolbar-title>
    </q-toolbar>
  </div> -->
</template>

<script setup lang="ts">

import moment from 'moment';
import type { Audio } from '../pages/models';
import {
  ref,
  computed,
} from 'vue';

defineOptions({ name: 'AudioWrap' });

import { useSessioneStore } from '../stores/sessione';
const sessione = useSessioneStore();

interface Props {
  audio: Audio;
  id?: string;
  class?: string;
}

const props = defineProps<Props>()

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
const play_arrow = computed(() => 'play_arrow') // { return sessione.IN_ASCOLTO ? 'pause' : (props.audio.ascolti_rimanenti === 0) ? 'cancel' : 'play_arrow'; })

const volume = ref(0.5);
const volumeChange = (volume: number) => {
  if (myAudio.value) {
    myAudio.value.volume = volume;
  }
};


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

const durata = computed(() => {
  if (sessione.MEDIA_AUDIO_DURATA[props.audio?.$.url]) {
    const durata = moment
      .duration(sessione.MEDIA_AUDIO_DURATA[props.audio?.$.url], 'seconds')
    return `${moment.utc(durata.asMilliseconds()).format('mm:ss')}`
    //.humanize();
  } else if (myAudio.value) {
    const durata = moment
      .duration(sessione.MEDIA_AUDIO_DURATA[props.audio?.$.url], 'seconds')
    return `${moment.utc(durata.asMilliseconds()).format('mm:ss')}`
  } else {
    return 0;
  }
});
const elapsed = ref('0:00');

if (props.audio?.$.url) {
  if (!(props.audio?.$.url in sessione.MEDIA_AUDIO)) {
    sessione.MEDIA_AUDIO[props.audio?.$.url] = new Audio(mySource.value);
  }
}

const myAudio = ref(sessione.MEDIA_AUDIO[props.audio?.$.url]);
if (myAudio.value) {
  if (myAudio.value.error) fileEsiste.value = false;
}


const playing = ref(false);

// const elapsed = ref('0:00');

const vai = () => {
  if (myAudio.value) {
    if (!playing.value) {

      // se altri audio in ascolto
      Object.values(sessione.MEDIA_AUDIO).forEach(
        (audio: HTMLAudioElement) => {
          audio.pause();
        }
      );

      myAudio.value.play();
      playing.value = true;
      ascolti_rimanenti--;
      // play_arrow.value = 'pause';
      sessione.IN_ASCOLTO = true;
      if (ascolti_rimanenti >= 0) {
        emit('update', ascolti_rimanenti);
      }
    }
  }
};

if (myAudio.value) {
  (myAudio.value as HTMLMediaElement).onerror = () => {
    fileEsiste.value = false;
  };

  (myAudio.value as HTMLMediaElement).onended = () => {
    playing.value = false;
    sessione.IN_ASCOLTO = false;
    // play_arrow.value = 'play_arrow';
  };

  (myAudio.value as HTMLMediaElement).onloadedmetadata = () => {
    if (myAudio.value) {
      sessione.MEDIA_AUDIO_DURATA[props.audio?.$.url] = (myAudio.value as HTMLMediaElement).duration;
    }
  };

  (myAudio.value as HTMLMediaElement).ontimeupdate = () => {
    // console.log((myAudio.value as HTMLMediaElement).currentTime)
    if (myAudio.value) {
      const durata = moment
        .duration((myAudio.value as HTMLMediaElement).currentTime, 'seconds')

      elapsed.value = `${moment.utc(durata.asMilliseconds()).format('mm:ss')}`
    }
  };
}


// onDeactivated(() => {
//   // @ts-check  if (myAudio.value) myAudio.value.pause();
//   // if (myAudio.value) {
//   //   (myAudio.value as HTMLMediaElement).pause();
//   // }
//   // playing.value = false;
//   // sessione.IN_ASCOLTO = false;
//   // // if (ascolti_rimanenti >= 0) {
//   // //   emit('update', ascolti_rimanenti);
//   // }
// });
</script>
