<script setup lang="ts">
import { ref } from 'vue'

import { useSessioneStore } from '../stores/sessione'
import { useRouter } from 'vue-router'

const sessioneStore = useSessioneStore()
const router = useRouter()

const jsonData = ref(sessioneStore.test)

const back = () => {
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter }
  })
}

</script>

<template>
  <q-page class="column">
    <div class="col-12">
      <JsonViewer
        :value="jsonData"
        copyable
        boxed
        sort
        theme="jv-dark"
      />
    </div>
    <div class="col-12">
      <q-btn
        class="q-ma-md"
        label="Torna"
        icon="arrow_back"
        @click="back"
      />
    </div>
  </q-page>
</template>
