<template>
  <div class="self-center column items-center" v-if="
    video &&
    validVideo &&
    video.$.url &&
    fileEsiste &&
    video.ascolti_rimanenti !== 0
  ">
    <video class="col" :src="mySource" ref="myVideo" :width="width" :height="height" disablepictureinpicture></video>
    <div class="col">
      <div class="mt-1 text-sm font-semibold">
        {{ $t('Visioni_rimanenti') }} {{ ascolti_rimanenti }} - {{ $t('durata') }} {{ duration }}
        <q-btn :disable="sessione.IN_VISIONE" class="ml-5" size="md" round color="primary" icon="play_arrow"
          @click="vai">
          <q-tooltip class="font-bold text-blue-600/100 bg-slate-100">
            {{ (sessione.IN_VISIONE) ? 'In visione' : 'Click per vedere' }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
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

// import { useI18n } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const { t } = useI18n();

defineOptions({ name: 'VideoWrap' });


interface Props {
  video: Video;
  id?: string;
  class?: string;
}

const props = defineProps<Props>()

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
const width = ref('720px');
const height = ref('360px');

const vai = () => {
  if (myVideo.value) {
    if (!playing.value) {
      myVideo.value.play();
      sessione.IN_VISIONE = true;
      sessione.IN_VISIONE_URL = mySource.value
      playing.value = true;
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
      ascolti_rimanenti--;
      if (ascolti_rimanenti >= 0) {
        emit('update', ascolti_rimanenti);
      }
    };

    (myVideo.value as HTMLMediaElement).onloadedmetadata = () => {
      const d = (myVideo.value as HTMLMediaElement).duration;
      const s = Math.round(d % 60);
      const m = Math.round(d / 60);
      duration.value = `${m}:${s}`;
      const h = (myVideo.value as HTMLVideoElement).videoHeight
      const w = (myVideo.value as HTMLVideoElement).videoWidth

      if (h > 360) {
        height.value = '360px';
        width.value = `${(360 * w) / h}px`;
      }
      else if (w > 720) {
        width.value = '720px';
        height.value = `${(720 * h) / w}px`;
      } else {
        width.value = `${w}px`;
        height.value = `${h}px`;
      }
    };

    // (myVideo.value as HTMLMediaElement).ontimeupdate = () => {
    //   // console.log((myVideo.value as HTMLMediaElement).currentTime)
    //   const d = (myVideo.value as HTMLMediaElement).currentTime;
    //   // const s = Math.round(d % 60);
    //   // const m = Math.round(d / 60);
    //   //      elapsed.value = `${m}:${s}`;
    //   elapsed.value = `${d}`
    // };
  }
});

onDeactivated(() => {
  // if (myVideo.value) myVideo.value.pause();
  // if (ascolti_rimanenti >= 0) {
  //   emit('update', ascolti_rimanenti);
  // }
  playing.value = false;
  sessione.IN_VISIONE = false;
});
</script>
