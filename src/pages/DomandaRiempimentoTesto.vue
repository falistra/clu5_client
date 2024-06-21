<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <div
            class="text-subtitle q-mt-sm q-mb-xs"
            v-html="script.testo"
          ></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <draggable v-model="myArray2" group="people" itemKey="hash">
            <template #item="{ element }">
              <div>{{ element._ }}</div>
            </template>
          </draggable>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <draggable
            class="list-group"
            :list="list"
            group="people"
            itemKey="hash"
          >
            <template #item="{ element }">
              <span class="q-my-lg q-pa-sm list-group-item">
                {{ element._ }}
              </span>
            </template>
          </draggable>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTesto',
});
import { ref } from 'vue';
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiempimentoTesto } from 'pages/models';
// import { IDomanda } from 'pages/models';
import draggable from 'vuedraggable';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;
// const domanda = sessione.domande[sessione.counter][1] as IDomanda;

const list = ref(script.risposte.risposta);
const myArray2 = ref([]);

console.log('======page==========');
console.log(sessione.counter);
console.log(script);
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.list-group-item
  margin-left: 10px
  border-style: outset
  cursor: move
</style>
