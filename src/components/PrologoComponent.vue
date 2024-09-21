<template>
  <div class="row items-left">
    <q-banner rounded dense class="shadow-3 bg-teal-4">
      <div class="text-subtitle2" v-html="`${common_api.sanitizeUnicode(common_api.sanitazeBR(props.prologo))}`"></div>
    </q-banner>
  </div>
</template>

<script setup lang="ts">
// 12436
import { common_api } from 'src/boot/common-utils';

defineOptions({
  name: 'PrologoComponent',
});

const props = withDefaults(defineProps<{ prologo: string; }>(), {
  prologo: 'Manca prologo'
});

// const testo = common_api.sanitazeBR(prop.prologo)

</script>

<style lang="sass" scoped>
.prologo
  font-size: small
  line-height: 90%
</style>
