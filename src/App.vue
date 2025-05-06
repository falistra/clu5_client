<template>
  <router-view v-if="testIn || Cookies.has('simulazione')" />
  <div v-if="(!testIn && !Cookies.has('simulazione'))"
    class="window-height window-width row justify-center items-center ">
    <div class="column  justify-evenly items-center rounded-borders shadow-15 bg-teal-1"
      style="height: 150px; width: 200px;">
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
      <div class="col-7">
        <q-btn icon="power_settings_new" glossy class="q-ma-md" color="primary" :label="$t('IniziaTest')" size="xl"
          @click="vai" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});



// import moment from 'moment';
import { useSessioneStore } from 'stores/sessione';
// import { useLogStore } from 'stores/log'
import { useRouter } from 'vue-router';
import { useQuasar, Cookies } from 'quasar';
import { ref, watch } from 'vue';

import './css/flag-icons.css';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' });
const localeOptions = ref([
  { value: 'en-US', label: 'EN', slot: 'en' },
  { value: 'it-IT', label: 'IT', slot: 'it' },
]);

const $q = useQuasar()

watch(() => $q.fullscreen.isActive, (val: boolean) => {
  // console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
  if (!val) {
    if (process.env.DEV) {
      router.replace('/fineTestFuori');
    } else {
      window.open('/test-GOODBYE.php', '_self')?.focus();
    }
  }
})

const sessioneStore = useSessioneStore();
// const log = useLogStore()
const testIn = ref(false);
// watch(() => sessioneStore.IN_ERRORE, () => {
//   if (sessioneStore.IN_ERRORE) {
//     testIn.value = true;
//   }
// }, { immediate: true });


const router = useRouter();

if (Cookies.has('simulazione')) {
  if (sessioneStore.domande.length > 0) {
    // console.log(`sessioneStore.numero_stazione_corrente: ${sessioneStore.numero_stazione_corrente}`);
    router.push({
      name: `simulazione_${sessioneStore.domande[sessioneStore.counter][0]}`,
      params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
    });
  }
  // Cookies.set('simulazione', '', { expires: -1 }); // cancella cookie
}

const vai = () => {
  $q.fullscreen.request()
    .then(() => {
      // success!
    })
    .catch(err => {
      console.log(err)
    })

  testIn.value = true;

  if (sessioneStore.domande.length > 0) {
    if (sessioneStore.domande.length > 0) {
      router.push({
        name: sessioneStore.domande[sessioneStore.counter][0],
        params: { st: sessioneStore.numero_stazione_corrente, id: sessioneStore.counter },
      });
    }

  } else {
    router.replace('/erroreServer');
  }
}
</script>
