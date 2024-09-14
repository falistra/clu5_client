<template>
  <q-page class="row items-center justify-evenly">
    <PrologoComponent :prologo="script.prologo" />
    <q-card class="my-card q-ma-sm">
      <q-card-section>
        <q-scroll-area visible style="height: 200px; width: 100%" :thumb-style="thumbStyle" :bar-style="barStyle">
          <div class="q-mb-sm q-mr-md testo-domanda">
            <div class="column q-gutter-y-sm">
              <div class="col" v-for="(riga, index) in righe" :key="index">
                <div class="row">
                  <div class="col-5">
                    <div class="q-pr-sm  q-my-xs text-right testo">{{ riga[0] }}</div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="q-pl-sm q-my-xs testo">{{ riga[1] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>

        <div class="q-ma-md risposta">
          <div class="column">
            <div class="row">
              <div class="col-5"></div>
              <div class="col-2">
                <q-input input-class="text-subtitle1 text-weight-bold" v-model="script.rispostaData" name="risposta"
                  autofocus clearable rounded label="Risposta" dense />
              </div>
              <div class="col-5"></div>
            </div>
          </div>
        </div>
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
  name: 'DomandaOutputStudente',
});

import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';


import { useSessioneStore } from 'stores/sessione';
import { T_DomandaOutputStudente } from 'pages/models';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import { ref } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaOutputStudente;

const righe = ref(script.testo
  .replace(/&nbsp;/g, '').split('<br>')
  .map((el) => el.split(/_+/)))

import { useI18nStore } from 'stores/i18n';
const i18n = ref(useI18nStore());

const carattere = (key: string) => {
  const campi_input = document.getElementsByName('risposta')
  if (campi_input) {
    insertAtCaret(key, campi_input[0] as HTMLInputElement)
  }
};


const insertAtCaret = function (text: string, campo_input?: HTMLInputElement | null) {
  if (campo_input) {
    var strPos = campo_input.selectionStart || 0;
    const front = (campo_input.value).substring(0, strPos);
    const back = (campo_input.value).substring(strPos, campo_input.value.length);
    script.rispostaData = front + text + back;
    campo_input.focus();
    strPos = strPos + text.length;
    const scrollPos = campo_input.scrollTop;
    campo_input.selectionStart = strPos;
    campo_input.selectionEnd = strPos;
    campo_input.scrollTop = scrollPos;
  }
}

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


</script>

<style lang="sass" scoped>
.my-card
  width: 98%
  border: 2px solid

.testo-domanda
  .column > .col > .row > div
    border: 1px solid black

.testo
    font-size: small
    font-weight : bold
    line-height: 90%

</style>
