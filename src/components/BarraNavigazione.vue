<template>
  <div class="row justify-between">
    <div>
      <span class="text-subtitle1">Parte {{ sessioneStore.numero_stazione_corrente }} - </span>
      <vue-countdown :time="parseInt(sessioneStore.test.stazione_corrente.script.$.countdown) * 60 * 1000"
        v-slot="{ minutes, seconds }" @end="gameover" @progress="versoLaFine">
        <span class="text-subtitle1">Tempo rimanente: {{ minutes }} minut{{ minutes == 1 ? 'o' : 'i' }}, {{
          seconds }} secondi.</span>
      </vue-countdown>
    </div>


    <q-btn-group class="q-mr-lg q-mb-sm" push>
      <q-btn push icon="chevron_left" color="teal-8" :disable="sessioneStore.counter == 0" @click="precedente"
        size="sm" />

      <q-btn disable class="overline" :label="stato" />

      <q-btn push icon="chevron_right" color="teal-8" size="sm"
        :disable="sessioneStore.domande.length == sessioneStore.counter + 1" @click="successivo" />
    </q-btn-group>

    <q-btn class="q-ml-lg q-mb-sm text-caption" :color="ultimaDomanda ? 'teal-8' : 'teal-2'" :disable="!ultimaDomanda"
      :label="labelValutazione" @click="consegna(true)" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { Todo, Meta } from './models';
import { useSessioneStore } from 'stores/sessione';
import { useRouter } from 'vue-router';
import { Loading, Dialog, Notify } from 'quasar';
import VueCountdown from '@chenfengyuan/vue-countdown';

const sessioneStore = useSessioneStore();
const router = useRouter();

const labelValutazione = ref('Consegna esercizi (se visti tutti)');

const stato = computed(() => {
  return `Domanda ${sessioneStore.counter + 1} di ${sessioneStore.domande.length}`;
});

let notUltimaDomanda = true

const ultimaDomanda = computed(() => {
  if (notUltimaDomanda) {
    if (sessioneStore.domande.length == sessioneStore.counter + 1) {
      notUltimaDomanda = false;
      return true
    } else return false
  }
  return true
})

async function gameover() {
  Notify.create({
    message: 'Tempo scaduto',
    color: 'negative',
    position: 'top'
  })
  await consegna(false)
}

function versoLaFine(data: { hours: number, minutes: number, seconds: number }) {
  if (data.hours == 0 && data.minutes == 1 && data.seconds == 0)
    Notify.create({
      message: 'Manca un minuto',
      color: 'info',
      position: 'top'
    })
}

function precedente() {
  sessioneStore.decrement();
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });
}

function successivo() {
  sessioneStore.increment();
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });
}

async function effettuaConsegna() {
  notUltimaDomanda = true
  Loading.show()
  // le tre chiamate successive devono essere in await in quanto ciascuna modifica lo store
  // che viene presupposto dalle successive
  await sessioneStore.test.stazione_corrente.richiediPunteggio()
  await sessioneStore.test.stazione_corrente.passaStazione();

  if (sessioneStore.testCompletato) {
    router.push('/fineTest')
  } else {
    await sessioneStore.test.stazione_corrente.richiediDomandeServer()
    sessioneStore.counter = 0;
    router.push({
      name: sessioneStore.domande[sessioneStore.counter][0],
      params: { id: sessioneStore.counter },
    });
  }
  Loading.hide()
}


async function consegna(dialog = true) {
  const indiciDomandeSenzaRisposta = sessioneStore.test.stazione_corrente.checkRisposte()
  if (dialog) {
    if (indiciDomandeSenzaRisposta.length > 0) {
      Dialog.create({
        title: 'Consegnare comunque ?',
        message: `${indiciDomandeSenzaRisposta.length} domand${indiciDomandeSenzaRisposta.length == 1 ? 'a' : 'e'
          }  senza risposta : [${indiciDomandeSenzaRisposta}].`,
        persistent: true,
        ok: {
          label: 'Si',
          color: 'positive',
        },
        cancel: {
          label: 'No',
          color: 'negative',
        },
      })
        .onOk(() => {
          effettuaConsegna()
        })

    } else effettuaConsegna();
  } else effettuaConsegna();
}

</script>
