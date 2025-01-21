<template>
  <VirtualKeyboard class="..." @key-pressed="carattere">
    <div class="...">
      <KeyButton
        v-for="v of i18n.caratteri[sessione.lingua || 2].split('')"
        :key="`key-${v}`"
        :value="v"
      />
    </div>
  </VirtualKeyboard>
</template>

<script setup lang="ts">
import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { ref } from 'vue';

import { useI18nStore } from '../stores/i18n';
const i18n = ref(useI18nStore());

import { useSessioneStore } from '../stores/sessione';
const sessione = useSessioneStore();

defineOptions({
  name: 'TastieraVirtuale',
});

const carattere = (key: string) => {
  console.log(key);
  console.log(document.activeElement as HTMLInputElement);
  insertAtCaret(key, document.activeElement as HTMLInputElement);
};

const insertAtCaret = function (text: string, ta?: HTMLInputElement | null) {
  if (ta) {
    const txtarea = ta;
    const scrollPos = txtarea.scrollTop;
    let strPos = txtarea.selectionStart || 0;
    const front = txtarea.value.substring(0, strPos);
    const back = txtarea.value.substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
  }
};
</script>
