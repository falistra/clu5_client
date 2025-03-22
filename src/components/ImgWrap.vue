<template>
  <q-img class="self-center" v-if="src && validImg" no-native-menu :fit="mode" :src="`/media/${src.$.url}`"
    :width="larghezzaNaturale" :height="altezzaNaturale" style="max-height : 350px; max-width: 350px"
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
  mode?: 'fill' | 'scale-down' | 'cover' | 'contain' | 'none' | undefined
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
  const imgs = document.querySelectorAll(`[src='/media/${props.src.$.url}']`);
  if (imgs.length > 0) {
    const img = imgs[0]
    let L = (img as HTMLImageElement).naturalWidth;
    let H = (img as HTMLImageElement).naturalHeight;
    // console.log('Larghezza naturale: ', L, 'Altezza naturale: ', H)

    if (L < 355) {
      H = Math.round((H * 355) / L);
      L = 355;
    }
    if (H < 355) {
      L = Math.round((L * 355) / H);
      H = 355;
    }

    // console.log('Larghezza naturale: ', L, 'Altezza naturale: ', H)

    larghezzaNaturale.value = L.toString() + 'px'
    altezzaNaturale.value = H.toString() + 'px'
  }
});
</script>
