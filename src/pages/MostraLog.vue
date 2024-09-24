<script setup lang="ts">

// import { useSessioneStore } from 'stores/sessione';
// const sessione = useSessioneStore();

const jsonData = {
  total: 25,
  limit: 10,
  skip: 0
}

const back = () => {
  console.log('OK')
}

</script>

<template>
  <q-page>
    Ci sono!
    <q-btn label="Torna" @click="back">

      <json-viewer :value="jsonData" :expand-depth=5 copyable boxed sort></json-viewer>

    </q-btn>
  </q-page>

</template>
