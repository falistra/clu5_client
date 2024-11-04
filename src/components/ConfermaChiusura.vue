<template>
  <q-dialog v-model="show" ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-card-section>
        <div class="text-subtitle2">{{ $t('domandeNoRisposta') }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn-group class="q-mr-lg q-mb-sm" push>
          <q-btn v-for="D in indiciDomandeSenzaRisposta" push :key="D.indice" :label="D.indice" color="teal-8" size="sm"
            @click="vai(D)">
            <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[1, 1]">
              <strong>{{ $t('click2D') }}</strong>
            </q-tooltip>
          </q-btn>
        </q-btn-group>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2">{{ $t('Conferma_Fine') }}</div>
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
import { useDialogPluginComponent } from 'quasar'
import { useSessioneStore } from 'stores/sessione';
import { useRouter } from 'vue-router';

const sessioneStore = useSessioneStore();
const router = useRouter();

import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const show = ref(true)

interface Props {
  persistent: boolean,
  indiciDomandeSenzaRisposta: { tipo: string; indice: number; }[]
};

defineProps<Props>()

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const vai = (D: { tipo: string; indice: number }) => {
  show.value = false

  sessioneStore.counter = D.indice - 1
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
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
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
