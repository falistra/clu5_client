<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
      <q-toolbar class="row flex-center">
        <q-toolbar-title class="col-6 text-subtitle1">
          <div class="row flex-center">
            {{ sessioneStore.test.script?.test.studente.$.cognome + ' ' +
              sessioneStore.test.script?.test.studente.$.nome }}
          </div>
        </q-toolbar-title>
        <!-- <q-toolbar-title class="col-5 text-subtitle1">
          <div class="row flex-center">
            Parte {{ sessioneStore.numero_stazione_corrente }} di {{
              sessioneStore.test.script.test.stazioni.stazione.length }}
          </div>
        </q-toolbar-title> -->
        <q-toolbar-title class="col-6 text-subtitle1">
          <div class="row justify-end">
            {{ sessioneStore.test.script.test.$.descrizione }}
            <q-btn class="q-ml-lg" color="secondary" @click="$q.fullscreen.toggle()" size="xs"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
            <!-- <q-select class="q-ml-md" v-model="locale" :options="localeOptions" dense borderless emit-value map-options
              options-dense style="min-width: 150px" /> -->

            <q-btn-toggle class="q-ml-lg" v-model="locale" push toggle-color="primary" :options="localeOptions">
              <template v-slot:en>
                <span class="q-ml-sm fi fi-gb"></span>
              </template>
              <template v-slot:it>
                <span class="q-ml-sm fi fi-it"></span>
              </template>
            </q-btn-toggle>
          </div>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <!--- server per il cambio pagina -->
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
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
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { useSessioneStore } from 'stores/sessione';
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';

const sessioneStore = useSessioneStore();

defineOptions({
  name: 'MainLayout',
});
import BarraNavigazione from '../components/BarraNavigazione.vue';

const { locale } = useI18n({ useScope: 'global' })
const localeOptions = ref([
  { value: 'en-US', label: 'EN', slot: 'en' },
  { value: 'it-IT', label: 'IT', slot: 'it' }
])

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
