<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <scelta-singola :data="jsonData" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import xml2js from 'xml2js';
// https://medium.com/@steveruiz/using-a-javascript-library-without-type-declarations-in-a-typescript-project-3643490015f3
// npm i @types/xml2js
console.log('XXXXXX');
import $ from 'jquery';
console.log($);

const xmlData = `
<DomandaSceltaSingola id="1">
  <Testo>
    Questo e' il testo della domanda
  </Testo>
  <Risposte>
    <Risposta> Risposta 1 </Risposta>
    <Risposta> Risposta 2 </Risposta>
    <Risposta> Risposta 3 </Risposta>
    <Risposta> Risposta 4 </Risposta>
  </Risposte>
</DomandaSceltaSingola>
`;
const jsonData = ref(
  await xml2js
    .parseStringPromise(xmlData, { trim: true })
    .then(function (result) {
      return result;
    })
    .catch(function (err) {
      console.error(err);
    })
);

console.log(jsonData);

import SceltaSingola from 'components/tipiDomande/SceltaSingola.vue';

defineOptions({
  name: 'IndexPage',
});

// const todos = ref<Todo[]>([
//   {
//     id: 1,
//     content: 'ct1',
//   },
//   {
//     id: 2,
//     content: 'ct2',
//   },
//   {
//     id: 3,
//     content: 'ct3',
//   },
//   {
//     id: 4,
//     content: 'ct4',
//   },
//   {
//     id: 5,
//     content: 'ct5',
//   },
// ]);

// const meta = ref<Meta>({
//   totalCount: 1200,
// });
</script>
