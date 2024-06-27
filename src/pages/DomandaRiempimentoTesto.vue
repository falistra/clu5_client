<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <!-- <div class="text-subtitle q-mt-sm q-mb-xs" v-html="testo"></div> -->
          <div class="text-subtitle q-mt-sm q-mb-xs">
            <span v-for="item in tokens" :key="item.index">
              <span v-if="!item.isSlot" v-html="item.content"></span>
              <span
                v-else-if="item.isSlot"
                class="drop-zone"
                @dragover.prevent
                @dragenter.prevent
                @drop="onDrop($event, item.slotIndex)"
              >
                {{ item.content }}
              </span>
            </span>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div
              v-for="risposta in lista_risposte_disponibili"
              class="col q-mx-sm risposta"
              :key="risposta.id"
              draggable
              @dragstart="startDrag($event, risposta.testo)"
            >
              {{ risposta.testo }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTesto',
});
import { ref, computed } from 'vue';

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiempimentoTesto } from 'pages/models';
// import { IDomanda } from 'pages/models';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;

interface T_Token {
  index: number;
  isSlot: boolean;
  slotIndex: string;
  content: string;
}

const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    content = isSlot ? '_________' : content;
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const onDrop = function (evt: DragEvent, slotIndex: string) {
  if (evt.dataTransfer) {
    const item = tokens.value?.find(
      (item: T_Token) => item.slotIndex == slotIndex
    );
    if (item) {
      const risposta_data = evt.dataTransfer.getData('risposta');
      item.content = risposta_data;

      const risposta = lista_risposte_disponibili.value?.find(
        (value) => value.testo == risposta_data
      );
      if (risposta) risposta.disponibile = false;
    }
  }
};

const startDrag = (evt: DragEvent, item: string) => {
  console.log(typeof evt);
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('risposta', item);
  }
};

interface IRisposta {
  id: string;
  testo: string;
  disponibile: boolean;
}
const lista_risposte = ref(
  script.risposte.risposta.map(
    (value) =>
      <IRisposta>{
        id: value.hash,
        testo: value._,
        disponibile: true,
      }
  )
);

const lista_risposte_disponibili = computed(() =>
  lista_risposte.value.filter((value) => value.disponibile)
);
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.risposta
  cursor: move

.drop-zone
  color: red
  width: 100px
  min-width: 100px
  background-color: aqua
  border: 1px dotted black
</style>
