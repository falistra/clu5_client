<template>
  <div class="row justify-between">
    <div>
      <vue-countdown v-slot="{ minutes, seconds }" :time="parseInt(sessioneStore.test.stazione_corrente.script.$.countdown) *
        60 *
        1000
        " @end="gameover" @progress="versoLaFine">
        <span class="text-subtitle1">{{ $t('Tempo_rimanente') }} : {{ minutes }}
          {{ minutes == 1 ? $t('minuto') : $t('minuti') }}, {{ seconds }}
          {{ $t('secondi') }}</span>
      </vue-countdown>
    </div>

    <q-btn-group class="q-mr-lg q-mb-sm" push>
      <q-btn push icon="chevron_left" color="teal-8" :disable="sessioneStore.counter == 0" size="sm"
        @click="precedente" />

      <q-btn disable class="font-sans hover:font-serif" :label="stato">
        <q-tooltip>
          {{ idDomanda }}
        </q-tooltip>
      </q-btn>

      <q-btn push icon="chevron_right" color="teal-8" size="sm"
        :disable="sessioneStore.domande.length == sessioneStore.counter + 1" @click="successivo" />
    </q-btn-group>

    <q-btn class="q-ml-lg q-mb-sm text-caption" :color="ultimaDomanda ? 'teal-8' : 'teal-2'"
      :disable="!ultimaDomanda || quasiTimeout" :label="t('Consegna')" @click="consegna(true)" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { Todo, Meta } from './models';
import { useSessioneStore } from '../stores/sessione';
import { useRouter } from 'vue-router';
import { Loading, Dialog, Notify } from 'quasar';
import VueCountdown from '@chenfengyuan/vue-countdown';
import ConfermaChiusura from './ConfermaChiusura.vue';
import { IDomanda } from '../pages/models';

const sessioneStore = useSessioneStore();
const router = useRouter();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// const labelValutazione = ref(t('Consegna'));
const idDomanda = computed(() => {
  return (sessioneStore.domande[sessioneStore.counter][2] as IDomanda).id;
});

if (sessioneStore.test.script.test.situazionePrecedente)
  Notify.create({
    message: t('ripresaTest'),
    color: 'negative',
    position: 'bottom',
    timeout: 3000,
    closeBtn: 'OK'
  });



const stato = computed(() => {
  return `${t('Parte')} ${sessioneStore.numero_stazione_corrente} ${t('di')} ${sessioneStore.numero_stazioni} - ${t('Domanda')} ${sessioneStore.counter + 1} ${t('di')} ${sessioneStore.domande.length}`
});

let notUltimaDomanda = true;

const ultimaDomanda = computed(() => {
  if (notUltimaDomanda) {
    if (sessioneStore.domande.length == sessioneStore.counter + 1) {
      notUltimaDomanda = false;
      return true;
    } else return false;
  }
  return true;
});

async function gameover() {
  Notify.create({
    message: t('tempoScaduto'),
    color: 'negative',
    position: 'top',
  });
  await consegna(false);
}

const quasiTimeout = ref(false);

function versoLaFine(data: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  if (data.hours == 0 && data.minutes == 0 && data.seconds == 20) {
    quasiTimeout.value = true;
  }
  if (data.hours == 0 && data.minutes == 1 && data.seconds == 0) {
    Notify.create({
      message: t('manca1minuto'),
      color: 'info',
      position: 'top',
    });
  }
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
  notUltimaDomanda = true;
  quasiTimeout.value = false;
  Loading.show();
  // le tre chiamate successive devono essere in await in quanto ciascuna modifica lo store
  // che viene presupposto dalle successive
  await sessioneStore.test.stazione_corrente.richiediPunteggio();
  await sessioneStore.test.stazione_corrente.passaStazione();

  if (sessioneStore.testCompletato) {
    if (process.env.DEV) {
      router.push('/fineTestFuori');
    } else {
      window.open('/test-GOODBYE.php', '_self')?.focus();
    }
    // sessioneStore.$reset()
  } else {
    const esitoPositivo =
      await sessioneStore.test.stazione_corrente.richiediDomandeServer();
    if (esitoPositivo) {
      sessioneStore.counter = 0;
      router.push({
        name: sessioneStore.domande[sessioneStore.counter][0],
        params: { id: sessioneStore.counter },
      });
    } else {
      router.push('/erroreServer');
    }
  }
  Loading.hide();
}

async function consegna(dialog = true) {
  const indiciDomandeSenzaRisposta =
    sessioneStore.test.stazione_corrente.checkRisposte();
  if (dialog) {
    if (indiciDomandeSenzaRisposta.length > 0) {
      // non ci sono tutte le risposte
      Dialog.create({
        component: ConfermaChiusura,
        // props forwarded to your custom component
        componentProps: {
          persistent: true,
          indiciDomandeSenzaRisposta,
        },
      })
        .onOk(() => {
          effettuaConsegna();
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('Called on OK or Cancel')
        });
    } // ci sono tutte le risposte
    else {
      Dialog.create({
        title: t('confermaFine'),
        persistent: true,
        ok: {
          label: t('si'),
          color: 'positive',
        },
        cancel: {
          label: t('no'),
          color: 'negative',
        },
      }).onOk(() => {
        effettuaConsegna();
      });
    }
  } else effettuaConsegna();
}
</script>
