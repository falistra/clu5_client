<template>
  <q-btn-group push>
    <q-btn
      color="orange"
      @click="precedente"
      glossy
      text-color="black"
      push
      icon="chevron_left"
      :disable="sessioneStore.counter == 0"
    />
    <q-btn disable color="standard" glossy :label="stato" />

    <q-btn
      color="orange"
      glossy
      @click="successivo"
      text-color="black"
      push
      icon="chevron_right"
      :disable="sessioneStore.domande.length == sessioneStore.counter + 1"
    />

    <q-btn
      color="deep-orange"
      glossy
      v-if="sessioneStore.domande.length == sessioneStore.counter + 1"
      :label="labelValutazione"
      icon-right="send"
    />
  </q-btn-group>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { Todo, Meta } from './models';
import { useSessioneStore } from 'stores/sessione';
import { useRouter } from 'vue-router';

const sessioneStore = useSessioneStore();
const router = useRouter();

const labelValutazione = ref('Valuta le risposte date');

const stato = computed(() => {
  return `Domanda ${sessioneStore.counter + 1} di ${
    sessioneStore.domande.length
  }`;
});

function precedente() {
  sessioneStore.decrement();
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });
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
