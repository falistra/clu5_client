<template>
  <q-img class="self-center" v-if="src && validImg" no-native-menu
    style="max-height: calc(30vh); max-width: calc(40vh);" :src="`/media/${src.$.url}`"
    error-src="~assets/ImmagineNonDisponibile.jpeg" />
  <!-- <q-avatar  :size="size">
      <q-img :src="`/media/${src.$.url}`" error-src="~assets/ImmagineNonDisponibile.jpeg" />
    </q-avatar> -->

</template>

<script setup lang="ts">

defineOptions({
  name: 'ImgWrap'
})

import { Immagine } from '../pages/models'
import { computed } from 'vue'

interface Props {
  size?: string;
  src: Immagine;
};

const props = withDefaults(defineProps<Props>(), {
  size: '150px'
})

const validImg = computed(() => !(typeof props.src.$.url === 'undefined' || props.src.$.url == '' || props.src.$.url == 'nessuno' || props.src.$.url == 'null'))

</script>
