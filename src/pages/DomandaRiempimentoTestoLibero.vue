<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card q-ma-sm">
      <q-card-section>
        <div class="text-overline" v-html="script.prologo"></div>
        <q-scroll-area visible :style="scrollAreaDim" :thumb-style="thumbStyle" :bar-style="barStyle">
          <div class="text-subtitle q-mr-lg">
            <span v-for="item in tokens" :key="item.index">
              <span v-if="!item.isSlot" v-html="item.content"> </span>
              <!-- <q-input class="q-ml-sm" v-else-if="item.isSlot" dense rounded standout :name="`slot_${item.slotIndex}`"
                  @focus="() => { currentSlot = item.slotIndex }" v-model:model-value="item.content"
                  @update:model-value="setRisposta(item)" :autofocus="item.index == 0" /> -->
              <!-- <q-input class="q-ml-sm" v-else-if="item.isSlot" dense rounded standout :name="`slot_${item.slotIndex}`"
                  @focus="() => { currentSlot = item.slotIndex }"
                  v-model:model-value="script.rispostaData[item.slotIndex]" :autofocus="item.index == 0" /> -->
              <span v-else-if="item.isSlot">
                <input @focus="() => { currentSlot = item.slotIndex }" :id="`campo_input_${item.index}`"
                  :name="`slot_${item.slotIndex}`" v-model="script.rispostaData[item.slotIndex]" />
              </span>
            </span>
          </div>
        </q-scroll-area>
      </q-card-section>
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
  name: 'DomandaRiempimentoTestoLibero',
});
import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { useSessioneStore } from 'stores/sessione';
import { useI18nStore } from 'stores/i18n';
import { T_DomandaRiempimentoTestoLibero, T_Token } from 'pages/models';
import { ref, onMounted } from 'vue';

import * as Common from 'pages/common';

const sessione = useSessioneStore();
const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTestoLibero;

if (!script.rispostaData) script.rispostaData = {}

const i18n = ref(useI18nStore());

const scrollAreaDim = ref('height: 200px; width: 100%')

let primo_campo_input_indice = -1
const tokens = ref(
  script.testo.match(/([^_]+)|([_]+(\d+)[_]+)/giu)?.map((content, index) => {
    const slot = content.match(/([_]+)(\d+)([_]+)/);
    const slotIndex = slot ? slot[2] : '';
    const isSlot = slot ? true : false;
    const risposta = script.rispostaData ? script.rispostaData[slotIndex] : '';
    content = isSlot ? risposta : content.replace(/\%u(\d+)/g, '&#x$1;');
    if ((primo_campo_input_indice == -1) && isSlot) primo_campo_input_indice = index
    return { index, isSlot, slotIndex, content } as T_Token;
  })
);

const focusInput = () => {
  const primo_campo_input = document.getElementById(`campo_input_${primo_campo_input_indice}`) as HTMLInputElement
  if (primo_campo_input) {
    primo_campo_input.focus();
  }
};

onMounted(focusInput);

const currentSlot = ref<string>('')

// const setRisposta = (item: T_Token) => {
//   script.rispostaData[item.slotIndex] = item.content;
// };

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle)
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle)


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
