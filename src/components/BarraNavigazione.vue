<template>
  <q-btn-group push>
    <q-btn
      color="yellow"
      @click="precedente"
      glossy
      text-color="black"
      push
      label="First"
      icon="verified_user"
    />
    <q-btn color="amber" glossy text-color="black" push label="Second" />
    <q-btn
      color="orange"
      glossy
      @click="successivo"
      text-color="black"
      push
      label="Third"
    />
  </q-btn-group>
</template>

<script setup lang="ts">
// import { computed, ref } from 'vue';
// import { Todo, Meta } from './models';
import { useSessioneStore } from 'stores/sessione';
import { useRouter } from 'vue-router';

const sessioneStore = useSessioneStore();
const router = useRouter();

function precedente() {
  sessioneStore.decrement();
  router.push(sessioneStore.domande[sessioneStore.counter][0]);
}

function successivo() {
  sessioneStore.increment();
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });
}

defineOptions({
  name: 'BarraNavivazione',
});
</script>
