<template>
  <q-banner style="max-height: calc(10wh); overflow: scroll;" rounded dense class="shadow-3 bg-teal-4">
    <div class="text-subtitle2 prologo"
      v-html="`${common_api.sanitizeUnicode(common_api.sanitazeBR(props.prologo))}`" />
  </q-banner>
</template>

<script setup lang="ts">

import { common_api } from '../boot/common-utils'

defineOptions({
  name: 'PrologoComponent'
})

const props = withDefaults(defineProps<{ prologo: string; }>(), {
  prologo: 'Manca prologo'
})

</script>

<style lang="sass" scoped>
.prologo
  font-size: small
  line-height: 90%
</style>
