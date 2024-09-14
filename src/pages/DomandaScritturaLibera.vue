<template>
  <q-page class="row items-center justify-evenly">
    <PrologoComponent :prologo="script.prologo" />
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-subtitle q-mt-sm q-mb-xs" v-html="script.testo"></div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input v-model="testo" filled type="textarea" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaScritturaLibera',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaScritturaLibera } from 'pages/models';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaScritturaLibera;

const testo = ref('');
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
