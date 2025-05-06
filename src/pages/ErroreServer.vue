<script setup lang="ts">
import { ref } from 'vue';

import { useSessioneStore } from '../stores/sessione';
const sessioneStore = useSessioneStore();
const jsonData = ref(sessioneStore.errore);
</script>

<template>
  <q-page class="column">
    <div class="col-12" v-if="'errore' in sessioneStore.errore" v-html="sessioneStore.errore.errore" />
    <div class="col-12" v-else>
      <JsonViewer :value="jsonData" copyable boxed sort theme="jv-dark" />
    </div>
  </q-page>
</template>
