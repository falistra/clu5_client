<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="script.prologo"></div>
          <q-scroll-area style="height: 250px; width: 1000px" :thumb-style="thumbStyle" :bar-style="barStyle">
            <div class="text-subtitle q-mt-sm q-mb-xs">
              <span v-for="item in tokens" :key="item.index">
                <span v-if="!item.isSlot" v-html="item.content"></span>
                <span v-else-if="item.isSlot" class="drop-zone" @dragover.prevent @dragenter.prevent
                  @drop="onDrop($event, item.slotIndex)" @dblclick="annulla(item)">
                  {{ item.content }}
                </span>
              </span>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div v-for="risposta in lista_risposte_disponibili" class="col-auto q-ml-md q-pa-sm risposta"
              :key="risposta.id" draggable @dragstart="startDrag($event, risposta.testo)">
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
import { T_Token } from 'pages/models';
// import { IDomanda } from 'pages/models';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;

const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? parseInt(slot[2]) : NaN;
    const isSlot = slot ? true : false;
    content = isSlot ? '_________' : content.replace(/\%u(\d+)/g, '&#x$1;');
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const onDrop = function (evt: DragEvent, slotIndex: number) {
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

const annulla = (item: T_Token) => {
  const risposta = lista_risposte.value?.find(
    (value) => value.testo == item.content
  );
  if (risposta) risposta.disponibile = true;
  item.content = '__________';
};

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
  border: 2px solid

.risposta
  cursor: grab
  border: 1px solid black

.drop-zone
  color: red
  width: 100px
  min-width: 100px
  background-color: aqua
  border: 1px dotted black
</style>
