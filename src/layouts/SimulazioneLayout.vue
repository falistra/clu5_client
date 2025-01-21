<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="row flex-center">
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            Simulazione domanda Id:
            {{ (sessioneStore.domande[0][2] as IDomanda).id }}
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            <q-btn
              class="teal-8 shadow-8"
              icon="quiz"
              label="Calcola punteggio"
              @click="getPunteggio"
            />
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            <q-btn
              class="q-ml-lg"
              color="secondary"
              size="xs"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              @click="$q.fullscreen.toggle()"
            />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/icons/favicon-128x128.png" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
// import { useQuasar } from 'quasar'
import { useSessioneStore } from '../stores/sessione';
import { IDomanda } from '../pages/models';
import { IRisposta2Server /*, TRisposte */ } from '../stores/models';

import { api } from 'boot/axios';
import { useQuasar, useMeta } from 'quasar';
const $q = useQuasar();

const sessioneStore = useSessioneStore();

useMeta(() => {
  return {
    title: `Test ${(sessioneStore.domande[0][2] as IDomanda).id}`,
  };
});

const getPunteggio = async () => {
  // const checkRispostaNonData = (risposte: TRisposte): boolean => {
  //   console.log(risposte)
  //   if (typeof risposte === 'undefined') return false;
  //   if (
  //     typeof risposte === 'object' &&
  //     !Array.isArray(risposte) &&
  //     risposte !== null
  //   ) {
  //     return Object.keys(risposte).length > 0;
  //   }
  //   console.log(risposte.length)
  //   return risposte.length > 0;
  // };

  const script = sessioneStore.domande[0][1] as IRisposta2Server;
  // if (script.risposta2Server)
  //   checkRispostaNonData(script.risposta2Server.risposte)

  if (script.risposta2Server && !script.risposta2Server.peso)
    script.risposta2Server.peso = '1';
  const id = (sessioneStore.domande[0][2] as IDomanda).id;
  const parms = {
    idDomanda: id,
    risposte: JSON.stringify({ [id]: script.risposta2Server }),
  };

  await api
    .post('/test/simulazione/punteggio/', new URLSearchParams(parms))
    .then((response) => {
      // return response.data;
      $q.notify({
        color: 'positive',
        position: 'center',
        message: `Punteggio ottenuto: ${response.data.punteggio}`,
      });
    })
    .catch((errore) => {
      console.log(errore);
      // $q.notify({
      //   color: 'negative',
      //   position: 'top',
      //   message: 'Loading failed',
      //   icon: 'report_problem',
      // });
    });
};
</script>

<style lang="sass">

.row-horizontal-alignment
  .row
    background: rgba(#aa0, .1)
  .row > div
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
