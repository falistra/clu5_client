<template>
  <div class="row justify-center">
    <q-avatar v-if="src && validImg" :size="size">
      <q-img :src="`/media/${src.$.url}`" error-src="~assets/ImmagineNonDisponibile.jpeg" />
    </q-avatar>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ImgWrap',
});

import { Immagine } from '../pages/models';
import { computed } from 'vue';

interface Props {
  size: string;
  src: Immagine;
};

const props = defineProps<Props>()

const validImg = computed(() => !(typeof props.src.$.url == 'undefined' || props.src.$.url == '' || props.src.$.url == 'nessuno'))

</script>
