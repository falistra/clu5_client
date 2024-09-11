<template>
  <q-page class="row items-center justify-evenly">
    <PrologoComponent class="top-left" :prologo="script.prologo" />
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="prologo"></div>
          <q-scroll-area style="height: 200px; width: 1000px" :thumb-style="thumbStyle" :bar-style="barStyle">
            <div class="text-subtitle q-mt-sm q-mb-xs q-ml-md">
              <span v-for="item in tokens" :key="item.index">
                <span v-if="!item.isSlot" v-html="item.content"></span>
                <span v-else-if="item.isSlot" class="drop-zone" @dragover.prevent @dragenter.prevent
                  @drop="onDrop($event, item.slotIndex)" @dblclick="annulla(item)">
                  <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                    <strong>Doppio click per togliere</strong>
                  </q-tooltip>
                  {{ (script.rispostaData && (item.slotIndex in script.rispostaData)) ?
                    script.rispostaData[item.slotIndex]._ : '&nbsp;'.repeat(15) }}
                </span>
              </span>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 60px">
            <div class="row">
              <p v-for="risposta in lista_risposte_disponibili" class="col-auto q-ml-md q-pa-sm risposta"
                :key="risposta.id" draggable="true" @dragstart="startDrag($event, risposta.testo)">
                {{ risposta.testo }}
              </p>
            </div>
          </q-scroll-area>
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
import { T_DomandaRiempimentoTesto, T_Token } from 'pages/models';
import PrologoComponent from 'src/components/PrologoComponent.vue';

import * as Common from 'pages/common';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;
if (!script.rispostaData) script.rispostaData = {}

const prologo = computed(
  () => script.prologo.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);


const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    const risposta = (script.rispostaData && (slotIndex in script.rispostaData)) ? script.rispostaData[slotIndex]._ : '____________';
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);



const onDrop = function (evt: DragEvent, slotIndex: string) {
  if (evt.dataTransfer) {
    const item = tokens.value?.find(
      (item: T_Token) => item.slotIndex == slotIndex
    );
    if (item) {
      // se lo slot e' gia' occupato lo libera
      if (slotIndex in script.rispostaData) {
        const item = tokens.value?.find(
          (item: T_Token) => item.slotIndex == slotIndex
        );
        if (item) {
          const risposta = lista_risposte.value?.find(
            (value) => value.testo == item.content
          );
          if (risposta) {
            risposta.disponibile = true;
            delete script.rispostaData[item.slotIndex]
            item.content = '';
          }
        }
      }

      const risposta_data = evt.dataTransfer.getData('risposta');

      item.content = risposta_data;
      const risposta = lista_risposte_disponibili.value?.find(
        (value) => value.testo == risposta_data
      );

      if (risposta) {
        script.rispostaData[slotIndex] = {
          hash: risposta.id,
          _: risposta.testo,
        }
        risposta.disponibile = false;

        const script_risposta = script.risposte.risposta.find(
          (value) => value._ == risposta.testo
        );
        if (script_risposta) script_risposta.disponibile = false
      }
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
        disponibile: value?.disponibile || true,
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
  if (risposta) {
    risposta.disponibile = true;
    const script_risposta = script.risposte.risposta.find(
      (value) => value._ == risposta.testo
    );
    if (script_risposta) script_risposta.disponibile = true

    delete script.rispostaData[item.slotIndex]
    item.content = '';
  }
};


const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  border: 2px solid

.risposta
  cursor: grab
  border: 1px solid black

.drop-zone
  font-weight: 900
  width: 100px
  min-width: 100px
  border: 1px dotted black
</style>
