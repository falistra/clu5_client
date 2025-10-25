<template>
  <div class="row justify-between">
    <div>
      <vue-countdown v-slot="{ hours, minutes, seconds }" :time="sessioneStore.countdown_stazione_corrente"
        @end="gameover" @progress="versoLaFine">
        <span class="text-subtitle1">{{ $t('Tempo_rimanente') }} :
          {{ hours > 0 ? hours + ' ' + (hours == 1 ? $t('ora') : $t('ore')) : '' }}
          {{ minutes }}
          {{ minutes == 1 ? $t('minuto') : $t('minuti') }}, {{ seconds }}
          {{ $t('secondi') }}</span>
      </vue-countdown>
    </div>

    <q-btn-group class="q-mr-lg q-mb-sm" push>
      <q-btn push icon="chevron_left" color="teal-8" :disable="sessioneStore.IN_VISIONE || sessioneStore.counter == 0"
        size="sm" @click="precedente">
        <!-- <q-tooltip v-if="sessioneStore.IN_ASCOLTO">
          {{ $t('In_ascolto') }}
        </q-tooltip>
        <q-tooltip v-if="sessioneStore.IN_VISIONE">
          {{ $t('In_visione') }}
        </q-tooltip> -->
      </q-btn>

      <q-btn disable class="font-sans hover:font-serif" :label="stato">
        <q-tooltip>
          {{ idDomanda }}
        </q-tooltip>
      </q-btn>

      <q-btn push icon="chevron_right" color="teal-8" size="sm"
        :disable="sessioneStore.IN_VISIONE || sessioneStore.domande.length == sessioneStore.counter + 1"
        @click="successivo">
        <!-- <q-tooltip v-if="sessioneStore.IN_ASCOLTO">
          {{ $t('In_ascolto') }}
        </q-tooltip>
        <q-tooltip v-if="sessioneStore.IN_VISIONE">
          {{ $t('In_visione') }}
        </q-tooltip> -->
      </q-btn>
    </q-btn-group>

    <q-btn class="q-ml-lg q-mb-sm text-caption" :color="((ultimaDomanda) && !quasiTimeout) ? 'teal-8' : 'teal-2'"
      :disable="(!ultimaDomanda) || quasiTimeout" :label="t('Consegna')" @click="consegna(true)" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
// import { Todo, Meta } from './models';
import { useSessioneStore } from '../stores/sessione';
import { useRouter } from 'vue-router';
import { Loading, Dialog, Notify } from 'quasar';
import VueCountdown from '@chenfengyuan/vue-countdown';
import ConfermaChiusura from './ConfermaChiusura.vue';
import ConfermaChiusuraDefinitiva from './ConfermaChiusuraDefinitiva.vue';
import { IDomanda } from '../pages/models';
import { /* debounce, */ throttle } from 'quasar';
// import { common_api } from '../boot/common-utils'
import { /* Cookies, */ useQuasar } from 'quasar';

const $q = useQuasar()

const sessioneStore = useSessioneStore();
const router = useRouter();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// const labelValutazione = ref(t('Consegna'));
const idDomanda = computed(() => {
  return (sessioneStore.domande[sessioneStore.counter][2] as IDomanda).id;
});

// if (sessioneStore.test === null) {
//   Cookies.set('idUtente', '', { expires: -1 });
//   Cookies.set('idSessione', '', { expires: -1 });
//   Cookies.set('sessione', '', { expires: -1 });
//   router.replace('/testNonDisponibile');
// } else {
if (sessioneStore.test && sessioneStore.test.script.test.situazionePrecedente)
  Notify.create({
    message: t('ripresaTest'),
    color: 'negative',
    position: 'bottom',
    timeout: 3000,
    closeBtn: 'OK'
  });
// }

const stato = computed(() => {
  return `${t('Parte')} ${sessioneStore.numero_stazione_corrente} ${t('di')} ${sessioneStore.numero_stazioni} - ${t('Domanda')} ${sessioneStore.counter + 1} ${t('di')} ${sessioneStore.domande.length}`
});

const ultimaDomanda = ref((sessioneStore.domande.length == 1) ? true : false);

watch(() => $q.fullscreen.isActive, (val: boolean) => {
  if (!val) {
    sessioneStore.premutoESC = true;
    if (sessioneStore.tipoSesssione == 'test') {
      sessioneStore.$reset()
      if (process.env.DEV) {
        router.replace('/esc');
      } else {
        router.replace('/esc');
        // window.location.replace('/test-GOODBYE.php');
        // window.open('/test-GOODBYE.php', '_self')?.focus();
      }
    }
  }
})

// watch(
//   () => sessioneStore.id_stazione_corrente,
//   () => {
//     sessioneStore.raggiuntaUltimaDomanda = false
//   },
//   { immediate: true }
// );

watch(
  () => sessioneStore.counter,
  (newValue) => {
    if (sessioneStore.raggiuntaUltimaDomanda) {
      ultimaDomanda.value = true;
      return
    }
    if (sessioneStore.domande.length == 1) {
      ultimaDomanda.value = true;
      return
    }
    if (sessioneStore.domande.length == (newValue + 1)) {
      ultimaDomanda.value = true;
      sessioneStore.raggiuntaUltimaDomanda = true;
    } else {
      ultimaDomanda.value = false;
      // sessioneStore.raggiuntaUltimaDomanda = false;
    }
  },
  { immediate: true }
);

async function gameover() {
  if (!sessioneStore.premutoESC) {
    Notify.create({
      message: t('tempoScaduto'),
      color: 'negative',
      position: 'top',
    })
    await consegna(false);
  }
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

let precedente = function () {
  sessioneStore.decrement();
  router.replace({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
  });
}

let successivo = function () {
  sessioneStore.increment();
  router.replace({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
  })
  // const idStazioneCorrente = sessioneStore.id_stazione_corrente
  // console.log('idStazioneCorrente', idStazioneCorrente);
  // if (sessioneStore.domande[sessioneStore.counter][2] as IDomanda) {
  //   sessioneStore.log_STAZIONI[idStazioneCorrente].idsDomandePoste?.add(
  //     (sessioneStore.domande[sessioneStore.counter][2] as IDomanda).id);
  //   console.log('idsDomandePoste', sessioneStore.log_STAZIONI[idStazioneCorrente].idsDomandePoste);
  // }
}

onMounted(() => {
  successivo = /* debounce */ throttle(successivo, 1000);
  precedente = /* debounce */ throttle(precedente, 1000);
});

async function effettuaConsegna() {
  sessioneStore.raggiuntaUltimaDomanda = false;
  ultimaDomanda.value = false;
  quasiTimeout.value = false;
  Loading.show();
  // le tre chiamate successive devono essere in await in quanto ciascuna modifica lo store
  // che viene presupposto dalle successive
  try {
    await sessioneStore.test.stazione_corrente.richiediPunteggio();
    await sessioneStore.test.stazione_corrente.passaStazione();

    if (sessioneStore.testCompletato) {
      $q.fullscreen.exit()
        .then(() => {
          // success!
        })
        .catch(() => {
          // oh, no!!!
        })

      if (process.env.DEV) {
        router.replace('/fineTestFuori');
      } else {
        window.open('/test-GOODBYE.php', '_self')?.focus();
      }
      // sessioneStore.$reset()
    } else {
      const esitoPositivo =
        await sessioneStore.test.stazione_corrente.richiediDomandeServer();

      if (esitoPositivo) {
        sessioneStore.counter = 0;
        router.replace({
          name: sessioneStore.domande[sessioneStore.counter][0],
          params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
        });
      } else {
        router.replace('/erroreServer');
      }
    }
  } catch (error) {
    console.log('errore', error);
    sessioneStore.IN_ERRORE = true;
    sessioneStore.errore = {
      idUser: sessioneStore.test.script.test.$.idUser,
      idSess: sessioneStore.test.script.test.$.sessionId,
      errore: error,
    };
    router.replace('/erroreServer');
  }

  Loading.hide();
}

// const effettuaConsegna = debounce(effettuaConsegnaZ, 1000);

async function consegna(dialog = true) {
  sessioneStore.raggiuntaUltimaDomanda = false;
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
        component: ConfermaChiusuraDefinitiva,
        // props forwarded to your custom component
        componentProps: {
          persistent: true
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

    }
  } else effettuaConsegna();
}
</script>
