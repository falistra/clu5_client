<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card  q-ma-sm">
      <q-card-section>
        <div class="text-overline" v-html="script.prologo"></div>
        <q-scroll-area visible style="height: 250px; width: 100%" :thumb-style="thumbStyle" :bar-style="barStyle">
          <div class="text-subtitle q-mr-md">
            <span class=" q-mt-sm" v-for="item in tokens" :key="item.index">
              <span class="q-ml-sm " v-if="!item.isSlot" v-html="item.content"></span>
              <q-input class="q-ml-sm" v-else-if="item.isSlot" dense rounded standout :name="`slot_${item.slotIndex}`"
                @focus="() => { currentSlot = item.slotIndex }" v-model:model-value="item.content"
                @update:model-value="setRisposta(item)" :autofocus="item.index == 0" />
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
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoLibero',
});

import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaRiempimentoLibero } from 'pages/models';
import { ref } from 'vue';

const sessione = useSessioneStore();
import { useI18nStore } from 'stores/i18n';
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoLibero;

const i18n = ref(useI18nStore());

interface T_Token {
  index: number;
  isSlot: boolean;
  slotIndex: string;
  content: string;
}

const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    const risposta = script.rispostaData ? script.rispostaData[slotIndex] : '';
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const currentSlot = ref<string>('')

const setRisposta = (item: T_Token) => {
  script.rispostaData[item.slotIndex] = item.content;
};


const thumbStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '10px',
  opacity: '0.75',
});

const barStyle = ref<Partial<CSSStyleDeclaration>>({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '15px',
  opacity: '0.2',
});

const carattere = (key: string) => {
  const campi_input = document.getElementsByName(`slot_${currentSlot.value}`)
  if (campi_input) {
    insertAtCaret(key, campi_input[0] as HTMLInputElement)
  }
}

const insertAtCaret = function (text: string, campo_input?: HTMLInputElement | null) {
  if (campo_input) {
    const token = tokens.value?.find((item) => item.slotIndex == currentSlot.value)
    if (token) {
      var strPos = campo_input.selectionStart || 0;
      const front = (campo_input.value).substring(0, strPos);
      const back = (campo_input.value).substring(strPos, campo_input.value.length);
      token.content = front + text + back
      script.rispostaData[currentSlot.value] = front + text + back;
      campo_input.focus();
      strPos = strPos + text.length;
      const scrollPos = campo_input.scrollTop;
      campo_input.selectionStart = strPos;
      campo_input.selectionEnd = strPos;
      campo_input.scrollTop = scrollPos;
    }
  }
}

</script>

<style lang="sass" scoped>
.my-card
  width: 98%
  border: 2px solid black
</style>
