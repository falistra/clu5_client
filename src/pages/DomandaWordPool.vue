<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <q-scroll-area
            style="height: 250px; width: 1000px"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <!--
        <q-card-section>
          <div class="row">
            <div
              v-for="risposta in lista_risposte_disponibili"
              class="col-auto q-ml-md q-pa-sm risposta"
              :key="risposta.id"
              draggable
              @dragstart="startDrag($event, risposta.testo)"
            >
              {{ risposta.testo }}
            </div>
          </div>
        </q-card-section> -->
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaWordPool',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaWordPool } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaWordPool;

// const lista_risposte = ref(
//   script.wordpools.wordpool.map(
//     (value) =>
//       <IRisposta>{
//         id: value.hash,
//         testo: value._,
//         disponibile: true,
//       }
//   )
// );

// const lista_risposte_disponibili = computed(() =>
//   lista_risposte.value.filter((value) => value.disponibile)
// );

// const startDrag = (evt: DragEvent, item: string) => {
//   if (evt.dataTransfer) {
//     evt.dataTransfer.dropEffect = 'move';
//     evt.dataTransfer.effectAllowed = 'move';
//     evt.dataTransfer.setData('risposta', item);
//   }
// };

const thumbStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75',
});

const barStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: '0.2',
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
