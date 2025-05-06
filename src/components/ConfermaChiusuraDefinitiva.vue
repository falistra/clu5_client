<template>
  <q-dialog ref="dialogRef" v-model="show" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">


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

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const show = ref(true);

interface Props {
  persistent: boolean;
}

defineProps<Props>();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);


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
  show.value = false;
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
