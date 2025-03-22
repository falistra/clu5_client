<template>
  <q-dialog ref="dialogRef" v-model="show" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-subtitle2">
          {{ $t('domandeNoRisposta') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn-dropdown color="primary" :label="t('domandeSenzaRisposta')">
          <q-list dense bordered>
            <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[1, 1]">
              <strong>{{ $t('click2D') }}</strong>
            </q-tooltip>
            <q-item clickable v-close-popup @click="vai(D)" v-for="D in indiciDomandeSenzaRisposta" :key="D.indice">
              <q-item-section>
                <q-item-label>{{ `${t('Domanda')} ${D.indice}` }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2">
          {{ $t('confermaFine') }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="positive" :label="t('si')" @click="onOKClick" />
        <q-btn color="negative" :label="t('no')" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useSessioneStore } from '../stores/sessione';
import { useRouter } from 'vue-router';

const sessioneStore = useSessioneStore();
const router = useRouter();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const show = ref(true);

interface Props {
  persistent: boolean;
  indiciDomandeSenzaRisposta: { tipo: string; indice: number }[];
}

defineProps<Props>();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const vai = (D: { tipo: string; indice: number }) => {
  show.value = false;

  sessioneStore.counter = D.indice - 1;
  console.log(`sessioneStore.numero_stazione_corrente: ${sessioneStore.numero_stazione_corrente}`);
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
  });
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
