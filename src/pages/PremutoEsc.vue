<template>
  <div class="fullscreen row items-center justify-center">
    <div class="column  justify-evenly items-center rounded-borders shadow-15 bg-red-400"
      style="height: auto; width: auto;">
      <div class="col-2">
        <q-btn-toggle size="sm" v-model="locale" push toggle-color="primary" :options="localeOptions">
          <template #en>
            <span class="q-ml-sm fi fi-gb fis" />
          </template>
          <template #it>
            <span class="q-ml-sm fi fi-it fis" />
          </template>
        </q-btn-toggle>
      </div>
      <div class="col-7 text-center q-pa-md font-semibold text-lg">
        {{ $t('premutoEsc') }}
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' });
const localeOptions = ref([
  { value: 'en-US', label: 'EN', slot: 'en' },
  { value: 'it-IT', label: 'IT', slot: 'it' },
]);
</script>
