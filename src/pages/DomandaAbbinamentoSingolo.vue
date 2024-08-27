<template>
  <q-page class="row items-center justify-evenly" :style-fn="myTweak">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div class="text-overline q-mb-md" v-html="prologo"></div>
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 300px">
            <div class="q-pa-sm">
              <q-list dense bordered separator>
                <div class="column">
                  <q-item class="col-auto" v-for="item in script.partiFisse.item" :key="item.$.hash">
                    <q-item-section>
                      <div class="row">
                        <div class="col-6 parte-fissa">
                          <div class="q-ma-xs" v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'">
                            <q-img :src="item._" error-src="~assets/ImmagineNonDisponibile.jpeg" height="170px">
                            </q-img>
                          </div>
                          <div v-else class="q-ma-sm ">{{ item._ }}</div>
                        </div>
                        <div class="col-6 bg-indigo-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                          @drop="onDrop($event, item)" @dblclick="annulla(item)">
                          <div class="text-subtitle q-ma-sm item">{{ item.rispostaData?._ }}
                            <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                              <strong>Doppio click per togliere</strong>
                            </q-tooltip>
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 350px">
            <q-list dense class="q-mr-md" bordered separator>
              <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                <q-item-section side>
                  <p class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                    <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                      <strong>Trascina...</strong>
                    </q-tooltip>{{ item._ }}
                  </p>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaAbbinamentoSingolo',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaAbbinamentoSingolo } from 'pages/models';
import { ref, computed } from 'vue';
import * as Common from 'pages/common';

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoSingolo
);

const prologo = computed(
  () => script.value.prologo.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

script.value.partiMobili.item.forEach((item) => {
  const risposta_presente = script.value.partiFisse.item.find(
    (value) => {
      if (value.rispostaData && value.rispostaData.$.hash == item.$.hash) return true
      else return false
    }
  );
  item.disponibile = risposta_presente ? false : true;
});

interface Item {
  $: { hash: string };
  _: string;
  rispostaData?: { $: { hash: string }; _: string };
}


const isDragging = ref(false)

const startDrag = (evt: DragEvent, item: Item) => {
  if (evt)
    (((evt as Event).target) as Element).classList.add('dragging')
  if (evt.dataTransfer) {
    isDragging.value = true
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.clearData()
    evt.dataTransfer.setData('risposta', item.$.hash);
  }
};

// const endDrag = () => { //(evt: DragEvent, item: Item) => {
//   isDragging.value = false
// }


const lista_risposte_disponibili = computed(() =>
  script.value.partiMobili.item.filter((value) => value.disponibile)
);

const onDrop = function (evt: DragEvent, item: Item) {
  if (evt.dataTransfer) {
    if (item.rispostaData) {
      const item_ = script.value.partiMobili.item.find(
        (value) =>
          value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
      );
      item.rispostaData = undefined;
      if (item_) item_.disponibile = true;
    }

    const risposta_data_hash = evt.dataTransfer.getData('risposta');
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    );
    if (risposta_data) {
      risposta_data.disponibile = false;
      item.rispostaData = risposta_data;
    }
  }
};

const annulla = (item: Item) => {
  const item_ = script.value.partiMobili.item.find(
    (value) =>
      value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
  );
  item.rispostaData = undefined;
  if (item_) item_.disponibile = true;
};

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)

const myTweak = (offset: number) => { // offset: number
  // "offset" is a Number (pixels) that refers to the total
  // height of header + footer that occupies on screen,
  // based on the QLayout "view" prop configuration

  // this is actually what the default style-fn does in Quasar
  return {
    minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh',
    // height: `calc(100vh - ${offset}px)`
  }
}



</script>

<style lang="sass" scoped>
.my-card
  width: 98%
  border: 2px solid black

.zona-ricevente
  border: 2px dotted black
  min-height: 40px
  min-width: 150px

.parte-fissa
  border: 2px solid black
  min-height: 40px

.item
  cursor: grab
  font-size: small
  font-weight: bold
  text-align: justify
  line-height: 85%
  width: auto

.dragging
  background-color : $indigo-2
</style>
