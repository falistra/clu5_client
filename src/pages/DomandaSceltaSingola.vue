<template>
  <q-page class="row items-center justify-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-html="prologo"></div>
          <div class="text-h5 q-mt-sm q-mb-xs" v-html="testoDomanda"></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row justify-center items-center">
            <q-btn-toggle
              v-model="script.rispostaData"
              no-caps
              dense
              push
              glossy
              toggle-color="primary"
              :options="opzioni"
              clearable
              @update:model-value="setRisposta"
            >
              <template
                v-for="button in opzioni"
                :key="button.value"
                v-slot:[button.slot]
              >
                <div class="risposta q-px-sm">{{ button.testo }}</div>
              </template>
            </q-btn-toggle>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaSingola',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaSceltaSingola } from 'pages/models';
import { ref, computed } from 'vue';

const sessione = useSessioneStore();
const script = sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola;

let testoDomanda = ref(
  !script.rispostaData
    ? script.testo.replace(/([_]+)/gi, '<span style="color: red">$1</span>')
    : script.testo.replace(
        /([_]+)/gi,
        `<span style="color: red"> ${script.rispostaData} </span>`
      )
);

const opzioni = ref(
  script.risposte.risposta.map((item, index) => {
    return {
      testo: item._,
      value: item._,
      slot: index.toString(),
      style: { 'margin-right': '10px', border: '1px solid' },
      class: 'risposte',
    };
  })
);

const prologo = computed(
  () => script.prologo.replace(/\%u(\d+)/g, '&#x$1;') //&#x2013;
);

const setRisposta = (risposta: string) => {
  if (!risposta)
    testoDomanda.value = script.testo.replace(
      /([_]+)/gi,
      '<span style="color: red">$1</span>'
    );
  else
    testoDomanda.value = ` ${script.testo.replace(
      /[_]+/gi,
      ` <span style="color: red">${risposta} </span> `
    )} `;
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
  border: 2px solid

.risposta
  font-size: medium
  text-align: justify
  line-height: 85%
</style>
