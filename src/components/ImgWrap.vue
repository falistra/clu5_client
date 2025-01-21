<template>
  <q-img
    class="self-center"
    v-if="src && validImg"
    no-native-menu
    fit="scale-down"
    :src="`/media/${src.$.url}`"
    error-src="~assets/ImmagineNonDisponibile.jpeg"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'ImgWrap',
});
// (max-width: 320px) 280px, (max-width: 480px) 440px, 800px style="height: 400px; max-width: 300px"
import { Immagine } from '../pages/models';
import { computed } from 'vue';

interface Props {
  size?: string;
  src: Immagine;
}

const props = withDefaults(defineProps<Props>(), {
  size: '150px',
});

const validImg = computed(
  () =>
    !(
      typeof props.src.$.url === 'undefined' ||
      props.src.$.url == '' ||
      props.src.$.url == 'nessuno' ||
      props.src.$.url == 'null'
    )
);
</script>
