<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline q-mt-sm q-mb-sm" v-html="script.prologo"></div>
          <q-scroll-area style="height: 250px; width: 1000px" :thumb-style="thumbStyle" :bar-style="barStyle">
            <div class="text-subtitle q-mr-md">
              <span v-for="item in tokens" :key="item.index">
                <span class="q-ml-sm q-mt-sm" v-if="!item.isSlot" v-html="item.content"></span>
                <input class="q-ml-sm q-mt-sm" v-else-if="item.isSlot" v-model="item.content"
                  @change="setRisposta(item)" />
              </span>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <VirtualKeyboard class="..." @key-pressed="carattere">
            <div class="...">
              <KeyButton v-for="v of i18n.caratteri[sessione.lingua].split('')" :key="`key-${v}`" :value="v" />
            </div>
          </VirtualKeyboard>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTestoLibero',
});
import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from 'stores/sessione';
import { useI18nStore } from 'stores/i18n';
import { T_DomandaRiempimentoTestoLibero } from 'pages/models';
import { T_Token } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTestoLibero;


if (!script.rispostaData) script.rispostaData = [];

const i18n = ref(useI18nStore());

const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? parseInt(slot[2]) : NaN;
    const isSlot = slot ? true : false;
    const risposta = script.rispostaData ? script.rispostaData[slotIndex] : '';
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const setRisposta = (item: T_Token) => {
  console.log(item);
  if (script.rispostaData) script.rispostaData[item.slotIndex] = item.content;
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

const carattere = (key: string) => {
  console.log(key);
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid
</style>
