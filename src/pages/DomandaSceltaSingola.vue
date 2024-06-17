<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey"></div>
        </q-card-section>

        <q-space />
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaSingola',
});
import { useSessioneStore } from 'stores/sessione';

const sessioneStore = useSessioneStore();

const script: object = sessioneStore.domande[
  sessioneStore.counter
][1] as object;
console.log(script.$.id);
console.log(script.Testo);
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
</style>
