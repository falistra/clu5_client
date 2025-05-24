<template>
  <q-layout view="hHh lpR fFf" class="shadow-2 rounded-borders">
    <q-header bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
      <q-toolbar class="row flex-center">
        <q-toolbar-title class="col-3 text-h4">
          <div class="row flex-center">
            {{
              sessioneStore.test?.script?.test.studente.$.cognome +
              ' ' +
              sessioneStore.test?.script?.test.studente.$.nome
            }}
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col-9 text-subtitle1 text-wrap">
          <div class="row flex-center">
            {{ sessioneStore.descrizioneSessione.length > 80 ? sessioneStore.descrizioneSessione.slice(0, 80) + '....'
              :
              sessioneStore.descrizioneSessione }}
            <!-- <q-btn
              class="q-ml-lg"
              color="secondary"
              size="xs"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              @click="$q.fullscreen.toggle()"
            /> -->
            <!-- <q-select class="q-ml-md" v-model="locale" :options="localeOptions" dense borderless emit-value map-options
              options-dense style="min-width: 150px" /> -->

            <q-btn-toggle floating v-model="locale" class="q-ml-lg" push toggle-color="primary"
              :options="localeOptions">
              <template #en>
                <span class="q-ml-sm fi fi-gb fis" />
              </template>
              <template #it>
                <span class="q-ml-sm fi fi-it fis" />
              </template>
            </q-btn-toggle>
          </div>
          <q-badge color="red" floating> versione {{ version }} </q-badge>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <!--- server per il cambio pagina -->
        <transition mode="out-in">
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </transition>
        <!-- <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive> -->
      </router-view>
      <q-page-scroller expand position="bottom-right" :scroll-offset="100" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page-container>

    <q-footer bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
      <!-- <q-badge class="text-xs/[3px]" floating v-if="sessioneStore.sessioneInterrotta" color="red"
        label="Test precedentemente interrotto; ora ripreso.">
        <q-icon name="warning" color="white" />
      </q-badge> -->
      <div class="row items-center justify-between">
        <q-toolbar class="col-12">
          <q-toolbar-title>
            <barra-navigazione />
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
// import { useQuasar } from 'quasar';
//  const $q = useQuasar();

// import '/node_modules/flag-icons/css/flag-icons.min.css';
import '../css/flag-icons.css';

import { useSessioneStore } from '../stores/sessione';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const sessioneStore = useSessioneStore();

defineOptions({
  name: 'MainLayout',
});
import BarraNavigazione from '../components/BarraNavigazione.vue';
import { version } from '../../package.json';

const { locale } = useI18n({ useScope: 'global' });
const localeOptions = ref([
  { value: 'en-US', label: 'EN', slot: 'en' },
  { value: 'it-IT', label: 'IT', slot: 'it' },
]);

// const setLocale = (loc) => {
//   // set the Vue-i18n locale
//   let { locale } = useI18n({ useScope: 'global' })
//   locale = loc
//   // load the Quasar language pack dynamically
//   import(`quasar/lang/${locale}`).then(({ default: messages }) => {
//     Quasar.lang.set(messages)
//   })
// }
</script>

<style lang="sass">

.row-horizontal-alignment
  .row
    background: rgba(#aa0, .1)
  .row > div
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
