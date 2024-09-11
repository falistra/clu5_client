<template>
  <q-chip square size="md" icon="bookmark" color="teal-2">
    <div class="text-overline prologo" v-html="`${common_api.sanitizeUnicode(props.prologo)}`"></div>
  </q-chip>
</template>

<script setup lang="ts">

import { common_api } from 'src/boot/common-utils';

defineOptions({
  name: 'PrologoComponent',
});

const props = withDefaults(defineProps<{ prologo: string; }>(), {
  prologo: 'Manca prologo'
});

</script>

<style lang="sass" scoped>
.prologo
  font-size: small
  line-height: 90%
</style>
