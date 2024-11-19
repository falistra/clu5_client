<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-negative text-white" height-hint="98">
      <q-toolbar class="row flex-center">
        <q-toolbar-title class=" col text-subtitle1">
          <div class="row flex-center">
            {{ sessioneStore.test.script?.test.studente.$.cognome + ' ' +
              sessioneStore.test.script?.test.studente.$.nome }}
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            Errore
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            {{ sessioneStore.test.script.test.$.descrizione }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/icons/favicon-128x128.png">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">

// import { useQuasar } from 'quasar'
import { useSessioneStore } from '../stores/sessione'

const sessioneStore = useSessioneStore()

</script>

<style lang="sass">

.row-horizontal-alignment
  .row
    background: rgba(#aa0, .1)
  .row > div
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
