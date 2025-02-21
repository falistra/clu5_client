<template>
  <q-img class="self-center" v-if="src && validImg" no-native-menu :fit="mode" :src="`/media/${src.$.url}`"
    :height="altezzaNaturale" :width="larghezzaNaturale" style="max-height : 350px; max-width: 350px"
    error-src="~assets/ImmagineNonDisponibile.jpeg" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

defineOptions({
  name: 'ImgWrap',
});
// (max-width: 320px) 280px, (max-width: 480px) 440px, 800px style="height: 400px; max-width: 300px"
import { Immagine } from '../pages/models';
import { ref, computed } from 'vue';

interface Props {
  src: Immagine;
  mode: 'fill' | 'scale-down' | 'cover' | 'contain' | 'none' | undefined
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'scale-down'
});

const altezzaNaturale = ref('255px');
const larghezzaNaturale = ref('255px');


const validImg = computed(
  () =>
    !(
      typeof props.src.$.url === 'undefined' ||
      props.src.$.url == '' ||
      props.src.$.url == 'nessuno' ||
      props.src.$.url == 'null'
    )
);


onMounted(() => {
  const img = document.querySelectorAll(`[src='/media/${props.src.$.url}']`);
  if (img.length > 0) {
    larghezzaNaturale.value = (img[0] as HTMLImageElement).naturalWidth.toString() + 'px'
    altezzaNaturale.value = (img[0] as HTMLImageElement).naturalHeight.toString() + 'px'
  }
  if (altezzaNaturale.value === '0px') {
    larghezzaNaturale.value = '255px'
    altezzaNaturale.value = '255px'
  }

});
</script>
