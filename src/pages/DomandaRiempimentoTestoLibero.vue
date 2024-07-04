<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div
            class="text-overline q-mt-sm q-mb-sm"
            v-html="script.prologo"
          ></div>
          <q-scroll-area
            style="height: 250px; width: 1000px"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <div class="text-subtitle q-mr-md">
              <span v-for="item in tokens" :key="item.index">
                <span
                  class="q-ml-sm q-mt-sm"
                  v-if="!item.isSlot"
                  v-html="item.content"
                ></span>
                <input
                  class="q-ml-sm q-mt-sm"
                  v-else-if="item.isSlot"
                  @change="setRisposta($event, item)"
                />
              </span>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <q-card-section> T_DomandaRiempimentoTestoLibero </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTestoLibero',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiempimentoTestoLibero } from 'pages/models';
import { T_Token } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTestoLibero;
console.log(script);

const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    content = isSlot ? '_________' : content;
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const setRisposta = (event: Event, item: unknown) => {
  console.log(event);
  console.log(item);
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
  max-width: auto
</style>
