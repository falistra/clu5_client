<template>
  <div class="self-center column items-center" v-if="
    video &&
    validVideo &&
    video.$.url &&
    fileEsiste
  ">
    <video class="col" :src="mySource" ref="myVideo" :width="width" :height="height" disablepictureinpicture></video>
    <div class="col">
      <div class="mt-1 text-sm font-semibold">
        {{ $t('Visioni_rimanenti') }} {{ props.video.ascolti_rimanenti }} - {{ $t('durata') }} {{ duration }} / {{
          elapsed }}
        <q-btn :disable="sessione.IN_VISIONE || props.video.ascolti_rimanenti === 0" class="ml-5" size="md" round
          color="primary" :icon="play_arrow" @click="vai">
          <q-tooltip class="font-bold text-blue-600/100 bg-slate-100">
            {{ (sessione.IN_VISIONE) ? $t('In_visione') : (props.video.ascolti_rimanenti === 0) ? $t('No_Visioni') :
              $t('Click_Visione') }}
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

  <!-- <div v-if="video && video.$.url && fileEsiste && video.ascolti_rimanenti == 0"
    class="self-center border-double border-4 border-indigo-600">
    <q-toolbar>
      <q-toolbar-title class="text-sm font-semibold text-white bg-red">
        Raggiunto il numero massimo di visioni permesse. {{ $t('durata') }} : {{
          duration }} / {{ elapsed }}
      </q-toolbar-title>
    </q-toolbar>
  </div> -->
</template>
<script setup lang="ts">
import moment from 'moment';
import type { Video } from '../pages/models';
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
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '720px',
  height: '360px',
})

const validVideo = computed(
  () =>
    !(
      typeof props.video.$.url === 'undefined' ||
      props.video.$.url == '' ||
      props.video.$.url == 'nessuno'
    )
);

const fileEsiste = ref(true);
// const play_arrow = ref(sessione.IN_VISIONE ? 'pause' : 'play_arrow');

let ascolti_rimanenti = props.video.ascolti_rimanenti || 2; // Number.MAX_SAFE_INTEGER
const play_arrow = computed(() => { return sessione.IN_VISIONE ? 'pause' : (props.video.ascolti_rimanenti === 0) ? 'cancel' : 'play_arrow'; })


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
const width = ref(props.width);
const height = ref(props.height);
const elapsed = ref('00:00');

const vai = () => {
  if (myVideo.value) {
    if (!playing.value) {

      Object.values(sessione.MEDIA_VIDEO).forEach(
        (video: HTMLVideoElement) => {
          video.pause();
        }
      );

      myVideo.value.play();
      sessione.IN_VISIONE = true;
      sessione.IN_VISIONE_URL = mySource.value
      // play_arrow.value = 'pause';
      playing.value = true;
      ascolti_rimanenti--;
      if (ascolti_rimanenti >= 0) {
        emit('update', ascolti_rimanenti);
      }
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
      // play_arrow.value = 'play_arrow'
    };

    (myVideo.value as HTMLMediaElement).onloadedmetadata = () => {
      if (myVideo.value) {
        const durata = moment.duration((myVideo.value as HTMLMediaElement).duration, 'seconds')
        duration.value = `${moment.utc(durata.asMilliseconds()).format('mm:ss')}`

        const h = (myVideo.value as HTMLVideoElement).videoHeight
        const w = (myVideo.value as HTMLVideoElement).videoWidth

        const h_max = 720
        const w_max = 1280

        if (h > h_max) {
          height.value = `${h_max}px`;
          width.value = `${(h_max * w) / h}px`;
        }
        else if (w > w_max) {
          width.value = `${w_max}px`;
          height.value = `${(w_max * h) / w}px`;
        } else {
          width.value = `${w}px`;
          height.value = `${h}px`;
        }
      }
    };

    (myVideo.value as HTMLMediaElement).ontimeupdate = () => {
      if (myVideo.value) {
        const durata = moment
          .duration((myVideo.value as HTMLMediaElement).currentTime, 'seconds')

        elapsed.value = `${moment.utc(durata.asMilliseconds()).format('mm:ss')}`
      }
    };
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
