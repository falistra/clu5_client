<template>
  <div v-if="
    video &&
    validVideo &&
    video.$.url &&
    fileEsiste &&
    video.ascolti_rimanenti
  " class="self-center">
    <video :src="mySource" ref="myVideo" :width="props.width" :height="props.height" disablepictureinpicture></video>
    <q-toolbar class="mt-3">
      <q-toolbar-title class="text-sm font-semibold">
        Visioni rimanenti: {{ ascolti_rimanenti }} - {{ duration }}/{{
          elapsed
        }}
        <q-btn :disable="playing && sessione.IN_VISIONE" class="ml-5" size="md" round color="primary" icon="play_arrow"
          @click="vai">
          <q-tooltip class="font-bold text-blue-600/100 bg-slate-100">
            {{ (playing && sessione.IN_VISIONE) ? 'In visione' : 'Click per vedere' }}
          </q-tooltip>
        </q-btn>
      </q-toolbar-title>
    </q-toolbar>
  </div>

  <div v-if="video && video.$.url && video.$.url != 'nessuno' && !fileEsiste" class="self-center">
    <q-toolbar class="q-pa-sm text-white bg-red">
      <q-toolbar-title class="text-wrap"> Video {{ mySource }} non disponibile </q-toolbar-title>
    </q-toolbar>
  </div>

  <div v-if="video && video.$.url && fileEsiste && video.ascolti_rimanenti == 0" class="self-center">
    <q-toolbar class="q-pa-sm text-white bg-red">
      <q-toolbar-title>
        Raggiunto il numero massimo di visioni permesse.
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import { Video } from '../pages/models';
import {
  ref,
  computed,
  /* onBeforeUnmount,*/ onDeactivated,
  onMounted,
} from 'vue';

import { useSessioneStore } from '../stores/sessione';
const sessione = useSessioneStore();

defineOptions({ name: 'VideoWrap' });

interface Props {
  video: Video;
  height?: string;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {});

console.log(props);

const validVideo = computed(
  () =>
    !(
      typeof props.video.$.url === 'undefined' ||
      props.video.$.url == '' ||
      props.video.$.url == 'nessuno'
    )
);

const fileEsiste = ref(true);
let ascolti_rimanenti = props.video.ascolti_rimanenti || 2; // Number.MAX_SAFE_INTEGER
const emit = defineEmits(['update']);

const mySource = computed(() => {
  console.log(props.video?.$.url);
  // return 'fake'
  if (
    props.video?.$.url.endsWith('.mp4') ||
    props.video?.$.url.endsWith('.MP4')
  )
    return `/media/${props.video?.$.url}`;
  const file_mp4 = props.video?.$.url.replace(/\.\w+$/, '.mp4');
  return `/media/${file_mp4}`;
});

const myVideo = ref();
const playing = ref(false);
const duration = ref('');
const elapsed = ref('0:00');

const vai = () => {
  if (myVideo.value) {
    if (!playing.value) {
      myVideo.value.play();
      playing.value = true;
      ascolti_rimanenti--;
    }
  }
};

onMounted(() => {
  if (myVideo.value) {
    (myVideo.value as HTMLMediaElement).onerror = () => {
      fileEsiste.value = false;
    };

    (myVideo.value as HTMLMediaElement).onended = () => {
      playing.value = false;
      sessione.IN_VISIONE = false;
      if (ascolti_rimanenti >= 0) {
        // console.log(`ascolti rimanenti ${ascolti_rimanenti}`);
        emit('update', ascolti_rimanenti);
      }
    };

    (myVideo.value as HTMLMediaElement).onloadedmetadata = () => {
      const d = (myVideo.value as HTMLMediaElement).duration;
      const s = Math.round(d % 60);
      const m = Math.round(d / 60);
      duration.value = `${m}:${s}`;
    };

    (myVideo.value as HTMLMediaElement).ontimeupdate = () => {
      // console.log((myVideo.value as HTMLMediaElement).currentTime)
      const d = (myVideo.value as HTMLMediaElement).currentTime;
      const s = Math.round(d % 60);
      const m = Math.round(d / 60);
      elapsed.value = `${m}:${s}`;
    };
  }
});

onDeactivated(() => {
  // if (myVideo.value) myVideo.value.pause();
  if (ascolti_rimanenti >= 0) {
    emit('update', ascolti_rimanenti);
  }
});
</script>
