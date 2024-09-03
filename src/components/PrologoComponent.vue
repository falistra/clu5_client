<template>
  <div class="text-overline" v-html="prologo"></div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

defineOptions({
  name: 'PrologoComponent',
});

interface Props {
  prologo: string;
};

const props = withDefaults(defineProps<Props>(), {
  prologo: 'Manca prologo'
});


const prologo = computed(
  () => props.prologo.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

</script>
