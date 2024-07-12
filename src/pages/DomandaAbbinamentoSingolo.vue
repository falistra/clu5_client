<template>
  <q-page class="row items-center justify-evenly" :style-fn="myTweak">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div class="text-overline q-mb-md" v-html="script.prologo"></div>
          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="barraStyle" style="height: 300px">
            <div class="q-pa-md">
              <q-list bordered separator>
                <q-item v-for="item in script.partiFisse.item" :key="item.$.hash">
                  <q-item-section>
                    <div class="row q-my-sm">
                      <div class="col-6 parte-fissa">
                        <div class="q-ma-sm item">{{ item._ }}</div>
                      </div>
                      <div class="col-6 zona-ricevente" @dragover.prevent @dragenter.prevent
                        @drop="onDrop($event, item)" @dblclick="annulla(item)">
                        <q-tooltip v-if="item.rispostaData" class="bg-red text-body2" anchor="center middle"
                          self="center middle">
                          Doppio click per togliere
                        </q-tooltip>
                        <div class="text-subtitle q-ma-sm item">{{ item.rispostaData?._ }}</div>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-6">
          <q-scroll-area :thumb-style="cursoreStyle" :bar-style="barraStyle" style="height: 300px">
            <q-list class="q-mr-md" bordered separator>
              <q-item class="q-my-sm" v-for="item in lista_risposte_disponibili" :key="item.$.hash">
                <q-item-section>
                  <div class="parte-mobile" draggable @dragstart="startDrag($event, item)">
                    <q-tooltip class="bg-indigo text-body2" anchor="center middle" self="center middle">
                      Doppio click per selezionare, poi drag
                    </q-tooltip>
                    <div class="q-ma-sm item">{{ item._ }}</div>
                  </div>
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

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoSingolo
);

script.value.partiMobili.item.forEach((item) => {
  item.disponibile = true;
});

interface Item {
  $: { hash: string };
  _: string;
  rispostaData?: { $: { hash: string }; _: string };
}

const startDrag = (evt: DragEvent, item: Item) => {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('risposta', item.$.hash);
  }
};

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

const cursoreStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '10px',
  opacity: '0.75',
});

const barraStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '15px',
  opacity: '0.2',
});

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
  border: 2px solid

.zona-ricevente
  border: 2px dotted black
  min-height: 50px
  min-width: 150px

.parte-fissa
  border: 2px solid black
  min-height: 50px

.parte-mobile
  cursor: grab
  border: 2px dotted black
  min-height: 50px

.item
  font-size: small
  font-weight: bold
  text-align: justify
  line-height: 85%

</style>
