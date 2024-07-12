<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <div class="row items-center justify-around ">
        <q-toolbar class="col-4">
          <q-toolbar-title>Titolo Esame</q-toolbar-title>
        </q-toolbar>
        <q-toolbar class="col-4 bg-primary text-white">
          <q-toolbar-title>Nome Studente</q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <!--- server per il cambio pagina -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <div class="row items-center justify-evenly">
        <q-toolbar class="col bg-primary text-white  ">
          <q-toolbar-title>
            <vue-countdown :time="3 * 60 * 1000" v-slot="{ minutes, seconds }" @end="gameover">
              Tempo rimanente: {{ minutes }} minuti, {{ seconds }} secondi.
            </vue-countdown>
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar class="col-auto">
          <barra-navigazione />
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">

import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout',
});
import BarraNavigazione from 'src/components/BarraNavigazione.vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
const $q = useQuasar()
const gameover = () => { $q.notify('Tempo scaduto') }

</script>

<style lang="sass">
.row-horizontal-alignment
  .row
    background: rgba(#aa0, .1)
  .row > div
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
