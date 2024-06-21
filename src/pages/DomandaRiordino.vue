<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <div class="text-h5 q-mt-sm q-mb-xs" v-html="script.testo"></div>
          <!-- <div class="text-overline text-orange-9">
            Ordina gli elementi spostandoli con il mouse
          </div> -->
        </q-card-section>
        <q-separator />
        <q-card-section>
          <draggable
            :list="list"
            :disabled="!enabled"
            item-key="_"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div
                class="q-my-lg q-pa-sm list-group-item"
                :class="{ 'not-draggable': !enabled }"
              >
                {{ element._ }}
              </div>
            </template>
          </draggable>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiordino',
});
import draggable from 'vuedraggable';

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiordino } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaRiordino;
// const testoDomanda = ref(script.Testo);
const list = ref(script.risposte.risposta);

const dragging = ref(false);
const enabled = ref(true);
const checkMove = () => null;
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.buttons
    margin-top: 35px

.ghost
    opacity: 0.5
    background: #c8ebfb

.not-draggable
    cursor: no-drop

.list-group-item
    border-style: outset
    cursor: move
</style>
