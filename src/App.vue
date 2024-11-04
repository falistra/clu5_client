<template>
  <router-view v-if="loggedIn" />

  <!-- <div v-else class="window-height window-width row justify-center q-mt-lg"> -->
  <div style="height: 50%" class="row flex flex-center q-mt-lg">
    <q-select filled class="col-3" v-model="parms" :options="options" label="Scegli il tipo di test"
      @update:model-value="vai_al_test" options-dense dense />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});
import { ref } from 'vue';

import xml2js from 'xml2js';
import { api } from 'boot/axios';

import { Test } from 'stores/Test';
import { Loading } from 'quasar';

import { useSessioneStore } from 'stores/sessione';
import { useRouter } from 'vue-router';

const sessioneStore = useSessioneStore();
const router = useRouter();

const loggedIn = ref(false)
const parms = ref()


const options = ref([
  // // { label: 'test 756: 12 tecniche', value: { idUser: 2, idSess: 20 } },
  // { label: 'test 753: Scelta Singola', value: { idUser: 2, idSess: 19 } },
  // { label: 'test 760: Test Francese', value: { idUser: 2, idSess: 27 } },
  // // { label: 'test 810:  Comprensione Testo', value: { idUser: 2, idSess: 93 } },
  // { label: 'test 897:  Riordino elementi', value: { idUser: 2, idSess: 349 } },
  // { label: 'test 818:  Abbinamento singolo', value: { idUser: 2, idSess: 194 } },
  // { label: 'test 861:  Abbinamento multiplo', value: { idUser: 2, idSess: 203 } },
  // { label: 'test 877:  SFP Proficiency Test', value: { idUser: 2, idSess: 241 } },
  // // { label: 'test 761:  Riempimento testo', value: { idUser: 2, idSess: 28 } },
  // { label: 'test 847:  Word pool', value: { idUser: 2, idSess: 249 } },
  // { label: 'test 827:  Output studente', value: { idUser: 2, idSess: 268 } },
  // { label: 'test 815:  Scrittura libera', value: { idUser: 2, idSess: 261 } },
  // { label: 'test 794:  Riempimento libero', value: { idUser: 2, idSess: 324 } },
  // { label: 'test 894:  Riempimento libero auto', value: { idUser: 2, idSess: 340 } },
  // { label: 'test 893:  2 minuti ', value: { idUser: 2, idSess: 428 } },

  { label: 'test 1', value: { idUser: 2, idSess: 19 } },
  { label: 'test 2', value: { idUser: 2, idSess: 27 } },
  { label: 'test 3', value: { idUser: 2, idSess: 349 } },
  { label: 'test 4', value: { idUser: 2, idSess: 194 } },
  { label: 'test 5', value: { idUser: 2, idSess: 203 } },
  { label: 'test 6', value: { idUser: 2, idSess: 241 } },
  { label: 'test 7', value: { idUser: 2, idSess: 249 } },
  { label: 'test 8', value: { idUser: 2, idSess: 268 } },
  { label: 'test 9', value: { idUser: 2, idSess: 261 } },
  { label: 'test 10', value: { idUser: 2, idSess: 324 } },
])

const vai_al_test = async (parms_test: { label: string, value: { idUser: number; idSess: number } }) => {

  Loading.show({
    message: 'Attendere, prego...'
  })
  const script = await api
    .get(`/test/script/?idUser=${parms_test.value.idUser}&idSess=${parms_test.value.idSess}`)
    .then((response) => {
      // Notify.create({
      //   message: 'Dati ricevuti dal server',
      //   color: 'green-6',
      // });
      return response.data;
    })
    .catch(() => {
      // $q.notify({
      //   color: 'negative',
      //   position: 'top',
      //   message: 'Loading failed',
      //   icon: 'report_problem',
      // });
    });

  const test = new Test(
    await xml2js
      .parseStringPromise(script, {
        explicitArray: false,
        trim: true,
      })
      .then(function (result) {
        // nel caso ci sia una sola stazione => va trasformato da object in [object] : Array
        if (!(Array.isArray(result.test.stazioni.stazione)))
          result.test.stazioni.stazione = [result.test.stazioni.stazione]
        return result;
      })
      .catch(function (err) {
        console.error(err);
      })
    , script);

  sessioneStore.test = test;

  await test.stazione_corrente.richiediDomandeServer();
  Loading.hide()

  loggedIn.value = true

  sessioneStore.counter = 0;
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });

}



</script>
